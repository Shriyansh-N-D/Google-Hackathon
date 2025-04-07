import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';
import './Info.css';

const Info = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  return (
    <div className={`info-container ${isDarkMode ? 'dark' : 'light'}`}>
      <header className="header">
        <div className="logo-section">
          <Logo width={180} height={45} />
        </div>
        <nav className="nav-links">
          <button onClick={() => navigate('/upload')}>Upload</button>
          <button onClick={() => navigate('/history')}>History</button>
          <button onClick={() => navigate('/')}>Logout</button>
        </nav>
      </header>

      <div className="info-content">
        <h1 className="info-title">Help & Support</h1>
        
        <div className="info-grid">
          <div className="info-card contact">
            <h2>Contact Us</h2>
            <div className="contact-details">
              <div className="contact-item">
                <span className="icon">📧</span>
                <div className="detail">
                  <h3>Email Support</h3>
                  <p>support@flagguard.com</p>
                  <p>For technical issues: tech@flagguard.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="icon">📞</span>
                <div className="detail">
                  <h3>Phone Support</h3>
                  <p>+1 (555) 123-4567</p>
                  <p>Available Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="info-card faq">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>What file types are supported?</h3>
                <p>We support PDF, TXT, common image formats (PNG, JPG, JPEG), and plain text files.</p>
              </div>
              <div className="faq-item">
                <h3>How does the threat detection work?</h3>
                <p>Our AI-powered system analyzes content for malicious links, suspicious patterns, and potential security risks using advanced algorithms.</p>
              </div>
              <div className="faq-item">
                <h3>Is my data secure?</h3>
                <p>Yes, all uploads are encrypted and analyzed in a secure environment. We never store sensitive content.</p>
              </div>
            </div>
          </div>

          <div className="info-card quick-start">
            <h2>Quick Start Guide</h2>
            <ol className="guide-steps">
              <li>Upload your file using the drag-and-drop interface</li>
              <li>Wait for the automatic analysis to complete</li>
              <li>Review the threat assessment and detailed report</li>
              <li>Take recommended actions based on the results</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info; 