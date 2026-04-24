import {
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
Tooltip
} from "recharts";

function WorkloadChart({ data }) {

if (!data || !data.nodes) {
 return <p>Loading chart...</p>;
}

return (
<div style={{marginTop:"30px"}}>
<h2>Node Utilization</h2>

<BarChart
 width={500}
 height={300}
 data={data.nodes}
>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="name" />
<YAxis />
<Tooltip />
<Bar dataKey="load" />
</BarChart>

</div>
);

}

export default WorkloadChart;