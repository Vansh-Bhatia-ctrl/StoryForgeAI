const mongoose = require("mongoose");
const Nodes = require("../models/nodes");
const StoryCards = require("../models/storyCard");

const verifyOwnerShip = async (nodeId, userId) => {
  const node = await Nodes.findOne({ nodeId: nodeId, user: userId });

  if (!node) {
    return {
      valid: false,
      message: "Node not found or you don't have permission to delete it.",
    };
  }

  return { valid: true, node };
};

const checkNodeRefrences = async (nodeId, userId) => {
  const referencingNodes = await Nodes.find({
    user: userId,
    "choices.targetNodeId": nodeId,
  }).select("nodeId nodeTitle");

  if (referencingNodes.length > 0) {
    return {
      hasReference: true,
      referencingNode: referencingNodes.map((node) => ({
        nodeId: node.nodeId,
        nodeTitle: node.nodeTitle,
      })),
    };
  }

  return { hasReference: false };
};

const removeNodeReferences = async (nodeId, userId, session) => {
  const result = await Nodes.updateMany(
    {
      user: userId,
      "choices.targetNodeId": nodeId,
    },
    {
      $pull: {
        choices: { targetNodeId: nodeId },
      },
    },
    { session }
  );

  return result.modifiedCount;
};

const deleteNodeController = async (req, res) => {
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

    if (!nodeId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Node ID is required.",
        code: "MISSING_NODE_ID",
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

    const softDelete = req.query.soft === "true";

    if (softDelete) {
      node.status = "archived";
      await node.save({ session });

      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({
        success: true,
        message: "Node archieved successfully.",
        code: "NODE_ARCHIVED",
        data: {
          nodeId: node.nodeId,
          nodeTitle: node.nodeTitle,
          status: node.status,
        },
      });
    }

    const forceDelete = req.query.force === "true";
    const referenceCheck = await checkNodeRefrences(nodeId, userId);

    if (referenceCheck.hasReference && !forceDelete) {
      await session.abortTransaction();
      session.endSession();

      return res.status(409).json({
        success: false,
        message:
          "This node is referenced by other nodes' choices. Delete those connections first or use force delete.",
        code: "NODE_HAS_REFERENCES",
        data: {
          nodeId: nodeId,
          referencedBy: referenceCheck.referencingNodes,
          referencesCount: referenceCheck.referencingNodes.length,
        },
        suggestion:
          "Add ?force=true to the request to delete anyway and remove all references.",
      });
    }

    if (referenceCheck.hasReference) {
      const removedReferences = await removeNodeReferences(
        nodeId,
        userId,
        session
      );

      console.log(
        `Removed ${removedReferences} choice references to node ${nodeId}`
      );
    }

    const storyUpdateResult = await StoryCards.updateMany(
      { nodes: node._id },
      { $pull: { nodes: node._id }, lastModified: Date.now() },
      { session }
    );

    await Nodes.deleteOne({ _id: node._id }, { session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Node deleted successfully",
      code: "NODE_DELETED",
      data: {
        deletedNode: {
          nodeId: node.nodeId,
          nodeTitle: node.nodeTitle,
          nodeType: node.nodeType,
        },
        referencesRemoved: referenceCheck.hasReference
          ? referenceCheck.referencingNode.length
          : 0,
        storiesUpdated: storyUpdateResult.modifiedCount,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the node.",
      code: "INTERNAL_SERVER_ERROR",
      error: error,
      errorMessage: error.message,
    });
  }
};

module.exports = { deleteNodeController };
