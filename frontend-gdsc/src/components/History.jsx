import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';
import './History.css';

const History = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  // In a real app, this would come from your backend
  const uploadHistory = [
    {
      id: 1,
      fileName: 'document1.pdf',
      uploadDate: '2024-03-15',
      threatLevel: 'High',
      mainReason: 'Malicious Links',
      isHarmful: true
    },
    {
      id: 2,
      fileName: 'image.jpg',
      uploadDate: '2024-03-14',
      threatLevel: 'Low',
      mainReason: null,
      isHarmful: false
    },
    // Add more mock data as needed
  ];

  const getThreatColor = (level) => {
    if (!isDarkMode) {
      switch (level) {
        case 'High': return '#dc3545';
        case 'Medium': return '#ffc107';
        case 'Low': return '#28a745';
        default: return '#6c757d';
      }
    }
    switch (level) {
      case 'High': return '#ff0055';
      case 'Medium': return '#ffaa00';
      case 'Low': return '#00ff66';
      default: return '#00fff2';
    }
  };

  return (
    <div className={`history-container ${isDarkMode ? 'dark' : 'light'}`}>
      <header className="header">
        <div className="logo-section">
          <Logo width={180} height={45} />
        </div>
        <nav className="nav-links">
          <button onClick={() => navigate('/upload')}>Upload</button>
          <button onClick={() => navigate('/info')}>Info</button>
          <button onClick={() => navigate('/')}>Logout</button>
        </nav>
      </header>

      <div className="history-content">
        <h1 className="history-title">Upload History</h1>
        <div className="history-grid">
          {uploadHistory.map((item) => (
            <div key={item.id} className="history-card">
              <div className="card-header">
                <span className="file-icon">
                  {item.isHarmful ? '⚠️' : '✅'}
                </span>
                <span className="file-name">{item.fileName}</span>
              </div>
              <div className="card-body">
                <p className="upload-date">Uploaded: {item.uploadDate}</p>
                <p className="threat-level" style={{ color: getThreatColor(item.threatLevel) }}>
                  Threat Level: {item.threatLevel}
                </p>
                {item.isHarmful && (
                  <p className="threat-reason">
                    Main concern: {item.mainReason}
                  </p>
                )}
              </div>
              <div className="card-footer">
                <button className="view-details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History; 