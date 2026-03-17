
// Format date from timestamp
export const formatDate = (dt: number, timezone: number): string => {
  const date = new Date((dt + timezone) * 1000);
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long',
    month: 'short',
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

// Example weather mapping function
export const mapWeatherTypeFromCode = (code: number): 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy' | 'stormy' | 'drizzle' => {
  if (code >= 200 && code < 300) return 'stormy'; // Thunderstorm
  if (code >= 300 && code < 400) return 'drizzle'; // Drizzle
  if (code >= 500 && code < 600) return 'rainy'; // Rain
  if (code >= 600 && code < 700) return 'snowy'; // Snow
  if (code >= 700 && code < 800) return 'windy'; // Atmosphere (mist, fog)
  if (code === 800) return 'sunny'; // Clear
  if (code > 800) return 'cloudy'; // Clouds
  
  return 'cloudy'; // Default
};
