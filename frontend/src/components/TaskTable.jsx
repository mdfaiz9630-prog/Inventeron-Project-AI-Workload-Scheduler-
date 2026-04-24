import { useEffect, useState } from "react";

function TaskTable(){

const [tasks,setTasks]=useState([]);
const [algorithm,setAlgorithm]=useState("Priority Scheduling");


// Fetch tasks
const loadTasks=async()=>{

try{
const res=await fetch("/api/tasks");
const data=await res.json();
setTasks(data);
}catch(err){
console.error(err);
}

};


useEffect(()=>{

loadTasks();

// auto refresh every 2 sec
const interval=setInterval(()=>{
loadTasks();
},2000);

return ()=>clearInterval(interval);

},[]);



// Scheduling logic (frontend simulation)
const getAssignedNode=(task,index)=>{

if(algorithm==="Priority Scheduling"){

if(task.priority===1) return "GPU-1";
if(task.priority===2) return "CPU-1";
return "GPU-2";

}

if(algorithm==="Round Robin"){

const nodes=["GPU-1","CPU-1","GPU-2"];
return nodes[index % nodes.length];

}

if(algorithm==="Load Balanced"){

if(task.duration>25) return "CPU-1";
if(task.priority===1) return "GPU-1";
return "GPU-2";

}

return "CPU-1";

};


const getStatus=(task)=>{

const created=new Date(task.createdAt).getTime();
const now=Date.now();
const diff=Math.floor((now-created)/1000);

if(diff<5) return "pending";
if(diff<task.duration) return "running";
return "completed";

};



return(
<div className="mt-8">

<h2 className="text-2xl font-bold mb-4">
Scheduled Tasks
</h2>



{/* ✅ FIXED DROPDOWN (VISIBLE NOW) */}
<div className="mb-6 bg-white inline-block rounded-md p-2 shadow-md">

<label className="mr-4 font-bold text-black">
Scheduling Algorithm:
</label>

<select
value={algorithm}
onChange={(e)=>setAlgorithm(e.target.value)}
className="bg-white text-black p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
<option>Priority Scheduling</option>
<option>Round Robin</option>
<option>Load Balanced</option>
</select>

</div>




{/* TABLE */}
<div className="bg-gray-800 rounded-2xl p-6 overflow-x-auto">

<table className="w-full text-white">

<thead>

<tr className="border-b border-gray-600">

<th className="p-3 text-left">Task</th>
<th className="p-3 text-left">Priority</th>
<th className="p-3 text-left">Duration</th>
<th className="p-3 text-left">Node</th>
<th className="p-3 text-left">Status</th>

</tr>

</thead>



<tbody>

{tasks.map((task,index)=>{

const status=getStatus(task);

return(

<tr key={task._id || index} className="border-b border-gray-700">

<td className="p-3">{task.title}</td>
<td className="p-3">{task.priority}</td>
<td className="p-3">{task.duration}</td>

{/* 👇 SCHEDULING OUTPUT */}
<td className="p-3 font-semibold text-blue-300">
{getAssignedNode(task,index)}
</td>

<td className="p-3">

<span className={
status==="completed"
? "bg-green-500 px-3 py-1 rounded-full"
: status==="running"
? "bg-yellow-500 px-3 py-1 rounded-full"
: "bg-blue-500 px-3 py-1 rounded-full"
}>
{status}
</span>

</td>

</tr>

);

})}

</tbody>

</table>

</div>

</div>
);

}

export default TaskTable;