import React, { useEffect, useState } from "react";
import "./PreviousUploads.css";

const UploadPreviously = () => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const storedUploads = JSON.parse(localStorage.getItem("flagguard_uploads")) || [];
    setUploads(storedUploads);
  }, []);

  return (
    <div className="previous-uploads-container">
      <h1 className="uploads-title">Your Previous Uploads</h1>

      {uploads.length === 0 ? (
        <p className="no-uploads-msg">No uploads yet!</p>
      ) : (
        <div className="uploads-grid">
          {uploads.map((item, index) => (
            <div className="upload-card" key={index}>
              {item.type === "image" && (
                <img src={item.data} alt="Uploaded preview" className="upload-image" />
              )}
              {item.type === "video" && (
                <video src={item.data} controls className="upload-video" />
              )}
              {item.type === "text" && (
                <p className="upload-text">{item.data}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadPreviously;
