
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator } from 'lucide-react';

interface SeedQuantityCalculatorProps {
  className?: string;
}

const SeedQuantityCalculator: React.FC<SeedQuantityCalculatorProps> = ({ className }) => {
  const [area, setArea] = useState<string>('');
  const [unit, setUnit] = useState<string>('acres');
  const [seedType, setSeedType] = useState<string>('corn');
  const [result, setResult] = useState<string | null>(null);

  // Seed rates by type (kg per hectare or lb per acre)
  const seedRates: Record<string, { metric: number; imperial: number; spacing?: string }> = {
    corn: { 
      metric: 25, 
      imperial: 22, 
      spacing: '75cm between rows, 20cm between plants' 
    },
    wheat: { 
      metric: 120, 
      imperial: 107, 
      spacing: '15-20cm row spacing'
    },
    soybean: { 
      metric: 80, 
      imperial: 71, 
      spacing: '30cm between rows, 5cm between plants' 
    },
    sorghum: { 
      metric: 10, 
      imperial: 9, 
      spacing: '70-75cm between rows, 15cm between plants' 
    },
    rice: { 
      metric: 100, 
      imperial: 89, 
      spacing: 'Direct seeded: 20cm between rows'
    },
  };

  const handleCalculate = () => {
    if (!area || isNaN(Number(area)) || Number(area) <= 0) {
      setResult('Please enter a valid area.');
      return;
    }

    const numericArea = parseFloat(area);
    let quantity: number;
    let unitLabel: string;

    // Convert to standard units and calculate
    if (unit === 'acres') {
      quantity = numericArea * seedRates[seedType].imperial;
      unitLabel = 'pounds';
    } else if (unit === 'hectares') {
      quantity = numericArea * seedRates[seedType].metric;
      unitLabel = 'kilograms';
    } else if (unit === 'sqm') {
      quantity = (numericArea / 10000) * seedRates[seedType].metric;
      unitLabel = 'kilograms';
    } else { // square feet
      quantity = (numericArea / 43560) * seedRates[seedType].imperial;
      unitLabel = 'pounds';
    }

    setResult(`You need approximately ${quantity.toFixed(2)} ${unitLabel} of ${seedType} seeds for ${numericArea} ${unit}.`);
  };

  return (
    <div className={`glass-card p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-green-600 dark:text-green-400" />
        <h3 className="text-lg font-semibold">Seed Quantity Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="area" className="block text-sm font-medium mb-1">Area</label>
            <Input
              id="area"
              type="number"
              min="0"
              placeholder="Enter area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="unit" className="block text-sm font-medium mb-1">Unit</label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger id="unit">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acres">Acres</SelectItem>
                <SelectItem value="hectares">Hectares</SelectItem>
                <SelectItem value="sqm">Square Meters</SelectItem>
                <SelectItem value="sqft">Square Feet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label htmlFor="seedType" className="block text-sm font-medium mb-1">Seed Type</label>
          <Select value={seedType} onValueChange={setSeedType}>
            <SelectTrigger id="seedType">
              <SelectValue placeholder="Select seed type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="corn">Corn</SelectItem>
              <SelectItem value="wheat">Wheat</SelectItem>
              <SelectItem value="soybean">Soybean</SelectItem>
              <SelectItem value="sorghum">Sorghum</SelectItem>
              <SelectItem value="rice">Rice</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleCalculate} className="w-full">Calculate</Button>
        
        {result && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
            <p className="text-sm">{result}</p>
            {seedRates[seedType].spacing && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-medium">Recommended spacing:</span> {seedRates[seedType].spacing}
              </p>
            )}
          </div>
        )}
        
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Note: These calculations are estimates based on standard seeding rates. Actual requirements may vary based on soil conditions, seed quality, and local agricultural practices.
        </div>
      </div>
    </div>
  );
};

export default SeedQuantityCalculator;
