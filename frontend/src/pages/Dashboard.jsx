import { useEffect, useState } from "react";
import io from "socket.io-client";

import DashboardCards from "../components/DashboardCards";
import WorkloadChart from "../components/WorkloadChart";
import LiveWorkload from "../components/LiveWorkload";
import ClusterTopology from "../components/ClusterTopology";
import MetricsPanel from "../components/MetricsPanel";
import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";
import NodeView from "../components/NodeView";
import LiveTaskFlow from "../components/LiveTaskFlow";
import QueuePanel from "../components/QueuePanel";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  import.meta.env.VITE_API_URL ||
  window.location.origin;

const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const socket = io(SOCKET_URL);

function Dashboard() {

  const [data, setData] = useState(null);
  const [nodes, setNodes] = useState(null);

  const tasks = data?.schedule || [];

  // ---------------- DERIVED METRICS ----------------
  const totalTasks = data?.schedule?.length || 0;
  const totalNodes = data?.nodes?.length || 0;

  const validTasks = (data?.schedule || []).filter(
  (t) => t.utilization !== null && t.utilization !== undefined
);

const avgUtil =
  validTasks.length > 0
    ? Math.round(
        validTasks.reduce((sum, t) => sum + t.utilization, 0) /
        validTasks.length
      )
    : 0;

  const mostLoaded =
    data?.nodes?.length > 0
      ? data.nodes.reduce((max, node) =>
          node.load > max.load ? node : max
        )
      : null;

  // ---------------- FETCH ----------------
  const loadData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/scheduler`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  const loadNodes = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/nodes`);
      const json = await res.json();
      setNodes(json);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- SOCKET ----------------
  useEffect(() => {
    const timer = setTimeout(() => {
      void loadData();
      void loadNodes();
    }, 0);

    socket.on("schedulerUpdate", () => {
      void loadData();
      void loadNodes();
    });

    return () => {
      clearTimeout(timer);
      socket.off("schedulerUpdate");
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-gradient-to-r from-sky-700 to-blue-700 text-white px-6 py-5 shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold">Distributed AI Workload Scheduler</h1>
        <p className="text-blue-100 text-sm mt-1">Control plane view inspired by container orchestration dashboards</p>
      </header>
      <main className="p-6">

      {data ? (
        <>
          <h2 className="text-lg text-slate-600 mb-4">
            {data.message}
          </h2>

          {/* ✅ UPDATED CARDS */}
          <div className="mt-4">
            <DashboardCards
              totalTasks={totalTasks}
              totalNodes={totalNodes}
              avgUtil={avgUtil}
              mostLoaded={mostLoaded}
            />
          </div>

          <div className="mt-6">
            <WorkloadChart data={data} />
          </div>

          <div className="mt-6">
            <LiveWorkload nodes={nodes} />
          </div>

          <div className="mt-6">
            <LiveTaskFlow socket={socket} />
          </div>

          <div className="mt-6">
            <ClusterTopology />
          </div>

          <div className="mt-6">
            <MetricsPanel data={data} />
          </div>

          <div className="mt-6">
            <QueuePanel tasks={tasks} />
          </div>

          <div className="mt-6">
            <TaskForm refreshData={loadData} />
          </div>

          <div className="mt-6">
            <TaskTable />
          </div>

          <div className="mt-6">
            <NodeView tasks={tasks} />
          </div>

        </>
      ) : (
        <p className="text-slate-600">Loading scheduler data...</p>
      )}
      </main>
    </div>
  );
}

export default Dashboard;