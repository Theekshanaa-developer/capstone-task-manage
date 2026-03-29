import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  
  return (
    <div className="navbar">
      <h1 className="logo">Task Manager</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/admin/users">User Management</Link>
        <Link to="/create-task">Create Task</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Navbar;