const { default: mongoose } = require("mongoose");
const StoryCards = require("../models/storyCard");
const Character = require("../models/character");

const sanitizeInput = (text) => {
  if (!text || typeof text !== "string") {
    return text;
  }

  return text.trim().replace(/[<>]/g, "").replace(/\s+/g, " ");
};

const generateCharacterid = () => {
  const timeStamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 9);
  return `ch_${timeStamp}_${randomString}`;
};

const validatePersonality = (personality) => {
  if (!personality || typeof personality !== "string") {
    return {
      valid: false,
      message: "Personality must be a non-empty string",
    };
  }

  const personalitTrait = personality
    .split(/,\s*/)
    .map((p) => p.trim().toLowerCase())
    .filter((trait) => trait.length > 0);

  if (personalitTrait.length === 0) {
    return {
      valid: false,
      message: "At least one personality trait is required",
    };
  }

  for (const trait of personalitTrait) {
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

  return { valid: true, personality: personalitTrait };
};

const validateTraits = (traits) => {
  const traitsArray = traits.split(/,\s*/).map((t) => t.trim().toLowerCase());
  const validTrait = /^[a-z0-9-]+$/;
  const inValidTraits = traitsArray.filter((t) => !validTrait.test(t));

  if (inValidTraits.length > 0) {
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

const verifyOwnerShip = async (storyId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return { valid: false, message: "Invalid story ID format." };
  }

  const story = await StoryCards.findOne({ _id: storyId, user: userId });

  if (!story) {
    return {
      valid: false,
      message: "Story not found or unauthorized access.",
    };
  }

  return { valid: true, story };
};

const createCharacter = async (req, res) => {
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

    const { characterName, backstory, personality, traits, storyId } = req.body;

    const storyCheck = await verifyOwnerShip(storyId, userId);
    if (!storyCheck.valid) {
      return res.status(404).json({
        success: false,
        message: storyCheck.message,
        code: "STORY_NOT_FOUND",
      });
    }

    const story = storyCheck.story;

    const sanitizedCharacterName = sanitizeInput(characterName);
    const sanitizedBackstory = sanitizeInput(backstory);

    if (!sanitizedCharacterName) {
      return res.status(400).json({
        success: false,
        message: "Character name is required.",
        code: "CHARACTERNAME_NOT_FOUND",
      });
    }

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

    const personalityValidation = validatePersonality(personality);
    if (!personalityValidation.valid) {
      return res.status(400).json({
        success: false,
        message: personalityValidation.message,
        code: "INVALID_PERSONALITY",
      });
    }

    const traitsValidation = validateTraits(traits);
    if (!traitsValidation.valid) {
      return res.status(400).json({
        success: false,
        message: traitsValidation.message,
        code: "INVALID_TRAITS",
      });
    }

    const characterId = generateCharacterid();

    const character = new Character({
      userId: userId,
      storyId: storyId,
      characterId: characterId,
      characterName: sanitizedCharacterName,
      backstory: sanitizedBackstory,
      personality: personalityValidation.personality,
      traits: traitsValidation.traits,
    });

    await character.save();
    return res.status(201).json({
      success: true,
      message: "Character created successfully.",
      data: {
        character: {
          storyId: storyId,
          id: characterId,
          characterId: characterId,
          characterName: sanitizedCharacterName,
          backstory: sanitizedBackstory,
          personality: personalityValidation.personality,
          traits: traitsValidation.traits,
        },
        story: {
          storyId: story.storyId,
          title: story.title,
          totalNodes: story.nodes.length,
        },
      },
    });
  } catch (error) {
    console.error("Error in createNodesController:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error,
      errorMessage: error.message,
    });
  }
};

module.exports = { createCharacter };
