const nodes = [
  { name: "GPU-1", load: 0 },
  { name: "CPU-1", load: 0 },
  { name: "GPU-2", load: 0 }
];

// simple load-balanced scheduler
const assignNode = (task) => {

let selected = nodes[0];

for (let node of nodes) {
  if (node.load < selected.load) {
    selected = node;
  }
}

// simulate load increase
selected.load += task.duration;

return selected.name;

};

module.exports = { assignNode };