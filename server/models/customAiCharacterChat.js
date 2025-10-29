const mongoose = require("mongoose");

const customAiCharacterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    characterName: {
      type: String,
      required: true,
    },
    characterId: {
      type: String,
      required: true,
      unique: [true, "Character ID must be unique."],
    },
    messages: [
      {
        role: String,
        content: String,
        timestamp: Date,
      },
    ],
    timeStamp: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const CustomAiCharacter = mongoose.model(
  "CustomAiCharacter",
  customAiCharacterSchema
);

module.exports = CustomAiCharacter;
