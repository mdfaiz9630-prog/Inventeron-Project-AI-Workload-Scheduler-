async function run() {
  const baseUrl = process.env.API_BASE_URL || "http://localhost:8000";
  const marker = `integration-${Date.now()}`;

  const createRes = await fetch(`${baseUrl}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: marker,
      duration: 2,
      priority: 1,
      modelType: "cnn",
      inputSize: 2,
    }),
  });

  if (!createRes.ok) {
    const body = await createRes.text();
    throw new Error(`Create failed: ${createRes.status} ${body}`);
  }

  const createdTask = await createRes.json();
  if (!createdTask?._id) {
    throw new Error("Create response did not return task ID");
  }

  const listRes = await fetch(`${baseUrl}/api/tasks`);
  if (!listRes.ok) {
    const body = await listRes.text();
    throw new Error(`List failed: ${listRes.status} ${body}`);
  }

  const tasks = await listRes.json();
  const exists = tasks.some((task) => task._id === createdTask._id);
  if (!exists) {
    throw new Error("Created task not found in task list");
  }

  const deleteRes = await fetch(`${baseUrl}/api/tasks/${createdTask._id}`, {
    method: "DELETE",
  });

  if (!deleteRes.ok) {
    const body = await deleteRes.text();
    throw new Error(`Delete failed: ${deleteRes.status} ${body}`);
  }

  console.log("Integration check passed: create/list/delete flow is healthy.");
}

run().catch((error) => {
  console.error(`Integration check failed: ${error.message}`);
  process.exit(1);
});
