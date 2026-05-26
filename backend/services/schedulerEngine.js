const nodes = {
  "GPU-1": { load: 0, capacity: 100, type: "gpu" },
  "GPU-2": { load: 0, capacity: 100, type: "gpu" },
  "CPU-1": { load: 0, capacity: 100, type: "cpu" },
};

// ---------------- RESET NODES ----------------
const resetNodes = () => {
  Object.keys(nodes).forEach((node) => {
    nodes[node].load = 0;
  });
};

const buildNodePayload = () => {
  return Object.entries(nodes).map(([name, node]) => ({
    name,
    type: node.type,
    load: node.load,
  }));
};

const MODEL_TO_NODE_TYPE = {
  cnn: "gpu",
  transformer: "gpu",
  llm: "gpu",
};

const inferRequiredNodeType = (task) => {
  if (task.nodeType) {
    return String(task.nodeType).toLowerCase();
  }
  if (task.modelType) {
    return MODEL_TO_NODE_TYPE[String(task.modelType).toLowerCase()] || "cpu";
  }
  return "cpu";
};

const inferUtilizationImpact = (task) => {
  const explicit = Number(task.utilizationPercent);
  if (Number.isFinite(explicit) && explicit > 0) {
    return Math.min(explicit, 100);
  }

  const modelType = String(task.modelType || "cnn").toLowerCase();
  const inputSize = Number(task.inputSize ?? task.duration ?? 1);
  const base = modelType === "llm" ? 30 : modelType === "transformer" ? 22 : 15;
  const scaled = base + inputSize * 0.4;
  return Math.min(Math.max(Math.round(scaled), 5), 100);
};

const chooseLeastLoadedNode = (requiredType) => {
  const candidates = Object.entries(nodes)
    .filter(([, node]) => node.type === requiredType)
    .filter(([, node]) => node.load < node.capacity);

  if (candidates.length === 0) {
    return null;
  }

  const minLoad = Math.min(...candidates.map(([, node]) => node.load));
  const ties = candidates.filter(([, node]) => node.load === minLoad);
  const [selectedName] = ties[Math.floor(Math.random() * ties.length)];
  return selectedName;
};

// ---------------- SCHEDULE TASK ----------------
const scheduleTask = async (task) => {
  const requiredType = inferRequiredNodeType(task);
  const loadImpact = inferUtilizationImpact(task);
  const assignedNode = chooseLeastLoadedNode(requiredType);

  if (!assignedNode) {
    return {
      assignedNode: "QUEUED",
      status: "queued",
      loadImpact: 0,
      predictedTime: null,
      utilization: 0,
    };
  }

  nodes[assignedNode].load = Math.min(
    nodes[assignedNode].capacity,
    nodes[assignedNode].load + loadImpact
  );

  return {
    assignedNode,
    status: "running",
    loadImpact,
    predictedTime: Number(task.inputSize ?? task.duration ?? 0),
    utilization: loadImpact,
    requiredNodeType: requiredType,
  };
};

const releaseNodeLoad = (nodeName, loadImpact) => {
  if (!nodeName || !nodes[nodeName]) {
    return;
  }

  nodes[nodeName].load -= Number(loadImpact || 0);
  if (nodes[nodeName].load < 0) {
    nodes[nodeName].load = 0;
  }
};

// ---------------- GET NODE STATUS ----------------
const getNodeStatus = () => {
  return nodes;
};

module.exports = {
  scheduleTask,
  getNodeStatus,
  resetNodes,
  nodes,
  releaseNodeLoad,
  buildNodePayload,
  inferRequiredNodeType,
  inferUtilizationImpact,
};