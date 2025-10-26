import { create } from "zustand";
import { getSocket } from "../lib/socket";

const useAutoComplete = create((set, get) => ({
  socket: null,
  isConnected: false,
  currentSuggestion: "",
  isGenerating: false,
  error: null,
  typingTimer: null,

  initializeSocket: () => {
    const socket = getSocket();

    if (!socket.connected) {
      socket.connect();
    }

    socket.on("stream_start", (data) => {
      console.log("🎬 Stream started:", data);
      set({
        isGenerating: true,
        currentSuggestion: "",
        error: null,
      });
    });

    socket.on("stream_chunk", (data) => {
      console.log("📦 Received chunk:", data.data);
      set((state) => ({
        currentSuggestion: state.currentSuggestion + data.data,
      }));
    });

    socket.on("stream_complete", (data) => {
      console.log("✅ Stream complete:", data);
      set({
        isGenerating: false,
      });
    });

    socket.on("stream_error", (error) => {
      console.error("❌ Stream Error:", error);
      set({
        isGenerating: false,
        currentSuggestion: "",
        error: error.message || "Failed to generate suggestion",
      });
    });

    socket.on("connection", (data) => {
      console.log("🔗 Connected to backend:", data);
    });

    set({ socket, isConnected: true });
  },

  requestAutoComplete: (storyContent, context = {}) => {
    const { socket, isConnected } = get();

    if (!socket || !isConnected) {
      console.warn("⚠️ Socket not connected");
      return;
    }

    if (storyContent.trim().length < 10) {
      return;
    }

    console.log("📤 Requesting auto-completion via stream_story...");
    set({ isGenerating: true, error: null, currentSuggestion: "" });

    socket.emit("stream_story", {
      character: context.character || "Character",
      currentText: storyContent,
      genre: context.nodeType || "Story",
      tone: context.emotionalTone || "Mysterious",
      maxTokens: 100,
    });
  },

  debouncedAutoComplete: (storyContent, context = {}, delay = 1500) => {
    const { typingTimer, requestAutoComplete } = get();

    if (typingTimer) {
      clearTimeout(typingTimer);
    }

    const newTimer = setTimeout(() => {
      requestAutoComplete(storyContent, context);
    }, delay);

    set({ typingTimer: newTimer });
  },

  acceptSuggestion: () => {
    const { currentSuggestion } = get();
    set({ currentSuggestion: "" });
    return currentSuggestion;
  },

  rejectSuggestion: () => {
    set({ currentSuggestion: "", error: null });
  },

  cleanup: () => {
    const { typingTimer, socket } = get();

    if (typingTimer) {
      clearTimeout(typingTimer);
    }

    if (socket) {
      socket.off("stream_start");
      socket.off("stream_chunk");
      socket.off("stream_complete");
      socket.off("stream_error");
      socket.off("connection");
    }

    set({
      socket: null,
      isConnected: false,
      currentSuggestion: "",
      isGenerating: false,
      error: null,
      typingTimer: null,
    });
  },
}));

export default useAutoComplete;
