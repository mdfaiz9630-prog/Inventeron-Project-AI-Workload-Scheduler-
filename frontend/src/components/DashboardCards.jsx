function DashboardCards({ totalTasks, totalNodes, avgUtil, mostLoaded }) {
  const cards = [
    {
      title: "Running Workloads",
      value: totalTasks,
      tone: "text-sky-700",
      chip: "bg-sky-100 text-sky-700",
      chipText: "Pods",
    },
    {
      title: "Cluster Nodes",
      value: totalNodes,
      tone: "text-blue-700",
      chip: "bg-blue-100 text-blue-700",
      chipText: "Nodes",
    },
    {
      title: "Average Utilization",
      value: `${avgUtil}%`,
      tone: "text-cyan-700",
      chip: "bg-cyan-100 text-cyan-700",
      chipText: "Load",
    },
    {
      title: "Most Loaded Node",
      value: mostLoaded?.name || "N/A",
      tone: "text-amber-700",
      chip: "bg-amber-100 text-amber-700",
      chipText: "Alert",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-500">{card.title}</p>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${card.chip}`}>
              {card.chipText}
            </span>
          </div>
          <h2 className={`text-3xl font-bold ${card.tone}`}>{card.value}</h2>
          <p className="text-xs text-slate-400 mt-2">Live cluster signal</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;