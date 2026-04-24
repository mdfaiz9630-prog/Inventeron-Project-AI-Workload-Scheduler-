function TaskTable({data}) {

if(!data || !data.schedule){
 return null;
}

return(
<div style={{marginTop:"30px"}}>

<h2>Scheduled Tasks</h2>

<table border="1" cellPadding="10">
<thead>
<tr>
<th>Task</th>
<th>Priority</th>
<th>Node</th>
<th>Duration</th>
<th>Inference(ms)</th>
<th>Utilization %</th>
</tr>
</thead>

<tbody>
{data.schedule.map((task,index)=>(
<tr key={index}>
<td>{task.task}</td>
<td>{task.priority}</td>
<td>{task.assignedNode}</td>
<td>{task.duration}</td>
<td>{task.inferenceTimeMs}</td>
<td>{task.utilizationPercent}</td>
</tr>
))}
</tbody>

</table>

</div>
);

}

export default TaskTable;