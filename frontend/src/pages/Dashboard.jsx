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


// socket instance (single connection)
const socket = io("http://localhost:8000");


function Dashboard() {

  const [data, setData] = useState(null);
  const [nodes, setNodes] = useState(null);

  const tasks = data?.schedule || [];


  // ---------------- FETCH SCHEDULER ----------------
  const loadData = async () => {
    try {
      const res = await fetch("/api/scheduler");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };


  // ---------------- FETCH NODES ----------------
  const loadNodes = async () => {
    try {
      const res = await fetch("/api/nodes");
      const json = await res.json();
      setNodes(json);
    } catch (err) {
      console.error(err);
    }
  };


  // ---------------- REALTIME SOCKET SYNC ----------------
  useEffect(() => {

    loadData();
    loadNodes();


    socket.on("schedulerUpdate", (payload) => {
      console.log("Live update:", payload);

      loadData();
      loadNodes();
    });


    return () => {
      socket.off("schedulerUpdate");
    };

  }, []);


  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        Distributed AI Workload Scheduler
      </h1>


      {data ? (
        <>
          <h2 className="text-lg text-gray-300 mb-4">
            {data.message}
          </h2>


          {/* DASHBOARD CARDS */}
          <div className="mt-6">
            <DashboardCards data={data} />
          </div>


          {/* WORKLOAD CHART */}
          <div className="mt-6">
            <WorkloadChart data={data} />
          </div>


          {/* LIVE WORKLOAD VISUAL */}
          <div className="mt-6">
            <LiveWorkload nodes={nodes} />
          </div>


          {/* LIVE TASK FLOW (NEW) */}
          <div className="mt-6">
            <LiveTaskFlow socket={socket} />
          </div>


          {/* CLUSTER TOPOLOGY */}
          <div className="mt-6">
            <ClusterTopology />
          </div>


          {/* METRICS */}
          <div className="mt-6">
            <MetricsPanel data={data} />
          </div>


          {/* TASK FORM */}
          <div className="mt-6">
            <TaskForm refreshData={loadData} />
          </div>


          {/* TASK TABLE */}
          <div className="mt-6">
            <TaskTable />
          </div>


          {/* NODE VIEW */}
          <div className="mt-6">
            <NodeView tasks={tasks} />
          </div>

        </>
      ) : (
        <p>Loading scheduler data...</p>
      )}

    </div>
  );
}

export default Dashboard;