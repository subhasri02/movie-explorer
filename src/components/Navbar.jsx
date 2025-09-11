
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import { useTheme } from "../context/ThemeContext"; 

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth(); /*user,IsAdmin,Logout */
  const { theme, toggleTheme } = useTheme(); /* theme, toggleTheme*/

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 dark:bg-gray-950 text-white shadow-md">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        Movie Explorer 🎬
      </Link>

      {/* Links */}
      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        

        {isAdmin && (
          <Link to="/admin" className="hover:text-blue-400">
            Admin Dashboard
          </Link>
        )}

        {/* Dark/Light Toggle */}
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-700"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* User Info */}
        {user ? (
          <>
            <span className="text-sm">{user.displayName || user.email}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
