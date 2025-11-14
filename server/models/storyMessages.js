const mongoose = require("mongoose");

const storyMessageSchema = new mongoose.Schema(
  {
    storyId: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    messageType: {
      type: String,
      enum: ["text", "system", "notification"],
      default: "text",
    },
    readBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        readAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

storyMessageSchema.statics.getRecentMessage = async function (
  storyId,
  limit = 50
) {
  return this.find({ storyId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("userId", "username email")
    .lean();
};

const StoryMessages = mongoose.model("StoryMessages", storyMessageSchema);
module.exports = StoryMessages;
