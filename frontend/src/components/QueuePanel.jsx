function QueuePanel({ tasks = [] }) {
  const queuedTasks = tasks.filter((task) => task.assigned_node === "QUEUED");

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800">Queue Panel</h2>
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
          {queuedTasks.length} waiting
        </span>
      </div>

      {queuedTasks.length === 0 ? (
        <p className="text-sm text-slate-500">No tasks waiting. Cluster capacity is healthy.</p>
      ) : (
        <div className="space-y-2">
          {queuedTasks.map((task) => (
            <div
              key={task.task}
              className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"
            >
              <span className="text-sm font-medium text-slate-700">{task.task}</span>
              <span className="text-xs font-semibold text-amber-700">WAITING</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QueuePanel;
