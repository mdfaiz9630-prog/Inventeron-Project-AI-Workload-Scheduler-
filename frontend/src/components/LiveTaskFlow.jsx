import { useEffect, useState } from "react";

function LiveTaskFlow({ socket }) {

  const [events, setEvents] = useState([]);

  useEffect(() => {

    if (!socket) return;

    socket.on("schedulerUpdate", (data) => {

      const newEvent = {
        id: Date.now(),
        type: data.event,
        task: data.task?.title || "Task",
        node: data.task?.assignedNode || "",
        time: new Date().toLocaleTimeString()
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 6)]);
    });

    return () => {
      socket.off("schedulerUpdate");
    };

  }, [socket]);


  return (
    <div className="bg-gray-800 rounded-3xl p-6 mt-6">

      <h2 className="text-xl font-bold mb-4">
        Live Workload Flow
      </h2>

      <div className="space-y-3">

        {events.length === 0 ? (
          <p className="text-gray-400">
            Waiting for task events...
          </p>
        ) : (
          events.map((e) => (
            <div
              key={e.id}
              className="bg-gray-700 p-3 rounded-xl flex justify-between"
            >
              <div>
                <p className="font-semibold">
                  {e.task}
                </p>

                <p className="text-sm text-gray-400">
                  {e.type} → {e.node}
                </p>
              </div>

              <span className="text-xs text-gray-300">
                {e.time}
              </span>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default LiveTaskFlow;