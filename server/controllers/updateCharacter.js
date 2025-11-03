const mongoose = require("mongoose");
const Character = require("../models/character");

const sanitizeInput = (text) => {
  if (!text || typeof text !== "string") return text;

  return text.trim().replace(/[<>]/g, "").replace(/\s+/g, " ");
};

const validatePersonality = (personality) => {
  if (!personality || typeof personality !== "string") {
    return {
      valid: false,
      message: "Personality must be a non-empty string",
    };
  }

  const personalityArray = personality
    .split(/,\s*/)
    .map((p) => p.trim().toLowerCase())
    .filter((p) => p.length > 0);

  if (personalityArray.length === 0) {
    return {
      valid: false,
      message: "At least one personality trait is required",
    };
  }

  for (const trait of personalityArray) {
    if (/[.!?;:]/.test(trait)) {
      return {
        valid: false,
        message: `"${trait}" appears to be a sentence. Use single words or short phrases only.`,
        invalidTrait: trait,
      };
    }

    if (!/^[a-zA-Z\s-]+$/.test(trait)) {
      return {
        valid: false,
        message: `"${trait}" contains invalid characters. Use only letters, spaces, and hyphens.`,
        invalidTrait: trait,
      };
    }
  }
  return { valid: true, personality: personalityArray };
};

const validateTraits = (traits) => {
  if (typeof traits !== "string") {
    return {
      valid: false,
      message: "Traits must be a comma-separated string.",
    };
  }

  const traitsArray = traits.split(",").map((t) => t.trim().toLowerCase());
  const validPattern = /^[a-z0-9-]+$/;
  const invalidTraits = traitsArray.filter(
    (trait) => trait.length > 0 && !validPattern.test(trait)
  );

  if (invalidTraits.length > 0) {
    return {
      valid: false,
      message:
        "Invalid traits, traits should only contain lowercase letters and hyphens.",
    };
  }

  if (traitsArray.length > 10) {
    return {
      valid: false,
      message: "Maximum 10 traits allowed per character.",
    };
  }

  return { valid: true, traits: traitsArray };
};

const verifyOwnerShip = async (characterId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return { valid: false, message: "Invalid user ID format." };
  }

  const character = await Character.findOne({
    characterId: characterId,
    userId: userId,
  });

  if (!character) {
    return {
      valid: false,
      message: "Character not found or you do not have permission to edit it.",
    };
  }

  return { valid: true, character };
};

const updateCharacter = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
        code: "UNAUTHORIZED",
      });
    }

    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format.",
        code: "INVALID_USER_ID",
      });
    }

    const { characterName, backstory, personality, traits } = req.body;
    const { characterId } = req.params;

    const charCheck = await verifyOwnerShip(characterId, userId);
    if (!charCheck.valid) {
      return res.status(404).json({
        success: false,
        message: charCheck.message,
        code: "CHARACTER_NOT_FOUND_OR_UNAUTHORIZED",
      });
    }
    const character = charCheck.character;

    if (characterName !== undefined) {
      const sanitizedCharacterName = sanitizeInput(characterName);
      if (!sanitizedCharacterName) {
        return res.status(400).json({
          success: false,
          message: "Character name is required.",
          code: "CHARACTERNAME_NOT_FOUND",
        });
      }
      character.characterName = sanitizedCharacterName;
    }

    if (backstory !== undefined) {
      const sanitizedBackstory = sanitizeInput(backstory);
      if (
        !sanitizedBackstory ||
        sanitizedBackstory.length < 30 ||
        sanitizedBackstory.length > 200
      ) {
        return res.status(400).json({
          success: false,
          message: "Back story must be between 30 to 200 characters long.",
          code: "INVALID_BACKSTORY_LENGTH",
        });
      }
      character.backstory = sanitizedBackstory;
    }

    if (personality !== undefined) {
      const validatedPersonality = validatePersonality(personality);
      if (!validatedPersonality.valid) {
        return res.status(400).json({
          success: false,
          message: validatedPersonality.message,
          code: "INVALID_PERSONALITY",
        });
      }

      character.personality = validatedPersonality.personality;
    }

    if (traits !== undefined) {
      const validatedTraits = validateTraits(traits);
      if (!validatedTraits.valid) {
        return res.status(400).json({
          success: false,
          message: validatedTraits.message,
          code: "INVALID_TRAITS",
        });
      }

      character.traits = validatedTraits.traits;
    }

    await character.save();

    return res.status(200).json({
      success: true,
      message: "Character updated successfully.",
      data: {
        character: {
          storyId: character.storyId,
          id: character.characterId,
          characterId: character.characterId,
          characterName: character.characterName,
          backstory: character.backstory,
          personality: character.personality,
          traits: character.traits,
        },
      },
    });
  } catch (error) {
    console.error("Error in character.js:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error,
      errorMessage: error.message,
    });
  }
};

module.exports = { updateCharacter };
