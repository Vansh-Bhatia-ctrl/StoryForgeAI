const express = require("express");
const { verifyAuthentication } = require("../middlewares/authmiddleware");
const { fetchNodes } = require("../controllers/fetchNodes");
const router = express.Router();

router.get("/:storyId/:nodeId", verifyAuthentication, fetchNodes);

module.exports = router;
