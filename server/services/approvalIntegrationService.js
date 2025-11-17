const { createCharacter } = require("../controllers/character");
const { createNodesController } = require("../controllers/createNode");
const { updateCharacter } = require("../controllers/updateCharacter");
const { updateNodeController } = require("../controllers/updateNode");

const createMockRequest = (pendingChanges, session) => {
  const { proposedData, metadata, submittedBy } = pendingChanges;

  return {
    user: {
      id: submittedBy._id || submittedBy,
    },
    body: proposedData,
    params: {
      storyId: metadata.storyId,
      nodeId: metadata.nodeId,
      nodeID: metadata.nodeId,
      characterId: metadata.characterId,
    },
    session,
  };
};

const createMockResponse = () => {
  let statusCode = 200;
  let responseData = null;

  return {
    status: function (code) {
      statusCode = code;
      return this;
    },
    json: function (data) {
      responseData = data;
      return this;
    },

    getStatusCode: () => statusCode,
    getData: () => responseData,
  };
};

const applyNodeCreation = async (pendingChanges, session) => {
  console.log("📝 Calling createNodesController...");

  const req = createMockRequest(pendingChanges, session);
  const res = createMockResponse();

  await createNodesController(req, res);

  const statusCode = res.getStatusCode();
  const data = res.getData();

  if (statusCode === 200 && data.success) {
    console.log("✅ Node created successfully using controller");
    return {
      success: true,
      type: "node_created",
      data: data.data,
    };
  } else {
    throw new Error(data.message || "Failed to create node");
  }
};

const applyNodeUpdate = async (pendingChanges, session) => {
  console.log("📝 Calling updateNodeController...");

  const req = createMockRequest(pendingChanges, session);
  const res = createMockResponse();

  await updateNodeController(req, res);

  const statusCode = res.getStatusCode();
  const data = res.getData();

  if (statusCode === 200 && data.success) {
    console.log("✅ Node updated successfully using controller");
    return {
      success: true,
      type: "node_updated",
      data: data.data,
    };
  } else {
    throw new Error(data.message || "Failed to update node");
  }
};

const applyCharacterCreation = async (pendingChanges, session) => {
  console.log("📝 Calling createCharacter controller...");

  const req = createMockRequest(pendingChanges, session);
  const res = createMockResponse();

  await createCharacter(req, res);

  const statusCode = res.getStatusCode();
  const data = res.getData();

  if (statusCode === 200 && data.success) {
    console.log("✅ Character created successfully using controller");
    return {
      success: true,
      type: "character_created",
      data: data.data,
    };
  } else {
    throw new Error(data.message || "Failed to create character ");
  }
};

const applyCharacterUpdate = async (pendingChanges, session) => {
  console.log("📝 Calling updateCharacter controller...");
  const req = createMockRequest(pendingChanges, session);
  const res = createMockResponse();

  await updateCharacter(req, res);

  const statusCode = res.getStatusCode();
  const data = res.getData();

  if (statusCode === 200 && data.success) {
    console.log("✅ Character updated successfully using controller");
    return {
      success: true,
      type: "character_updated",
      data: data.data,
    };
  } else {
    throw new Error(data.message || "Failed to update character ");
  }
};

const applyApprovedChange = async (pendingChanges, session) => {
  const { entityType, changeType } = pendingChanges;

  console.log(`🔄 Applying ${entityType} ${changeType} using controllers...`);

  try {
    let result;

    if (entityType === "node" && changeType === "create") {
      result = await applyNodeCreation(pendingChanges, session);
    } else if (entityType === "node" && changeType === "update") {
      result = await applyNodeUpdate(pendingChanges, session);
    } else if (entityType === "character" && changeType === "create") {
      result = await applyCharacterCreation(pendingChanges, session);
    } else if (entityType === "character" && changeType === "update") {
      result = await applyCharacterUpdate(pendingChanges, session);
    } else {
      throw new Error(`Unsupported change type: ${entityType} ${changeType}`);
    }

    return result;
  } catch (error) {
    console.error(`❌ Error applying ${entityType} ${changeType}:`, error);
    throw error;
  }
};

module.exports = {
  applyApprovedChange,
};
