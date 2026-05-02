function ClusterTopology(){

return(
<div className="bg-white border border-slate-200 rounded-xl p-6 mt-8 shadow-sm">

<h2 className="text-2xl font-bold text-slate-800 mb-8">
Cluster Topology
</h2>



<div className="flex flex-col items-center">


<div className="bg-blue-600 text-white px-8 py-4 rounded-xl mb-8 font-semibold shadow-sm">
Scheduler Controller
</div>



<div className="flex gap-10 mb-8">

<div className="bg-emerald-100 text-emerald-700 px-6 py-4 rounded-xl border border-emerald-200 font-semibold">
GPU-1
</div>

<div className="bg-amber-100 text-amber-700 px-6 py-4 rounded-xl border border-amber-200 font-semibold">
CPU-1
</div>

<div className="bg-rose-100 text-rose-700 px-6 py-4 rounded-xl border border-rose-200 font-semibold">
GPU-2
</div>

</div>



<div className="grid grid-cols-3 gap-8 text-center">

<div>
<p className="text-sm text-slate-500">Tasks Routed</p>
<p className="text-2xl font-bold text-slate-800">
14
</p>
</div>

<div>
<p className="text-sm text-slate-500">Migrations</p>
<p className="text-2xl font-bold text-slate-800">
3
</p>
</div>

<div>
<p className="text-sm text-slate-500">Healthy Nodes</p>
<p className="text-2xl font-bold text-slate-800">
3
</p>
</div>

</div>



<div className="mt-8 bg-sky-50 text-sky-700 p-4 rounded-xl border border-sky-200">
Dynamic task routing and node coordination active
</div>


</div>

</div>
);

}

export default ClusterTopology;