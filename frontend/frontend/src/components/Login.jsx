import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      navigate('/'); 
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
        <p>
          Don't have an account? <Link to="/register">Create a New Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;