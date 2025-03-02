import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', loginData);
      console.log(response.data);
      localStorage.setItem('authToken', response.data.token);
      setMessage('Login successful');
      navigate('/');  // Redirect to Home page
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', signupData);
      console.log(response.data);
      setMessage(response.data.message); // Show success message
      setError('');
      setSignupData({ username: '', email: '', password: '' }); // Clear the form
    } catch (err) {
      setError(err.response?.data?.message || 'Error signing up');
      setMessage('');
    }
  };

  return (
    <div className="auth-background">
      <div className="auth-container">
        {/* Tab Buttons */}
        <div className="button-container">
          <button
            className={`tab-button ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`tab-button ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form Container with Slide Animation */}
        <div className={`form-container ${isLogin ? 'slide-login' : 'slide-signup'}`}>
          {/* Login Form */}
          <div className="form-box login-box">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="input-group">
                <label htmlFor="login-email">Email</label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="input-group">
                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                />
              </div>
              {message && <div className="success-message">{message}</div>}
              {error && <div className="error-message">{error}</div>}
              <button type="submit" className="submit-button">Log In</button>
            </form>
          </div>

          {/* Signup Form */}
          <div className="form-box signup-box">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <div className="input-group">
                <label htmlFor="signup-username">Username</label>
                <input
                  type="text"
                  id="signup-username"
                  name="username"
                  value={signupData.username}
                  onChange={handleSignupChange}
                  placeholder="Choose a username"
                />
              </div>
              <div className="input-group">
                <label htmlFor="signup-email">Email</label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="input-group">
                <label htmlFor="signup-password">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  placeholder="Create a password"
                />
              </div>
              {message && <div className="success-message">{message}</div>}
              {error && <div className="error-message">{error}</div>}
              <button type="submit" className="submit-button">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
