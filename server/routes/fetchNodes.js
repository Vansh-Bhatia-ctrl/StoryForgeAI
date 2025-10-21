const express = require("express");
const { verifyAuthentication } = require("../middlewares/authmiddleware");
const { fetchNodes } = require("../controllers/fetchNodes");
const router = express.Router();

router.get("/:nodeId", verifyAuthentication, fetchNodes);

module.exports = router;
