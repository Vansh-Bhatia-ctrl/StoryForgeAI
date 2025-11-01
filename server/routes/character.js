const express = require("express");
const { verifyAuthentication } = require("../middlewares/authmiddleware");
const { createCharacter } = require("../controllers/character");
const { fetchCharacter } = require("../controllers/fetchCharacter");
const router = express.Router();

router.post("/save/:storyId", verifyAuthentication, createCharacter);
router.get("/get/:storyId", verifyAuthentication, fetchCharacter);

module.exports = router;
