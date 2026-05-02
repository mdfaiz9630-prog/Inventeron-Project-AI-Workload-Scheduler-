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
    <div className="bg-white border border-slate-200 rounded-xl p-6 mt-6 shadow-sm">

      <h2 className="text-xl text-slate-800 font-bold mb-4">
        Live Workload Flow
      </h2>

      <div className="space-y-3">

        {events.length === 0 ? (
          <p className="text-slate-400">
            Waiting for task events...
          </p>
        ) : (
          events.map((e) => (
            <div
              key={e.id}
              className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex justify-between"
            >
              <div>
                <p className="font-semibold text-slate-700">
                  {e.task}
                </p>

                <p className="text-sm text-slate-500">
                  {e.type} → {e.node}
                </p>
              </div>

              <span className="text-xs text-slate-400">
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