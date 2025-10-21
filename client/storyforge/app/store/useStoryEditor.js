import { create } from "zustand";
import fetchWithAuth from "../utils/fetchWithAuth";

const useStoryEditor = create((set, get) => ({
  error: null,
  loading: false,
  storySaved: false,
  validationErrors: {},
  lastSavedNode: null,
  operationStatus: null,
  nodeData: [],
  fetchAttempts: 0,

  sanitizeInput: (text) => {
    if (typeof text !== "string") return text;
    return text.trim().replace(/[<>]/g, "").replace(/\s+/g, " ");
  },

  validateNodeData: (nodeData) => {
    const errors = {};
    const { nodeTitle, nodeType, emotionalTone, tags, storyContent, choices } =
      nodeData;

    const sanitizedTitle = get().sanitizeInput(nodeTitle);
    if (!sanitizedTitle) {
      errors.nodeTitle = "Node title is required.";
    } else if (sanitizedTitle.length < 5 || sanitizedTitle.length > 50) {
      errors.nodeTitle = "Node title must be between 5 and 50 characters";
    }

    const validTypes = ["Story", "Choice", "Ending", "Character"];
    if (!nodeType) {
      errors.nodeType = "Node type is required";
    } else if (!validTypes.includes(nodeType)) {
      errors.nodeType = `Node type must be one of: ${validTypes.join(", ")}`;
    }

    const validEmotionTypes = [
      "Mysterious",
      "Tense",
      "Hopeful",
      "Dark",
      "Peaceful",
      "Action",
    ];
    if (!emotionalTone) {
      errors.emotionalTone = "Emotional Tone is required";
    } else if (!validEmotionTypes.includes(emotionalTone)) {
      errors.emotionalTone = `Emotional tone must be one of: ${validEmotionTypes.join(
        ", "
      )}`;
    }

    if (!tags || tags.trim() === "") {
      errors.tags = "At least one tag is required";
    } else {
      const tagsArray = tags.split(",").map((t) => t.trim().toLowerCase());
      const validTagPattern = /^[a-z0-9-]+$/;
      const invalidTags = tagsArray.filter((t) => !validTagPattern.test(t));
      if (invalidTags.length > 0) {
        errors.tags = `Invalid tags: ${invalidTags.join(
          ", "
        )}. Use only lowercase letters, numbers, and hyphens`;
      }

      if (tagsArray.length > 10) {
        errors.tags = "Maximum 10 tags allowed";
      }
    }

    const sanitizedStoryContent = get().sanitizeInput(storyContent);
    if (!sanitizedStoryContent) {
      errors.storyContent = "Story Content is required.";
    } else if (sanitizedStoryContent.length < 250) {
      errors.storyContent = `Story content must be at least 250 characters (current: ${sanitizedStoryContent.length})`;
    }

    if (nodeType === "Choice") {
      if (!choices || choices.length === 0) {
        errors.choices = "Choice nodes must have at least one choice";
      } else if (choices.length > 5) {
        errors.choices = "Maximum 5 choices allowed per node";
      } else {
        const choiceErrors = [];
        choices.forEach((choice, index) => {
          if (!choice.text || choice.text.trim().length < 3) {
            choiceErrors.push(
              `Choice ${index + 1} text must be at least 3 characters`
            );
          }
        });
        if (choiceErrors.length > 0) {
          errors.choices = choiceErrors.join("; ");
        }
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  resetState: () => {
    set({
      error: null,
      loading: false,
      storySaved: false,
      validationErrors: {},
      operationStatus: "idle",
    });
  },

  clearError: () => {
    set({ error: null, validationErrors: {} });
  },

  fetchFromDb: async (nodeId) => {
    get().clearError();
    set({
      loading: true,
      operationStatus: "fetching",
      fetchAttempts: get().fetchAttempts + 1,
    });

    try {
      const validation = get().validateNodeId(nodeId);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      set({ operationStatus: "fetching" });

      const response = await get().makeRequestWithRetry(
        `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/api/fetch-nodes/${nodeId}`,
        {
          method: "GET",
        },
        2
      );

      if (response.success && response.data && response.data.node) {
        const nodeData = response.data.node;
        const dataValidation = get().validateReceivedNodeData(nodeData);

        if (!dataValidation.isValid) {
          throw new Error("Received invalid node data from server");
        }
        const sanitizedNodeData = get().sanitizeReceivedNode(nodeData);

        set({
          loading: false,
          error: null,
          nodeData: sanitizedNodeData,
          operationStatus: "success",
          lastFetchTime: Date.now(),
        });

        console.log("✅ Node fetched successfully:", nodeId);
        return {
          success: true,
          data: { node: sanitizedNodeData },
          message: "Node fetched successfully",
        };
      } else if (
        response.success === false &&
        (response.code === "NO_DATA_FOUND" ||
          response.message?.includes("not found") ||
          response.message?.includes("No data found"))
      ) {
        console.log("ℹ️ No existing data for this node");

        set({
          loading: false,
          error: null,
          nodeData: null,
          operationStatus: "success",
        });

        return {
          success: true,
          data: { node: null },
          message: "No existing data - ready to create new node",
          isEmpty: true,
        };
      } else {
        throw new Error(
          response.message || "Invalid response format from server"
        );
      }
    } catch (error) {
      console.log(
        "Error fetching node data: ",
        error,
        "Error Message: ",
        error.message
      );

      const errorMessage = get().parseFetchErrorMessage(error);

      set({
        loading: false,
        nodeData: null,
        error: errorMessage,
        operationStatus: "error",
      });

      return {
        success: false,
        message: errorMessage,
        error: error.message,
      };
    }
  },

  postDataToDb: async (
    nodeId,
    storyId,
    nodeTitle,
    nodeType,
    emotionalTone,
    tags,
    storyContent,
    choices = [],
    position = { x: 0, y: 0 }
  ) => {
    get().clearError();
    set({ loading: true, storySaved: false, operationStatus: "validating" });

    try {
      if (!nodeId || !storyId) {
        throw new Error("Node ID and Story ID are required");
      }

      const nodeData = {
        nodeTitle,
        nodeType,
        emotionalTone,
        tags,
        storyContent,
        choices,
      };

      const validation = get().validateNodeData(nodeData);

      if (!validation.isValid) {
        set({
          loading: false,
          validationErrors: validation.errors,
          error: "Please fix the validation errors before saving",
          operationStatus: "error",
        });
        return {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        };
      }

      const sanitizedData = {
        storyId: storyId,
        nodeTitle: get().sanitizeInput(nodeTitle),
        nodeType: nodeType,
        emotionalTone: emotionalTone,
        tags: tags,
        storyContent: get().sanitizeInput(storyContent),
        choices:
          nodeType === "Choice"
            ? choices.map((choice, index) => ({
                ...choice,
                text: get().sanitizeInput(choice.text),
                consequence: get().sanitizeInput(choice.consequence || ""),
              }))
            : [],
        position: position,
      };

      set({ operationStatus: "saving" });
      const response = await get().makeRequestWithRetry(
        `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/api/nodes/create/${nodeId}`,
        {
          method: "POST",
          body: JSON.stringify(sanitizedData),
        },
        2
      );

      if (response.success) {
        set({
          loading: false,
          error: null,
          storySaved: true,
          operationStatus: "success",
          lastSavedNode: response.data.node,
          validationErrors: {},
        });

        console.log("✅ Node saved successfully:", response.data.node.nodeId);
        return response;
      } else {
        throw new Error(response.message || "Failed to save node");
      }
    } catch (error) {
      console.error("❌ Error saving node:", error.message);

      const errorMessage = get().parseErrorMessage(error);

      set({
        loading: false,
        storySaved: false,
        error: errorMessage,
        operationStatus: "error",
      });

      return {
        success: false,
        message: errorMessage,
        error: error,
      };
    }
  },

  validateNodeId: (nodeId) => {
    if (!nodeId) {
      return {
        isValid: false,
        error: "Node ID is required",
      };
    }

    if (typeof nodeId !== "string") {
      return {
        isValid: false,
        error: "Node ID must be a string.",
      };
    }

    if (nodeId.length < 1 || nodeId.length > 50) {
      return {
        isValid: false,
        error:
          "Incorrect Node ID, Node ID must be between 1 and 50 characters.",
      };
    }

    return {
      isValid: true,
    };
  },

  validateReceivedNodeData: (nodedata) => {
    if (!nodedata || typeof nodedata !== "object") {
      return {
        isValid: false,
        error: "Incorrect node data format.",
      };
    }

    const requiredFields = [
      "nodeId",
      "nodeTitle",
      "nodeType",
      "storyContent",
      "emotionalTone",
    ];

    for (const field of requiredFields) {
      if (!nodedata[field]) {
        console.warn(`Missing required field: ${field}`);
        return { isValid: false };
      }
    }

    if (typeof nodedata.nodeTitle !== "string") return { isValid: false };
    if (typeof nodedata.storyContent !== "string") return { isValid: false };

    return { isValid: true };
  },

  sanitizeReceivedNode: (nodedata) => {
    return {
      ...nodedata,
      nodeTitle: get().sanitizeInput(nodedata.nodeTitle),
      storyContent: get().sanitizeInput(nodedata.storyContent),
      tags: Array.isArray(nodedata.tags)
        ? nodedata.tags.map((tag) => get().sanitizeInput(tag))
        : typeof nodedata.tags === "string"
        ? get().sanitizeInput(nodedata.tags)
        : "",
      choices: Array.isArray(nodedata.choices)
        ? nodedata.choices.map((choice) => ({
            ...choice,
            text: get().sanitizeInput(choice.text || ""),
            consequence: get().sanitizeInput(choice.consequence || ""),
          }))
        : [],
    };
  },

  makeRequestWithRetry: async (URL, options, maxRetries = 2) => {
    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetchWithAuth(URL, options);
        return response;
      } catch (error) {
        lastError = error;
        if (
          error.message.includes("400") ||
          error.message.includes("401") ||
          error.message.includes("403")
        ) {
          throw error;
        }

        if (attempt < maxRetries) {
          console.log(`🔄 Retry attempt ${attempt + 1}/${maxRetries}...`);
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * (attempt + 1))
          );
        }
      }
    }

    throw lastError;
  },

  parseErrorMessage: (error) => {
    if (error.message.includes("DUPLICATE_NODE_TITLE")) {
      return "A node with this title already exists. Please choose a different title.";
    }
    if (error.message.includes("INVALID_TITLE_LENGTH")) {
      return "Node title must be between 5 and 50 characters.";
    }
    if (error.message.includes("INSUFFICIENT_STORY_CONTENT")) {
      return "Story content must be at least 250 characters long.";
    }
    if (error.message.includes("STORY_NOT_FOUND")) {
      return "Story not found. Please refresh and try again.";
    }
    if (error.message.includes("UNAUTHORIZED")) {
      return "You don't have permission to edit this story.";
    }
    if (error.message.includes("Network")) {
      return "Network error. Please check your connection and try again.";
    }

    return error.message || "An unexpected error occurred. Please try again.";
  },

  parseFetchErrorMessage: (error) => {
    const message = error.message || "";

    if (message.includes("Network") || message.includes("Failed to fetch")) {
      return "Network error. Please check your connection and try again.";
    }

    if (message.includes("timeout") || message.includes("aborted")) {
      return "Request timed out. Please try again.";
    }

    if (message.includes("401") || message.includes("UNAUTHORIZED")) {
      return "You need to log in to access this content.";
    }

    if (message.includes("403") || message.includes("FORBIDDEN")) {
      return "You don't have permission to view this node.";
    }

    if (message.includes("404") || message.includes("NODE_NOT_FOUND")) {
      return "Node not found. It may have been deleted or moved.";
    }

    if (message.includes("Node ID")) {
      return message;
    }

    if (message.includes("invalid") || message.includes("Invalid")) {
      return "Received invalid data from server. Please try again.";
    }

    if (message.includes("500") || message.includes("INTERNAL_SERVER_ERROR")) {
      return "Server error. Please try again later.";
    }

    if (message.includes("429") || message.includes("rate limit")) {
      return "Too many requests. Please wait a moment and try again.";
    }

    return "Failed to fetch node. Please try again.";
  },
}));

export default useStoryEditor;
