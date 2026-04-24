function DashboardCards({ data }) {

const totalTasks = data.schedule.length;
const totalNodes = data.nodes.length;

const avgUtil = Math.round(
data.schedule.reduce(
(sum,t)=>sum+t.utilizationPercent,0
)/totalTasks
);

return(

<div className="grid md:grid-cols-3 gap-6">

<div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
<p className="text-gray-400 mb-2">
Total Tasks
</p>

<h2 className="text-4xl font-bold">
{totalTasks}
</h2>
</div>


<div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
<p className="text-gray-400 mb-2">
Active Nodes
</p>

<h2 className="text-4xl font-bold">
{totalNodes}
</h2>
</div>


<div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
<p className="text-gray-400 mb-2">
Avg Utilization
</p>

<h2 className="text-4xl font-bold">
{avgUtil}%
</h2>
</div>

</div>

);

}

export default DashboardCards;