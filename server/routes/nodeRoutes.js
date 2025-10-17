const express = require("express");
const { verifyAuthentication } = require("../middlewares/authmiddleware");
const { createNodesController } = require("../controllers/createNode");
const { deleteNodeController } = require("../controllers/deleteNode");
const { updateNodeController } = require("../controllers/updateNode");
const router = express.Router();

router.post("/create/:storyId", verifyAuthentication, createNodesController);
router.delete("/delete", verifyAuthentication, deleteNodeController);
router.put("/update/:nodeId", verifyAuthentication, updateNodeController);

module.exports = router;
