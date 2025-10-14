const StoryCards = require("../models/storyCard");
const mongoose = require("mongoose");

const fetchStoryCards = async (req, res) => {
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

    const storyCards = await StoryCards.find({ user: userId });

    if (!storyCards) {
      return res.status(400).json({ message: "No stories/projects created." });
    }

    return res
      .status(200)
      .json({ message: "Story Cards fetched succesfully.", cards: storyCards });
  } catch (error) {
    console.log(
      `Error fetching storyCards: ${error}, error message:${error.message}`
    );
    return res.status(500).json({
      message: `Something went wrong please try again: ${error}, error message:${error.message}`,
    });
  }
};

module.exports = { fetchStoryCards };
