import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function TaskTable({ refreshData }) {

  const [tasks, setTasks] = useState([]);

  // ---------------- LOAD TASKS ----------------
  const loadTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // ---------------- DELETE TASK ----------------
  const deleteTask = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      toast.success("Task deleted successfully");

      loadTasks();
      refreshData?.();

    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // ---------------- CLEAR ALL TASKS ----------------
  const clearAll = async () => {
    try {
      await fetch("/api/tasks/clear/all", {
        method: "DELETE",
      });

      toast.warning("All tasks cleared");

      loadTasks();
      refreshData?.();

    } catch (err) {
      toast.error("Clear failed");
    }
  };


  return (
    <div className="bg-gray-800 p-6 rounded-2xl mt-6">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">
          Scheduled Tasks
        </h2>

        <button
          onClick={clearAll}
          className="bg-yellow-500 hover:bg-yellow-600 transition text-black px-3 py-1 rounded"
        >
          Clear All
        </button>
      </div>


      {/* TABLE */}
      <table className="w-full text-left">

        <thead>
          <tr className="text-gray-400">
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
              <td colSpan="5" className="text-center text-gray-400 py-4">
                No tasks available
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr
                key={task._id}
                className="border-t border-gray-700"
              >

                <td>{task.title}</td>
                <td>{task.priority}</td>
                <td>{task.assignedNode || "N/A"}</td>
                <td>{task.status}</td>

                <td>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 hover:bg-red-600 transition px-2 py-1 rounded text-white"
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