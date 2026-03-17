
import React from 'react';
import WeatherWidget from '@/components/WeatherWidget';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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

interface ForecastTabProps {
  forecastData: WeatherData[];
  weatherData: WeatherData | null;
}

const ForecastTab = ({ forecastData, weatherData }: ForecastTabProps) => {
  if (!weatherData) return null;
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {forecastData.map((day, index) => (
          <WeatherWidget key={index} data={day} />
        ))}
      </div>
      
      <div className="glass-card p-6 mt-8">
        <h3 className="text-xl font-semibold mb-4">Extended Forecast for {weatherData.location}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {weatherData.weatherType === 'rainy' || weatherData.weatherType === 'stormy' ? 
            "The 14-day extended forecast shows continued monsoon conditions with heavy rainfall expected throughout the period." :
            weatherData.temperature > 35 ? 
            "The 14-day extended forecast shows high temperatures continuing with a brief cooling period expected in 10-12 days." :
            "The 14-day extended forecast shows a warming trend with potential showers in 7-10 days."}
        </p>
        <Button variant="outline">
          View 14-Day Forecast <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default ForecastTab;
