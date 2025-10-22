const mongoose = require("mongoose");
const Nodes = require("../models/nodes");

const fetchNodes = async (req, res) => {
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

    const { storyId, nodeId } = req.params;

    if (!nodeId || !storyId) {
      return res.status(400).json({
        success: false,
        message: "Node Id is required.",
        code: "IDS_NOT_FOUND",
      });
    }

    const node = await Nodes.findOne({
      user: userId,
      nodeId: nodeId,
      storyId: storyId,
    });

    if (!node) {
      return res.status(404).json({
        success: false,
        message: "No data found for this nodeId.",
        code: "NO_DATA_FOUND",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched data successfully",
      data: {
        node: node,
      },
    });
  } catch (error) {
    console.log(
      "Error fetching node data: ",
      error,
      "Error Message: ",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Something went wrong please try again.",
      errorMessage: error.message,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

module.exports = { fetchNodes };
