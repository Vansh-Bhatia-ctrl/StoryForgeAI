"use client";
import useAutoComplete from "@/app/store/useAutoComplete";
import useStoryEditor from "@/app/store/useStoryEditor";
import {
  Calendar,
  Eye,
  Loader2,
  MessageSquare,
  PencilIcon,
  Save,
  Sparkles,
  Tag,
  Wand2,
  Check,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const page = () => {
  const { storyId, nodeID } = useParams();
  const [userInput, setUserInput] = useState({
    nodeTitle: "",
    nodeType: "Story",
    tags: "",
    emotionalTone: "Mysterious",
    storyContent: "",
    choices: [],
    positions: { x: 0, y: 0 },
  });

  const textareaRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const [isExistingNode, setIsExistingNode] = useState(false);

  const {
    postDataToDb,
    error,
    loading,
    storySaved,
    operationStatus,
    fetchFromDb,
    nodeData,
    updateNodeData,
  } = useStoryEditor();
  const {
    initializeSocket,
    debouncedAutoComplete,
    acceptSuggestion,
    rejectSuggestion,
    currentSuggestion,
    isGenerating,
    error: autoCompleteError,
    cleanup,
  } = useAutoComplete();
  useEffect(() => {
    const fetchedData = async () => {
      if (nodeID) {
        console.log("🔍 Fetching node data for:", nodeID);
        const result = await fetchFromDb(storyId, nodeID);
        console.log("📥 Fetch result:", result);

        setDataFetched(true);

        if (!result.success && result.message?.includes("not found")) {
          console.log("ℹ️ No existing data - starting with empty form");
          setIsExistingNode(false);
          setIsLoading(false);
        } else if (result.success) {
          console.log("✅ Found existing node data");
          setIsExistingNode(true);
        }
      }
    };

    fetchedData();
  }, [nodeID, fetchFromDb, storyId]);

  useEffect(() => {
    if (
      nodeData &&
      typeof nodeData === "object" &&
      Object.keys(nodeData).length > 0
    ) {
      console.log("📝 Populating form with node data:", nodeData);
      setUserInput({
        nodeTitle: nodeData.nodeTitle || "",
        nodeType: nodeData.nodeType || "Story",
        tags: Array.isArray(nodeData.tags)
          ? nodeData.tags.join(", ")
          : nodeData.tags || "",
        emotionalTone: nodeData.emotionalTone || "Mysterious",
        storyContent: nodeData.storyContent || "",
        choices: Array.isArray(nodeData.choices)
          ? nodeData.choices.map((choice, index) => ({
              id: choice.id || Date.now() + index,
              text: choice.text || "",
              color: choice.color || "green",
              consequence: choice.consequence || "",
              targetNodeId: choice.targetNodeId || "",
            }))
          : [],
        positions: nodeData.position || { x: 0, y: 0 },
      });

      setIsLoading(false);
    } else if (dataFetched && !nodeData) {
      console.log("ℹ️ Fetch completed - no data found, showing empty form");
      setIsLoading(false);
    }
  }, [nodeData, dataFetched]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log("🔌 Initializing Socket.IO for auto-completion");
    initializeSocket();

    return () => {
      console.log("🧹 Cleaning up socket connection");
      cleanup();
    };
  }, [initializeSocket, cleanup]);

  const handleStoryContentChange = (e) => {
    const newContent = e.target.value;

    setUserInput((prev) => ({
      ...prev,
      storyContent: newContent,
    }));

    debouncedAutoComplete(newContent, {
      nodeType: userInput.nodeType,
      emotionalTone: userInput.emotionalTone,
      tags: userInput.tags,
    });
  };

  const handleAcceptSuggestion = () => {
    const acceptedText = acceptSuggestion();

    setUserInput((prev) => ({
      ...prev,
      storyContent:
        prev.storyContent +
        (prev.storyContent.endsWith(" ") || prev.storyContent.endsWith("\n")
          ? ""
          : " ") +
        acceptedText,
    }));

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddChoice = () => {
    const newChoice = {
      id: Date.now(),
      text: "",
      color: "green",
      consequence: "",
      targetNodeId: "",
    };

    setUserInput((prev) => ({
      ...prev,
      choices: [...prev.choices, newChoice],
    }));
  };

  const handleChoiceChange = (choiceId, field, value) => {
    setUserInput((prev) => ({
      ...prev,
      choices: prev.choices.map((choice) =>
        choice.id === choiceId ? { ...choice, [field]: value } : choice
      ),
    }));
  };

  const handleRemoveChoice = (choiceId) => {
    setUserInput((prev) => ({
      ...prev,
      choices: prev.choices.filter((choice) => choice.id !== choiceId),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("📤 Submitting data:", {
      nodeID,
      storyId,
      isExistingNode,
      ...userInput,
    });

    let result;

    if (isExistingNode && nodeData) {
      console.log("🔄 Updating existing node...");
      const updatedData = {
        nodeTitle: userInput.nodeTitle,
        nodeType: userInput.nodeType,
        emotionalTone: userInput.emotionalTone,
        tags: userInput.tags,
        storyContent: userInput.storyContent,
        choices: userInput.choices.map(({ id, ...choice }) => choice),
        position: userInput.positions,
      };

      result = await updateNodeData(nodeID, storyId, updatedData);
    } else {
      console.log("➕ Creating new node...");
      result = await postDataToDb(
        nodeID,
        storyId,
        userInput.nodeTitle,
        userInput.nodeType,
        userInput.emotionalTone,
        userInput.tags,
        userInput.storyContent,
        userInput.choices.map(({ id, ...choice }) => choice),
        userInput.positions
      );

      if (result.success) {
        setIsExistingNode(true);
      }
    }

    console.log("📥 Result:", result);

    if (result.success) {
      console.log("✅ Save successful!");
      alert("Data saved successfully.");
    } else {
      console.error("❌ Save failed:", result.message);
      alert("Failed to save data.");
    }
  };

  if (isLoading || loading) {
    return (
      <div className="pt-20 min-h-screen w-screen flex bg-custom-gray-100 items-center justify-center flex-col gap-4">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
        <p className="text-white">
          {loading ? "Fetching node data..." : "Loading editor..."}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 min-h-screen w-screen flex bg-custom-gray-100 items-center justify-center flex-col gap-4">
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 max-w-md">
          <p className="text-red-400 font-semibold text-lg">
            Error Loading Node
          </p>
          <p className="text-red-300 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="bg-custom-gray-500 w-full p-3 pt-24 overflow-x-auto">
          <div className="lg:max-w-7xl lg:mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <PencilIcon className="w-4 h-4 text-purple-500 lg:w-6 lg:h-6" />
                </div>
                <div>
                  <p className="text-white font-semibold lg:text-lg">
                    Story Editor
                  </p>
                  <p className="text-slate-400 text-sm lg:text-sm">
                    ID: {nodeID}
                  </p>
                </div>
              </div>

              <div>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all flex items-center gap-2">
                  <Sparkles className="text-white" />
                  <p className="text-white font-semibold">AI Assist</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:max-w-7xl lg:mx-auto">
          <div className="p-5">
            <div>
              <button
                className="px-4 py-2 rounded-lg transition-all flex items-center gap-2  
                   bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5">
              <div className="bg-custom-gray-700 p-4 rounded border border-slate-800">
                <div className="flex items-center gap-3">
                  <div>
                    <Tag className="w-4 h-4 text-purple-500 lg:w-6 lg:h-6" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">
                      Node Configuration
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="mb-2">
                        <label className="text-slate-400 text-sm">
                          Node Title
                        </label>
                      </div>
                      <div>
                        <input
                          name="nodeTitle"
                          value={userInput.nodeTitle}
                          onChange={handleUserInput}
                          className="w-full bg-custom-gray-800 border border-slate-700 rounded focus:outline-none focus:border-purple-500 transition-colors px-4 py-2 placeholder:text-slate-600 text-white"
                          placeholder="Enter Title..."
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2">
                        <label className="text-slate-400 text-sm">
                          Node Type
                        </label>
                      </div>
                      <select
                        name="nodeType"
                        value={userInput.nodeType}
                        onChange={handleUserInput}
                        className="bg-custom-gray-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors text-white w-full"
                      >
                        <option value="Story">Story</option>
                        <option value="Choice">Choice</option>
                        <option value="Ending">Ending</option>
                        <option value="Character">Character</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <div className="mb-2">
                        <label className="text-slate-400 text-sm">Tags</label>
                      </div>
                      <div>
                        <input
                          name="tags"
                          value={userInput.tags}
                          onChange={handleUserInput}
                          className="w-full bg-custom-gray-800 border border-slate-700 rounded focus:outline-none focus:border-purple-500 transition-colors px-4 py-2 placeholder:text-slate-600 text-white"
                          placeholder="Enter Tags..."
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2">
                        <label className="text-slate-400 text-sm">
                          Emotional Tone
                        </label>
                      </div>
                      <select
                        name="emotionalTone"
                        value={userInput.emotionalTone}
                        onChange={handleUserInput}
                        className="bg-custom-gray-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors text-white w-full"
                      >
                        <option value="Mysterious">Mysterious</option>
                        <option value="Tense">Tense</option>
                        <option value="Hopeful">Hopeful</option>
                        <option value="Dark">Dark</option>
                        <option value="Peaceful">Peaceful</option>
                        <option value="Action">Action</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ Updated Story Content Section */}
              <div className="mt-5">
                <div className="bg-custom-gray-700 p-4 rounded border border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-4 h-4 text-purple-500 lg:w-6 lg:h-6" />
                      <p className="text-white font-semibold text-lg">
                        Story Content
                      </p>
                    </div>

                    {/* ✅ AI Status Indicator */}
                    {isGenerating && (
                      <div className="flex items-center gap-2 text-purple-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">AI is writing...</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 relative">
                    <textarea
                      ref={textareaRef}
                      name="storyContent"
                      value={userInput.storyContent}
                      onChange={handleStoryContentChange}
                      className="bg-custom-gray-800 border border-slate-700 rounded focus:outline-none focus:border-purple-500 transition-colors px-4 py-2 placeholder:text-slate-600 text-white w-full resize-y min-h-[200px]"
                      placeholder="Write your story content here... (AI will suggest continuations as you type)"
                    />

                    {/* ✅ Streaming AI Suggestion Display */}
                    {currentSuggestion && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-purple-400 text-sm">
                            <Wand2 className="w-4 h-4" />
                            <span className="font-semibold">
                              {isGenerating
                                ? "AI is writing..."
                                : "AI Suggestion:"}
                            </span>
                          </div>

                          {!isGenerating && (
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={handleAcceptSuggestion}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 rounded text-white text-sm flex items-center gap-1 transition-colors"
                                title="Accept suggestion"
                              >
                                <Check className="w-4 h-4" />
                                Accept
                              </button>
                              <button
                                type="button"
                                onClick={rejectSuggestion}
                                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm flex items-center gap-1 transition-colors"
                                title="Reject"
                              >
                                <X className="w-4 h-4" />
                                Reject
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                          <p className="text-slate-300 text-sm whitespace-pre-wrap">
                            {currentSuggestion}
                            {isGenerating && (
                              <span className="inline-block w-2 h-4 bg-purple-500 ml-1 animate-pulse" />
                            )}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ✅ Auto-Complete Error Display */}
                    {autoCompleteError && (
                      <div className="mt-2 bg-red-500/10 border border-red-500/30 rounded px-3 py-2">
                        <p className="text-red-400 text-sm">
                          {autoCompleteError}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <div>
                      <Calendar className="text-slate-400 w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[12px] text-slate-400 font-semibold">
                        Last edited: 2 minutes ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rest of your existing code (choices section, etc.) */}
              {userInput.nodeType === "Choice" && (
                <div className="mt-5">
                  <div className="bg-custom-gray-700 p-4 rounded border border-slate-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold text-lg">
                          Player Choices
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={handleAddChoice}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all flex items-center gap-2 text-sm text-white"
                        >
                          + Add Choice
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 space-y-4">
                      {userInput.choices.length === 0 ? (
                        <div className="text-center py-8 text-slate-400">
                          <p>
                            No choices added yet. Click "+ Add Choice" to create
                            one.
                          </p>
                        </div>
                      ) : (
                        userInput.choices.map((choice, index) => (
                          <div
                            key={choice.id}
                            className={`bg-${choice.color}-500/20 border-2 border-${choice.color}-500 text-${choice.color}-300 p-4 rounded relative`}
                          >
                            <div className="absolute -top-3 -left-3 bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                              {index + 1}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveChoice(choice.id)}
                              className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg"
                            >
                              ×
                            </button>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="mb-2">
                                  <label className="text-slate-400 text-sm">
                                    Choice Text
                                  </label>
                                </div>
                                <div>
                                  <input
                                    value={choice.text}
                                    onChange={(e) =>
                                      handleChoiceChange(
                                        choice.id,
                                        "text",
                                        e.target.value
                                      )
                                    }
                                    className="w-full bg-custom-gray-800 border border-slate-700 rounded focus:outline-none focus:border-purple-500 transition-colors px-4 py-2 placeholder:text-slate-600 text-white"
                                    placeholder="Enter Text..."
                                  />
                                </div>
                              </div>

                              <div>
                                <div className="mb-2">
                                  <label className="text-slate-400 text-sm">
                                    Color
                                  </label>
                                </div>
                                <select
                                  value={choice.color}
                                  onChange={(e) =>
                                    handleChoiceChange(
                                      choice.id,
                                      "color",
                                      e.target.value
                                    )
                                  }
                                  className="bg-custom-gray-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors text-white w-full"
                                >
                                  <option value="green">Green</option>
                                  <option value="red">Red</option>
                                  <option value="blue">Blue</option>
                                  <option value="purple">Purple</option>
                                  <option value="yellow">Yellow</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div>
                                <div className="mb-2">
                                  <label className="text-slate-400 text-sm">
                                    Consequences
                                  </label>
                                </div>
                                <div>
                                  <input
                                    value={choice.consequence}
                                    onChange={(e) =>
                                      handleChoiceChange(
                                        choice.id,
                                        "consequence",
                                        e.target.value
                                      )
                                    }
                                    className="w-full bg-custom-gray-800 border border-slate-700 rounded focus:outline-none focus:border-purple-500 transition-colors px-4 py-2 placeholder:text-slate-600 text-white"
                                    placeholder="Brief Description..."
                                  />
                                </div>
                              </div>

                              <div>
                                <div className="mb-2">
                                  <label className="text-slate-400 text-sm">
                                    Target NodeID
                                  </label>
                                </div>
                                <div>
                                  <input
                                    value={choice.targetNodeId}
                                    onChange={(e) =>
                                      handleChoiceChange(
                                        choice.id,
                                        "targetNodeId",
                                        e.target.value
                                      )
                                    }
                                    className="w-full bg-custom-gray-800 border border-slate-700 rounded focus:outline-none focus:border-purple-500 transition-colors px-4 py-2 placeholder:text-slate-600 text-white"
                                    placeholder="Enter NodeID..."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-5 flex items-center justify-end">
                <button
                  disabled={loading}
                  type="submit"
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-white ${
                    loading
                      ? "bg-emerald-700/50 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  <Save className="text-white w-4 h-4" />
                  {loading
                    ? operationStatus === "updating"
                      ? "Updating..."
                      : "Saving..."
                    : isExistingNode
                    ? "Update Story"
                    : "Save Story"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {storySaved && (
        <div className="fixed bottom-4 left-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <Save className="w-5 h-5" />
            <span className="font-semibold">
              {isExistingNode
                ? "Node updated successfully!"
                : "Node created successfully!"}
            </span>
          </div>
        </div>
      )}

      {error && !loading && !storySaved && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-md">
          <div className="flex items-center gap-2">
            <span className="text-xl">❌</span>
            <div>
              <p className="font-semibold">Failed to save node</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
