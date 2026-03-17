
import React from 'react';

const GoogleMap: React.FC = () => {
  // This is a simple iframe embed of Google Maps
  return (
    <div className="glass-card overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.895889923706!2d-73.98777048459422!3d40.75790467932708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square%2C%20New%20York%2C%20NY%2010036!5e0!3m2!1sen!2sus!4v1623345580666!5m2!1sen!2sus"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
        className="rounded-lg"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
