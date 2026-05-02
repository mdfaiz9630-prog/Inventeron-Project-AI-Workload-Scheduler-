function MetricsPanel({ data }) {

  const tasks = data?.schedule || [];
  const totalTasks = tasks.length;

  // -------- AVG INFERENCE --------
  const avgInference =
    totalTasks > 0
      ? Math.round(
          tasks.reduce(
            (sum, t) => sum + (t.predicted_time || 0),
            0
          ) / totalTasks
        )
      : 0;

  // -------- AVG UTILIZATION --------
  const avgUtil =
    totalTasks > 0
      ? Math.round(
          tasks.reduce(
            (sum, t) => sum + (t.utilization || 0),
            0
          ) / totalTasks
        )
      : 0;

  // -------- AVG MEMORY (OPTIONAL PLACEHOLDER) --------
  const avgMemory = 0;

  const metrics = [
    { label: "Avg Inference", value: `${avgInference} ms`, color: "text-blue-700", bar: "bg-blue-500", pct: Math.min(avgInference / 2, 100) },
    { label: "Avg Memory", value: `${avgMemory} MB`, color: "text-violet-700", bar: "bg-violet-500", pct: Math.min(avgMemory / 2, 100) },
    { label: "Avg Utilization", value: `${avgUtil}%`, color: "text-amber-700", bar: "bg-amber-500", pct: avgUtil },
  ];

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Performance Metrics</h2>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{metric.label}</p>
              <p className={`text-xl font-bold ${metric.color}`}>{metric.value}</p>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 mt-2 overflow-hidden">
              <div className={`h-2 rounded-full ${metric.bar}`} style={{ width: `${metric.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MetricsPanel;