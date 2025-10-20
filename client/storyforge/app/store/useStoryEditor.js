import { create } from "zustand";
import fetchWithAuth from "../utils/fetchWithAuth";

const useStoryEditor = create((set, get) => ({
  error: null,
  loading: false,
  storySaved: false,
  validationErrors: {},
  lastSavedNode: null,
  operationStatus: null,

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
          error.message.includes("403") ||
          error.message.includes("404")
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
}));

export default useStoryEditor;
