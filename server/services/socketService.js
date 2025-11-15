const dotenv = require("dotenv");
const Character = require("../models/character");
const CustomAiCharacter = require("../models/customAiCharacterChat");
const User = require("../models/users");
const ollamaService = require("./ollamaService");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const StoryCards = require("../models/storyCard");
const StoryMessages = require("../models/storyMessages");
const PendingChanges = require("../models/pendingChanges");
const Notifications = require("../models/notifications");

let io = null;
const clients = new Map();
const storyRooms = new Map();

const initializeSocket = (socketIo) => {
  io = socketIo;

  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.auth.token ||
        socket.handshake.headers.authorization?.split(" ")[1];

      if (!token) {
        return next(new Error("Authentication required."));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = new mongoose.Types.ObjectId(decoded.userId);

      const user = await User.findById(socket.userId).select("username email");

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = user;
      next();
    } catch (error) {
      console.error("Socket authentication error:", error.message);
      next(new Error("Invalid authentication"));
    }
  });

  io.on("connection", (socket) => {
    const clientId = socket.id;

    console.log(`✅ Socket.IO client connected: ${clientId}`);

    clients.set(clientId, {
      socket: socket,
      userId: socket.userId,
      user: socket.user,
      connectedAt: new Date(),
      currentStory: null,
      role: null,
      isStreaming: false,
    });

    socket.emit("connection", {
      message: "Connected to StoryForge AI",
      clientId: clientId,
      user: {
        userId: socket.userId,
        username: socket.user.username,
      },
      timestamp: new Date().toISOString(),
    });

    socket.on("join_story", async (data) => {
      await handleJoinStory(clientId, data, socket);
    });

    socket.on("leave_story", async (data) => {
      await handleLeaveStory(clientId, data, socket);
    });

    socket.on("send_message", async (data) => {
      await handleSendMessage(clientId, data, socket);
    });

    socket.on("propose_change", async (data) => {
      await handleProposeChange(clientId, data, socket);
    });

    socket.on("review_change", async (data) => {
      await handleReviewChange(clientId, data, socket);
    });

    socket.on("mark_notifications_read", async (data) => {
      await handleMarkNotificationsRead(clientId, data, socket);
    });

    socket.on("typing", (data) => {
      handleTyping(clientId, data, socket);
    });

    socket.on("ping", () => {
      socket.emit("pong", { timestamp: Date.now() });
    });

    socket.on("stream_completion", async (data) => {
      await handleStreamCompletion(clientId, data, socket);
    });

    socket.on("stream_story", async (data) => {
      await handleStreamStory(clientId, data, socket);
    });

    socket.on("stream_dialogue", async (data) => {
      await handleStreamDialogue(clientId, data, socket);
    });

    socket.on("character_chat", async (data) => {
      await handleAICharacterChat(clientId, data, socket);
    });

    socket.on("disconnect", (reason) => {
      console.log(`👋 Client disconnected: ${clientId} (${reason})`);
      clients.delete(clientId);
    });

    socket.on("error", (error) => {
      console.error(`❌ Socket error for ${clientId}:`, error);
    });
  });

  console.log("✅ Socket.IO service initialized");
};

