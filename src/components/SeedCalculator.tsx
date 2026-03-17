
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Calculator, Leaf, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Seed data with application rates
const seedData = [
  {
    id: 'wheat',
    name: 'Wheat',
    rate: 100, // kg per acre
    price: 85, // $ per kg
    bestPlantingMonths: ['October', 'November'],
    germinationRate: 92, 
    diseaseResistance: 'Medium',
  },
  {
    id: 'rice',
    name: 'Rice',
    rate: 40, // kg per acre
    price: 95, // $ per kg
    bestPlantingMonths: ['June', 'July'],
    germinationRate: 88,
    diseaseResistance: 'High',
  },
  {
    id: 'corn',
    name: 'Corn',
    rate: 25, // kg per acre
    price: 150, // $ per kg
    bestPlantingMonths: ['April', 'May'],
    germinationRate: 95,
    diseaseResistance: 'High',
  },
  {
    id: 'soybeans',
    name: 'Soybeans',
    rate: 80, // kg per acre
    price: 120, // $ per kg
    bestPlantingMonths: ['May', 'June'],
    germinationRate: 90,
    diseaseResistance: 'Medium',
  },
  {
    id: 'potatoes',
    name: 'Potatoes',
    rate: 1500, // kg per acre (seed potatoes)
    price: 45, // $ per kg
    bestPlantingMonths: ['February', 'March'],
    germinationRate: 98,
    diseaseResistance: 'Medium',
  },
  {
    id: 'tomatoes',
    name: 'Tomatoes',
    rate: 0.5, // kg per acre
    price: 550, // $ per kg
    bestPlantingMonths: ['March', 'April'],
    germinationRate: 95,
    diseaseResistance: 'High',
  }
];

const SeedCalculator = () => {
  const [selectedSeed, setSelectedSeed] = useState('');
  const [fieldArea, setFieldArea] = useState('1');
  const [areaUnit, setAreaUnit] = useState('acre');
  const [seedQuantity, setSeedQuantity] = useState<number | null>(null);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [seedDetails, setSeedDetails] = useState<typeof seedData[0] | null>(null);

  const handleCalculate = () => {
    const seed = seedData.find(s => s.id === selectedSeed);
    if (seed && fieldArea) {
      const area = parseFloat(fieldArea);
      if (!isNaN(area) && area > 0) {
        // Convert to standard unit (acre) if needed
        const areaInAcres = areaUnit === 'hectare' ? area * 2.47105 : area;
        const quantity = seed.rate * areaInAcres;
        setSeedQuantity(quantity);
        setEstimatedCost(quantity * seed.price);
        setSeedDetails(seed);
      }
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center mb-6">
        <Calculator className="h-8 w-8 text-primary mr-3" />
        <h3 className="text-xl font-semibold">Seed Application Calculator</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="seed-type">Select Seed Type</Label>
          <Select value={selectedSeed} onValueChange={setSelectedSeed}>
            <SelectTrigger id="seed-type" className="mt-1">
              <SelectValue placeholder="Choose a seed" />
            </SelectTrigger>
            <SelectContent>
              {seedData.map(seed => (
                <SelectItem key={seed.id} value={seed.id}>
                  {seed.name} ({seed.rate} kg/acre)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="field-area">Field Area</Label>
          <div className="flex mt-1">
            <Input 
              id="field-area" 
              type="number"
              min="0.1"
              step="0.1"
              value={fieldArea}
              onChange={(e) => setFieldArea(e.target.value)}
              className="rounded-r-none"
            />
            <Select value={areaUnit} onValueChange={setAreaUnit}>
              <SelectTrigger className="w-[120px] rounded-l-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acre">Acre</SelectItem>
                <SelectItem value="hectare">Hectare</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-end">
          <Button onClick={handleCalculate} className="w-full">
            Calculate
          </Button>
        </div>
      </div>
      
      {seedQuantity !== null && seedDetails && (
        <div className="mt-6 p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
          <h4 className="font-semibold text-lg mb-3">
            Calculation Results
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Seed Type</p>
              <p className="font-medium">
                {seedDetails.name}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Field Area</p>
              <p className="font-medium">{fieldArea} {areaUnit}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Required Seed Quantity</p>
              <p className="font-medium text-lg text-primary">
                {seedQuantity.toFixed(2)} kg
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Cost</p>
              <p className="font-medium text-lg text-primary">
                ${estimatedCost?.toFixed(2)}
              </p>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p className="flex items-center">
              <Leaf className="h-4 w-4 mr-1 text-green-500" />
              Germination Rate: {seedDetails.germinationRate}% | Disease Resistance: {seedDetails.diseaseResistance}
            </p>
            <p className="flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-1 text-green-500" />
              Best planting months: {seedDetails.bestPlantingMonths.join(', ')}
            </p>
          </div>
        </div>
      )}
      
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
        <h4 className="font-semibold mb-3">Common Seed Application Rates:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          <div className="flex justify-between">
            <span>Wheat:</span> 
            <span className="font-medium">100 kg per acre</span>
          </div>
          <div className="flex justify-between">
            <span>Rice:</span> 
            <span className="font-medium">40 kg per acre</span>
          </div>
          <div className="flex justify-between">
            <span>Corn:</span> 
            <span className="font-medium">25 kg per acre</span>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" className="group" asChild>
            <a href="/seed-guide">
              View Detailed Seed Guide
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeedCalculator;
