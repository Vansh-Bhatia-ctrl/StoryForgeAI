const StoryCards = require("../models/storyCard");

const storyCardController = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "User not authorized." });
    }

    const { title, description, genre } = req.body;

    if (!title || !description || !genre) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    if (title.length < 3 || title.length > 100) {
      return res.status(400).json({
        message: "Title should be between 3 and 100 characters.",
      });
    }

    if (description.length < 10 || description.length > 500) {
      return res.status(400).json({
        message: "Description should be between 10 and 500 characters.",
      });
    }

    const validGenres = [
      "Fantasy",
      "Sci-Fi",
      "Horror",
      "Mystery",
      "Adventure",
      "Romance",
      "Thriller",
      "Historical",
    ];

    if (!validGenres.includes(genre)) {
      return res.status(400).json({
        message: "genere should be selected from valid options",
        validgenres: validGenres,
      });
    }

    const storyId = `story_${userId}_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const storyCard = new StoryCards({
      storyId: storyId,
      user: userId,
      title: title.trim(),
      description: description.trim(),
      genre: genre,
      status: "draft",
      date: new Date(),
    });

    await storyCard.save();

    return res.status(200).json({ message: "Story created successfully" });
  } catch (error) {
    console.log(
      `Error creating story: ${error}, error message: ${error.message}`
    );
    return res.status(500).json({
      message: `Something went wrong: ${error}, error message: ${error.message}`,
    });
  }
};

module.exports = { storyCardController };