const handleJoinStory = async (clientId, data, socket) => {
  const { storyId } = data;

  const client = clients.get(clientId);
  if (!client) {
    socket.emit("error", { message: "Client not found." });
    return;
  }

  try {
    const story = await StoryCards.findOne({ storyId })
      .populate("members.userId", "username email")
      .populate("user", "username email");

    if (!story) {
      socket.emit("join_story_error", {
        message: "Story not found",
        code: "STORY_NOT_FOUND",
      });
      return;
    }

    const userRole = story.getUserRole(client.userId);

    if (!userRole || !story.isOwner(client.userId)) {
      socket.emit("join_story_error", {
        message: "You don't have access to this story",
        code: "ACCESS_DENIED",
      });
      return;
    }

    const finalRole = story.isOwner(client.userId) ? "owner" : userRole;

    socket.join(`story_${storyId}`);

    client.currentStory = storyId;
    client.role = finalRole;

    if (!storyRooms.has(storyId)) {
      storyRooms.set(storyId, new Set());
    }

    storyRooms.get(storyId).add(clientId);

    await StoryCards.findOneAndUpdate(
      { storyId },
      {
        $addToSet: {
          activeUsers: {
            userId: client.userId,
            socketId: clientId,
            lastSeen: new Date(),
          },
        },
      }
    );

    const activeUsers = await getActiveUsersInStory(storyId);

    const recentMessages = await StoryMessages.getRecentMessage(storyId, 50);

    let pendingChanges = [];
    if (finalRole === "owner") {
      pendingChanges = await PendingChanges.find({
        storyId,
        status: "pending",
      })
        .populate("proposedBy", "username email")
        .sort({ createdAt: -1 })
        .lean();
    }

    socket.emit("story_joined", {
      storyId,
      role: finalRole,
      story: {
        title: story.title,
        description: story.description,
        owner: story.user,
      },
      activeUsers,
      recentMessages,
      pendingChanges,
      timestamp: new Date().toISOString(),
    });

    socket.to(`story_${storyId}`).emit("user_joined", {
      user: {
        id: client.userId,
        username: client.user.username,
      },
      role: finalRole,
      timestamp: new Date().toISOString(),
    });

    console.log(
      `✅ ${client.user.username} joined story ${storyId} as ${finalRole}`
    );
  } catch (error) {
    console.error("Error joining story:", error);
    socket.emit("join_story_error", {
      message: "Failed to join story",
      error: error.message,
    });
  }
};

const handleLeaveStory = async (clientId, data, socket) => {
  const { storyId } = data;
  const client = clients.get(clientId);

  if (!client || client.currentStory !== storyId) {
    return;
  }

  try {
    socket.leave(`story_${storyId}`);

    if (storyRooms.has(storyId)) {
      storyRooms.get(storyId).delete(clientId);
      if (storyRooms.get(storyId).size === 0) {
        storyRooms.delete(storyId);
      }
    }

    await StoryCards.findByIdAndUpdate(
      { storyId },
      {
        $pull: {
          activeUsers: { socketId: clientId },
        },
      }
    );

    socket.to(`story_${storyId}`).emit("user_left", {
      user: {
        id: client.userId,
        username: client.user.username,
      },
      timestamp: new Date().toISOString(),
    });

    client.currentStory = null;
    client.role = null;

    socket.emit("story_left", {
      storyId,
      timestamp: new Date().toISOString(),
    });

    console.log(`👋 ${client.user.username} left story ${storyId}`);
  } catch (error) {
    console.error("Error leaving story:", error);
  }
};

const handleSendMessage = async (clientId, data, socket) => {
  const { storyId, message } = data;
  const client = clients.get(clientId);

  if (!client || client.currentStory !== storyId) {
    socket.emit("message_error", {
      message: "You must be in the story to send messages.",
      code: "NOT_AUTHORIZED",
    });
    return;
  }

  if (!message || message.trim().length === 0) {
    socket.emit("message_error", { message: "Message cannot be empty" });
    return;
  }

  try {
    const newMessage = await StoryMessages.create({
      storyId,
      userId: client.userId,
      message: message.trim(),
      messageType: "text",
    });

    const populatedMessage = await StoryMessages.findById(newMessage._id)
      .populate("userId", "username email")
      .lean();

    io.to(`story_${storyId}`).emit("new_message", {
      message: populatedMessage,
      timestamp: new Date().toISOString(),
    });

    const activeUsers = await getActiveUsersInStory(storyId);
    const otherUsers = activeUsers.filter(
      (a) => a.id.toString() !== client.userId.toString()
    );

    for (const user of otherUsers) {
      await Notifications.create({
        userId: user.id,
        storyId,
        type: "message_received",
        title: "New Message",
        message: `${client.user.username}: ${message.substring(0, 50)}${
          message.length > 50 ? "..." : ""
        }`,
        relatedUser: client.userId,
        actionUrl: `/story/${storyId}`,
      });
    }

    console.log(
      `💬 Message sent in story ${storyId} by ${client.user.username}`
    );
  } catch (error) {
    console.error("Error sending message:", error);
    socket.emit("message_error", {
      message: "Failed to send message",
      error: error.message,
    });
  }
};

