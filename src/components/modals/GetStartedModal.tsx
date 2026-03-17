import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sprout, Droplets, Package, Sun, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import getStartedImage from '@/assets/get-started-farming.jpg';

interface GetStartedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GetStartedModal = ({ open, onOpenChange }: GetStartedModalProps) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    onOpenChange(false);
    navigate('/auth/register');
  };

  const steps = [
    {
      icon: Package,
      title: "Choose Your Crops",
      description: "Start with beginner-friendly crops like tomatoes, lettuce, or herbs. Consider your local climate and soil conditions."
    },
    {
      icon: Sun,
      title: "Prepare Your Soil",
      description: "Test soil pH and nutrients. Add compost or organic matter to improve soil structure and fertility."
    },
    {
      icon: Sprout,
      title: "Select Quality Seeds",
      description: "Choose certified seeds from reputable suppliers. Consider hybrid varieties for better disease resistance."
    },
    {
      icon: Droplets,
      title: "Set Up Irrigation",
      description: "Plan your watering system. Drip irrigation is efficient for water conservation and targeted watering."
    },
    {
      icon: Shield,
      title: "Practice Sustainability",
      description: "Use organic fertilizers, practice crop rotation, and implement integrated pest management."
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Get Started with Smart Farming</DialogTitle>
          <DialogDescription className="text-center text-lg">
            Your step-by-step guide to beginning your agricultural journey
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={getStartedImage} 
              alt="Farmer preparing field and sowing seeds"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-xl font-semibold">Start Your Farming Journey Today</h3>
              <p className="text-sm opacity-90">Transform your agricultural dreams into reality with the right guidance</p>
            </div>
          </div>

          <div className="grid gap-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <step.icon className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-lg">{step.title}</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-lg mb-2">💡 Pro Tips for Success</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li>• Start small and gradually expand your farming area</li>
              <li>• Keep detailed records of your planting, watering, and harvesting</li>
              <li>• Connect with local farming communities for support and advice</li>
              <li>• Stay updated with weather forecasts and seasonal changes</li>
              <li>• Be patient - farming is a learning process that takes time</li>
            </ul>
          </div>

          <div className="flex justify-center pt-4">
            <Button onClick={handleRegister} size="lg" className="group">
              Create Your Account Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GetStartedModal;