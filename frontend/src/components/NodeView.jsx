function NodeView({ tasks }) {

const nodes = [
{
name:"GPU-1",
type:"Inference GPU",
util:72,
memory:"18 / 24 GB",
health:"Healthy"
},
{
name:"CPU-1",
type:"Compute Node",
util:48,
memory:"42 / 64 GB",
health:"Healthy"
},
{
name:"GPU-2",
type:"Training GPU",
util:84,
memory:"20 / 24 GB",
health:"Busy"
}
];

return (
<div>

<h2 className="text-2xl font-bold mb-6">
Cluster Compute Nodes
</h2>

<div className="grid md:grid-cols-3 gap-6">

{nodes.map((node,index)=>(

<div
key={index}
className="
bg-gradient-to-br
from-gray-800
to-gray-900
rounded-3xl
p-6
shadow-xl
border border-gray-700
hover:-translate-y-1
transition
"
>

<div className="flex justify-between items-center mb-4">

<div>
<h3 className="text-xl font-bold">
{node.name}
</h3>

<p className="text-gray-400 text-sm">
{node.type}
</p>
</div>

<span className="
text-xs
px-3
py-1
rounded-full
bg-green-500/20
text-green-300
">
{node.health}
</span>

</div>


<div className="mb-4">
<div className="text-4xl font-bold">
{node.util}%
</div>

<div className="text-gray-400">
Utilization
</div>
</div>


<div className="w-full bg-gray-700 h-3 rounded mb-5">
<div
className="bg-green-500 h-3 rounded"
style={{
width:`${node.util}%`
}}
/>
</div>


<div className="space-y-2 text-sm">

<div className="flex justify-between">
<span className="text-gray-400">
Memory
</span>
<span>
{node.memory}
</span>
</div>

<div className="flex justify-between">
<span className="text-gray-400">
Tasks
</span>
<span>
{Math.floor(tasks.length/3)+index}
</span>
</div>

<div className="flex justify-between">
<span className="text-gray-400">
Latency
</span>
<span>
{10+index*4} ms
</span>
</div>

</div>


<button className="
mt-6
w-full
bg-blue-600
hover:bg-blue-500
rounded-xl
py-2
font-semibold
transition
">
View Node
</button>

</div>

))}

</div>

</div>
);

}

export default NodeView;