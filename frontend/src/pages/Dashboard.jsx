import { useEffect, useState } from "react";

import DashboardCards from "../components/DashboardCards";
import WorkloadChart from "../components/WorkloadChart";
import LiveWorkload from "../components/LiveWorkload";
import ClusterTopology from "../components/ClusterTopology";
import MetricsPanel from "../components/MetricsPanel";
import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";

function Dashboard() {

const [data, setData] = useState(null);
const [nodes, setNodes] = useState(null);


// -------------------- FETCH TASKS --------------------
const loadData = async () => {
  try {
    const res = await fetch("/api/scheduler");
    const json = await res.json();
    setData(json);
  } catch (error) {
    console.error(error);
  }
};


// -------------------- FETCH NODES --------------------
const loadNodes = async () => {
  try {
    const res = await fetch("/api/nodes");
    const json = await res.json();
    setNodes(json);
  } catch (error) {
    console.error(error);
  }
};


// -------------------- LIVE SYNC --------------------
useEffect(() => {

loadData();
loadNodes();

const interval = setInterval(() => {
  loadData();
  loadNodes();
}, 2000);

return () => clearInterval(interval);

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


{/* LIVE WORKLOAD ANIMATION */}
<div className="mt-6">
<LiveWorkload nodes={nodes} />
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

</>

) : (

<p>Loading scheduler data...</p>

)}

</div>
);

}

export default Dashboard;