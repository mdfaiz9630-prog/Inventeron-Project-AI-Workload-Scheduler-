import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NodesPage(){

const [nodes,setNodes] = useState([]);
const navigate = useNavigate();

const loadNodes = async ()=>{

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

const load = assignedTasks.reduce(
sum=>sum + (Number(sum)===sum?0:0),0
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

}catch(err){
console.error(err);
}

};


useEffect(()=>{

loadNodes();

const interval=setInterval(()=>{
loadNodes();
},2000);

return ()=>clearInterval(interval);

},[]);


return(

<div className="min-h-screen bg-gray-900 text-white p-8">

<h1 className="text-4xl font-bold mb-8">
Cluster Nodes
</h1>

<div className="grid md:grid-cols-3 gap-6">

{nodes.map((node)=>(

<div
key={node.name}
className="bg-gray-800 rounded-3xl p-6 shadow-xl"
>

<h2 className="text-2xl font-bold mb-3">
{node.name}
</h2>

<p className="text-gray-400 mb-4">
Tasks: {node.tasks}
</p>

<h3 className="text-5xl font-bold mb-4">
{node.load}%
</h3>


<div className="w-full bg-gray-700 h-4 rounded mb-5">
<div
className="bg-blue-500 h-4 rounded"
style={{
width:`${node.load}%`
}}
/>
</div>


<p className="mb-5">
Status:
{" "}
<span className={
node.load>80
? "text-yellow-300"
: "text-green-300"
}>
{node.load>80 ? "Busy":"Healthy"}
</span>
</p>


<button
onClick={()=>navigate(`/nodes/${node.name}`)}
className="w-full bg-blue-600 rounded-xl py-2"
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