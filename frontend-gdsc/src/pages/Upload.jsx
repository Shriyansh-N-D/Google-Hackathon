import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Upload.css";

function Upload() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [userStatus, setUserStatus] = useState("Guest");
  const [theme, setTheme] = useState("system");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    const registered = sessionStorage.getItem("isRegistered");
    const loggedIn = sessionStorage.getItem("isLoggedIn");

    if (registered === "true") setUserStatus("Registered");
    else if (loggedIn === "true") setUserStatus("Logged In");
    else setUserStatus("Guest");
  }, []);

  useEffect(() => {
    document.body.classList.remove("theme-dark", "theme-light");
    if (theme === "dark") document.body.classList.add("theme-dark");
    else if (theme === "light") document.body.classList.add("theme-light");
  }, [theme]);

  const handleUpload = () => {
    const uploads = JSON.parse(localStorage.getItem("flagguard_uploads")) || [];

    if (imageFile) {
      uploads.push({ type: "image", data: URL.createObjectURL(imageFile) });
    }
    if (videoFile) {
      uploads.push({ type: "video", data: URL.createObjectURL(videoFile) });
    }
    if (text.trim()) {
      uploads.push({ type: "text", data: text });
    }

    localStorage.setItem("flagguard_uploads", JSON.stringify(uploads));
    alert("Upload successful!");
    setText("");
    setImageFile(null);
    setVideoFile(null);
  };

  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="header-left">
          <img src="/final6.png" alt="logo" className="logo-image-large" />
        </div>

        <div className="header-center">
          
        </div>

        <div className="header-right">
          <select
            className="dropdown"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "uploads") navigate("/previous-uploads");
              else if (value === "logout") navigate("/");
            }}
          >
            <option value="status">{userStatus}</option>
            <option value="uploads">Previous Uploads</option>
            <option value="logout">Logout</option>
          </select>

          <select
            className="dropdown"
            onChange={(e) => setTheme(e.target.value)}
            value={theme}
          >
            <option value="system">Theme: System</option>
            <option value="light">Theme: Light</option>
            <option value="dark">Theme: Dark</option>
          </select>
        </div>
      </header>

      <section className="intro-text">
        <h2>Welcome to FlagGuard</h2>
        <p>
          Upload an image, video, or enter some text, and FlagGuard will let you know
          if it’s harmful or not. Your content is saved for easy reference, and you
          can manage your preferences in settings.
        </p>
      </section>

      <section className="upload-section">
        <div className="upload-card">
          <label className="upload-label">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        <div className="upload-card">
          <label className="upload-label">Upload Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </div>

        <div className="upload-card">
          <label className="upload-label">Enter Text</label>
          <textarea
            placeholder="Enter text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </section>

      <div className="center-button">
        <button className="upload-button" onClick={handleUpload} title="Upload">
          ⬆️ Upload
        </button>
      </div>
    </div>
  );
}

export default Upload;
