import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const goHome = () => navigate("/");

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-lg flex flex-col justify-between p-6">
        <div>
          <div className="text-center mb-12">
            <h3 className="text-xl font-bold capitalize text-gray-800">
              {user ? user : "Ospite"}
            </h3>
          </div>
          <nav className="flex flex-col gap-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `p-3 rounded-lg transition hover:bg-indigo-100 ${
                  isActive ? "bg-indigo-200 font-semibold" : ""
                }`
              }
            >
              Dashboard Home
            </NavLink>
            <NavLink
              to="/dashboard/customers"
              className={({ isActive }) =>
                `p-3 rounded-lg transition hover:bg-indigo-100 ${
                  isActive ? "bg-indigo-200 font-semibold" : ""
                }`
              }
            >
              Utenti
            </NavLink>
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={goHome}
            className="w-full p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            &larr; Torna al sito
          </button>
          <button
            onClick={logout}
            className="w-full p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
