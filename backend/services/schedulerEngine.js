const nodes = {
  "GPU-1": { load: 0, capacity: 100 },
  "GPU-2": { load: 0, capacity: 100 },
  "CPU-1": { load: 0, capacity: 100 },
};

// reset or initialize node state
const resetNodes = () => {
  Object.keys(nodes).forEach((n) => {
    nodes[n].load = 0;
  });
};

// pick best node based on least load
const getBestNode = (task) => {
  let bestNode = null;
  let minLoad = Infinity;

  for (const [name, node] of Object.entries(nodes)) {
    const projectedLoad = node.load + task.duration;

    if (projectedLoad <= node.capacity && projectedLoad < minLoad) {
      minLoad = projectedLoad;
      bestNode = name;
    }
  }

  // fallback if all overloaded
  if (!bestNode) {
    bestNode = "CPU-1";
  }

  return bestNode;
};

// assign task
const scheduleTask = (task) => {
  const node = getBestNode(task);

  nodes[node].load += task.duration;

  return {
    assignedNode: node,
    nodeLoadAfter: nodes[node].load,
  };
};

// get node status
const getNodeStatus = () => {
  return nodes;
};

module.exports = {
  scheduleTask,
  getNodeStatus,
  resetNodes,
};