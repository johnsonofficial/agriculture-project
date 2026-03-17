
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Droplets, 
  Thermometer, 
  Calendar, 
  BarChart2,
  DollarSign,
  ShieldCheck,
  MapPin
} from 'lucide-react';

// Define the types of seeds
const detailedSeedData = [
  {
    id: 'wheat',
    name: 'Drought-Resistant Wheat',
    image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    season: 'Winter',
    soilType: ['Clay', 'Loamy'],
    waterNeeds: 'Low' as const,
    growthPeriod: '120-150 days',
    idealTemp: '15-25°C',
    yieldEstimate: '4-6 tons/hectare',
    description: 'A hardy winter wheat variety that can thrive with minimal water, making it ideal for regions with limited rainfall or drought-prone areas.',
    seedRate: 100, // kg per acre
    germinationRate: 92, // percentage
    diseaseResistance: 'Medium',
    price: 85, // $ per kg
    bestPlantingMonths: ['October', 'November'],
    nutrientNeeds: 'Medium nitrogen, low phosphorus',
    harvestingTips: 'Harvest when grain is hard and moisture content is below 14%.',
  },
  {
    id: 'corn',
    name: 'Premium Hybrid Corn',
    image: 'https://images.unsplash.com/photo-1551817958-c5b51e7b4a33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    season: 'Summer',
    soilType: ['Loamy', 'Sandy Loam'],
    waterNeeds: 'Medium' as const,
    growthPeriod: '90-120 days',
    idealTemp: '20-30°C',
    yieldEstimate: '8-10 tons/hectare',
    description: 'A high-yielding corn hybrid suitable for various soil types with excellent drought resistance and disease tolerance.',
    seedRate: 25, // kg per acre
    germinationRate: 95, // percentage
    diseaseResistance: 'High',
    price: 150, // $ per kg
    bestPlantingMonths: ['April', 'May'],
    nutrientNeeds: 'High nitrogen, medium phosphorus and potassium',
    harvestingTips: 'Harvest when kernels are firm and milk line has disappeared.',
  },
  {
    id: 'rice',
    name: 'High-Yield Rice',
    image: 'https://images.unsplash.com/photo-1536632506336-963aef327d95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
    season: 'Summer',
    soilType: ['Clayey', 'Silt'],
    waterNeeds: 'High' as const,
    growthPeriod: '110-130 days',
    idealTemp: '22-32°C',
    yieldEstimate: '6-8 tons/hectare',
    description: 'A high-yielding rice variety developed for intensive cultivation systems with excellent resistance to common rice diseases.',
    seedRate: 40, // kg per acre
    germinationRate: 88, // percentage
    diseaseResistance: 'High',
    price: 95, // $ per kg
    bestPlantingMonths: ['June', 'July'],
    nutrientNeeds: 'High nitrogen, medium phosphorus',
    harvestingTips: 'Harvest when 80-85% of the grains have turned yellow-golden.',
  },
];

const DetailedSeedInfo = () => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <Leaf className="mr-2 h-6 w-6 text-primary" />
        Detailed Seed Information
      </h3>
      
      <Tabs defaultValue="wheat">
        <TabsList className="w-full grid grid-cols-1 md:grid-cols-3 mb-6">
          {detailedSeedData.map(seed => (
            <TabsTrigger key={seed.id} value={seed.id} className="text-sm">
              {seed.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {detailedSeedData.map(seed => (
          <TabsContent key={seed.id} value={seed.id}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="rounded-lg overflow-hidden mb-4">
                  <img 
                    src={seed.image} 
                    alt={seed.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-primary">{seed.season}</Badge>
                  {seed.soilType.map(soil => (
                    <Badge key={soil} variant="outline">{soil}</Badge>
                  ))}
                  <Badge 
                    className={
                      seed.waterNeeds === 'Low' ? 'bg-blue-400' : 
                      seed.waterNeeds === 'Medium' ? 'bg-blue-500' : 'bg-blue-600'
                    }
                  >
                    {seed.waterNeeds} Water
                  </Badge>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {seed.description}
                </p>
              </div>
              
              <div className="md:col-span-2">
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-4">Growth Properties</h4>
                    
                    <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Growth Period</p>
                          <p className="font-medium">{seed.growthPeriod}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Thermometer className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Ideal Temperature</p>
                          <p className="font-medium">{seed.idealTemp}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <BarChart2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Yield Estimate</p>
                          <p className="font-medium">{seed.yieldEstimate}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Droplets className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Water Needs</p>
                          <p className="font-medium">{seed.waterNeeds}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-4">Seed Properties</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Germination Rate</span>
                          <span className="text-sm font-medium">{seed.germinationRate}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${seed.germinationRate}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Disease Resistance</span>
                          <span className="text-sm font-medium">{seed.diseaseResistance}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ 
                              width: 
                                seed.diseaseResistance === 'Low' ? '25%' : 
                                seed.diseaseResistance === 'Medium' ? '50%' : 
                                seed.diseaseResistance === 'High' ? '75%' : '90%'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3">
                      <div className="flex items-center">
                        <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Application Rate</p>
                          <p className="font-medium">{seed.seedRate} kg/acre</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-primary mr-2" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Market Price</p>
                          <p className="font-medium">${seed.price}/kg</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-primary mr-2" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Best Planting Months</p>
                          <p className="font-medium">{seed.bestPlantingMonths.join(', ')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Leaf className="h-5 w-5 text-primary mr-2" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Nutrient Needs</p>
                          <p className="font-medium">{seed.nutrientNeeds}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                  <h4 className="font-semibold flex items-center mb-2">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    Harvesting Tip
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {seed.harvestingTips}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DetailedSeedInfo;
