import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function NodeDetails(){

const { nodeId } = useParams();

const [tasks,setTasks] = useState([]);

useEffect(()=>{
const timer = setTimeout(() => {
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

void loadTasks();
}, 0);

return () => clearTimeout(timer);
},[nodeId]);


return(

<div className="min-h-screen bg-slate-50 text-slate-800 p-8">

<h1 className="text-4xl font-bold mb-2">
{nodeId} Node Details
</h1>
<p className="text-slate-500 mb-8">Per-node workload, health, and balancing insights</p>



{/* TOP METRICS */}
<div className="grid md:grid-cols-3 gap-6 mb-8">

<div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
<h3 className="text-slate-500">
Tasks On Node
</h3>

<h2 className="text-5xl text-slate-800 mt-4 font-bold">
{tasks.length}
</h2>
</div>


<div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
<h3 className="text-slate-500">
Utilization
</h3>

<h2 className="text-5xl text-slate-800 mt-4 font-bold">
{Math.min(tasks.length*20+20,95)}%
</h2>
</div>


<div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
<h3 className="text-slate-500">
Health
</h3>

<h2 className={`text-3xl mt-4 font-bold ${tasks.length > 4 ? "text-amber-700" : "text-emerald-700"}`}>
{tasks.length > 4 ? "Busy" : "Healthy"}
</h2>
</div>

</div>



{/* WORKLOADS */}
<div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-sm">

<h2 className="text-2xl text-slate-800 font-bold mb-6">
Assigned Workloads
</h2>

{tasks.length===0 ? (

<p className="text-slate-400">
No workloads assigned
</p>

):(

<div className="space-y-4">

{tasks.map((task)=>(

<div
key={task._id}
className="
bg-slate-50
border border-slate-200
rounded-lg
p-4
flex
justify-between
"
>

<div>

<h3 className="font-semibold">
{task.title}
</h3>

<p className="text-slate-500 text-sm">
Priority {task.priority}
</p>

</div>

<span className="text-slate-600 text-sm font-medium">
{task.status}
</span>

</div>

))}

</div>

)}

</div>



{/* LOAD BALANCING INSIGHT */}
<div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-sm">

<h2 className="text-2xl text-slate-800 font-bold mb-6">
Load Balancing Insight
</h2>

<p className="text-slate-600">
Node currently handling {tasks.length} active workloads.
Scheduler dynamically redistributes jobs when utilization rises.
</p>

</div>



{/* NEW MIGRATION EVENT FEATURE */}
<div className="bg-white border border-slate-200 rounded-xl p-6 mt-8 shadow-sm">

<h2 className="text-2xl text-slate-800 font-bold mb-6">
Migration Event
</h2>

{tasks.length > 4 ? (

<div className="text-amber-700 bg-amber-100 border border-amber-200 rounded-lg px-3 py-2 font-semibold">
⚠ Workload migration triggered:
moving tasks from {nodeId} to CPU-1
</div>

) : (

<div className="text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-lg px-3 py-2 font-semibold">
No migration required.
Node stable.
</div>

)}

</div>


</div>

);

}

export default NodeDetails;