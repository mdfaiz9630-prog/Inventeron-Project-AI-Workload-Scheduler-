import { useState } from "react";

function TaskForm({ refreshData }) {

  const [task, setTask] = useState("");
  const [priority, setPriority] = useState(1);
  const [duration, setDuration] = useState("");

  const submitTask = async (e) => {
    e.preventDefault();

    const newTask = {
      title: task,
      priority: Number(priority),
      duration: Number(duration)
    };

    try {
      // ✅ FIXED: direct backend URL
      await fetch("http://localhost:8000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      });

      alert("Task Added Successfully");

      if (refreshData) {
        await refreshData();
      }

      setTask("");
      setPriority(1);
      setDuration("");

    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-4">
        Create New Workload
      </h2>

      <form onSubmit={submitTask} className="space-y-4">

        <input
          className="w-full p-3 rounded bg-white text-black"
          placeholder="Task Name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-white text-black"
          type="number"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-white text-black"
          type="number"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 px-6 py-3 rounded"
        >
          Schedule Task
        </button>

      </form>

    </div>
  );
}

export default TaskForm;