const mongoose = require("mongoose");

const nodeSchema = new mongoose.Schema(
  {
    storyId: {
      type: mongoose.Types.ObjectId,
      ref: "StoryCards",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    nodeId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    nodeTitle: {
      type: String,
      required: [true, "Node title is required"],
      minlength: [5, "Title should be at least 5 characters."],
      maxlength: [50, "Title should be between 5 to 50 characters long."],
      trim: true,
    },
    nodeType: {
      type: String,
      required: [true, "Node type is required"],
      enum: {
        values: ["Story", "Choice", "Ending", "Character"],
        message: "${values} is not a valid node type.",
      },
      index: true,
    },
    emotionalTone: {
      type: String,
      required: [true, "Emotional tone is required"],
      enum: {
        values: [
          "Mysterious",
          "Tense",
          "Hopeful",
          "Dark",
          "Peaceful",
          "Action",
        ],
        message: "${values} is not a valid emotional type.",
      },
    },
    tags: {
      type: String,
      required: [true, "At least one tag is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          const tagsArray = v.split(",").map((tag) => tag.trim());
          return (
            tagsArray.length > 0 &&
            tagsArray.every((tag) => /^[a-z0-9-]+$/.test(tag))
          );
        },
        message:
          "Tags must be comma-separated and contain only lowercase letters, numbers, and hyphens",
      },
    },
    storyContent: {
      type: String,
      required: true,
      minlength: [250, "Story content should be at least 250 characters long."],
      trim: true,
    },
    choices: [
      {
        choiceId: String,
        text: String,
        consequence: String,
        targetNodeId: String,
        color: {
          type: String,
          enum: ["green", "red", "blue", "purple", "yellow"],
          default: "blue",
        },
      },
    ],
    position: {
      x: {
        type: Number,
        default: 0,
        min: [-10000, "X position cannot be less than -10000"],
        max: [10000, "X position cannot be more than 10000"],
      },
      y: {
        type: Number,
        default: 0,
        min: [-10000, "Y position cannot be less than -10000"],
        max: [10000, "Y position cannot be more than 10000"],
      },
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const Nodes = mongoose.model("Nodes", nodeSchema);
module.exports = Nodes;
