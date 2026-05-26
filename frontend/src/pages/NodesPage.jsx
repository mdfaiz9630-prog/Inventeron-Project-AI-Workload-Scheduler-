import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NodesPage(){

const [nodes,setNodes] = useState([]);
const navigate = useNavigate();

const loadNodes = useCallback(async ()=>{

try{

const res = await fetch("/api/tasks");
const tasks = await res.json();

const baseNodes = [
{ name:"GPU-1", capacity:100 },
{ name:"CPU-1", capacity:100 },
{ name:"GPU-2", capacity:100 }
];

const computed = baseNodes.map(node=>{

const assignedTasks = tasks.filter(
t=>t.assignedNode===node.name
);

const taskLoad =
assignedTasks.reduce(
(acc,t)=> acc + (t.duration || 10),
0
);

return {
...node,
tasks: assignedTasks.length,
load: Math.min(taskLoad*4,95)
};

});

setNodes(computed);

}catch{
console.error("Failed to load nodes");
}

}, []);


useEffect(()=>{

const timer = setTimeout(() => {
void loadNodes();
}, 0);

const interval=setInterval(()=>{
void loadNodes();
},2000);

return ()=>{
clearTimeout(timer);
clearInterval(interval);
};

},[loadNodes]);


return(

<div className="min-h-screen bg-slate-50 text-slate-800 p-8">

<h1 className="text-4xl font-bold mb-2">
Cluster Nodes
</h1>
<p className="text-slate-500 mb-8">Real-time node health and workload pressure</p>

<div className="grid md:grid-cols-3 gap-6">

{nodes.map((node)=>(

<div
key={node.name}
className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
>

<h2 className="text-2xl text-slate-800 font-bold mb-2">
{node.name}
</h2>

<p className="text-slate-500 mb-4">
Workloads: {node.tasks}
</p>

<h3 className="text-5xl text-slate-800 font-bold mb-4">
{node.load}%
</h3>


<div className="w-full bg-slate-100 h-4 rounded mb-5 overflow-hidden">
<div
className={`h-4 rounded ${
node.load > 80 ? "bg-rose-500" : node.load > 50 ? "bg-amber-500" : "bg-emerald-500"
}`}
style={{
width:`${node.load}%`
}}
/>
</div>


<p className="mb-5 text-slate-600">
Status:
{" "}
<span className={`px-2 py-1 rounded-full text-xs font-semibold ${
node.load>80
? "bg-amber-100 text-amber-700"
: "bg-emerald-100 text-emerald-700"
}`}>
{node.load>80 ? "Busy":"Healthy"}
</span>
</p>


<button
onClick={()=>navigate(`/nodes/${node.name}`)}
className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"
>
Inspect Node
</button>

</div>

))}

</div>

</div>

);

}

export default NodesPage;