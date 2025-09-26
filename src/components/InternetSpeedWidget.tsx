import React from 'react';
import './DataWidget.css';

interface InternetSpeedWidgetProps {
  speed: string;
}

const InternetSpeedWidget: React.FC<InternetSpeedWidgetProps> = ({ speed }) => {
  return (
    <div className="data-widget">
      <h4>Internet Speed</h4>
      <p className="widget-value">{speed}</p>
      <p className="widget-description">Average speed in this destination.</p>
    </div>
  );
};

export default InternetSpeedWidget; 