const handleProposeChange = async (clientId, data, socket) => {
  const { storyId, changeType, entityType, entityId, proposedData } = data;
  const client = clients.get(clientId);

  if (!client || client.currentStory !== storyId) {
    socket.emit("propose_change_error", {
      message: "You must be in the story to propose changes.",
      code: "NOT_AUTHORIZED",
    });
    return;
  }

  if (client.role === "owner") {
    socket.emit("propose_change_error", {
      message: "Owners can make changes directly without approval",
      code: "OWNER_NO_APPROVAL_NEEDED",
    });
    return;
  }

  if (client.role === "viewer") {
    socket.emit("propose_change_error", {
      message: "Viewers cannot propose changes",
      code: "VIEWER_CANNOT_EDIT",
    });
    return;
  }

  try {
    const pendingChanges = await PendingChanges.create({
      storyId,
      changeType,
      entityType,
      entityId,
      proposedBy: client.userId,
      proposedData,
      status: "pending",
    });

    const populatedChanges = await PendingChanges.findById(pendingChanges._id)
      .populate("proposedBy", "username email")
      .lean();

    const story = await StoryCards.findOne({ storyId });
    await Notifications.create({
      userId: story.user,
      storyId,
      type: "change_proposed",
      title: "Change Proposed",
      message: `${client.user.username} proposed a ${entityType} ${changeType}`,
      relatedUser: client.userId,
      relatedEntity: pendingChange._id.toString(),
      actionUrl: `/story/${storyId}/pending`,
    });

    socket.to(`story_${storyId}`).emit("change_proposed", {
      change: populatedChanges,
      timestamp: new Date().toISOString(),
    });

    socket.emit("change_proposed_success", {
      change: populatedChanges,
      message: "Your change has been submitted for approval",
      timestamp: new Date().toISOString(),
    });

    console.log(
      `✍️ Change proposed by ${client.user.username} in story ${storyId}`
    );
  } catch (error) {
    console.error("Error proposing change:", error);
    socket.emit("propose_change_error", {
      message: "Failed to propose change",
      error: error.message,
    });
  }
};

const handleReviewChange = async (clientId, data, socket) => {
  const { storyId, changeId, action, comment } = data;
  const client = clients.get(clientId);

  if (!client || client.currentStory !== storyId) {
    socket.emit("review_change_error", {
      message: "Only owners can review changes.",
      code: "OWNERS_ONLY",
    });
    return;
  }

  try {
    const pendingChanges = await PendingChanges.findById(changeId).populate(
      "proposedBy",
      "username email"
    );

    if (!pendingChanges || pendingChanges.storyId !== "pending") {
      socket.emit("review_change_error", {
        message: "Change not found",
        code: "CHANGE_NOT_FOUND",
      });
      return;
    }

    if (pendingChanges.status !== "pending") {
      socket.emit("review_change_error", {
        message: "Change has already been reviewed",
        code: "ALREADY_REVIEWED",
      });
      return;
    }

    pendingChanges.status = action === "approve" ? "approved" : "rejected";
    pendingChanges.reviewedBy = client.userId;
    pendingChanges.reviewedAt = new Date();
    pendingChanges.comment = comment || "";
    await pendingChanges.save();

    let appliedChanges = null;

    if (action === "approve") {
      // 🎯 TODO: Call your existing node/character creation/update functions
      // Example: await createNode(pendingChange.proposedData);
      appliedChanges = { id: "temp_id", ...pendingChange.proposedData };
      console.log("✅ Change approved - integrate with your existing logic");
    }

    await Notifications.create({
      userId: pendingChanges.proposedBy._id,
      storyId,
      type: action === "approve" ? "change_approved" : "change_rejected",
      title: action === "approve" ? "Change Approved! 🎉" : "Change Rejected",
      message:
        action === "approve"
          ? `Your ${pendingChanges.entityType}  ${pendingChanges.changeType} was approved.`
          : `Your ${pendingChanges.entityType}  ${
              pendingChanges.changeType
            } was rejected ${comment ? `: ${comment}` : ""}.`,
      relatedUser: client.userId,
      relatedEntity: changeId,
      actionUrl: `/story/${storyId}`,
    });

    io.to(`story_${storyId}`).emit("change_reviewed", {
      changeId,
      action,
      reviewedBy: {
        id: client.userId,
        username: client.user.username,
      },
      appliedChange,
      comment,
      timestamp: new Date().toISOString(),
    });

    socket.emit("review_change_success", {
      message: `Change ${action}ed successfully`,
      changeId,
      timestamp: new Date().toISOString(),
    });

    console.log(
      `✅ Change ${action}ed by ${client.user.username} in story ${storyId}`
    );
  } catch (error) {
    console.error("Error reviewing change:", error);
    socket.emit("review_change_error", {
      message: "Failed to review change",
      error: error.message,
    });
  }
};

