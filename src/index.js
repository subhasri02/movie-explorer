// Entry Point Of The React Application
/*
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import AdminRoute from "./routes/AdminRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
            <Routes>
              <Route 
                path="/" 
                element={
                <Home />} 
                />
              <Route 
                path="/login" 
                element={
                <Login />} 
                />
              <Route 
                path="/admin" 
                element={
                <AdminDashboard />}
                 />
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
  </React.StrictMode>
);
*/

import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";  // Import the App component

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
