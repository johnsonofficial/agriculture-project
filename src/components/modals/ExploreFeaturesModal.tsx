import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plane, Activity, Droplets, RotateCcw, Leaf, Award, ChevronRight } from 'lucide-react';
import modernAgricultureImage from '@/assets/modern-agriculture-features.jpg';

interface ExploreFeaturesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExploreFeaturesModal = ({ open, onOpenChange }: ExploreFeaturesModalProps) => {
  const features = [
    {
      icon: Plane,
      title: "Precision Farming with Drones",
      description: "Monitor crop health, identify pest infestations, and optimize field management with aerial surveillance and mapping technology."
    },
    {
      icon: Activity,
      title: "IoT Sensors for Soil Health",
      description: "Real-time monitoring of soil moisture, pH levels, temperature, and nutrient content to make data-driven farming decisions."
    },
    {
      icon: Droplets,
      title: "Smart Irrigation Systems",
      description: "Automated watering systems that adjust based on weather conditions, soil moisture, and crop requirements to optimize water usage."
    },
    {
      icon: Leaf,
      title: "Organic Farming Methods",
      description: "Sustainable practices including composting, natural pest control, and bio-fertilizers to promote ecological balance."
    },
    {
      icon: RotateCcw,
      title: "Advanced Crop Rotation",
      description: "Strategic planning of crop sequences to improve soil fertility, reduce pests, and maximize long-term productivity."
    },
    {
      icon: Award,
      title: "Government Schemes & Support",
      description: "Access information about agricultural subsidies, loans, insurance, and government programs to support your farming business."
    }
  ];

  const handleExploreMore = () => {
    onOpenChange(false);
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Modern Agricultural Innovations</DialogTitle>
          <DialogDescription className="text-center text-lg">
            Discover cutting-edge features that revolutionize farming productivity and sustainability
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={modernAgricultureImage} 
              alt="Modern precision farming with drones and IoT sensors"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-xl font-semibold">The Future of Agriculture is Here</h3>
              <p className="text-sm opacity-90">Leverage technology to increase yields while protecting the environment</p>
            </div>
          </div>

          <div className="grid gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2 text-blue-900 dark:text-blue-100">{feature.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-lg mb-3">🚀 Benefits of Modern Agriculture</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-green-700 dark:text-green-300 mb-2">Productivity Gains</h5>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>• 30-50% increase in crop yields</li>
                  <li>• Reduced labor costs through automation</li>
                  <li>• Optimized resource utilization</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Sustainability Benefits</h5>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>• 40% reduction in water usage</li>
                  <li>• Lower environmental impact</li>
                  <li>• Enhanced soil health management</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button onClick={handleExploreMore} size="lg" variant="outline" className="group">
              View All Features
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExploreFeaturesModal;