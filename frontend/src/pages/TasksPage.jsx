import { useEffect, useState } from "react";

function TasksPage() {

  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();

    const interval = setInterval(() => {
      loadTasks();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        All Tasks
      </h1>

      <div className="bg-gray-800 p-4 rounded-xl overflow-x-auto">

        <table className="w-full text-white">

          <thead>
            <tr className="border-b border-gray-600">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Node</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>

            {tasks.map((task) => (
              <tr key={task._id} className="border-b border-gray-700">

                <td className="p-3">{task.title}</td>
                <td className="p-3">{task.priority}</td>
                <td className="p-3">{task.duration}</td>

                <td className="p-3 text-blue-400">
                  {task.assignedNode || "Not Assigned"}
                </td>

                <td className="p-3">

                  <span className={
                    task.status === "completed"
                      ? "text-green-400"
                      : task.status === "running"
                      ? "text-yellow-400"
                      : "text-blue-400"
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