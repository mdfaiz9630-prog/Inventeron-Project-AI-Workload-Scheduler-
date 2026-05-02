const { runScheduler } = require("./schedulerService");

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

// ---------------- SCHEDULE TASK ----------------
const scheduleTask = async (task) => {
  const taskPayload = {
    name: task.title,
    type: task.modelType || "cnn",
    size: Number(task.inputSize ?? task.duration ?? 0),
    priority: Number(task.priority ?? 1),
  };

  const result = await runScheduler([taskPayload], buildNodePayload());
  const scheduledTask = result?.schedule?.[0];

  if (!scheduledTask) {
    throw new Error("Scheduler did not return a valid assignment");
  }

  if (scheduledTask.assigned_node === "QUEUED") {
    return {
      assignedNode: "QUEUED",
      status: "queued",
      loadImpact: 0,
      predictedTime: null,
      utilization: 0,
    };
  }

  const assignedNode = scheduledTask.assigned_node;
  const predictedTime = Number(scheduledTask.predicted_time || 0);
  const loadImpact = Math.max(predictedTime / 10, 1);

  nodes[assignedNode].load = Math.min(
    nodes[assignedNode].capacity,
    nodes[assignedNode].load + loadImpact
  );

  return {
    assignedNode,
    status: "running",
    loadImpact,
    predictedTime,
    utilization: Number(scheduledTask.utilization || 0),
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
};