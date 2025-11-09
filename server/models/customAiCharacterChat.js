const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "character"],
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const customAiCharacterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    characterId: {
      type: String,
      required: true,
      index: true,
    },
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    messages: [messageSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

customAiCharacterSchema.index({ userId: 1, characterId: 1 });

customAiCharacterSchema.methods.addMessage = function (role, content) {
  this.messages.push({ role, content });
  this.lastMessageAt = new Date();
  return this.save();
};

customAiCharacterSchema.methods.getRecent = function (limit = 10) {
  return this.messages.slice(-limit);
};

customAiCharacterSchema.statics.findOrCreateSession = async function (
  userId,
  characterId,
  sessionId
) {
  let chat = await this.findOne({ sessionId: sessionId });

  if (!chat) {
    chat = await this.create({
      userId,
      characterId,
      sessionId,
      messages: [],
    });
  }

  return chat;
};

const CustomAiCharacter = mongoose.model(
  "CustomAiCharacter",
  customAiCharacterSchema
);

module.exports = CustomAiCharacter;
