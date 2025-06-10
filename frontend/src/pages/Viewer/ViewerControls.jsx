import React from 'react';
import './ViewerControls.css';

const ViewerControls = ({
  wireframe,
  autoRotate,
  showStats,
  onToggleWireframe,
  onToggleAutoRotate,
  onToggleStats,
  onResetCamera
}) => {
  return (
    <div className="viewer-controls">
      <div className="controls-section">
        <h4>Display</h4>
        <div className="control-group">
          <label className="control-item">
            <input
              type="checkbox"
              checked={wireframe}
              onChange={onToggleWireframe}
            />
            <span className="checkmark"></span>
            Wireframe
          </label>
          
          <label className="control-item">
            <input
              type="checkbox"
              checked={autoRotate}
              onChange={onToggleAutoRotate}
            />
            <span className="checkmark"></span>
            Auto Rotate
          </label>
          
          <label className="control-item">
            <input
              type="checkbox"
              checked={showStats}
              onChange={onToggleStats}
            />
            <span className="checkmark"></span>
            Show Info
          </label>
        </div>
      </div>

      <div className="controls-section">
        <h4>Camera</h4>
        <button 
          className="control-button"
          onClick={onResetCamera}
        >
          Reset View
        </button>
      </div>

      <div className="controls-section">
        <h4>Instructions</h4>
        <div className="instructions">
          <p><strong>Mouse:</strong></p>
          <p>• Left click + drag: Rotate</p>
          <p>• Right click + drag: Pan</p>
          <p>• Scroll: Zoom</p>
        </div>
      </div>
    </div>
  );
};

export default ViewerControls;