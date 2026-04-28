function DashboardCards({ data }) {

const totalTasks = data?.schedule?.length || 0;
const totalNodes = data?.nodes?.length || 3;

const avgUtil =
totalTasks > 0
? Math.round(
data.schedule.reduce(
(sum,t)=>sum+t.utilizationPercent,
0
)/totalTasks
)
: 0;

const cards = [
{
title:"Active Tasks",
value:totalTasks,
sub:"Running workloads"
},
{
title:"Cluster Nodes",
value:totalNodes,
sub:"Available compute"
},
{
title:"Utilization",
value:`${avgUtil}%`,
sub:"Average load"
},
{
title:"Scheduler Health",
value:"Healthy",
sub:"System stable"
}
];

return (

<div className="grid md:grid-cols-4 gap-6">

{cards.map((card,index)=>(

<div
key={index}
className="
bg-gradient-to-br
from-gray-800
to-gray-900
rounded-3xl
p-6
shadow-xl
hover:-translate-y-1
hover:shadow-2xl
transition
border border-gray-700
"
>

<div className="text-gray-400 text-sm mb-3">
{card.title}
</div>

<div className="text-4xl font-bold mb-2">
{card.value}
</div>

<div className="text-sm text-blue-400">
{card.sub}
</div>

{/* fake mini metric bar */}
<div className="mt-5 w-full bg-gray-700 h-2 rounded">
<div
className="bg-green-500 h-2 rounded"
style={{
width:
index===0 ? "70%" :
index===1 ? "90%" :
index===2 ? `${avgUtil}%` :
"100%"
}}
/>
</div>

</div>

))}

</div>

);

}

export default DashboardCards;