import { useState } from "react";
import { toast } from "react-toastify";

function TaskForm({ refreshData }) {

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [priority, setPriority] = useState("");
  const [modelType, setModelType] = useState("cnn");
  const [inputSize, setInputSize] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!title || !duration || !priority) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          duration: Number(duration),
          priority: Number(priority),
          modelType,
          inputSize: Number(inputSize || duration),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create task");
        return;
      }

      toast.success("Task created successfully");

      // reset form
      setTitle("");
      setDuration("");
      setPriority("");
      setModelType("cnn");
      setInputSize("");

      refreshData?.();

    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-slate-800 mb-1">
        Create New Workload
      </h2>
      <p className="text-sm text-slate-500 mb-4">Queue a workload to scheduler control plane</p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Task Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        <input
          type="number"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        <input
          type="number"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        <select
          value={modelType}
          onChange={(e) => setModelType(e.target.value)}
          className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="cnn">CNN</option>
          <option value="transformer">Transformer</option>
          <option value="llm">LLM</option>
        </select>

        <input
          type="number"
          placeholder="Input Size"
          value={inputSize}
          onChange={(e) => setInputSize(e.target.value)}
          className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition"
        >
          Schedule Task
        </button>

      </form>
    </div>
  );
}

export default TaskForm;