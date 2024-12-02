import React, { useState } from 'react';
import axios from 'axios';
import { User, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../signup.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/signup', formData);
      console.log(response.data);
      navigate('/buslist'); // Redirect to the desired page on success
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form-wrapper">
        <div className="signup-form-content">
          {/* Header */}
          <div className="text-center">
            <h2 className="form-title">Create your account</h2>
            <p className="form-subtitle">Join us and start your journey</p>
          </div>

          {/* Form */}
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              {/* Username Input */}
              <div className="input-field">
                <div className="icon">
                  <User className="icon-size" />
                </div>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="input-box"
                  placeholder="Username"
                />
              </div>

              {/* Email Input */}
              <div className="input-field">
                <div className="icon">
                  <Mail className="icon-size" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-box"
                  placeholder="Email address"
                />
              </div>

              {/* Password Input */}
              <div className="input-field">
                <div className="icon">
                  <Lock className="icon-size" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-box"
                  placeholder="Password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-button"
            >
              Sign up
            </button>

            {/* Login Link */}
            <div className="login-link">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/login';
                }}
                className="login-text"
              >
                Already have an account? Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
