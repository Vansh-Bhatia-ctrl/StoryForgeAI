const express = require("express");
const { verifyAuthentication } = require("../middlewares/authmiddleware");
const { fetchSingleCharacter } = require("../controllers/fetchSingleCharacter");
const router = express.Router();

router.get(
  "/single-character/:storyId/:characterId",
  verifyAuthentication,
  fetchSingleCharacter
);

module.exports = router;
