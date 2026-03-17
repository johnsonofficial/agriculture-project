
import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Wind, CloudLightning, CloudDrizzle, Thermometer } from 'lucide-react';

interface WeatherData {
  location: string;
  date: string;
  temperature: number;
  weatherType: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy' | 'stormy' | 'drizzle';
  humidity: number;
  windSpeed: number;
  precipitation: number;
  temperatureUnit?: string;
}

interface WeatherWidgetProps {
  data: WeatherData;
  className?: string;
}

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  snowy: CloudSnow,
  windy: Wind,
  stormy: CloudLightning,
  drizzle: CloudDrizzle,
};

const WeatherWidget = ({ data, className }: WeatherWidgetProps) => {
  const WeatherIcon = weatherIcons[data.weatherType];
  const temperatureUnit = data.temperatureUnit || 'C';

  // Generate weather description based on weather type
  const getWeatherDescription = (type: string) => {
    switch (type) {
      case 'sunny': return 'Clear skies';
      case 'cloudy': return 'Partly cloudy';
      case 'rainy': return 'Rain showers';
      case 'snowy': return 'Snow';
      case 'windy': return 'Windy conditions';
      case 'stormy': return 'Thunderstorms';
      case 'drizzle': return 'Light rain';
      default: return 'Weather data';
    }
  };

  return (
    <div className={`glass-card p-6 shadow-sm hover:shadow-md transition-shadow ${className} h-full`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{data.location}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{data.date}</p>
        </div>
        <div className="flex items-center">
          <WeatherIcon className="h-10 w-10 text-sky-500" />
        </div>
      </div>
      
      <div className="flex items-end gap-2 mb-2">
        <div className="text-4xl font-bold">{data.temperature}°</div>
        <div className="text-gray-500 dark:text-gray-400 ml-1 mb-1">{temperatureUnit}</div>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        {getWeatherDescription(data.weatherType)}
      </p>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Humidity</div>
          <div className="font-semibold">{data.humidity}%</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Wind</div>
          <div className="font-semibold">{data.windSpeed} km/h</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Precip.</div>
          <div className="font-semibold">{data.precipitation} mm</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
