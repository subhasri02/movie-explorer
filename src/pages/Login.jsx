// login page with google auth

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { user, isAdmin, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  if (user) {
    if (isAdmin) {
      navigate("/admin"); // 🔹 admin redirected to dashboard
    } else {
      navigate("/"); // normal users go to home
    }           // normal users go home
  }
}, [user, isAdmin, navigate]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button
        onClick={loginWithGoogle}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
