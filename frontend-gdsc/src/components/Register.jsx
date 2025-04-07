import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';
import './Login.css';

const Register = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      // Format phone number as user types
      const formatted = value.replace(/\D/g, '');
      let formattedValue = '';
      
      if (formatted.length > 0) {
        formattedValue = '(' + formatted.substring(0, Math.min(3, formatted.length));
        
        if (formatted.length > 3) {
          formattedValue += ') ' + formatted.substring(3, Math.min(6, formatted.length));
        }
        
        if (formatted.length > 6) {
          formattedValue += '-' + formatted.substring(6, Math.min(10, formatted.length));
        }
      }
      
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      // Here you would typically make an API call to register the user
      // For now, we'll just navigate to the upload page
      navigate('/upload');
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <div className={`login-wrapper ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="auth-section">
        <div className="theme-toggle">
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        <div className="auth-content">
          <div className="logo-container">
            <Logo width={220} height={55} />
            <p className="brand-tagline">
              Secure Content Analysis Platform
            </p>
          </div>

          <h1 className="welcome-text">Create Account</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="phone-input-container">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="phone-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="phone-input-container">
              <span className="input-icon">📧</span>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="phone-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="phone-input-container">
              <span className="input-icon">📱</span>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                className="phone-input"
                value={formData.phoneNumber}
                onChange={handleChange}
                maxLength="14"
                required
              />
            </div>

            <div className="password-input-container">
              <span className="password-icon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="password-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="password-input-container">
              <span className="password-icon">🔒</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="password-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="action-button">
              Register
            </button>
          </form>

          <div className="register-section">
            <span className="register-text">Already have an account?</span>
            <Link to="/" className="register-link">
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="pattern-section">
        <div className="pattern-content">
          <div className="feature-cards">
            <div className="feature-card">
              <span className="feature-icon">🛡️</span>
              <h3 className="feature-title">Smart Detection</h3>
              <p className="feature-description">
                Advanced AI algorithms to detect potential threats and malicious content
              </p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">⚡</span>
              <h3 className="feature-title">Real-time Analysis</h3>
              <p className="feature-description">
                Instant scanning and analysis of uploaded content
              </p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔒</span>
              <h3 className="feature-title">Secure Platform</h3>
              <p className="feature-description">
                End-to-end encryption and secure data handling
              </p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📊</span>
              <h3 className="feature-title">Detailed Reports</h3>
              <p className="feature-description">
                Comprehensive analysis reports and threat insights
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 