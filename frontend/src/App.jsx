import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import NodesPage from "./pages/NodesPage";
import TasksPage from "./pages/TasksPage";

function App() {
  return (
    <Layout>
      <Routes>

        {/* Home Dashboard */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* Cluster Nodes View */}
        <Route
          path="/nodes"
          element={<NodesPage />}
        />

        {/* Task Management View */}
        <Route
          path="/tasks"
          element={<TasksPage />}
        />

      </Routes>
    </Layout>
  );
}

export default App;