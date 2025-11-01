const Character = require("../models/character");
const mongoose = require("mongoose");

const fetchCharacter = async (req, res) => {
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

    const { storyId } = req.params;

    if (!storyId) {
      return res.status(400).json({
        success: false,
        message: "Story ID not found.",
        code: "STORYID_NOTFOUND",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid story ID format.",
        code: "INVALID_STORY_ID",
      });
    }

    const character = await Character.find({
      userId: userId,
      storyId: storyId,
    });

    if (!character || character.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No character found for this storyId or userId.",
        code: "CHARACTER_NOTFOUND",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Character data fetched succesfully.",
      data: {
        characterData: character,
      },
    });
  } catch (error) {
    console.log(
      "Error fetching character data: ",
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

module.exports = { fetchCharacter };
