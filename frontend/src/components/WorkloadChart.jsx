function WorkloadChart({ data }) {

const nodes = data?.nodes || [
{name:"CPU-1",load:50},
{name:"GPU-1",load:72},
{name:"GPU-2",load:30}
];

return (
<div className="w-full">

<h2 className="text-2xl font-bold mb-8">
Live Node Utilization
</h2>

<div className="space-y-8">

{nodes.map((node,index)=>(

<div key={index}>

<div className="flex justify-between mb-2">
<span className="font-semibold">
{node.name}
</span>

<span>
{node.load}%
</span>
</div>


<div className="w-full bg-gray-700 rounded-full h-6">

<div
className="bg-blue-500 h-6 rounded-full transition-all"
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