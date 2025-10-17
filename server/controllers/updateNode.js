const mongoose = require("mongoose");
const Nodes = require("../models/nodes");
const StoryCards = require("../models/storyCard");

const sanitizeInput = (text) => {
  if (typeof text !== "string") return text;
  return text.trim().replace(/[<>]/g, "").replace(/\s+/g, " ");
};

const validTags = (tags) => {
  const tagsArray = tags.split(",").map((t) => t.trim().toLowerCase());
  const validTagPattern = /^[a-z0-9-]+$/;

  const invalidTags = tagsArray.filter((tag) => !validTagPattern.test(tag));

  if (invalidTags.length > 0) {
    return {
      valid: false,
      message: `Invalid tags: ${invalidTags.join(
        ", "
      )}. Tags should only contain lowercase letters, numbers, and hyphens.`,
    };
  }

  if (tagsArray.length > 10) {
    return {
      valid: false,
      message: "Maximum 10 tags allowed per node.",
    };
  }

  return { valid: true, tags: tagsArray };
};

const verifyOwnerShip = async (nodeId, userId) => {
  const node = await Nodes.findOne({ nodeId: nodeId, user: userId });

  if (!node) {
    return {
      valid: false,
      message: "Node not found or you don't have permission to update it.",
    };
  }

  return { valid: true, node };
};

const checkNodeReference = async (nodeId, userId) => {
  const referencingNodes = await Nodes.find({
    user: userId,
    "choices.targetNodeId": nodeId,
  }).select("nodeId nodeTitle choices");

  if (referencingNodes.length > 0) {
    return {
      hasReferences: true,
      referencingNodes: referencingNodes.map((node) => ({
        nodeId: node.nodeId,
        nodeTitle: node.nodeTitle,
        choicesCount: node.choices.filter((c) => c.targetNodeId === nodeId)
          .length,
      })),
      totalReferences: referencingNodes.reduce(
        (sum, node) =>
          sum + node.choices.filter((c) => c.targetNodeId === nodeId).length,
        0
      ),
    };
  }

  return { hasReferences: false };
};

const validateNodeTypeChange = (currentType, newType, node) => {
  const typeChangeRules = {
    Ending: {
      allowedChanges: [],
      reason:
        "Ending nodes cannot be changed to other types as they terminate story branches.",
    },
    Choice: {
      allowedChanges: ["Story", "Character"],
      reason:
        "Choice nodes with active references should maintain their branching capability.",
    },
    Story: {
      allowedChanges: ["Choice", "Character"],
      reason: "Story nodes can be converted to interactive types.",
    },
    Character: {
      allowedChanges: ["Story", "Choice"],
      reason: "Character nodes can be converted to other interactive types.",
    },
  };

  if (currentType === newType) {
    return { valid: true };
  }

  const rule = typeChangeRules[currentType];

  if (!rule.allowedChanges.includes(newType)) {
    return {
      valid: false,
      message: `Cannot change node type from ${currentType} to ${newType}. ${rule.reason}`,
      currentType,
      requestedType: newType,
      allowedTypes: rule.allowedChanges,
    };
  }

  if (currentType === "Choice" && node.choices.length > 0) {
    const hasActiveConnections = node.choices.some((c) => c.targetNodeId);
    if (hasActiveConnections && newType !== "Choice") {
      return {
        valid: false,
        message:
          "Cannot change type of Choice node with active connections. Remove connections first.",
        activeConnections: node.choices.filter((c) => c.targetNodeId).length,
      };
    }
  }

  return { valid: true };
};

const generateChoiceId = (nodeId, index) => {
  return `choice_${nodeId}_${index}_${Date.now()}`;
};

const trackChanges = (originalNode, updates) => {
  const changes = {};

  const trackableFields = [
    "nodeTitle",
    "nodeType",
    "emotionalTone",
    "tags",
    "storyContent",
    "position",
  ];

  trackableFields.forEach((field) => {
    if (updates[field] !== undefined) {
      const oldValue = originalNode[field];
      const newValue = updates[field];

      if (typeof oldValue === "object" && typeof newValue === "object") {
        if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
          changes[field] = { from: oldValue, to: newValue };
        }
      } else if (oldValue !== newValue) {
        changes[field] = { from: oldValue, to: newValue };
      }
    }
  });

  if (updates.choices !== undefined) {
    changes.choices = {
      from: originalNode.choices.length,
      to: updates.choices.length,
      modified: true,
    };
  }

  return changes;
};

