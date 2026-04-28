import { useEffect, useState } from "react";

function NodesPage() {
  const [nodes, setNodes] = useState(null);

  const loadNodes = async () => {
    try {
      const res = await fetch("/api/nodes");
      const data = await res.json();
      setNodes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadNodes();

    const interval = setInterval(() => {
      loadNodes();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!nodes) {
    return <p>Loading nodes...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Cluster Nodes
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(nodes).map(([name,node]) => (
          <div
            key={name}
            className="bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold text-blue-400 mb-4">
              {name}
            </h2>

            <p>Load: {node.load}%</p>

            <div className="w-full bg-gray-700 rounded h-4 mt-4">
              <div
                className="bg-green-500 h-4 rounded"
                style={{
                  width: `${Math.min(node.load,100)}%`
                }}
              />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default NodesPage;