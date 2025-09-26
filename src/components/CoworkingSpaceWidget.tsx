import React from 'react';
import './DataWidget.css';

interface CoworkingSpaceWidgetProps {
  available: boolean;
}

const CoworkingSpaceWidget: React.FC<CoworkingSpaceWidgetProps> = ({ available }) => {
  return (
    <div className="data-widget">
      <h4>Coworking Spaces</h4>
      {available ? (
        <p className="widget-value available">Available</p>
      ) : (
        <p className="widget-value not-available">Not Available</p>
      )}
      <p className="widget-description">Status of coworking spaces.</p>
    </div>
  );
};

export default CoworkingSpaceWidget; 