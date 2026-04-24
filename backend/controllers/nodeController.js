const { getNodeStatus } = require("../services/schedulerEngine");

function getNodes(req, res) {
  res.json(getNodeStatus());
}

module.exports = { getNodes };