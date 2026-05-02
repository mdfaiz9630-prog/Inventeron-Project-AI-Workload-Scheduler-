import { useNavigate } from "react-router-dom";

function NodeView({ tasks = [] }) {

  const navigate = useNavigate();

  // -------- BUILD NODE DATA FROM TASKS --------
  const nodeMap = {};

  tasks.forEach((task) => {
    const node = task.assigned_node;

    if (!node) return;

    if (!nodeMap[node]) {
      nodeMap[node] = {
        tasks: 0,
        load: 0,
      };
    }

    nodeMap[node].tasks += 1;
    nodeMap[node].load += task.utilization || 0;
  });

  // -------- STATIC NODE INFO --------
  const baseNodes = [
    { name: "GPU-1", type: "Inference GPU", memory: "18 / 24 GB" },
    { name: "CPU-1", type: "Compute Node", memory: "42 / 64 GB" },
    { name: "GPU-2", type: "Training GPU", memory: "20 / 24 GB" }
  ];

  // -------- MERGE --------
  const nodes = baseNodes.map((node) => {
    const dynamic = nodeMap[node.name] || { tasks: 0, load: 0 };

    const util = Math.min(dynamic.load, 100);

    let health = "Healthy";
    let healthColor = "text-emerald-700 bg-emerald-100";

    if (util > 80) {
      health = "Overloaded";
      healthColor = "text-rose-700 bg-rose-100";
    } else if (util > 50) {
      health = "Moderate";
      healthColor = "text-amber-700 bg-amber-100";
    }

    return {
      ...node,
      util,
      tasks: dynamic.tasks,
      health,
      healthColor
    };
  });

  // -------- COLOR --------
  const getColor = (util) => {
    if (util < 50) return "bg-emerald-500";
    if (util < 80) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div>

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Cluster Compute Nodes
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {nodes.map((node, index) => (

          <div
            key={index}
            className="
              bg-white p-6 rounded-xl border border-slate-200
              hover:-translate-y-1 hover:shadow-lg
              transition-all duration-200
            "
          >

            {/* HEADER */}
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-800">{node.name}</h3>
                <p className="text-slate-500 text-sm">{node.type}</p>
              </div>

              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${node.healthColor}`}>
                {node.health}
              </span>
            </div>

            {/* UTIL */}
            <div className="text-3xl font-bold text-slate-800 mb-2 transition-all duration-500">
              {node.util}%
            </div>

            {/* BAR */}
            <div className="w-full bg-slate-100 h-3 rounded overflow-hidden">
              <div
                className={`${getColor(node.util)} h-3 rounded transition-all duration-700 ease-in-out`}
                style={{ width: `${node.util}%` }}
              />
            </div>

            {/* INFO */}
            <div className="mt-4 text-sm text-slate-600 space-y-1">
              <p>Workloads: {node.tasks}</p>
              <p>Memory: {node.memory}</p>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => navigate(`/nodes/${node.name}`)}
              className="
                mt-4 w-full
                bg-blue-600 hover:bg-blue-700 text-white
                rounded-lg py-2 font-semibold
                transition
              "
            >
              View Node
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default NodeView;