const express = require("express");
const { verifyAuthentication } = require("../middlewares/authmiddleware");
const { createNodesController } = require("../controllers/createNode");
const { deleteNodeController } = require("../controllers/deleteNode");
const router = express.Router();

router.post("/create/:storyId", verifyAuthentication, createNodesController);
router.delete("/delete", verifyAuthentication, deleteNodeController);

module.exports = router;
