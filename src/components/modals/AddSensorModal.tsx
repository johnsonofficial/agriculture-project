import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Activity } from 'lucide-react';

interface SensorData {
  id: string;
  name: string;
  location: string;
  type: 'moisture' | 'temperature' | 'humidity' | 'wind';
  value: number;
  unit: string;
  timestamp: string;
  batteryLevel: number;
  signalStrength: number;
  status: 'normal' | 'warning' | 'critical';
}

interface AddSensorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSensor: (sensor: SensorData) => void;
}

const AddSensorModal = ({ open, onOpenChange, onAddSensor }: AddSensorModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: '' as SensorData['type'],
    description: ''
  });

  const sensorTypes = [
    { value: 'moisture', label: 'Soil Moisture Sensor', unit: '%' },
    { value: 'temperature', label: 'Temperature Sensor', unit: '°C' },
    { value: 'humidity', label: 'Humidity Sensor', unit: '%' },
    { value: 'wind', label: 'Wind Speed Sensor', unit: 'km/h' }
  ];

  const generateInitialValue = (type: SensorData['type']): number => {
    switch (type) {
      case 'moisture': return Math.floor(Math.random() * 100);
      case 'temperature': return Math.floor(Math.random() * 35) + 15;
      case 'humidity': return Math.floor(Math.random() * 100);
      case 'wind': return Math.floor(Math.random() * 25);
      default: return 0;
    }
  };

  const generateStatus = (type: SensorData['type'], value: number): SensorData['status'] => {
    switch (type) {
      case 'moisture':
        if (value < 20) return 'critical';
        if (value < 40) return 'warning';
        return 'normal';
      case 'temperature':
        if (value > 35 || value < 5) return 'critical';
        if (value > 30 || value < 10) return 'warning';
        return 'normal';
      default:
        return 'normal';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.type) {
      return;
    }

    const selectedSensorType = sensorTypes.find(t => t.value === formData.type);
    const initialValue = generateInitialValue(formData.type);
    
    const newSensor: SensorData = {
      id: `sensor-${Date.now()}`,
      name: formData.name,
      location: formData.location,
      type: formData.type,
      value: initialValue,
      unit: selectedSensorType?.unit || '',
      timestamp: new Date().toISOString(),
      batteryLevel: Math.floor(Math.random() * 40) + 60, // 60-100%
      signalStrength: Math.floor(Math.random() * 30) + 70, // 70-100%
      status: generateStatus(formData.type, initialValue)
    };

    onAddSensor(newSensor);
    
    // Reset form
    setFormData({
      name: '',
      location: '',
      type: '' as SensorData['type'],
      description: ''
    });
    
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Activity className="h-6 w-6 text-sky-600" />
            Add New IoT Sensor
          </DialogTitle>
          <DialogDescription>
            Configure a new sensor device to monitor your farm conditions in real-time.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sensor-name">Sensor Name *</Label>
              <Input
                id="sensor-name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Main Field Moisture Sensor"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sensor-location">Location *</Label>
              <Input
                id="sensor-location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., North Field - Plot A"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sensor-type">Sensor Type *</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleInputChange('type', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sensor type..." />
              </SelectTrigger>
              <SelectContent>
                {sensorTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label} ({type.unit})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sensor-description">Description (Optional)</Label>
            <Textarea
              id="sensor-description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Additional notes about this sensor installation..."
              rows={3}
            />
          </div>

          <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-sky-900 dark:text-sky-100 mb-2">📡 Sensor Setup Information</h4>
            <ul className="text-sm text-sky-700 dark:text-sky-300 space-y-1">
              <li>• Initial readings will be simulated for demonstration</li>
              <li>• Battery level and signal strength will be automatically generated</li>
              <li>• Sensor status will be determined based on initial readings</li>
              <li>• Real sensor integration requires physical device configuration</li>
            </ul>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="group">
              <PlusCircle className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Add Sensor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSensorModal;