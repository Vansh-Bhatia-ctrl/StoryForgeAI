import { create } from "zustand";
import { persist } from "zustand/middleware";
import fetchWithAuth from "../utils/fetchWithAuth";
import { getSocket } from "../lib/socket";

const useChatStore = create((set, get) => ({
  characterData: null,
  receivedData: false,
  error: null,
  loading: false,

  messages: [],
  sessionId: null,
  isStreaming: false,
  currentStreamingMessage: "",

  socket: null,
  isSocketConnected: false,

  fetchCharacterFromDB: async (storyId, characterId) => {
    set({
      loading: true,
      error: null,
    });

    if (!storyId || !characterId) {
      throw new Error("Missing storyId or characterId");
    }

    try {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/api/fetch/single-character/${storyId}/${characterId}`,
        {
          method: "GET",
        }
      );

      if (response.ok || response.success || response.data) {
        set({
          characterData: response.data.characterData[0],
          receivedData: true,
          loading: false,
          error: null,
        });
        return response.data.characterData[0];
      } else {
        const errMsg = response.message || "Failed to fetch character";
        set({ receivedData: false, loading: false, error: errMsg });
        throw new Error(errMsg);
      }
    } catch (error) {
      const errorMsg =
        error.message || "Something went wrong, please try again.";
      set({ receivedData: false, loading: false, error: errorMsg });
      console.log(
        `Error fetching character details: ${error} error message:${error.message}`
      );
      throw new Error(errorMsg);
    }
  },

  initializeSocket: () => {
    const { socket: existingSocket } = get();

    if (existingSocket && existingSocket._callbacks) {
      console.log("Socket already initialized");
      return;
    }
    const socket = getSocket();

    if (!socket.connected) {
      socket.connect();
    }

    socket.removeAllListeners();

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      set({ socket, isSocketConnected: true });
    });

    socket.on("disconnect", (reason) => {
      console.log("🔌 Socket disconnected:", reason);
      set({ isSocketConnected: false });
    });

    socket.on("connect_error", (error) => {
      console.log("❌ Socket connection error:", error);
      set({
        error: "Failed to connect to chat server",
        isSocketConnected: false,
      });
    });

    socket.on("character_chat_start", (data) => {
      console.log("🎭 Character is thinking...", data);
      set({
        isStreaming: true,
        currentStreamingMessage: "",
        error: null,
      });
    });

    socket.on("character_chat_chunk", (data) => {
      const { currentStreamingMessage } = get();
      set({ currentStreamingMessage: currentStreamingMessage + data.data });
    });

    socket.on("character_chat_complete", (data) => {
      console.log("✅ Character response complete:", data);

      const { messages } = get();

      const newMessage = [
        ...messages,
        {
          role: "character",
          content: data.fullResponse,
          timestamp: new Date(data.timestamp),
        },
      ];

      set({
        messages: newMessage,
        isStreaming: false,
        currentStreamingMessage: "",
        sessionId: data.sessionId,
      });
    });

    socket.on("character_chat_error", (error) => {
      console.log("❌ Character chat error:", error);
      set({
        error: error.message || "Failed to generate response",
        isStreaming: false,
        currentStreamingMessage: "",
      });
    });

    set({ socket });
  },

  sendMessage: (userMessage) => {
    const { socket, characterData, sessionId, messages } = get();

    if (!socket || !socket.connected) {
      set({ error: "Not connected to chat server" });
      return;
    }

    if (!characterData) {
      set({ error: "Character data not loaded" });
      return;
    }

    if (!userMessage || userMessage.trim().length === 0) {
      set({ error: "User message cannot be empty." });
      return;
    }

    const authStorage = localStorage.getItem("auth-storage");
    const parsed = JSON.parse(authStorage);
    const token = parsed.state.accessToken;

    if (!token) {
      set({ error: "Authentication token missing. Please log in again." });
      return;
    }

    const newMessage = [
      ...messages,
      {
        role: "user",
        content: userMessage,
        timestamp: new Date(),
      },
    ];

    set({ messages: newMessage, error: null });

    socket.emit("character_chat", {
      token: token,
      characterId: characterData.characterId,
      userMessage: userMessage.trim(),
      sessionId: sessionId,
      includeHistory: true,
    });
  },

  disconnectSocket: () => {
    const { socket } = get();

    if (socket) {
      socket.disconnect();
      set({ socket: null, isSocketConnected: false });
    }
  },

  resetChat: () => {
    set({
      messages: [],
      sessionId: null,
      currentStreamingMessage: "",
      isStreaming: false,
      error: null,
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useChatStore;
