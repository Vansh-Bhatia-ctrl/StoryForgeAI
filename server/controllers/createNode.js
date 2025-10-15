const mongoose = require("mongoose");
const Nodes = require("../models/nodes");
const StoryCards = require("../models/storyCard");

const sanitizeInput = (text) => {
  if (typeof text !== "string") return text;
  return text.trim().replace(/[<>]/g, "").replace(/\s+/g, " ");
};

const generateNodeId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `node_${timestamp}_${random}`;
};

const validateTags = (tag) => {
  const tagsArray = tag.split(",").map((t) => t.trim().toLowerCase());
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

const verifyOwnerShip = async (storyId, userId) => {
  const story = await StoryCards.findOne({ storyId: storyId, user: userId });

  if (!story) {
    return { valid: false, message: "Story not found or unauthorized access." };
  }
  return { valid: true, story };
};

const createNodesController = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
        code: "UNAUTHORIZED",
      });
    }

    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format.",
        code: "INVALID_USER_ID",
      });
    }

    const {
      nodeTitle,
      nodeType,
      emotionalTone,
      tags,
      storyContent,
      choices = [],
      position = { x: 0, y: 0 },
    } = req.body;

    const { storyId } = req.params;

    const sanitizedTitle = sanitizeInput(nodeTitle);
    const sanitizedContent = sanitizeInput(storyContent);

    const requiredFields = {
      storyId: "Story ID",
      nodeTitle: "Node title",
      nodeType: "Node type",
      emotionalTone: "Emotional tone",
      tags: "Tags",
      storyContent: "Story content",
    };

    const missingFields = [];
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!req.body[field]) {
        missingFields.push(label);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
        code: "MISSING_FIELDS",
        missingFields,
      });
    }

    const storyCheck = await verifyOwnerShip(storyId, userId);
    if (!storyCheck.valid) {
      return res.status(404).json({
        success: false,
        message: storyCheck.message,
        code: "STORY_NOT_FOUND",
      });
    }

    const story = storyCheck.story;

    if (sanitizedTitle.length < 5 || sanitizedTitle.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Node title must be between 5 and 50 characters.",
        code: "INVALID_TITLE_LENGTH",
        received: sanitizedTitle.length,
        expected: "5-50 characters",
      });
    }

    const validTypes = ["Story", "Choice", "Ending", "Character"];
    if (!validTypes.includes(nodeType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid node type.",
        code: "INVALID_NODE_TYPE",
        received: nodeType,
        validTypes,
      });
    }

    const validEmotionTypes = [
      "Mysterious",
      "Tense",
      "Hopeful",
      "Dark",
      "Peaceful",
      "Action",
    ];

    if (!validEmotionTypes.includes(emotionalTone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid emotional tone.",
        code: "INVALID_EMOTIONAL_TONE",
        received: emotionalTone,
        validTones: validEmotionTypes,
      });
    }

    const tagValidation = validateTags(tags);
    if (!tagValidation.valid) {
      return res.status(400).json({
        success: false,
        message: tagValidation.message,
        code: "INVALID_TAGS",
      });
    }

    if (sanitizedContent.length < 250) {
      return res.status(400).json({
        success: false,
        message: "Story content must be at least 250 characters.",
        code: "INSUFFICIENT_STORY_CONTENT",
        received: sanitizedContent.length,
        required: 250,
      });
    }

    if (nodeType === "Choice") {
      if (!choices || choices.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Choice nodes must have at least one choice.",
          code: "MISSING_CHOICES",
        });
      }

      if (choices.length > 5) {
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
          return res.status(400).json({
            success: false,
            message: `Choice ${i + 1} text must be at least 3 characters.`,
            code: "INVALID_CHOICE_TEXT",
          });
        }
      }
    }

    const existingNodes = await Nodes.find({
      user: userId,
      nodeTitle: sanitizedTitle,
      _id: { $in: story.nodes },
    });

    if (existingNodes.length > 0) {
      return res.status(409).json({
        success: false,
        message: "A node with this title already exists in this story.",
        code: "DUPLICATE_NODE_TITLE",
        suggestion: `Try "${sanitizedTitle} (2)" or a different title.`,
      });
    }

    const nodeId = generateNodeId();

    const node = new Nodes({
      storyId: story._id,
      user: userId,
      nodeId,
      nodeTitle: sanitizedTitle,
      nodeType,
      emotionalTone,
      tags: tagValidation.tags.join(", "),
      storyContent: sanitizedContent,
      choices:
        nodeType === "Choice"
          ? choices.map((choice, index) => ({
              choiceId: `choice_${nodeId}_${index}`,
              text: sanitizeInput(choice.text),
              consequence: sanitizeInput(choice.consequence || ""),
              targetNodeId: choice.targetNodeId || "",
              color: choice.color || "blue",
            }))
          : [],
      position: {
        x: position.x || 0,
        y: position.y || 0,
      },
    });

    await node.save();

    story.nodes.push(node._id);
    await story.save();

    return res.status(201).json({
      success: true,
      message: "Node created successfully",
      data: {
        node: {
          storyId: storyId,
          id: node._id,
          nodeId: node.nodeId,
          nodeTitle: node.nodeTitle,
          nodeType: node.nodeType,
          emotionalTone: node.emotionalTone,
          tags: node.tags,
          choiceCount: node.choices.length,
          createdAt: node.createdAt,
        },
        story: {
          storyId: story.storyId,
          title: story.title,
          totalNodes: story.nodes.length,
        },
      },
    });
  } catch (error) {
    console.error("Error in createNodesController:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error,
      errorMessage: error.message,
    });
  }
};

module.exports = { createNodesController };
