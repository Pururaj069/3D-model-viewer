import React from 'react';
import './ViewerInfo.css';

const ViewerInfo = ({ model }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="viewer-info">
      <div className="info-header">
        <h3>Model Information</h3>
      </div>
      
      <div className="info-content">
        <div className="info-item">
          <label>Name:</label>
          <span>{model.name}</span>
        </div>
        
        <div className="info-item">
          <label>File Size:</label>
          <span>{formatFileSize(model.size)}</span>
        </div>
        
        <div className="info-item">
          <label>Format:</label>
          <span>GLB (GL Transmission Format)</span>
        </div>
        
        <div className="info-item">
          <label>Last Modified:</label>
          <span>{formatDate(model.lastModified)}</span>
        </div>
        
        <div className="info-item">
          <label>Model URL:</label>
          <span className="url-text" title={model.modelUrl}>
            {model.modelUrl.split('/').pop()}
          </span>
        </div>
        
        <div className="info-actions">
          <a 
            href={model.modelUrl} 
            download={`${model.name}.glb`}
            className="download-button"
          >
            Download Model
          </a>
          
          {/* <button 
            className="share-button"
            onClick={() => {
              navigator.clipboard.writeText(model.modelUrl);
              alert('Model URL copied to clipboard!');
            }}
          >
            Copy URL
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ViewerInfo;