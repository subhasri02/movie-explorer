

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";  
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import MovieDetails from "./pages/MovieDetails";

function App() {
  // Filters (search, genre, rating)
  const [filters, setFilters] = useState({ query: "", genre: "", rating: "" });

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          {/* Navbar always visible */}
          <Navbar filters={filters} setFilters={setFilters} />

          {/* Page Content */}
          <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
            <Routes>
              {/* Home Page */}
              <Route path="/" element={<Home filters={filters} />} />

              <Route path="/movie/:id" element={<MovieDetails />} />

              {/* Login & Register Pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> 

              {/* Admin (Protected Route) */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
