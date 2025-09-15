
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { user, isAdmin, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(isAdmin ? "/admin" : "/"); // redirect based on role
    }
  }, [user, isAdmin, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold text-white mb-8">Login</h1>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Admin Login */}
        <button
          onClick={loginWithGoogle}
          className="bg-red-600 hover:bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition transform hover:scale-105"
        >
          Admin Login
        </button>

        {/* User Login */}
        <button
          onClick={loginWithGoogle}
          className="bg-blue-600 hover:bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition transform hover:scale-105"
        >
          User Login
        </button>
      </div>
    </div>
  );
};

export default Login;
