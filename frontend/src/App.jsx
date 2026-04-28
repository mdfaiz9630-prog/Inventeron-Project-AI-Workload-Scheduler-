import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import NodesPage from "./pages/NodesPage";
import TasksPage from "./pages/TasksPage";
import NodeDetails from "./pages/NodeDetails";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/nodes" element={<NodesPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/nodes/:nodeId" element={<NodeDetails />} />
      </Routes>
    </Layout>
  );
}

export default App;