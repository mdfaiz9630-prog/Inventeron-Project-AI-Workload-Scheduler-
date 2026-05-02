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

},[jobs.length]);




return(
<div className="bg-white border border-slate-200 rounded-xl p-6 mt-8 shadow-sm">

<h2 className="text-2xl text-slate-800 font-bold mb-6">
Live Workload Flow
</h2>



<div className="grid md:grid-cols-2 gap-8 items-center">




<div>

<h3 className="text-lg text-slate-700 font-semibold mb-4">
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
? "bg-sky-100 border border-sky-200 scale-[1.02]"
: "bg-slate-50 border border-slate-200"
}
`}
>

<div className="flex justify-between">

<span className="font-semibold text-slate-700">
{job.name}
</span>

<span className="text-slate-500 text-sm">
{job.from} → {job.to}
</span>

</div>


{activeJob===index && (

<div className="mt-2 animate-pulse text-sky-700 text-sm font-medium">
Migrating workload...
</div>

)}

</div>

))}

</div>

</div>





<div>

<h3 className="text-lg text-slate-700 font-semibold mb-2">
Compute Nodes
</h3>

<p className="text-sm text-amber-700 mb-4">
Auto-balancing active
</p>



<div className="space-y-4">


<div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">

<p className="text-slate-700 font-semibold">GPU-1</p>

<div className="w-full bg-slate-100 rounded mt-2">
<div
className="bg-emerald-500 h-3 rounded"
style={{width:"65%"}}
></div>
</div>

<p className="mt-2 text-sm text-slate-500">
65% Utilization
</p>

</div>




<div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">

<p className="text-slate-700 font-semibold">CPU-1</p>

<div className="w-full bg-slate-100 rounded mt-2">
<div
className="bg-amber-500 h-3 rounded"
style={{width:"45%"}}
></div>
</div>

<p className="mt-2 text-sm text-slate-500">
45% Utilization
</p>

</div>




<div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">

<p className="text-slate-700 font-semibold">GPU-2</p>

<div className="w-full bg-slate-100 rounded mt-2">
<div
className="bg-rose-500 h-3 rounded"
style={{width:"82%"}}
></div>
</div>

<p className="mt-2 text-sm text-slate-500">
82% Utilization (Overloaded)
</p>

</div>



</div>

</div>


</div>




<div className="mt-8 bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-xl">

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