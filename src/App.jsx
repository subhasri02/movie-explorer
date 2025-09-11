/*
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import AdminRoute from "./routes/AdminRoute"; // import the new route


function App() {
  const [filters, setFilters] = useState({ query: "", genre: "", rating: "" });

  return (
    <AuthProvider>
      <Router>
        <Navbar filters={filters} setFilters={setFilters} />
        <Routes>
          <Route path="/" element={<Home filters={filters} />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
*/

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";

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

              {/* Login Page */}
              <Route path="/login" element={<Login />} />

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
