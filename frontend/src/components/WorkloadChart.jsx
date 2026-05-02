function WorkloadChart({ data }) {

const nodes = data?.nodes || [
{name:"CPU-1",load:50},
{name:"GPU-1",load:72},
{name:"GPU-2",load:30}
];

return (
<div className="w-full bg-white border border-slate-200 rounded-xl p-6 shadow-sm">

<h2 className="text-2xl font-bold text-slate-800 mb-6">
Live Node Utilization
</h2>

<div className="space-y-5">

{nodes.map((node,index)=>(

<div key={index}>

<div className="flex justify-between mb-2">
<span className="font-semibold text-slate-700">
{node.name}
</span>

<span className="text-slate-500">
{node.load}%
</span>
</div>


<div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">

<div
className={`h-4 rounded-full transition-all ${
node.load > 80 ? "bg-rose-500" : node.load > 50 ? "bg-amber-500" : "bg-sky-500"
}`}
style={{
width:`${node.load}%`
}}
/>

</div>

</div>

))}

</div>

</div>
);

}

export default WorkloadChart;