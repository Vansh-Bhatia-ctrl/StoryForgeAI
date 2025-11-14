const mongoose = require("mongoose");

const pendingChangeSchema = new mongoose.Schema(
  {
    storyId: {
      type: String,
      required: true,
      index: true,
    },
    changeType: {
      type: String,
      enum: ["create", "update", "delete"],
      required: true,
    },
    entityType: {
      type: String,
      enum: ["character", "node"],
      required: true,
    },
    entityId: {
      type: String,
    },
    proposedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    proposedData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedAt: {
      type: Date,
    },
    reviewComment: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

pendingChangeSchema.index({ storyId: 1, status: 1 });

const PendingChanges = mongoose.model("PendingChanges", pendingChangeSchema);
module.exports = PendingChanges;
