import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import NodesPage from "./pages/NodesPage";
import TasksPage from "./pages/TasksPage";
import NodeDetails from "./pages/NodeDetails";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* ✅ Toast system (GLOBAL) */}
      <ToastContainer position="top-right" autoClose={2000} />

      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/nodes" element={<NodesPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/nodes/:nodeId" element={<NodeDetails />} />
        </Routes>
      </Layout>

    </div>
  );
}

export default App;