const handleMarkNotificationsRead = async (clientId, data, socket) => {
  const { notificationIds } = data;
  const client = clients.get(clientId);

  if (!client) return;

  try {
    await Notifications.markAsRead(notificationIds);

    socket.emit("notifications_marked_read", {
      count: notificationIds.length,
      timestamp: new Date().toISOString(),
    });

    console.log(
      `🔔 ${notificationIds.length} notifications marked as read for ${client.user.username}`
    );
  } catch (error) {
    console.error("Error marking notifications as read:", error);
  }
};

const handleTyping = async (clientId, data, socket) => {
  const { storyId, isTyping } = data;
  const client = clients.get(clientId);

  if (!client) return;

  socket.tp(`story_${storyId}`).emit("user_typing", {
    user: {
      id: client.userId,
      username: client.user.username,
    },
    isTyping,
    timestamp: new Date().toISOString(),
  });
};

const handleDisconnect = async (clientId, reason) => {
  const client = clients.get(clientId);

  if (!client) return;

  console.log(
    `👋 Client disconnected: ${clientId} (User: ${client.user.username}, Reason: ${reason})`
  );

  if (client.currentStory) {
    const storyId = client.currentStory;

    try {
      await StoryCards.findByIdAndUpdate(
        { storyId },
        {
          $pull: {
            activeUsers: {
              socketId: clientId,
            },
          },
        }
      );

      io.to(`story_${storyId}`).emit("user_left", {
        user: {
          id: client.userId,
          username: client.user.username,
        },
        timestamp: new Date().toISOString(),
      });

      if (storyRooms.has(storyId)) {
        storyRooms.get(storyId).delete(clientId);
        if (storyRooms.get(storyId).size === 0) {
          storyRooms.delete(storyId);
        }
      }
    } catch (error) {
      console.error("Error cleaning up on disconnect:", error);
    }
  }

  clients.delete(clientId);
};

const getActiveUsersInStory = async (storyId) => {
  const story = await StoryCards.findOne({ storyId })
    .select("activeUsers")
    .populate("activeUsers.userId", "username email");

  if (!story) return [];

  return story.activeUsers.map((au) => ({
    id: au.userId._id,
    username: au.userId.username,
    email: au.userId.email,
    lastSeen: au.lastSeen,
  }));
};

const handleStreamCompletion = async (clientId, data, socket) => {
  const { prompt, maxTokens, temperature } = data;

  console.log(`📨 Stream completion request from ${clientId}`);

  if (!prompt || typeof prompt !== "string") {
    socket.emit("stream_error", {
      message: "Prompt must be a string",
      code: "INVALID_PROMPT",
    });
    return;
  }

  if (prompt.length < 10) {
    socket.emit("stream_error", {
      message: "Prompt must be at least 10 characters long.",
      code: "INVALID_PROMPT_LENGTH",
    });
    return;
  }

  const client = clients.get(clientId);

  if (client) {
    client.isStreaming = true;
  }

  socket.emit("stream_start", {
    message: "Starting AI generation...",
    timestamp: new Date().toISOString(),
  });

  try {
    let totalChunks = 0;

    await ollamaService.streamCompletion(
      prompt,
      (chunk) => {
        totalChunks++;
        socket.emit("stream_chunk", {
          data: chunk,
          chunkNumber: totalChunks,
        });
      },
      {
        maxTokens: maxTokens || 150,
        temperature: temperature || 0.7,
      }
    );

    socket.emit("stream_complete", {
      message: "Generation complete",
      totalChunks: totalChunks,
      timestamp: new Date().toISOString(),
    });

    console.log(`✅ Stream completed for ${clientId} (${totalChunks} chunks)`);
  } catch (error) {
    console.error(`❌ Streaming error for ${clientId}:`, error.message);
    socket.emit("stream_error", {
      message: "Failed to generate completion",
      error: error.message,
      code: "STREAMING_ERROR",
    });
  } finally {
    if (client) {
      client.isStreaming = false;
    }
  }
};

