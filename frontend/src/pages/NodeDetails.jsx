import { useParams } from "react-router-dom";

function NodeDetails(){

const { nodeId } = useParams();

return (
<div className="min-h-screen bg-gray-900 text-white p-8">

<h1 className="text-4xl font-bold mb-8">
{nodeId} Node Details
</h1>


<div className="grid md:grid-cols-3 gap-6 mb-8">

<div className="bg-gray-800 rounded-3xl p-6">
<h3 className="text-gray-400">
Utilization
</h3>

<h2 className="text-5xl mt-4 font-bold">
72%
</h2>
</div>


<div className="bg-gray-800 rounded-3xl p-6">
<h3 className="text-gray-400">
Memory
</h3>

<h2 className="text-5xl mt-4 font-bold">
18 / 24 GB
</h2>
</div>


<div className="bg-gray-800 rounded-3xl p-6">
<h3 className="text-gray-400">
Running Tasks
</h3>

<h2 className="text-5xl mt-4 font-bold">
6
</h2>
</div>

</div>



<div className="bg-gray-800 rounded-3xl p-6 mb-8">

<h2 className="text-2xl font-bold mb-6">
Active Workloads
</h2>

<ul className="space-y-4">
<li>Inference Job A</li>
<li>Training Batch B</li>
<li>Model Evaluation Task</li>
</ul>

</div>



<div className="bg-gray-800 rounded-3xl p-6">

<h2 className="text-2xl font-bold mb-6">
Migration Events
</h2>

<p>
2 workloads migrated from GPU-2 for load balancing.
</p>

</div>

</div>
);

}

export default NodeDetails;