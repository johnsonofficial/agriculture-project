
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart2, TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Seed market data
const seedMarketData = [
  {
    id: 'wheat',
    name: 'Wheat',
    price: 85, // $ per kg
    trend: -2, // -2% trend
    availability: 'In Stock',
    supplier: 'DroughtGuard Seeds',
  },
  {
    id: 'rice',
    name: 'Rice',
    price: 95, // $ per kg
    trend: 3, // +3% trend
    availability: 'In Stock',
    supplier: 'RiceGrow International',
  },
  {
    id: 'corn',
    name: 'Corn',
    price: 150, // $ per kg
    trend: 5, // +5% trend
    availability: 'In Stock',
    supplier: 'AgriTech Seeds',
  },
  {
    id: 'soybeans',
    name: 'Soybeans',
    price: 120, // $ per kg
    trend: 0, // 0% trend
    availability: 'Limited Stock',
    supplier: 'Organic Farms Co.',
  },
  {
    id: 'potatoes',
    name: 'Potatoes',
    price: 45, // $ per kg
    trend: -1, // -1% trend
    availability: 'In Stock',
    supplier: 'TuberTech Seeds',
  },
  {
    id: 'tomatoes',
    name: 'Tomatoes',
    price: 550, // $ per kg
    trend: 8, // +8% trend
    availability: 'Limited Stock',
    supplier: 'VeggiePro Seeds',
  }
];

const getTrendIcon = (trend: number) => {
  if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
  if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
  return <Minus className="h-4 w-4 text-gray-500" />;
};

const SeedMarketPrices = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <BarChart2 className="h-6 w-6 text-primary mr-3" />
          <h3 className="text-xl font-semibold">Current Seed Market Prices</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-4">Seed Name</th>
                <th className="text-center py-2 px-4">Price ($/kg)</th>
                <th className="text-center py-2 px-4">Trend</th>
                <th className="text-center py-2 px-4">Availability</th>
                <th className="text-right py-2 px-4">Supplier</th>
              </tr>
            </thead>
            <tbody>
              {seedMarketData.map(seed => (
                <tr key={seed.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 font-medium">{seed.name}</td>
                  <td className="text-center py-3 px-4">${seed.price}</td>
                  <td className="text-center py-3 px-4">
                    <div className="flex items-center justify-center">
                      {getTrendIcon(seed.trend)}
                      <span className={`ml-1 ${
                        seed.trend > 0 ? 'text-green-500' : 
                        seed.trend < 0 ? 'text-red-500' : 'text-gray-500'
                      }`}>
                        {seed.trend > 0 ? '+' : ''}{seed.trend}%
                      </span>
                    </div>
                  </td>
                  <td className="text-center py-3 px-4">
                    <Badge 
                      variant={seed.availability === "In Stock" ? "default" : "secondary"}
                      className={seed.availability === "In Stock" ? "bg-green-500" : "bg-yellow-500"}
                    >
                      {seed.availability}
                    </Badge>
                  </td>
                  <td className="text-right py-3 px-4">{seed.supplier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-right">
          * Prices updated daily. Last update: {new Date().toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default SeedMarketPrices;
