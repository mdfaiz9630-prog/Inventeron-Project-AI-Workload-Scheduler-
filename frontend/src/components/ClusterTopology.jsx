function ClusterTopology(){

return(
<div className="bg-gray-800 rounded-2xl p-6 mt-8">

<h2 className="text-2xl font-bold mb-8">
Cluster Topology
</h2>



<div className="flex flex-col items-center">


<div className="bg-blue-600 px-8 py-4 rounded-2xl mb-8">
Scheduler Controller
</div>



<div className="flex gap-10 mb-8">

<div className="bg-green-600 px-6 py-4 rounded-2xl">
GPU-1
</div>

<div className="bg-yellow-600 px-6 py-4 rounded-2xl">
CPU-1
</div>

<div className="bg-red-600 px-6 py-4 rounded-2xl">
GPU-2
</div>

</div>



<div className="grid grid-cols-3 gap-8 text-center">

<div>
<p>Tasks Routed</p>
<p className="text-xl font-bold">
14
</p>
</div>

<div>
<p>Migrations</p>
<p className="text-xl font-bold">
3
</p>
</div>

<div>
<p>Healthy Nodes</p>
<p className="text-xl font-bold">
3
</p>
</div>

</div>



<div className="mt-8 bg-gray-700 p-4 rounded-xl">
Dynamic task routing and node coordination active
</div>


</div>

</div>
);

}

export default ClusterTopology;