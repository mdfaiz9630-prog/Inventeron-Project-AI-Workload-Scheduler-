import {
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
Tooltip
} from "recharts";

function WorkloadChart({data}){

const schedule=data?.schedule || [];

let gpu1=0;
let cpu1=0;
let gpu2=0;


schedule.forEach(task=>{

if(task.priority===1){
gpu1+=task.duration;
}
else if(task.priority===2){
cpu1+=task.duration;
}
else{
gpu2+=task.duration;
}

});


const chartData=[
{
name:"CPU-1",
load:cpu1
},
{
name:"GPU-1",
load:gpu1
},
{
name:"GPU-2",
load:gpu2
}
];



const overloadedNodes=
chartData.filter(
node=>node.load>20
);

const underutilizedNodes=
chartData.filter(
node=>node.load<15
);



let recommendation=
"System balanced";

if(
overloadedNodes.length>0 &&
underutilizedNodes.length>0
){
recommendation=
`Shift workload from ${overloadedNodes[0].name} to ${underutilizedNodes[0].name}`;
}



return(
<div className="bg-gray-800 rounded-2xl p-6">

<h2 className="text-2xl font-bold mb-4">
Live Node Utilization
</h2>



<BarChart
width={700}
height={300}
data={chartData}
>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="load"/>

</BarChart>



<div className="mt-6">

<h3 className="text-xl font-bold mb-3">
Scheduler Alerts
</h3>


{overloadedNodes.length===0 ?(

<p>
All Nodes Healthy ✅
</p>

):(

overloadedNodes.map((node,index)=>(

<div
key={index}
className="bg-red-600 p-3 rounded-xl mb-2"
>

⚠ {node.name} overloaded
(Current Load: {node.load})

</div>

))

)}

</div>



<div className="mt-6 bg-gray-700 p-4 rounded-2xl">

<h3 className="text-xl font-bold mb-2">
Load Balancing Recommendation
</h3>

<p>
{recommendation}
</p>

</div>



</div>
);

}

export default WorkloadChart;