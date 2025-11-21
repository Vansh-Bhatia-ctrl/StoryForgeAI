const mongoose = require("mongoose");
const StoryCards = require("../models/storyCard");
const User = require("../models/users");
const Notifications = require("../models/notifications");

const sanitizeInput = (text) => {
  if (typeof text !== "string") return;

  return text.trim().replace(/[<>]/g, "").replace(/\s+/g, " ");
};

const addMembersToStory = async (req, res) => {
  try {
    const { email, role } = req.body;
    const { storyId, inviterId } = req.params;

    if (!storyId || !inviterId) {
      return res.status(400).json({
        success: false,
        message: "No storyId or inviterId found.",
        code: "MISSING_IDS",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(storyId) ||
      !mongoose.Types.ObjectId.isValid(inviterId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format.",
        code: "INVALID_IDS",
      });
    }

    const sanitizedEmail = sanitizeInput(email);
    const sanitizedRole = sanitizeInput(role);

    if (!sanitizedEmail || !sanitizedRole) {
      return res.status(400).json({
        success: false,
        message: "Email and Role are required.",
        code: "MISSING_EMAILANDROLE",
      });
    }

    const story = await StoryCards.findOne({ _id: storyId });

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found.",
        code: "STORY_NOT_FOUND",
      });
    }

    const isCreator = story.user.toString() === inviterId;
    const memberRole = story.getUserRole(inviterId);
    const isMemberOwner = memberRole === "owner";

    if (!isCreator && !isMemberOwner) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to add members to this story.",
        code: "ACCESS_DENIED",
      });
    }

    const userToInvite = await User.findOne({ email: email.toLowerCase() });

    if (!userToInvite) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email.",
        code: "USER_NOT_FOUND",
      });
    }

    const alreadyMember = story.members.some(
      (m) => m.userId.toString() === userToInvite._id.toString()
    );

    if (alreadyMember) {
      return res.status(409).json({
        success: false,
        message: "User is already a member of this story.",
        code: "ALREADY_MEMBER",
      });
    }

    story.members.push({
      userId: userToInvite._id,
      role: role,
      joinedAt: new Date(),
      invitedBy: inviterId,
    });

    await story.save();

    await Notifications.create({
      userId: userToInvite._id,
      storyId: storyId,
      type: "member_joined",
      title: "Story Invitation",
      message: `You've been invited to collaborate on "${story.title}" as ${role}`,
      relatedUser: inviterId,
      actionUrl: `/story/${story.storyId}`,
    });

    return res.status(200).json({
      success: true,
      message: "User invited successfully",
      data: {
        member: {
          userId: userToInvite._id,
          username: userToInvite.username,
          email: userToInvite.email,
          role: role,
          joinedAt: new Date(),
        },
      },
    });
  } catch (error) {
    console.error("Error inviting member:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to invite member",
      error: error.message,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

module.exports = { addMembersToStory };
