import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import UserList from './components/UserList';


function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Page as default route */}
        <Route path="/" element={<HomePage />} />

        {/* Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/admin/users" element={<UserList/>}/>
    

        {/* Other routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default App;