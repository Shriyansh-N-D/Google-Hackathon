import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';
import './Upload.css';

const Upload = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [files, setFiles] = useState([]);
  const [fraudCount, setFraudCount] = useState(0);
  const [uploadHistory, setUploadHistory] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [textAnalysis, setTextAnalysis] = useState(null);

  // Load upload history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('uploadHistory');
    if (savedHistory) {
      setUploadHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save upload history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('uploadHistory', JSON.stringify(uploadHistory));
  }, [uploadHistory]);

  // Simulated content analysis function
  const analyzeContent = (content) => {
    const threats = [
      { type: 'Malicious Links', probability: Math.random() },
      { type: 'Suspicious Language', probability: Math.random() },
      { type: 'Potential Scam', probability: Math.random() },
      { type: 'Data Theft Attempt', probability: Math.random() }
    ];

    const highestThreat = threats.reduce((max, threat) => 
      threat.probability > max.probability ? threat : max
    );

    return {
      isHarmful: highestThreat.probability > 0.7,
      threatLevel: highestThreat.probability > 0.7 ? 'High' : 
                  highestThreat.probability > 0.4 ? 'Medium' : 'Low',
      threats: threats.filter(t => t.probability > 0.4),
      mainReason: highestThreat.type
    };
  };

  const handleTextAnalysis = () => {
    if (!textInput.trim()) return;

    const analysis = analyzeContent(textInput);
    setTextAnalysis(analysis);

    if (analysis.isHarmful) {
      setFraudCount(prev => prev + 1);
    }

    // Add to upload history
    const historyEntry = {
      id: Math.random().toString(36).substring(7),
      fileName: 'Text Analysis',
      uploadDate: new Date().toISOString(),
      threatLevel: analysis.threatLevel,
      mainReason: analysis.mainReason,
      isHarmful: analysis.isHarmful
    };
    
    setUploadHistory(prev => [historyEntry, ...prev]);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substring(7),
      status: 'scanning',
      analysis: null,
      uploadDate: new Date().toISOString()
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Simulate file analysis
    newFiles.forEach(fileObj => {
      const reader = new FileReader();
      
      reader.onload = () => {
        setTimeout(() => {
          const analysis = analyzeContent(reader.result);
          
          // Update files state
          setFiles(prev => 
            prev.map(f => 
              f.id === fileObj.id 
                ? { ...f, status: 'analyzed', analysis }
                : f
            )
          );
          
          // Update fraud count if harmful
          if (analysis.isHarmful) {
            setFraudCount(prev => prev + 1);
          }

          // Add to upload history
          const historyEntry = {
            id: fileObj.id,
            fileName: fileObj.file.name,
            uploadDate: fileObj.uploadDate,
            threatLevel: analysis.threatLevel,
            mainReason: analysis.mainReason,
            isHarmful: analysis.isHarmful
          };
          
          setUploadHistory(prev => [historyEntry, ...prev]);
        }, 2000 + Math.random() * 2000);
      };

      if (fileObj.file.type.startsWith('text/')) {
        reader.readAsText(fileObj.file);
      } else {
        reader.readAsArrayBuffer(fileObj.file);
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/*': ['.txt', '.md'],
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropAccepted: () => setDragActive(false),
    onDropRejected: () => setDragActive(false)
  });

  const handleLogout = () => {
    navigate('/');
  };

  const getThreatColor = (level) => {
    switch (level) {
      case 'High': return '#ff0055';
      case 'Medium': return '#ffaa00';
      case 'Low': return '#00ff66';
      default: return '#00fff2';
    }
  };

  return (
    <div className={`upload-container ${isDarkMode ? 'dark' : 'light'}`}>
      <header className="header">
        <div className="logo-section">
          <Logo width={180} height={45} />
        </div>
        <nav className="nav-links">
          <button onClick={() => navigate('/history')}>History</button>
          <button onClick={() => navigate('/info')}>Info</button>
          <button onClick={toggleTheme}>
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <div className="upload-content">
        <h1 className="upload-title">FlagGuard Analysis System</h1>
        <p className="upload-description">
          Upload files or analyze text for potential threats. Our AI-powered system will scan for malicious content,
          suspicious patterns, and potential security risks.
        </p>

        <div className="analysis-sections">
          <div className="upload-section">
            <h2 className="section-title">File Analysis</h2>
            <div 
              {...getRootProps()} 
              className={`upload-box ${dragActive ? 'drag-over' : ''}`}
            >
              <input {...getInputProps()} />
              <div className="upload-placeholder">
                <span className="upload-placeholder-icon">
                  {isDragActive ? '📥' : '🛡️'}
                </span>
                <p className="upload-placeholder-text">
                  {isDragActive
                    ? "Drop your files here"
                    : "Drag & drop files here"}
                </p>
                <p className="upload-placeholder-subtext">
                  or click to browse your computer
                </p>
              </div>
            </div>
          </div>

          <div className="text-analysis-section">
            <h2 className="section-title">Text Analysis</h2>
            <div className="text-input-container">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter text to analyze for potential threats..."
                className="text-input"
              />
              <button 
                onClick={handleTextAnalysis}
                className="analyze-button"
                disabled={!textInput.trim()}
              >
                Analyze Text
              </button>
            </div>

            {textAnalysis && (
              <div className={`text-analysis-result ${textAnalysis.isHarmful ? 'harmful' : 'safe'}`}>
                <div className="result-header">
                  <span className="result-icon">
                    {textAnalysis.isHarmful ? '⚠️' : '✅'}
                  </span>
                  <span className="result-status">
                    {textAnalysis.isHarmful ? 'Potential Threats Detected' : 'Text Appears Safe'}
                  </span>
                </div>
                <div className="result-details">
                  <p className="threat-level" style={{
                    color: getThreatColor(textAnalysis.threatLevel)
                  }}>
                    Threat Level: {textAnalysis.threatLevel}
                  </p>
                  {textAnalysis.isHarmful && (
                    <p className="threat-reason">
                      Main concern: {textAnalysis.mainReason}
                    </p>
                  )}
                  {textAnalysis.threats.length > 0 && (
                    <div className="detected-threats">
                      <p>Detected Issues:</p>
                      <ul>
                        {textAnalysis.threats.map((threat, index) => (
                          <li key={index}>
                            {threat.type} (Risk: {Math.round(threat.probability * 100)}%)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {files.length > 0 && (
          <div className="file-list">
            {files.map((fileObj) => (
              <div key={fileObj.id} className="file-item">
                <div className="file-info">
                  <span className="file-icon">
                    {fileObj.status === 'analyzed' && fileObj.analysis.isHarmful ? '⚠️' : '📄'}
                  </span>
                  <div className="file-details">
                    <span className="file-name">{fileObj.file.name}</span>
                    {fileObj.status === 'analyzed' && (
                      <div className="analysis-results">
                        <span className="threat-level" style={{
                          color: getThreatColor(fileObj.analysis.threatLevel)
                        }}>
                          Threat Level: {fileObj.analysis.threatLevel}
                        </span>
                        {fileObj.analysis.isHarmful && (
                          <div className="threat-reason">
                            Main concern: {fileObj.analysis.mainReason}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <span className="file-status" style={{
                  color: fileObj.status === 'analyzed' 
                    ? getThreatColor(fileObj.analysis.threatLevel)
                    : 'var(--neon-primary)'
                }}>
                  {fileObj.status === 'scanning' ? '🔍 Analyzing...' :
                   fileObj.analysis?.isHarmful ? '⚠️ Threats Detected' : '✅ Safe'}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="fraud-counter">
          <h3 className="counter-title">Harmful Content Detected</h3>
          <div className="counter-value">{fraudCount}</div>
        </div>

        {uploadHistory.length > 0 && (
          <div className="file-history">
            <h2 className="history-title">Recent Uploads</h2>
            <div className="history-list">
              {uploadHistory.slice(0, 5).map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-item-left">
                    <span className="history-item-icon">
                      {item.isHarmful ? '⚠️' : '✅'}
                    </span>
                    <div className="history-item-info">
                      <span className="history-item-name">{item.fileName}</span>
                      <span className="history-item-date">
                        {new Date(item.uploadDate).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <span 
                    className="history-item-status"
                    style={{ color: getThreatColor(item.threatLevel) }}
                  >
                    {item.isHarmful ? 'Threat Detected' : 'Safe'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload; 