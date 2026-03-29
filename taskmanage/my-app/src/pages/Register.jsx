import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !email || !password) {
    setError("Please fill in all fields.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      { name, email, password }
    );

    console.log("Registration successful:", response.data);
    alert("Registration successful!");
  } catch (err) {
    setError("Error registering user. Please try again.");
    console.error("Register error:", err);
  }

  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
        /><br /><br />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        /><br /><br />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        /><br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;