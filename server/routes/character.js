const express = require("express");
const { verifyAuthentication } = require("../middlewares/authmiddleware");
const { createCharacter } = require("../controllers/character");
const router = express.Router();

router.post("/save/:storyId", verifyAuthentication, createCharacter);

module.exports = router;
