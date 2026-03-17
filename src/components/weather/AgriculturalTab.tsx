
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

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

interface AgriculturalTabProps {
  weatherData: WeatherData | null;
}

const AgriculturalTab = ({ weatherData }: AgriculturalTabProps) => {
  if (!weatherData) return null;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 glass-card p-6">
        <h3 className="text-xl font-semibold mb-4">Growing Conditions</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Growing Degree Days (Base 10°C)</span>
              <span className="text-sm font-medium">18 GDD</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Soil Temperature (10cm)</span>
              <span className="text-sm font-medium">22°C</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Evapotranspiration</span>
              <span className="text-sm font-medium">5.2 mm/day</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '52%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Crop Water Demand</span>
              <span className="text-sm font-medium">High</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <label className="block text-sm font-medium mb-2">Select Crop Type</label>
          <Select defaultValue="corn">
            <SelectTrigger>
              <SelectValue placeholder="Select crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="corn">Corn/Maize</SelectItem>
              <SelectItem value="wheat">Wheat</SelectItem>
              <SelectItem value="soybean">Soybean</SelectItem>
              <SelectItem value="cotton">Cotton</SelectItem>
              <SelectItem value="rice">Rice</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="lg:col-span-2 glass-card p-6">
        <h3 className="text-xl font-semibold mb-4">Agricultural Recommendations</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Irrigation Planning</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Based on current soil moisture levels and the 5-day forecast, irrigation is recommended within the next 48 hours. Expected water requirement: 15-20mm equivalent.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Pest & Disease Risk</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Current temperature and humidity conditions indicate elevated risk for fungal pathogens. Consider preventative fungicide application before the forecasted rain on Thursday.
            </p>
            <div className="mt-2 flex gap-2">
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                Powdery Mildew: Moderate Risk
              </span>
              <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                Corn Leaf Blight: High Risk
              </span>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Field Operations</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Optimal conditions for field operations in the coming days:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left font-medium">Day</th>
                    <th className="text-left font-medium">Spraying</th>
                    <th className="text-left font-medium">Fertilizing</th>
                    <th className="text-left font-medium">Harvesting</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Today</td>
                    <td className="py-2 text-green-600">Excellent</td>
                    <td className="py-2 text-green-600">Good</td>
                    <td className="py-2 text-green-600">Excellent</td>
                  </tr>
                  <tr>
                    <td className="py-2">Tomorrow</td>
                    <td className="py-2 text-green-600">Good</td>
                    <td className="py-2 text-green-600">Excellent</td>
                    <td className="py-2 text-green-600">Good</td>
                  </tr>
                  <tr>
                    <td className="py-2">Wednesday</td>
                    <td className="py-2 text-yellow-600">Fair</td>
                    <td className="py-2 text-yellow-600">Fair</td>
                    <td className="py-2 text-yellow-600">Fair</td>
                  </tr>
                  <tr>
                    <td className="py-2">Thursday</td>
                    <td className="py-2 text-red-600">Poor</td>
                    <td className="py-2 text-red-600">Poor</td>
                    <td className="py-2 text-red-600">Poor</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgriculturalTab;
