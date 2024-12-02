import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import '../login.css'; // Make sure to create this CSS file with the styles

const Login = ({ setIsLoggedIn, onSignup, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        onLogin?.();
        navigate('/buslist'); // Navigate to the bus list page
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = () => {
    navigate('/signup'); // Navigate to the signup route
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2 className="login-title">Welcome back</h2>
        <p className="login-subtitle">Please sign in to your account</p>
      </div>

      <div className="login-form-container">
        <div className="login-form-wrapper">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form className="form-group" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label htmlFor="remember-me">
                  Remember me
                </label>
              </div>

              <div>
                <button 
                  type="button"
                  className="forgot-password"
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="divider">
            <div className="divider-line" />
            <div className="divider-text">
              <span>Don't have an account?</span>
            </div>
          </div>

          <button
            onClick={handleSignupClick} // Use the function to navigate
            className="signup-button"
          >
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