const handleStreamStory = async (clientId, data, socket) => {
  const { character, currentText, genre, tone, maxTokens } = data;

  console.log(`📨 Stream story request from ${clientId}`);

  if (!currentText) {
    socket.emit("stream_error", {
      message: "Current text is required.",
      code: "MISSING_CURRENTTEXT",
    });
    return;
  }

  const client = clients.get(clientId);
  if (client) {
    client.isStreaming = true;
  }

  socket.emit("stream_start", {
    message: "Generating story continuation...",
    timestamp: new Date().toISOString(),
  });

  try {
    const systemPrompt = `You are a creative writing assistant specializing in ${
      genre || "fantasy"
    } stories with a ${
      tone || "neutral"
    } tone. Continue the following story naturally and engagingly. Keep the continuation concise (2-3 sentences).

Character: ${character || "Character"}
Current Text: ${currentText}

Continue the story:`;

    let totalChunks = 0;

    await ollamaService.streamCompletion(
      systemPrompt,
      (chunk) => {
        totalChunks++;
        socket.emit("stream_chunk", {
          data: chunk,
          chunkNumber: totalChunks,
        });
      },
      {
        maxTokens: maxTokens || 100,
        temperature: 0.8,
      }
    );

    socket.emit("stream_complete", {
      message: "Story continuation complete",
      totalChunks: totalChunks,
      timestamp: new Date().toISOString(),
    });

    console.log(`✅ Story stream completed for ${clientId}`);
  } catch (error) {
    console.error(`❌ Story streaming error for ${clientId}:`, error.message);
    socket.emit("stream_error", {
      message: "Failed to generate story",
      error: error.message,
      code: "STORY_STREAMING_ERROR",
    });
  } finally {
    if (client) {
      client.isStreaming = false;
    }
  }
};

const handleStreamDialogue = async (clientId, data, socket) => {
  const { character, situation, personality } = data;

  console.log(`📨 Stream dialogue request from ${clientId}`);

  if (!character || !situation) {
    socket.emit("stream_error", {
      message: "Character and situation are required",
      code: "MISSING_REQUIRED_FIELDS",
    });
    return;
  }

  const client = clients.get(clientId);
  if (client) {
    client.isStreaming = true;
  }

  socket.emit("stream_start", {
    message: "Generating dialogue...",
    timestamp: new Date().toISOString(),
  });

  try {
    const prompt = `Generate dialogue for ${character} (personality: ${
      personality || "neutral"
    }) in this situation: ${situation}

Write natural, engaging dialogue that fits the character's personality.`;

    let totalChunks = 0;

    await ollamaService.streamCompletion(
      prompt,
      (chunk) => {
        totalChunks++;
        socket.emit("stream_chunk", {
          data: chunk,
          chunkNumber: totalChunks,
        });
      },
      {
        maxTokens: 150,
        temperature: 0.9,
      }
    );

    socket.emit("stream_complete", {
      message: "Dialogue generation complete",
      totalChunks: totalChunks,
      timestamp: new Date().toISOString(),
    });

    console.log(`✅ Dialogue stream completed for ${clientId}`);
  } catch (error) {
    console.error(
      `❌ Dialogue streaming error for ${clientId}:`,
      error.message
    );
    socket.emit("stream_error", {
      message: "Failed to generate dialogue",
      error: error.message,
      code: "DIALOGUE_STREAMING_ERROR",
    });
  } finally {
    if (client) {
      client.isStreaming = false;
    }
  }
};

