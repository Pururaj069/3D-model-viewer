import React, { useState } from 'react';
import './ModelCard.css';

const ModelCard = ({ model, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleCardClick = () => {
    onClick(model);
  };

  // const formatFileSize = (bytes) => {
  //   if (bytes === 0) return '0 Bytes';
  //   const k = 1024;
  //   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  // };

  return (
    <div className="model-card" onClick={handleCardClick}>
      <div className="model-card-image-container">
        {imageLoading && (
          <div className="model-card-image-loading">
            <div className="model-card-spinner"></div>
          </div>
        )}
        {imageError ? (
          <div className="model-card-image-placeholder">
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <path d="m3.27 6.96 8.73 5.04 8.73-5.04"/>
              <path d="M12 22.08V12"/>
            </svg>
            <span>3D Model</span>
          </div>
        ) : (
          <img 
            src={model.thumbnailUrl} 
            alt={model.name}
            className="model-card-image"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
        )}
        <div className="model-card-overlay">
          <button className="model-card-view-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            View 3D
          </button>
        </div>
      </div>
      
      <div className="model-card-content">
        <h3 className="model-card-title">{model.name}</h3>
        <div className="model-card-info">
          {/* <span className="model-card-size">{formatFileSize(model.size)}</span> */}
          {model.lastModified && (
            <span className="model-card-date">
              {new Date(model.lastModified).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelCard;