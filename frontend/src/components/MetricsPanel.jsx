function MetricsPanel({ data }) {

if(!data || !data.schedule){
 return null;
}

const avgInference =
Math.round(
 data.schedule.reduce(
  (sum,t)=>sum+t.inferenceTimeMs,0
 ) / data.schedule.length
);

const avgMemory =
Math.round(
 data.schedule.reduce(
  (sum,t)=>sum+t.memoryUsageMB,0
 ) / data.schedule.length
);

const avgUtil =
Math.round(
 data.schedule.reduce(
  (sum,t)=>sum+t.utilizationPercent,0
 ) / data.schedule.length
);

return(
<div style={{marginTop:"30px"}}>

<h2>Performance Metrics</h2>

<div style={{
display:"flex",
gap:"20px",
marginTop:"15px"
}}>

<div>
<h3>Avg Inference</h3>
<p>{avgInference} ms</p>
</div>

<div>
<h3>Avg Memory</h3>
<p>{avgMemory} MB</p>
</div>

<div>
<h3>Avg Utilization</h3>
<p>{avgUtil}%</p>
</div>

</div>

</div>
);

}

export default MetricsPanel;