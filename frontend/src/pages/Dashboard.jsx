import { useEffect, useState } from "react";

import DashboardCards from "../components/DashboardCards";
import WorkloadChart from "../components/WorkloadChart";
import LiveWorkload from "../components/LiveWorkload";
import ClusterTopology from "../components/ClusterTopology";
import MetricsPanel from "../components/MetricsPanel";
import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";
import NodeView from "../components/NodeView";

function Dashboard() {

const [data,setData] = useState(null);
const [nodes,setNodes] = useState(null);

const tasks = data?.schedule || [];


// ---------------- FETCH SCHEDULER ----------------
const loadData = async () => {

try{
const res = await fetch("/api/scheduler");
const json = await res.json();
setData(json);
}catch(error){
console.error(error);
}

};


// ---------------- FETCH NODES ----------------
const loadNodes = async () => {

try{
const res = await fetch("/api/nodes");
const json = await res.json();
setNodes(json);
}catch(error){
console.error(error);
}

};


// ---------------- LIVE REFRESH ----------------
useEffect(()=>{

loadData();
loadNodes();

const interval = setInterval(()=>{
loadData();
loadNodes();
},2000);

return ()=>clearInterval(interval);

},[]);



return(
<div className="min-h-screen bg-gray-900 text-white p-8">

{/* HEADER */}
<div className="mb-10">

<h1 className="text-5xl font-bold mb-3">
AI Scheduler Control Plane
</h1>

<p className="text-gray-400 text-lg">
Real-time distributed workload orchestration dashboard
</p>

</div>



{data ? (

<>

{/* KPI CARDS */}
<div className="mb-8">
<DashboardCards data={data}/>
</div>



{/* NODE GRID */}
<div className="mb-8">
<NodeView tasks={tasks}/>
</div>



{/* ANALYTICS ROW */}
<div className="grid md:grid-cols-2 gap-6 mb-8">

<div className="bg-gray-800 rounded-3xl p-6 shadow-xl">
<WorkloadChart data={data}/>
</div>

<div className="bg-gray-800 rounded-3xl p-6 shadow-xl">
<MetricsPanel data={data}/>
</div>

</div>



{/* LIVE WORKLOAD + TOPOLOGY */}
<div className="grid md:grid-cols-2 gap-6 mb-8">

<div className="bg-gray-800 rounded-3xl p-6 shadow-xl">
<LiveWorkload nodes={nodes}/>
</div>

<div className="bg-gray-800 rounded-3xl p-6 shadow-xl">
<ClusterTopology/>
</div>

</div>



{/* TASK SECTION */}
<div className="grid md:grid-cols-3 gap-6">

<div className="md:col-span-1">
<TaskForm refreshData={loadData}/>
</div>

<div className="md:col-span-2 bg-gray-800 rounded-3xl p-6 shadow-xl">
<TaskTable/>
</div>

</div>

</>

) : (

<p>Loading scheduler data...</p>

)}

</div>
);

}

export default Dashboard;