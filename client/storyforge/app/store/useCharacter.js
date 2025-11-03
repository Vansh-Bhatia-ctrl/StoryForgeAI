import { create } from "zustand";
import fetchWithAuth from "../utils/fetchWithAuth";

const useCharacter = create((set, get) => ({
  error: null,
  loading: false,
  characterSaved: false,
  savedDataMessage: null,
  receivedData: [],

  sanitizeInput: (text) => {
    if (!text || typeof text !== "string") return text;
    return text.trim().replace(/[<>]/g, "").replace(/\s+/g, " ");
  },

  sanitizeReceivedData: (characterData) => {
    return {
      ...characterData,
      characterName: get().sanitizeInput(characterData.characterName),
      backstory: get().sanitizeInput(characterData.backstory),
      personality: characterData.personality,
      traits: characterData.traits,
    };
  },

  validatePersonality: (personality, errors = {}) => {
    if (!personality || typeof personality !== "string") {
      errors.personality = "Personality is required.";
      return [];
    }

    const personalityText = personality
      .split(", ")
      .map((p) => p.trim().toLocaleLowerCase())
      .filter((p) => p.length > 0);

    if (personalityText.length === 0) {
      errors.personality = "Personality traits are required for the character.";
    }

    for (const trait of personalityText) {
      if (/[.!?;:]/.test(trait)) {
        errors.personality = `"${trait}" appears to be a sentence. Use single words or short phrases only.`;
        return personalityText;
      }

      if (!/^[a-zA-Z\s-]+$/.test(trait)) {
        errors.personality = `"${trait}" contains invalid characters. Use only letters, spaces, and hyphens.`;
        return personalityText;
      }
    }

    return personalityText;
  },

  validateTraits: (traits, errors = {}) => {
    if (!traits || typeof traits !== "string") {
      errors.traits = "Traits are required.";
      return [];
    }

    const traitsArray = traits.split(/,\s*/).map((t) => t.trim().toLowerCase());
    const validPattern = /^[a-z0-9-]+$/;
    const invalidTraits = traitsArray.filter(
      (trait) => !validPattern.test(trait)
    );

    if (invalidTraits.length > 0) {
      errors.traits =
        "Invalid traits, traits should only contain lowercase letters and hyphens.";
    }

    if (traitsArray.length > 10) {
      errors.traits = "Maximum 10 traits allowed per character.";
    }

    return traitsArray;
  },

  validateCharacterData: (characterData) => {
    const errors = {};
    const { characterName, backstory, personality, traits, storyId } =
      characterData;

    const sanitizedCharacterName = get().sanitizeInput(characterName);
    if (!sanitizedCharacterName) {
      errors.characterName = "Character Name is required.";
    }

    const sanitizedBackstory = get().sanitizeInput(backstory);
    if (!sanitizedBackstory) {
      errors.backstory = "Backstory is required.";
    } else if (
      sanitizedBackstory.length < 30 ||
      sanitizedBackstory.length > 200
    ) {
      errors.backstory = "Backstory must be between 30 and 200 characters.";
    }

    get().validatePersonality(personality, errors);

    get().validateTraits(traits, errors);

    if (!storyId || typeof storyId !== "string") {
      errors.storyId = "Story ID is required.";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      sanitizedData: {
        characterName: sanitizedCharacterName,
        backstory: sanitizedBackstory,
        personality: personality,
        traits: traits,
        storyId,
      },
    };
  },

  validateReceivedData: (characterData) => {
    if (!characterData || typeof characterData !== "object") {
      return {
        isValid: false,
        error: "Incorrect character data format.",
      };
    }

    const requiredFields = [
      "characterName",
      "backstory",
      "personality",
      "traits",
    ];

    for (const field of requiredFields) {
      if (!characterData[field]) {
        console.warn(`Missing required field: ${field}`);
        return {
          isValid: false,
        };
      }
    }

    if (typeof characterData.characterName !== "string")
      return { isValid: false };
    if (typeof characterData.backstory !== "string") return { isValid: false };

    return { isValid: true };
  },

  clearError: () => {
    set({ error: null });
  },

  postCharacterToDB: async (
    characterName,
    backstory,
    personality,
    traits,
    storyId
  ) => {
    get().clearError();
    set({ loading: true, error: null, characterSaved: false });

    if (!storyId) {
      set({
        loading: false,
        error: "Story ID is required.",
        characterSaved: false,
      });
      return {
        success: false,
        message: "Story ID is required",
      };
    }

    const characterData = {
      characterName,
      backstory,
      personality,
      traits,
      storyId,
    };

    const validation = get().validateCharacterData(characterData);
    if (!validation.isValid) {
      set({
        loading: false,
        validationErrors: validation.errors,
        error: "Please fix the validation errors before saving",
      });
      return {
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      };
    }

    const sanitizedData = validation.sanitizedData;

    try {
      const response = await get().makeRequestWithRetry(
        `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/api/character/save/${storyId}`,
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
          characterSaved: true,
          savedDataMessage: response.data,
        });
        console.log("✅ Character saved successfully:", response.data);
        return response;
      } else {
        throw new Error(response.message || "Failed to save node");
      }
    } catch (error) {
      console.error("❌ Error saving character information:", error.message);
      set({
        loading: false,
        characterSaved: false,
        error: error,
      });

      return {
        success: false,
        message: error.message,
        error: error,
      };
    }
  },

  updateCharacterInfo: async (characterId, updatedCharData = {}) => {
    try {
      get().clearError();
      set({ loading: true, error: null, characterSaved: false });

      if (!characterId) {
        set({
          loading: false,
          error: "Story ID is required.",
          characterSaved: false,
        });
        return {
          success: false,
          message: "Story ID is required",
        };
      }

      const charData = {};

      if (updatedCharData.characterName !== undefined) {
        charData.characterName = updatedCharData.characterName;
      }

      if (updatedCharData.backstory !== undefined) {
        charData.backstory = updatedCharData.backstory;
      }

      if (updatedCharData.personality !== undefined) {
        charData.personality = updatedCharData.personality;
      }

      if (updatedCharData.traits !== undefined) {
        charData.traits = updatedCharData.traits;
      }

      const validation = get().validateCharacterData(charData, true);
      if (!validation.isValid) {
        set({
          loading: false,
          error: validation.errors,
          characterSaved: false,
        });

        return {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        };
      }

      const sanitizedCharData = {};

      if (charData.characterName !== undefined) {
        sanitizedCharData.characterName = get().sanitizeInput(
          charData.characterName
        );
      }

      if (charData.backstory !== undefined) {
        sanitizedCharData.backstory = get().sanitizeInput(charData.backstory);
      }

      if (charData.personality !== undefined) {
        sanitizedCharData.personality = get().sanitizeInput(
          charData.personality
        );
      }

      if (charData.traits !== undefined) {
        sanitizedCharData.traits = get().sanitizeInput(charData.traits);
      }

      const response = await get().makeRequestWithRetry(
        `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/api/character/update/${characterId}`,
        {
          method: "PUT",
          body: JSON.stringify(sanitizedCharData),
        },
        2
      );

      if (response.success) {
        set({
          loading: false,
          error: null,
          characterSaved: true,
          savedDataMessage: response.data,
        });
        console.log("✅ Character saved successfully:", response.data);
        return response;
      } else {
        throw new Error(response.message || "Failed to save node");
      }
    } catch (error) {
      console.error("❌ Error saving character information:", error.message);
      set({
        loading: false,
        characterSaved: false,
        error: error,
      });

      return {
        success: false,
        message: error.message,
        error: error,
      };
    }
  },

  fetchCharacterFromDB: async (storyId) => {
    get().clearError();
    set({
      loading: true,
      error: null,
    });

    try {
      const response = await get().makeRequestWithRetry(
        `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/api/character/get/${storyId}`,
        {
          method: "GET",
        },
        2
      );

      if (response.success && response.data && response.data.characterData) {
        const characterDataArray = response.data.characterData;
        if (!Array.isArray(characterDataArray)) {
          throw new Error("Expected array.");
        }

        if (characterDataArray.length === 0) {
          console.log("ℹ️ No characters found for this story");

          set({
            loading: false,
            error: null,
            receivedData: [],
          });

          return {
            success: true,
            data: { characterData: [] },
            message: "No characters found - ready to create new ones.",
          };
        }

        const sanitzedCharacters = [];
        for (const character of characterDataArray) {
          const validation = get().validateReceivedData(character);
          if (validation.isValid) {
            const sanitizedChar = get().sanitizeReceivedData(character);
            sanitzedCharacters.push(sanitizedChar);
          } else {
            console.warn("⚠️ Skipping invalid character:", character);
          }
        }

        set({
          loading: false,
          error: null,
          receivedData: sanitzedCharacters,
        });

        return {
          success: true,
          data: { characterData: sanitzedCharacters },
          message: `${sanitzedCharacters.length} character(s) fetched successfully`,
        };
      } else if (
        response.success === false &&
        (response.code === "CHARACTER_NOTFOUND" ||
          response.message?.includes("not found") ||
          response.message?.includes("No data found"))
      ) {
        console.log("ℹ️ No existing data for this character.");

        set({
          loading: false,
          error: null,
          receivedData: [],
        });

        return {
          success: true,
          data: { characterData: [] },
          message: "No existing data - ready to create new character.",
        };
      } else {
        console.warn("⚠️ Unexpected response format:", response);

        set({
          loading: false,
          error: null,
          receivedData: [],
        });
        return {
          success: false,
          data: { characterData: [] },
          message: "Unexpected response format from server.",
        };
      }
    } catch (error) {
      console.log(
        "Error fetching node data: ",
        error,
        "Error Message: ",
        error.message
      );

      set({
        loading: false,
        receivedData: [],
        error: error.message,
      });

      return {
        success: false,
        message: error,
        error: error.message,
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
}));

export default useCharacter;
