import React from 'react';

const Dot = ({ status, onClick, isPlaceholder, day }) => {
  if (isPlaceholder) {
    return <div className="dot placeholder" />;
  }
  
  return (
    <div 
      className={`dot ${status}`} 
      onClick={onClick}
      data-day={day}
    />
  );
};

export default Dot;
