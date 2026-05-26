import { useState } from "react";
import { toast } from "react-toastify";

function InfoBadge({ text }) {
  return (
    <span
      title={text}
      className="inline-flex items-center justify-center w-4 h-4 ml-1 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold cursor-help"
      aria-label={text}
    >
      i
    </span>
  );
}

function TaskForm({ refreshData }) {

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("30");
  const [priority, setPriority] = useState("2");
  const [modelType, setModelType] = useState("cnn");
  const [inputSize, setInputSize] = useState("256");
  const [utilizationPercent, setUtilizationPercent] = useState("20");

  const inputSizeOptionsByModel = {
    cnn: [64, 128, 256, 512],
    transformer: [128, 256, 512, 1024],
    llm: [512, 1024, 2048, 4096],
  };

  const handleModelChange = (value) => {
    setModelType(value);
    setInputSize(String(inputSizeOptionsByModel[value][0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!title || !duration || !priority) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/tasks", {
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
          utilizationPercent: Number(utilizationPercent),
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
      setDuration("30");
      setPriority("2");
      setModelType("cnn");
      setInputSize("256");
      setUtilizationPercent("20");

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

        <div>
          <label className="flex items-center text-sm font-medium text-slate-600 mb-1">
            Duration (seconds)
            <InfoBadge text="How long the task runs. Recommended: 10-60 seconds." />
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="10">10s (short)</option>
            <option value="20">20s</option>
            <option value="30">30s (recommended)</option>
            <option value="45">45s</option>
            <option value="60">60s (long)</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">Suggested range: 10-60 seconds</p>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-slate-600 mb-1">
            Priority
            <InfoBadge text="1 is highest priority, 5 is lowest." />
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="1">1 - Highest</option>
            <option value="2">2 - High</option>
            <option value="3">3 - Medium</option>
            <option value="4">4 - Low</option>
            <option value="5">5 - Lowest</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">Range: 1 (highest) to 5 (lowest)</p>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-slate-600 mb-1">
            Model Type
            <InfoBadge text="Model type determines preferred compute node type and baseline load." />
          </label>
          <select
            value={modelType}
            onChange={(e) => handleModelChange(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="cnn">CNN (image workloads)</option>
            <option value="transformer">Transformer (seq workloads)</option>
            <option value="llm">LLM (heavy GPU workloads)</option>
          </select>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-slate-600 mb-1">
            Input Size
            <InfoBadge text="Input/token/image batch size. Larger values increase scheduler load impact." />
          </label>
          <select
            value={inputSize}
            onChange={(e) => setInputSize(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {inputSizeOptionsByModel[modelType].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-500 mt-1">Suggested by model type to avoid invalid values</p>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-slate-600 mb-1">
            Utilization %
            <InfoBadge text="Approximate load this task adds to the selected node." />
          </label>
          <select
            value={utilizationPercent}
            onChange={(e) => setUtilizationPercent(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="10">10% (light)</option>
            <option value="20">20% (recommended)</option>
            <option value="30">30%</option>
            <option value="40">40%</option>
            <option value="50">50% (heavy)</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">Range: 10%-50% for realistic balancing</p>
        </div>

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