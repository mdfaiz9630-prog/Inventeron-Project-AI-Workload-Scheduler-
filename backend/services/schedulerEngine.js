const nodes = {
  "GPU-1": { load: 0, capacity: 100 },
  "GPU-2": { load: 0, capacity: 100 },
  "CPU-1": { load: 0, capacity: 100 },
};

// ---------------- RESET NODES ----------------
const resetNodes = () => {
  Object.keys(nodes).forEach((node) => {
    nodes[node].load = 0;
  });
};

// ---------------- BEST NODE SELECTION ----------------
const getBestNode = (task) => {
  let bestNode = null;
  let minLoad = Infinity;

  for (const [name, node] of Object.entries(nodes)) {

    const projectedLoad = node.load + task.duration;

    // avoid overload
    if (projectedLoad <= node.capacity && projectedLoad < minLoad) {
      minLoad = projectedLoad;
      bestNode = name;
    }
  }

  // fallback → choose least loaded node
  if (!bestNode) {
    bestNode = Object.entries(nodes)
      .sort((a, b) => a[1].load - b[1].load)[0][0];
  }

  return bestNode;
};

// ---------------- SCHEDULE TASK ----------------
const scheduleTask = (task) => {
  const node = getBestNode(task);

  nodes[node].load += task.duration;

  return {
    assignedNode: node,
    nodeLoadAfter: nodes[node].load,
  };
};

// ---------------- GET NODE STATUS ----------------
const getNodeStatus = () => {
  return nodes;
};

module.exports = {
  scheduleTask,
  getNodeStatus,
  resetNodes,
  nodes
};