const handleAICharacterChat = async (clientId, data, socket) => {
  const {
    characterId,
    userMessage,
    sessionId,
    includeHistory = true,
    token,
  } = data;

  console.log(`🎭 AI Character chat request from ${clientId}`);

  console.log("📦 Received data:", {
    hasToken: !!token,
    hasCharacterId: !!characterId,
    hasMessage: !!userMessage,
    tokenPreview: token ? `${token.substring(0, 20)}...` : "NONE",
  });

  const authToken =
    token ||
    socket.handshake.auth.token ||
    socket.handshake.headers.authorization?.split(" ")[1];

  if (!authToken) {
    socket.emit("character_chat_error", {
      message: "Authentication required",
      code: "NO_TOKEN",
    });
    return;
  }

  let userId;
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    userId = decoded.userId;
    userId = new mongoose.Types.ObjectId(userId);

    console.log("✅ Token verified! UserId:", userId);
  } catch (error) {
    socket.emit("character_chat_error", {
      message: "Invalid authentication token",
      code: "INVALID_TOKEN",
    });
    return;
  }

  if (!characterId || !userMessage) {
    socket.emit("character_chat_error", {
      message: "characterId and userMessage are required",
      code: "MISSING_REQUIRED_FIELDS",
    });
    return;
  }

  if (userMessage.trim().length === 0) {
    socket.emit("character_chat_error", {
      message: "Message cannot be empty",
      code: "EMPTY_MESSAGE",
    });
    return;
  }

  const client = clients.get(clientId);
  if (client) {
    client.isStreaming = true;
  }

  socket.emit("character_chat_start", {
    message: "Character is thinking...",
    timestamp: new Date().toISOString(),
  });

  try {
    const character = await Character.findOne({ characterId: characterId });

    if (!character) {
      socket.emit("character_chat_error", {
        message: "Character not found",
        code: "CHARACTER_NOT_FOUND",
      });
      return;
    }

    const finalSessionId =
      sessionId || `${userId}_${characterId}_${Date.now()}`;

    const chatSession = await CustomAiCharacter.findOrCreateSession(
      userId,
      characterId,
      finalSessionId
    );

    await chatSession.addMessage("user", userMessage);

    const recentMessages = chatSession.getRecent(6);
    let conversationContext = "";
    if (includeHistory && recentMessages.length > 0) {
      conversationContext = "\n\nRECENT CONVERSATION:\n";
      recentMessages.forEach((msg) => {
        if (msg.role === "user") {
          conversationContext += `User: ${msg.content}\n`;
        } else {
          conversationContext += `${character.characterName}: ${msg.content}\n`;
        }
      });
    }

    const ollamaContext = {
      characterName: character.characterName,
      backstory:
        character.backstory || "A mysterious character with an unknown past.",
      personality: character.personality || "neutral",
      traits: character.traits || [],
      scenarioContext: conversationContext,
      currentDialogue: `User just said: "${userMessage}"`,
      maxTokens: 150,
    };

    let fullResponse = "";
    let totalChunks = 0;

    await ollamaService.streamCharacterResponse(ollamaContext, (chunk) => {
      totalChunks++;
      fullResponse += chunk;
      socket.emit("character_chat_chunk", {
        data: chunk,
        chunkNumber: totalChunks,
      });
    });

    await chatSession.addMessage("character", fullResponse);

    socket.emit("character_chat_complete", {
      message: "Character response complete",
      totalChunks: totalChunks,
      fullResponse: fullResponse,
      sessionId: finalSessionId,
      timestamp: new Date().toISOString(),
    });

    console.log(
      `✅ Character chat completed for ${clientId} (${totalChunks} chunks)`
    );
  } catch (error) {
    console.error(`❌ Character chat error for ${clientId}:`, error.message);
    socket.emit("character_chat_error", {
      message: "Failed to generate character response",
      error: error.message,
      code: "CHARACTER_CHAT_ERROR",
    });
  } finally {
    if (client) {
      client.isStreaming = false;
    }
  }
};

const broadcast = (event, data) => {
  if (io) {
    io.emit(event, data);
    console.log(`📢 Broadcasting '${event}' to all clients`);
  }
};

function getClientCount() {
  return clients.size;
}

function getConnectedClients() {
  return Array.from(clients.keys());
}

const isClientStreaming = (clientId) => {
  const client = clients.get(clientId);
  return client ? client.isStreaming : false;
};

module.exports = {
  initializeSocket,
  broadcast,
  getClientCount,
  getConnectedClients,
  isClientStreaming,
};
