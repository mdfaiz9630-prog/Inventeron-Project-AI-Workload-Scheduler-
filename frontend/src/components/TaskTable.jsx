import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

function TaskTable({ refreshData }) {

  const [tasks, setTasks] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL || "";

  // ---------------- LOAD TASKS ----------------
  const loadTasks = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch {
      toast.error("Failed to load tasks");
    }
  }, [BASE_URL]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadTasks();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadTasks]);

  // ---------------- DELETE TASK ----------------
  const deleteTask = async (id) => {
    try {
      await fetch(`${BASE_URL}/api/tasks/${id}`, {
        method: "DELETE",
      });

      toast.success("Task deleted successfully");

      loadTasks();
      refreshData?.();

    } catch {
      toast.error("Delete failed");
    }
  };

  // ---------------- CLEAR ALL TASKS ----------------
  const clearAll = async () => {
    try {
      await fetch(`${BASE_URL}/api/tasks/clear/all`, {
        method: "DELETE",
      });

      toast.warning("All tasks cleared");

      loadTasks();
      refreshData?.();

    } catch {
      toast.error("Clear failed");
    }
  };


  return (
    <div className="bg-white border border-slate-200 p-6 rounded-xl mt-6 shadow-sm">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800">
          Scheduled Tasks
        </h2>

        <button
          onClick={clearAll}
          className="bg-amber-100 text-amber-800 hover:bg-amber-200 transition px-3 py-1.5 rounded-lg font-semibold"
        >
          Clear All
        </button>
      </div>


      {/* TABLE */}
      <table className="w-full text-left text-sm">

        <thead>
          <tr className="text-slate-500 border-b border-slate-200">
            <th>Task</th>
            <th>Priority</th>
            <th>Node</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-slate-400 py-4">
                No tasks available
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr
                key={task._id}
                className="border-t border-slate-100 text-slate-700"
              >

                <td>{task.title}</td>
                <td>{task.priority}</td>
                <td>{task.assignedNode || "N/A"}</td>
                <td>{task.status}</td>

                <td>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-rose-100 text-rose-700 hover:bg-rose-200 transition px-2.5 py-1 rounded-lg font-semibold"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))
          )}
        </tbody>

      </table>

    </div>
  );
}

export default TaskTable;