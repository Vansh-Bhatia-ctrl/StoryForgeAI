const express = require("express");
const { verifyAuthentication } = require("../middlewares/authmiddleware");
const { fetchStoryCards } = require("../controllers/fetchStoryCards");
const router = express.Router();

router.get("/fetch-story-cards", verifyAuthentication, fetchStoryCards);

module.exports = router;
