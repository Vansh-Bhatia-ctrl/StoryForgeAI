const mongoose = require("mongoose");

const storyCardSchema = new mongoose.Schema(
  {
    storyId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    genre: {
      type: String,
      required: true,
      enum: {
        values: [
          "Fantasy",
          "Sci-Fi",
          "Horror",
          "Mystery",
          "Adventure",
          "Romance",
          "Thriller",
          "Historical",
        ],
        message: "{VALUE} is not a valid genre",
      },
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "in-progress", "completed", "archived"],
      default: "draft",
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
    nodes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nodes",
      },
    ],
  },
  { timestamps: true }
);

const StoryCards = mongoose.model("StoryCards", storyCardSchema);
module.exports = StoryCards;
