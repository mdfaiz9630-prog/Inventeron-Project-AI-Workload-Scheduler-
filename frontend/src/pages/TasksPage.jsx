import { useCallback, useEffect, useState } from "react";

function TasksPage() {

  const [tasks, setTasks] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL || "";

  const loadTasks = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch {
      console.error("Failed to load tasks");
    }
  }, [BASE_URL]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadTasks();
    }, 0);

    const interval = setInterval(() => {
      void loadTasks();
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [loadTasks]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8">

      <h1 className="text-3xl font-bold mb-2">
        All Tasks
      </h1>
      <p className="text-slate-500 mb-6">Cluster task queue with live scheduling status</p>

      <div className="bg-white border border-slate-200 p-4 rounded-xl overflow-x-auto shadow-sm">

        <table className="w-full text-slate-700">

          <thead>
            <tr className="border-b border-slate-200 text-slate-500 text-sm">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Node</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>

            {tasks.map((task) => (
              <tr key={task._id} className="border-b border-slate-100">

                <td className="p-3">{task.title}</td>
                <td className="p-3">{task.priority}</td>
                <td className="p-3">{task.duration}</td>

                <td className="p-3 text-blue-700 font-medium">
                  {task.assignedNode || "Not Assigned"}
                </td>

                <td className="p-3">

                  <span className={
                    task.status === "completed"
                      ? "text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full text-xs font-semibold"
                      : task.status === "running"
                      ? "text-amber-700 bg-amber-100 px-2 py-1 rounded-full text-xs font-semibold"
                      : "text-sky-700 bg-sky-100 px-2 py-1 rounded-full text-xs font-semibold"
                  }>
                    {task.status}
                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default TasksPage;