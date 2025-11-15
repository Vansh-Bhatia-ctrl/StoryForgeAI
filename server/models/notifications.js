const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    storyId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "change_proposed",
        "change_approved",
        "change_rejected",
        "member_joined",
        "member_left",
        "story_updated",
        "message_received",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    message: {
      type: String,
      required: true,
      maxlength: 500,
    },
    relatedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    relatedEntity: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    actionUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

notificationSchema.statics.getUnread = async function (userId) {
  return this.find({ userId, isRead: false })
    .sort({ createdAt: -1 })
    .populate("relatedUser", "username")
    .lean();
};

notificationSchema.statics.markAsRead = async function (notificationIds) {
  return this.updateMany({ _id: { $in: notificationIds } }, { isRead: true });
};

const Notifications = mongoose.model("Notifications", notificationSchema);
module.exports = Notifications;
