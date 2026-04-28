import { Link } from "react-router-dom";

function Layout({ children }) {
 return (
  <div className="min-h-screen flex bg-gray-900 text-white">
    <aside className="w-64 bg-gray-800 p-6">
      <h1 className="text-2xl font-bold mb-8">
        AI Scheduler
      </h1>

      <div className="space-y-4">
        <Link to="/" className="block p-3 bg-gray-700 rounded-xl">
          Dashboard
        </Link>

        <Link to="/nodes" className="block p-3 bg-gray-700 rounded-xl">
          Nodes
        </Link>

        <Link to="/tasks" className="block p-3 bg-gray-700 rounded-xl">
          Tasks
        </Link>
      </div>
    </aside>

    <main className="flex-1 p-8">
      {children}
    </main>
  </div>
 );
}

export default Layout;