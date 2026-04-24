import { useEffect, useState } from "react";

import DashboardCards from "../components/DashboardCards";
import WorkloadChart from "../components/WorkloadChart";
import MetricsPanel from "../components/MetricsPanel";
import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";

function Dashboard(){

const [data,setData] = useState(null);


const loadData = async () => {
try{
 const res = await fetch("/api/scheduler");
 const json = await res.json();

 setData(json);

}catch(error){
 console.error(error);
}
};


useEffect(()=>{
loadData();
},[]);


return(
<div className="min-h-screen bg-gray-900 text-white p-6">

<h1 className="text-3xl font-bold mb-6">
Distributed AI Workload Scheduler
</h1>


{data ? (
<>

<h2 className="text-lg text-gray-300 mb-4">
{data.message}
</h2>

<div className="mt-8">
<DashboardCards data={data}/>
</div>


<div className="mt-8">
<WorkloadChart data={data}/>
</div>


<div className="mt-8">
<MetricsPanel data={data}/>
</div>


<div className="mt-8">
<TaskForm refreshData={loadData}/>
</div>


<div className="mt-8">
<TaskTable/>
</div>

</>

):(
<p>Loading scheduler data...</p>
)}

</div>
);

}

export default Dashboard;