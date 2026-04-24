function DashboardCards({data}) {

const totalTasks = data.schedule.length;
const totalNodes = data.nodes.length;

const avgUtil =
Math.round(
 data.schedule.reduce(
  (sum,t)=>sum+t.utilizationPercent,0
 ) / totalTasks
);

return(
<div style={{display:"flex",gap:"20px",marginBottom:"30px"}}>

<div>
<h3>Tasks</h3>
<p>{totalTasks}</p>
</div>

<div>
<h3>Nodes</h3>
<p>{totalNodes}</p>
</div>

<div>
<h3>Avg Utilization</h3>
<p>{avgUtil}%</p>
</div>

</div>
);

}

export default DashboardCards;