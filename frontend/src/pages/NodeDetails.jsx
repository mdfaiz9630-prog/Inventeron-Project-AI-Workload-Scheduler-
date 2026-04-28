import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function NodeDetails(){

const { nodeId } = useParams();

const [tasks,setTasks] = useState([]);

const loadTasks = async () => {

try{

const res = await fetch("/api/tasks");
const data = await res.json();

const filtered = data.filter(
(task)=> task.assignedNode === nodeId
);

setTasks(filtered);

}catch(err){
console.error(err);
}

};

useEffect(()=>{
loadTasks();
},[]);


return(

<div className="min-h-screen bg-gray-900 text-white p-8">

<h1 className="text-4xl font-bold mb-8">
{nodeId} Node Details
</h1>



{/* TOP METRICS */}
<div className="grid md:grid-cols-3 gap-6 mb-8">

<div className="bg-gray-800 rounded-3xl p-6">
<h3 className="text-gray-400">
Tasks On Node
</h3>

<h2 className="text-5xl mt-4 font-bold">
{tasks.length}
</h2>
</div>


<div className="bg-gray-800 rounded-3xl p-6">
<h3 className="text-gray-400">
Utilization
</h3>

<h2 className="text-5xl mt-4 font-bold">
{Math.min(tasks.length*20+20,95)}%
</h2>
</div>


<div className="bg-gray-800 rounded-3xl p-6">
<h3 className="text-gray-400">
Health
</h3>

<h2 className="text-3xl mt-4 font-bold">
{tasks.length > 4 ? "Busy" : "Healthy"}
</h2>
</div>

</div>



{/* WORKLOADS */}
<div className="bg-gray-800 rounded-3xl p-6 mb-8">

<h2 className="text-2xl font-bold mb-6">
Assigned Workloads
</h2>

{tasks.length===0 ? (

<p className="text-gray-400">
No workloads assigned
</p>

):(

<div className="space-y-4">

{tasks.map((task)=>(

<div
key={task._id}
className="
bg-gray-700
rounded-xl
p-4
flex
justify-between
"
>

<div>

<h3 className="font-semibold">
{task.title}
</h3>

<p className="text-gray-400 text-sm">
Priority {task.priority}
</p>

</div>

<span>
{task.status}
</span>

</div>

))}

</div>

)}

</div>



{/* LOAD BALANCING INSIGHT */}
<div className="bg-gray-800 rounded-3xl p-6 mb-8">

<h2 className="text-2xl font-bold mb-6">
Load Balancing Insight
</h2>

<p>
Node currently handling {tasks.length} active workloads.
Scheduler dynamically redistributes jobs when utilization rises.
</p>

</div>



{/* NEW MIGRATION EVENT FEATURE */}
<div className="bg-gray-800 rounded-3xl p-6 mt-8">

<h2 className="text-2xl font-bold mb-6">
Migration Event
</h2>

{tasks.length > 4 ? (

<div className="text-yellow-300 font-semibold">
⚠ Workload migration triggered:
moving tasks from {nodeId} to CPU-1
</div>

) : (

<div className="text-green-300 font-semibold">
No migration required.
Node stable.
</div>

)}

</div>


</div>

);

}

export default NodeDetails;