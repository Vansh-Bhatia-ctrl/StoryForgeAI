const ollamaService = require("../services/ollamaService");

const generateCompletion = async (req, res) => {
  try {
    const { prompt, maxTokens, temperature } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        success: false,
        message: "Prompt must be a string.",
        code: "INVALID_PROMPT",
      });
    }

    if (prompt.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Prompt must be at least 10 characters long.",
        code: "INVALID_PROMPT_LENGTH",
      });
    }

    const completion = await ollamaService.generateCompletion(prompt, {
      maxTokens: maxTokens || 150,
      temperature: temperature || 0.7,
    });

    return res.status(200).json({
      success: true,
      message: "Response received successfully.",
      completion: completion.trim(),
      metadata: {
        promptLength: prompt.length,
        completionLength: completion.length,
      },
    });
  } catch (error) {
    console.log(
      "Error generating response from AI: ",
      error,
      "Error message: ",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Somehting went wrong, please try again",
      error: error,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

const generateStoryCompletion = async (req, res) => {
  try {
    const { character, currentText, genre, tone, maxTokens } = req.body;

    if (!currentText) {
      return res.status(400).json({
        success: false,
        message: "Current text is required.",
        code: "MISSING_CURRENTTEXT",
      });
    }

    const completion = await OllamaService.generateStoryCompletion({
      character,
      currentText,
      genre,
      tone,
      maxTokens,
    });
    res.status(200).json({
      success: true,
      completion: completion.trim(),
    });
  } catch (error) {
    console.log(
      "Error generating response from AI: ",
      error,
      "Error message: ",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Somehting went wrong, please try again",
      error: error,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

const generateDialogue = async (req, res) => {
  try {
    const { character, situation, personality, numOptions } = req.body;

    if (!character || !situation) {
      return res.status(400).json({
        success: false,
        message: "character and situation are required",
      });
    }

    const options = await ollamaService.generateDialogueOptions({
      character,
      situation,
      personality,
      numOptions: numOptions || 3,
    });

    res.status(200).json({
      success: true,
      dialogueOptions: options,
    });
  } catch (error) {
    console.error("❌ Dialogue generation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate dialogue",
      error: error.message,
    });
  }
};

const checkHealth = async (req, res) => {
  try {
    const isHealthy = await ollamaService.checkHealth();

    res.status(200).json({
      success: isHealthy,
      service: "Ollama",
      status: isHealthy ? "online" : "offline",
      model: process.env.OLLAMA_MODEL || "llama2",
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: "Ollama service unavailable",
      error: error.message,
    });
  }
};

module.exports = {
  generateCompletion,
  generateStoryCompletion,
  generateDialogue,
  checkHealth,
};
