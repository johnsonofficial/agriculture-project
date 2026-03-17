
import React from 'react';

const WeatherFeatures = () => {
  return (
    <div className="glass-card p-8 mb-12">
      <h2 className="text-2xl font-bold mb-6">Agricultural Weather Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Hyperlocal Forecasts</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Get field-level weather forecasts using high-resolution weather models that account for local topography and microclimates.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Growing Degree Days</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Track accumulated heat units to predict crop development stages, optimize planting times, and schedule harvests.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Spray Windows</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Identify optimal windows for applying fertilizers, herbicides, and pesticides based on wind, temperature, and precipitation forecasts.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Frost Alerts</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Receive advance notifications of potential frost or freeze events to protect sensitive crops and implement mitigation strategies.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Disease Modeling</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Predict disease pressure based on temperature, humidity, and leaf wetness conditions to optimize fungicide applications.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Irrigation Planning</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate evapotranspiration rates and crop water needs based on weather conditions to optimize irrigation scheduling.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherFeatures;
