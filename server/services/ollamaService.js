const dotenv = require("dotenv");
const fetch = require("node-fetch");

class OllamaService {
  constructor() {
    this.baseUrl = process.env.OLLAMA_API_URL || "http://localhost:11434";
    this.model = process.env.OLLAMA_MODEL || "llama2";
  }

  async generateCompletion(prompt, options = {}) {
    try {
      const { maxTokens = 150, stream = false, temperature = 0.7 } = options;

      console.log("🤖 Sending request to Ollama...");

      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: this.model,
          prompt: prompt,
          stream: stream,
          options: {
            num_predict: maxTokens,
            temperature: temperature,
            top_p: 0.9,
            top_k: 40,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Ollama API error: ${response.status} ${response.statusText}`
        );
      }

      if (stream) {
        return response.body;
      }

      const data = await response.json();
      console.log("✅ Ollama response received");
      return data.response || "";
    } catch (error) {
      console.error("❌ Ollama Service Error:", error.message);
      throw new Error(`Failed to generate completion: ${error.message}`);
    }
  }

  async generateStoryCompletion(context = {}) {
    const {
      character = "Character",
      currentText = "",
      genre = "",
      tone = "neutral",
      maxTokens = 100,
    } = context;

    const systemPrompt = `You are a creative writing assistant specializing in ${genre} stories with a ${tone} tone. Continue the following story naturally and engagingly. Keep the continuation concise (2-3 sentences).

Character: ${character}
Current Text: ${currentText}

Continue the story:`;

    return await this.generateCompletion(systemPrompt, { maxTokens });
  }

  async generateDialogueOptions(context = {}) {
    const {
      character,
      situation,
      personality = "neutral",
      numOptions = 3,
    } = context;

    const prompt = `Generate ${numOptions} different dialogue options for ${character} (personality: ${personality}) in this situation: ${situation}

Format: Return only the dialogue lines, one per line, without numbering.`;

    const response = await this.generateCompletion(prompt, { maxTokens: 150 });

    return response
      .split("\n")
      .filter((line) => line.trim())
      .slice(0, numOptions);
  }

  async checkHealth() {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        const hasModel = data.models?.some((m) => m.name.includes(this.model));

        if (!hasModel) {
          console.warn(`⚠️ Model '${this.model}' not found in Ollama`);
          return false;
        }

        console.log("✅ Ollama is healthy and model is available");
        return true;
      }

      return false;
    } catch (error) {
      console.error("❌ Ollama health check failed:", error.message);
      return false;
    }
  }

  async streamCompletion(prompt, onChunk, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: this.model,
          prompt: prompt,
          stream: true,
          options: {
            num_predict: options.maxTokens || 150,
            temperature: options.temperature || 0.7,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama streaming error: ${response.status}`);
      }

      response.body.on("data", (chunk) => {
        const lines = chunk
          .toString()
          .split("\n")
          .filter((line) => line.trim());

        for (const line of lines) {
          try {
            const json = JSON.parse(line);
            if (json.response) {
              onChunk(json.response);
            }
          } catch (e) {
            continue;
          }
        }
      });

      await new Promise((resolve, reject) => {
        response.body.on("end", resolve);
        response.body.on("error", reject);
      });
    } catch (error) {
      console.error("❌ Stream error:", error.message);
      throw error;
    }
  }

  async characterCompletion(context = {}) {
    const {
      maxTokens = 80,
      characterName = "Unknown Character",
      backstory = "A mysterious figure with an unclear past.",
      personality = "neutral and balanced",
      traits = [],
      scenarioContext = "",
      currentDialogue = "",
    } = context;

    const traitsText =
      traits.length > 0 ? traits.join(", ") : "balanced, thoughtful";
    const prompt = `You are ${characterName}. This is who you are:

BACKSTORY:
${backstory}

PERSONALITY:
You have a ${personality} personality.

CHARACTER TRAITS:
${traitsText}

CURRENT SITUATION:
${scenarioContext || "You are in a conversation."}

${currentDialogue ? `RECENT DIALOGUE:\n${currentDialogue}\n` : ""}

INSTRUCTIONS:
- Respond as ${characterName} would, staying true to your backstory and personality
- Your response should reflect your traits: ${traitsText}
- Keep your response natural and conversational (2-4 sentences)
- Do not break character or refer to yourself in third person
- Embody the emotional state that matches your personality

Respond as ${characterName}:`;

    return await this.generateCompletion(prompt, {
      maxTokens,
      temperature: 0.8,
    });
  }
}

module.exports = new OllamaService();