const updateNodeController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (!req.user || !req.user.id) {
      await session.abortTransaction();
      session.endSession();
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
        code: "UNAUTHORIZED",
      });
    }

    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format.",
        code: "INVALID_USER_ID",
      });
    }

    const { nodeId } = req.params;
    const {
      nodeTitle,
      nodeType,
      emotionalTone,
      tags,
      storyContent,
      choices,
      position,
    } = req.body;

    if (!nodeId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Node ID is required.",
        code: "MISSING_NODE_ID",
      });
    }

    const hasUpdated = !!(
      nodeTitle ||
      nodeType ||
      emotionalTone ||
      tags ||
      storyContent ||
      choices ||
      position
    );

    if (!hasUpdated) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message:
          "No fields to update. Please provide at least one field to update.",
        code: "NO_UPDATES_PROVIDED",
        updatableFields: [
          "nodeTitle",
          "nodeType",
          "emotionalTone",
          "tags",
          "storyContent",
          "choices",
          "position",
        ],
      });
    }

    const nodeCheck = await verifyOwnerShip(nodeId, userId);

    if (!nodeCheck.valid) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: nodeCheck.message,
        code: "NODE_NOT_FOUND",
        nodeId: nodeId,
      });
    }

    const node = nodeCheck.node;

    if (nodeTitle !== undefined) {
      const sanitizedTitle = sanitizeInput(nodeTitle);

      if (sanitizedTitle.length < 5 || sanitizedTitle.length > 50) {
        await session.abortTransaction();
        session.endSession();

        return res.status(400).json({
          success: false,
          message: "Node title must be between 5 and 50 characters.",
          code: "INVALID_TITLE_LENGTH",
          received: sanitizedTitle.length,
          expected: "5-50 characters",
        });
      }

      const story = await StoryCards.findOne({
        nodes: node._id,
      }).populate("nodes", "nodeTitle");

      const duplicateExists = story.nodes.some(
        (n) =>
          n.nodeTitle === sanitizedTitle &&
          n._id.toString() !== node._id.toString()
      );

      if (duplicateExists) {
        await session.abortTransaction();
        session.endSession();
        return res.status(409).json({
          success: false,
          message: "A node with this title already exists in this story.",
          code: "DUPLICATE_NODE_TITLE",
          suggestion: `Try "${sanitizedTitle} (2)" or a different title.`,
        });
      }

      node.nodeTitle = sanitizedTitle;
    }

    if (nodeType !== undefined) {
      const validTypes = ["Story", "Choice", "Ending", "Character"];

      if (!validTypes.includes(nodeType)) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: "Invalid node type.",
          code: "INVALID_NODE_TYPE",
          received: nodeType,
          validTypes,
        });
      }

      if (nodeType === "Ending") {
        const referenceCheck = await checkNodeReference(nodeId, userId);

        if (referenceCheck.hasReferences) {
          await session.abortTransaction();
          session.endSession();
          return res.status(409).json({
            success: false,
            message:
              "Cannot change to Ending type. This node is referenced by other nodes' choices.",
            code: "NODE_HAS_INCOMING_REFERENCES",
            data: {
              referencedBy: referenceCheck.referencingNodes,
              totalReferences: referenceCheck.totalReferences,
            },
            suggestion:
              "Remove all incoming references before changing to Ending type.",
          });
        }
      }

      const typeValidation = validateNodeTypeChange(
        node.nodeType,
        nodeType,
        node
      );

      if (!typeValidation.valid) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: typeValidation.message,
          code: "INVALID_TYPE_CHANGE",
          data: typeValidation,
        });
      }

      node.nodeType = nodeType;

      if (nodeType !== "Choice" && node.nodeType === "Choice") {
        node.choices = [];
      }
    }

    if (emotionalTone !== undefined) {
      const validEmotionTypes = [
        "Mysterious",
        "Tense",
        "Hopeful",
        "Dark",
        "Peaceful",
        "Action",
      ];

      if (!validEmotionTypes.includes(emotionalTone)) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: "Invalid emotional tone.",
          code: "INVALID_EMOTIONAL_TONE",
          received: emotionalTone,
          validTones: validEmotionTypes,
        });
      }

      node.emotionalTone = emotionalTone;
    }

    if (tags !== undefined) {
      const tagValidation = validTags(tags);

      if (!tagValidation.valid) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: tagValidation.message,
          code: "INVALID_TAGS",
        });
      }

      node.tags = tagValidation.tags.join(", ");
    }

    if (storyContent !== undefined) {
      const sanitizedContent = sanitizeInput(storyContent);

      if (sanitizedContent.length < 250) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: "Story content must be at least 250 characters.",
          code: "INSUFFICIENT_STORY_CONTENT",
          received: sanitizedContent.length,
          required: 250,
        });
      }

      node.storyContent = sanitizedContent;
    }

    if (choices !== undefined) {
      const currentNodeType = node.nodeType;

      if (currentNodeType !== "Choice" && choices.length > 0) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: "Only Choice nodes can have choices.",
          code: "INVALID_NODE_TYPE_FOR_CHOICES",
          currentType: currentNodeType,
          suggestion: "Change node type to 'Choice' first.",
        });
      }

      if (currentNodeType === "Choice") {
        if (choices.length === 0) {
          await session.abortTransaction();
          session.endSession();
          return res.status(400).json({
            success: false,
            message: "Choice nodes must have at least one choice.",
            code: "MISSING_CHOICES",
          });
        }

        if (choices.length > 5) {
          await session.abortTransaction();
          session.endSession();
          return res.status(400).json({
            success: false,
            message: "Maximum 5 choices allowed per node.",
            code: "TOO_MANY_CHOICES",
            received: choices.length,
            maximum: 5,
          });
        }

        for (let i = 0; i < choices.length; i++) {
          const choice = choices[i];

          if (!choice.text || choice.text.trim().length < 3) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
              success: false,
              message: `Choice ${i + 1} text must be at least 3 characters.`,
              code: "INVALID_CHOICE_TEXT",
              choiceIndex: i,
            });
          }

          if (choice.targetNodeId) {
            const targetExists = await Nodes.findOne({
              nodeId: choice.targetNodeId,
              user: userId,
            });

            if (!targetExists) {
              await session.abortTransaction();
              session.endSession();
              return res.status(404).json({
                success: false,
                message: `Target node ${
                  choice.targetNodeId
                } not found for choice ${i + 1}.`,
                code: "TARGET_NODE_NOT_FOUND",
                choiceIndex: i,
                targetNodeId: choice.targetNodeId,
              });
            }

            if (choice.targetNodeId === nodeId) {
              await session.abortTransaction();
              session.endSession();
              return res.status(400).json({
                success: false,
                message: `Choice ${
                  i + 1
                } cannot reference the same node (circular reference).`,
                code: "CIRCULAR_REFERENCE",
                choiceIndex: i,
              });
            }
          }
        }

        node.choices = choices.map((choice, index) => {
          const choiceId =
            choice.choiceId || generateChoiceId(node.nodeId, index);

          return {
            choiceId,
            text: sanitizeInput(choice.text),
            consequence: sanitizeInput(choice.consequence || ""),
            targetNodeId: choice.targetNodeId || "",
            color: choice.color || "blue",
          };
        });
      } else {
        node.choices = [];
      }
    }

    if (position !== undefined) {
      if (typeof position.x !== "number" || typeof position.y !== "number") {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: "Position must have valid x and y coordinates.",
          code: "INVALID_POSITION",
          received: position,
        });
      }

      node.position = {
        x: position.x,
        y: position.y,
      };
    }

    const changes = trackChanges(node.toObject(), req.body);
    node.lastModified = Date.now();

    await node.save({ session });
    await StoryCards.updateOne(
      { nodes: node._id },
      { lastModified: Date.now() },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Node updated successfully",
      code: "NODE_UPDATED",
      data: {
        node: {
          id: node._id,
          nodeId: node.nodeId,
          nodeTitle: node.nodeTitle,
          nodeType: node.nodeType,
          emotionalTone: node.emotionalTone,
          tags: node.tags,
          choiceCount: node.choices.length,
          position: node.position,
          version: node.__v,
          lastModified: node.lastModified,
        },
        changes:
          Object.keys(changes).length > 0 ? changes : "No changes detected",
        modifiedFields: Object.keys(changes),
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.log(
      "Error updating node: ",
      error,
      "Error Message: ",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the node.",
      errorMessage: error.message,
      code: "INTERNAL_SERVER_ERROR",
      error: error,
    });
  }
};

module.exports = { updateNodeController };
