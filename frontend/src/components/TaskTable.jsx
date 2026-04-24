import { useEffect, useState } from "react";

function TaskTable(){

const [tasks,setTasks] = useState([]);

const loadTasks = async ()=>{

try{

const res = await fetch("/api/tasks");
const data = await res.json();

if(Array.isArray(data)){
setTasks(data);
}
else if(data.tasks){
setTasks(data.tasks);
}

}catch(error){
console.error(error);
}

};


useEffect(()=>{

loadTasks();

const interval = setInterval(
loadTasks,
5000
);

return ()=>clearInterval(interval);

},[]);



return(
<div className="mt-8">

<h2 className="text-2xl font-bold mb-4">
Scheduled Tasks
</h2>

<div className="bg-gray-800 rounded-2xl p-6 overflow-x-auto">

{tasks.length===0 ? (
<p>No tasks found</p>
):(

<table className="w-full">

<thead>
<tr className="border-b border-gray-600">
<th className="text-left p-3">
Task
</th>

<th className="text-left p-3">
Priority
</th>

<th className="text-left p-3">
Duration
</th>

</tr>
</thead>


<tbody>

{tasks.map((task,index)=>(

<tr
key={index}
className="border-b border-gray-700"
>

<td className="p-3">
{task.task || task.name || task.title}
</td>

<td className="p-3">
{task.priority}
</td>

<td className="p-3">
{task.duration}
</td>

</tr>

))}

</tbody>

</table>

)}

</div>

</div>
);

}

export default TaskTable;