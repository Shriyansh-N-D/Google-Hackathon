import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    countryCode: '+1',
    phoneNumber: '',
    password: '',
    name: '',
    email: '',
    confirmPassword: ''
  });

  const countryCodes = [
    { code: '+1', country: 'US' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'IN' },
    { code: '+81', country: 'JP' },
    { code: '+86', country: 'CN' },
    { code: '+49', country: 'DE' },
    { code: '+33', country: 'FR' },
    { code: '+61', country: 'AU' },
    { code: '+55', country: 'BR' },
    { code: '+7', country: 'RU' }
  ];

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    navigate('/upload');
  }, [navigate]);

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

          <h1 className="welcome-text">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="phone-input-container">
              <div className="country-code-select">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="country-code-dropdown"
                >
                  <option value="+1">+1 (US)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+91">+91 (IN)</option>
                  <option value="+81">+81 (JP)</option>
                  <option value="+86">+86 (CN)</option>
                  <option value="+49">+49 (DE)</option>
                  <option value="+33">+33 (FR)</option>
                  <option value="+61">+61 (AU)</option>
                  <option value="+55">+55 (BR)</option>
                  <option value="+7">+7 (RU)</option>
                </select>
              </div>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="phone-input"
                required
              />
            </div>
            <div className="password-input-container">
              <span className="password-icon">🔒</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="password-input"
                required
              />
            </div>
            <button type="submit" className="action-button">
              Login
            </button>
          </form>

          <div className="toggle-container">
            <span>Don't have an account?</span>
            <Link to="/register" className="action-button" style={{ textDecoration: 'none', padding: '8px 16px' }}>
              Register
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

export default Login; 