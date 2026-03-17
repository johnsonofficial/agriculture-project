
import React from 'react';
import WeatherWidget from '@/components/WeatherWidget';

interface WeatherData {
  location: string;
  date: string;
  temperature: number;
  weatherType: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy' | 'stormy' | 'drizzle';
  humidity: number;
  windSpeed: number;
  precipitation: number;
  temperatureUnit?: string;
  description?: string;
  feelsLike?: number;
  pressure?: number;
  visibility?: number;
  sunrise?: string;
  sunset?: string;
}

interface CurrentWeatherTabProps {
  weatherData: WeatherData | null;
}

const CurrentWeatherTab = ({ weatherData }: CurrentWeatherTabProps) => {
  if (!weatherData) return null;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <WeatherWidget data={weatherData} />
      </div>
      
      <div className="md:col-span-2 glass-card p-6">
        <h3 className="text-xl font-semibold mb-4">Current Conditions in {weatherData.location}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Feels Like</h4>
            <p className="text-2xl font-bold">{weatherData.feelsLike}°C</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Visibility</h4>
            <p className="text-2xl font-bold">{weatherData.visibility} km</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Pressure</h4>
            <p className="text-2xl font-bold">{weatherData.pressure} hPa</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">UV Index</h4>
            <p className="text-2xl font-bold">
              {weatherData.temperature > 30 ? '8 (High)' : 
               weatherData.temperature > 25 ? '6 (Moderate)' : 
               '3 (Low)'}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Sunrise</h4>
            <p className="text-2xl font-bold">{weatherData.sunrise}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Sunset</h4>
            <p className="text-2xl font-bold">{weatherData.sunset}</p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          <h4 className="font-medium mb-3">Weather Alert for {weatherData.location}</h4>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3">
            {weatherData.temperature > 35 ? (
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Extreme heat warning. Take precautions to prevent heat-related illness.
              </p>
            ) : weatherData.weatherType === 'rainy' || weatherData.weatherType === 'stormy' ? (
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Heavy rainfall warning. Potential for localized flooding in low-lying areas.
              </p>
            ) : (
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                No severe weather alerts at this time. Regular agricultural activities can proceed.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherTab;
