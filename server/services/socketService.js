const Character = require("../models/character");
const CustomAiCharacter = require("../models/customAiCharacterChat");
const ollamaService = require("./ollamaService");

let io = null;
const clients = new Map();

const initializeSocket = (socketIo) => {
  io = socketIo;
  io.on("connection", (socket) => {
    const clientId = socket.id;

    console.log(`✅ Socket.IO client connected: ${clientId}`);

    clients.set(clientId, {
      socket: socket,
      connectedAt: new Date(),
      isStreaming: false,
    });

    socket.emit("connection", {
      message: "Connected to StoryForge AI Socket Server",
      clientId: clientId,
      timestamp: new Date().toISOString(),
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

    socket.on("ping", () => {
      socket.emit("pong", { timestamp: Date.now() });
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
  const { characterId, userMessage, sessionId, includeHistory = true } = data;

  console.log(`🎭 AI Character chat request from ${clientId}`);

  const token =
    socket.handshake.auth.token ||
    socket.handshake.headers.authorization?.split(" ")[1];

  if (!token) {
    socket.emit("character_chat_error", {
      message: "Authentication required",
      code: "NO_TOKEN",
    });
    return;
  }

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
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
          conversationContext += `${character.name}: ${msg.content}\n`;
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
