
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import { useTheme } from "../context/ThemeContext"; 

const Navbar = ({ filters, setFilters }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center p-4 bg-gray-800 dark:bg-gray-950 text-white shadow-md">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        Movie Explorer 🎬
      </Link>

      {/* Links */}
      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>

        {/* Admin Dashboard link (only for admin) */}
        {user?.role === "admin" && (
          <Link to="/admin" className="hover:text-blue-400">
            Admin Dashboard
          </Link>
        )}

        {/* Dark/Light Toggle */}
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 transition"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* User Info / Auth Links */}
        {user ? (
          <>
            <span className="text-sm">{user.name || user.email}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
