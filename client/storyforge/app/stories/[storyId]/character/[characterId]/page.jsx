"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, Loader2, Send } from "lucide-react";
import useChatStore from "@/app/store/useChatStore";

const page = () => {
  const router = useRouter();
  const { storyId, characterId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [messageInput, setMessageInput] = useState("");
  const messageRef = useRef(null);

  const {
    characterData,
    messages,
    isStreaming,
    currentStreamingMessage,
    error,
    loading,
    isSocketConnected,
    fetchCharacterFromDB,
    initializeSocket,
    sendMessage,
    disconnectSocket,
    clearError,
  } = useChatStore();

  useEffect(() => {
    const initialize = async () => {
      try {
        await fetchCharacterFromDB(storyId, characterId);

        initializeSocket();

        setTimeout(() => setIsLoading(false), 3000);
      } catch (error) {
        console.log("Initialization error:", error);
        setIsLoading(false);
      }
    };

    initialize();

    return () => {
      disconnectSocket();
    };
  }, [storyId, characterId]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentStreamingMessage]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    sendMessage(messageInput);
    setMessageInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timeStamp) => {
    const date = new Date(timeStamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (isLoading || loading) {
    return (
      <div className="pt-20 min-h-screen w-screen flex bg-custom-gray-100 items-center justify-center flex-col gap-4">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
        <p className="text-white text-lg">
          {loading ? "Loading Character..." : "Connecting..."}
        </p>
      </div>
    );
  }

  if (!characterData) {
    return (
      <div className="pt-20 min-h-screen w-screen flex bg-custom-gray-100 items-center justify-center flex-col gap-4">
        <AlertCircle className="w-16 h-16 text-red-500" />
        <p className="text-white text-lg">Failed to load character</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="pt-20">
        {/*Header Section*/}
        <div className="min-w-screen bg-custom-gray-500 h-20 p-4">
          <div className="lg:max-w-7xl lg:mx-auto">
            <div className="flex items-center gap-4">
              <div>
                <button
                  onClick={() => {
                    router.back();
                    setTimeout(() => {
                      window.location.reload();
                    }, 100);
                  }}
                  className="hover:bg-gray-700 p-2 rounded-lg transition-colors"
                >
                  <ArrowLeft color="#fff" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-white font-semibold text-lg">
                    {characterData.characterName}
                  </p>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isSocketConnected ? "bg-green-500" : "bg-red-500"
                    }`}
                    title={isSocketConnected ? "Connected" : "Disconnected"}
                  />
                </div>
                <p className="text-slate-300 text-sm">
                  {characterData.personality?.join(", ") || "Character"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 p-3 m-4 rounded-lg">
            <div className="lg:max-w-7xl lg:mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
              <button
                onClick={clearError}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/*Chat Window Section*/}
        <div className="h-[64vh] overflow-y-auto w-screen mt-5 custom-scrollbar">
          <div className="lg:max-w-7xl lg:mx-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex p-2 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-2xl p-4 max-w-[80%] md:max-w-[70%] lg:max-w-[60%] ${
                    message.role === "user"
                      ? "bg-[#3b82f6] text-white rounded-br-sm"
                      : "bg-[#0f1f3a] text-gray-100 rounded-bl-sm"
                  }`}
                >
                  {message.content}
                  <div
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }text-[13px] ${
                      message.role === "user"
                        ? "text-slate-300"
                        : "text-slate-500"
                    } mt-3`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {isStreaming && (
              <div className="flex justify-start">
                <div className="bg-[#0f1f3a] text-gray-100 rounded-lg rounded-bl-sm p-4 max-w-[80%] md:max-w-[70%] lg:max-w-[60%]">
                  <p className="whitespace-pre-wrap break-words">
                    {currentStreamingMessage}
                    <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse" />
                  </p>
                  <div className="flex items-center gap-2 text-[13px] text-slate-500 mt-3">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Typing...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messageRef} />
          </div>
        </div>

        {/*Message Bar Section*/}
        <div className="bg-custom-gray-700 w-screen h-full p-2 border-t border-slate-800">
          <div className="lg:max-w-7xl lg:mx-auto flex items-center gap-2">
            <input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isStreaming || !isSocketConnected}
              className=" bg-[#0a1628] text-white border border-gray-700 focus:outline-none focus:border-[#3b82f6] placeholder-gray-500 transition-colors flex-1 px-4 py-3 rounded-xl"
              placeholder={
                !isSocketConnected
                  ? "Connecting..."
                  : isStreaming
                  ? "Character is typing..."
                  : `Chat with ${characterData.characterName}...`
              }
            />

            <button
              onClick={handleSendMessage}
              disabled={
                !messageInput.trim() || isStreaming || !isSocketConnected
              }
              className="px-6 py-3 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isStreaming ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Send className="w-5 h-5 text-white" />
              )}
              <span className="hidden sm:inline text-white font-medium">
                Send
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
