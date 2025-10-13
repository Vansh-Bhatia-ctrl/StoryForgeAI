const express = require("express");
const { storyCardController } = require("../controllers/storyCard");
const { verifyAuthentication } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/storycard", verifyAuthentication, storyCardController);

module.exports = router;
