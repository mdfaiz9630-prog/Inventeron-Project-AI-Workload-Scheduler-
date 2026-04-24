import { useEffect, useState } from "react";

function LiveWorkload(){

const jobs=[
{
name:"Inference-1",
from:"Queue",
to:"GPU-1"
},
{
name:"Training-2",
from:"Queue",
to:"CPU-1"
},
{
name:"Batch-3",
from:"GPU-2",
to:"CPU-1"
}
];


const [activeJob,setActiveJob]=useState(0);


useEffect(()=>{

const interval=setInterval(()=>{

setActiveJob(
prev=>(prev+1)%jobs.length
);

},2500);


return ()=>clearInterval(interval);

},[]);




return(
<div className="bg-gray-800 rounded-2xl p-6 mt-8">

<h2 className="text-2xl font-bold mb-6">
Live Workload Flow
</h2>



<div className="grid md:grid-cols-2 gap-8 items-center">




<div>

<h3 className="text-lg font-semibold mb-4">
Incoming / Migrating Jobs
</h3>


<div className="space-y-4">

{jobs.map((job,index)=>(

<div
key={index}
className={`
transition-all
duration-500
p-4
rounded-xl
${activeJob===index
? "bg-blue-600 scale-105"
: "bg-gray-700"
}
`}
>

<div className="flex justify-between">

<span>
{job.name}
</span>

<span>
{job.from} → {job.to}
</span>

</div>


{activeJob===index && (

<div className="mt-2 animate-pulse">
Migrating workload...
</div>

)}

</div>

))}

</div>

</div>





<div>

<h3 className="text-lg font-semibold mb-2">
Compute Nodes
</h3>

<p className="text-sm text-red-400 mb-4">
Auto-balancing active
</p>



<div className="space-y-4">


<div className="bg-gray-700 p-4 rounded-xl">

GPU-1

<div className="w-full bg-gray-600 rounded mt-2">
<div
className="bg-green-500 h-3 rounded"
style={{width:"65%"}}
></div>
</div>

<p className="mt-2 text-sm">
65% Utilization
</p>

</div>




<div className="bg-gray-700 p-4 rounded-xl">

CPU-1

<div className="w-full bg-gray-600 rounded mt-2">
<div
className="bg-yellow-500 h-3 rounded"
style={{width:"45%"}}
></div>
</div>

<p className="mt-2 text-sm">
45% Utilization
</p>

</div>




<div className="bg-gray-700 p-4 rounded-xl">

GPU-2

<div className="w-full bg-gray-600 rounded mt-2">
<div
className="bg-red-500 h-3 rounded"
style={{width:"82%"}}
></div>
</div>

<p className="mt-2 text-sm">
82% Utilization (Overloaded)
</p>

</div>



</div>

</div>


</div>




<div className="mt-8 bg-gray-700 p-4 rounded-2xl">

<h3 className="text-xl font-bold mb-2">
Scheduler Migration Event
</h3>

<p>
Overloaded workloads are dynamically shifted
from GPU-2 to CPU-1 for load balancing.
</p>

</div>



</div>
);

}

export default LiveWorkload;