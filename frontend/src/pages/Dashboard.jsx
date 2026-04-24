import { useEffect, useState } from "react";

import DashboardCards from "../components/DashboardCards";
import TaskTable from "../components/TaskTable";
import MetricsPanel from "../components/MetricsPanel";
import WorkloadChart from "../components/WorkloadChart";

function Dashboard() {

const [data,setData] = useState(null);

useEffect(()=>{

async function loadData(){

 try{
   const res = await fetch("/api/scheduler");
   const json = await res.json();

   setData(json);

 } catch(error){
   console.error(error);
 }

}

loadData();

},[]);

return(
<div style={{padding:"20px"}}>

<h1>Distributed AI Workload Scheduler</h1>

{data ? (
<>

<h2>{data.message}</h2>

<DashboardCards data={data} />

<WorkloadChart data={data} />

<MetricsPanel />

<TaskTable data={data} />


</>
) : (
<p>Loading scheduler data...</p>
)}

</div>
);

}

export default Dashboard;