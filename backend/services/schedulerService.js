const { exec } = require("child_process");
const path = require("path");

function runScheduler(tasks, nodes) {
  return new Promise((resolve, reject) => {

    const input = JSON.stringify({ tasks, nodes });

    const scriptPath = path.join(
      __dirname,
      "../../ai-engine/core/scheduler_runner.py"
    );

    const command = `python3 "${scriptPath}" '${input}'`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Python Error:", stderr);
        return reject(error);
      }

      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch (err) {
        console.error("Parse Error:", stdout);
        reject(err);
      }
    });
  });
}

module.exports = { runScheduler };