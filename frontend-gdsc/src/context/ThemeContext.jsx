import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize from localStorage if available
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  const updateThemeVariables = useCallback((darkMode) => {
    const root = document.documentElement;
    if (!darkMode) {
      // Light theme - Olive green and off-white palette
      root.style.setProperty('--primary-color', '#556B2F');
      root.style.setProperty('--secondary-color', '#8B9B6B');
      root.style.setProperty('--background-color', '#F5F5F0');
      root.style.setProperty('--text-color', '#2C3E50');
      root.style.setProperty('--border-color', '#556B2F');
      root.style.setProperty('--card-bg', '#FFFFFF');
      root.style.setProperty('--hover-color', '#6B8E23');
      root.style.setProperty('--shadow', '0 4px 12px rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--hover-shadow', '0 6px 16px rgba(0, 0, 0, 0.15)');
      root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #556B2F 0%, #8B9B6B 100%)');
      root.style.setProperty('--neon-glow', 'none');
      root.style.setProperty('--neon-glow-intense', 'none');
      root.style.setProperty('--gradient-glow', 'linear-gradient(45deg, #556B2F, #8B9B6B)');
    } else {
      // Dark theme (neon)
      root.style.setProperty('--primary-color', '#00fff2');
      root.style.setProperty('--secondary-color', '#7700ff');
      root.style.setProperty('--background-color', '#0a0a0a');
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--border-color', '#00fff2');
      root.style.setProperty('--card-bg', 'rgba(0, 255, 242, 0.02)');
      root.style.setProperty('--hover-color', '#00fff2');
      root.style.setProperty('--shadow', 'var(--neon-glow)');
      root.style.setProperty('--hover-shadow', 'var(--neon-glow-intense)');
      root.style.setProperty('--gradient-primary', 'var(--gradient-glow)');
      root.style.setProperty('--neon-glow', '0 0 10px rgba(0, 255, 242, 0.5), 0 0 20px rgba(0, 255, 242, 0.3), 0 0 30px rgba(0, 255, 242, 0.1)');
      root.style.setProperty('--neon-glow-intense', '0 0 10px rgba(0, 255, 242, 0.8), 0 0 20px rgba(0, 255, 242, 0.6), 0 0 30px rgba(0, 255, 242, 0.4), 0 0 40px rgba(0, 255, 242, 0.2)');
      root.style.setProperty('--gradient-glow', 'linear-gradient(45deg, #00ffff, #ff00ff)');
    }
  }, []);

  useEffect(() => {
    updateThemeVariables(isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode, updateThemeVariables]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 