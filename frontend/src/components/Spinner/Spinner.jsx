import React from 'react';
import './Spinner.css';

const Spinner = ({ 
  size = 40, 
  color = '#3498db', 
  thickness = 4, 
  message = 'Loading...', 
  showMessage = true,
  className = ''
}) => {
  return (
    <div className={`spinner-container ${className}`}>
      <div 
        className="spinner"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: `${thickness}px solid #f3f3f3`,
          borderTop: `${thickness}px solid ${color}`,
        }}
      />
      {showMessage && (
        <p className="spinner-message">{message}</p>
      )}
    </div>
  );
};

export default Spinner;