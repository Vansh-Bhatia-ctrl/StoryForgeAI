const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  storyId: {
    type: String,
    required: true,
  },
  characterId: {
    type: String,
    required: [true, "Character ID must be unique."],
    unique: true,
  },
  characterName: {
    type: String,
    required: true,
  },
  backstory: {
    type: String,
    minlength: [30, "Backstory must be at least 30 characters."],
    maxlength: [200, "Backstory cannot exceed 200 characters."],
    required: [true, "Backstory must be at least 30 to 200 characters long."],
  },
  personality: [
    {
      type: String,
      required: [true, "At least one tag is required"],
      trim: true,
      lowercase: true,
    },
  ],
  traits: [
    {
      type: String,
      required: [true, "At least one tag is required"],
      trim: true,
      lowercase: true,
    },
  ],
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
