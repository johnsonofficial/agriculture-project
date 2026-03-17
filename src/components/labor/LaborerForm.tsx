
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserCheck, ArrowLeft } from 'lucide-react';
import { Laborer } from '@/pages/LaborManagement';

interface WorkingSummary {
  daily: string;
  monthly: string;
  yearly: string;
}

interface LaborerFormProps {
  onCancel: () => void;
  onAddLaborer?: (laborer: Omit<Laborer, 'id'>) => void;
  onUpdateLaborer?: (laborer: Laborer) => void;
  laborer?: Laborer;
}

const LaborerForm = ({ onCancel, onAddLaborer, onUpdateLaborer, laborer }: LaborerFormProps) => {
  const [formData, setFormData] = useState({
    name: laborer?.name || '',
    phone: laborer?.phone || '',
    specialization: laborer?.specialization || '',
    workingDays: laborer?.workingDays || '',
    wageRate: laborer?.wageRate?.toString() || '',
    address: laborer?.address || '',
    workingSummary: {
      daily: laborer?.workingSummary?.daily || '',
      monthly: laborer?.workingSummary?.monthly || '',
      yearly: laborer?.workingSummary?.yearly || '',
    },
    notes: laborer?.notes || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested workingSummary fields
    if (name.startsWith('workingSummary.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        workingSummary: {
          ...prev.workingSummary,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create the laborer object from form data
    const laborerData = {
      name: formData.name,
      phone: formData.phone,
      specialization: formData.specialization,
      workingDays: formData.workingDays,
      wageRate: Number(formData.wageRate),
      address: formData.address,
      workingSummary: {
        daily: formData.workingSummary.daily,
        monthly: formData.workingSummary.monthly,
        yearly: formData.workingSummary.yearly,
      },
      notes: formData.notes,
    };
    
    // If editing an existing laborer
    if (laborer && onUpdateLaborer) {
      onUpdateLaborer({
        ...laborerData,
        id: laborer.id,
      });
    } 
    // If adding a new laborer
    else if (onAddLaborer) {
      onAddLaborer(laborerData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onCancel} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <h3 className="text-lg font-medium">{laborer ? 'Edit Laborer' : 'Add New Laborer'}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter laborer's full name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter contact number"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization</Label>
            <Select 
              value={formData.specialization} 
              onValueChange={(value) => handleSelectChange('specialization', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Sowing">Sowing</SelectItem>
                <SelectItem value="Harvesting">Harvesting</SelectItem>
                <SelectItem value="Irrigation">Irrigation</SelectItem>
                <SelectItem value="Pesticide">Pesticide Application</SelectItem>
                <SelectItem value="Fertilizer">Fertilizer Application</SelectItem>
                <SelectItem value="Machine Operator">Machine Operator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="workingDays">Working Days</Label>
            <Input
              id="workingDays"
              name="workingDays"
              value={formData.workingDays}
              onChange={handleChange}
              placeholder="e.g., Monday to Friday"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wageRate">Daily Wage Rate (₹) <span className="text-red-500">*</span></Label>
            <Input
              id="wageRate"
              name="wageRate"
              type="number"
              value={formData.wageRate}
              onChange={handleChange}
              placeholder="Enter daily wage rate"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter residential address"
          />
        </div>
        
        <div className="space-y-4">
          <Label>Working Summary</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workingSummary.daily">Daily Hours</Label>
              <Input
                id="workingSummary.daily"
                name="workingSummary.daily"
                value={formData.workingSummary.daily}
                onChange={handleChange}
                placeholder="e.g., 8 hours"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="workingSummary.monthly">Monthly Days</Label>
              <Input
                id="workingSummary.monthly"
                name="workingSummary.monthly"
                value={formData.workingSummary.monthly}
                onChange={handleChange}
                placeholder="e.g., 26 days"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="workingSummary.yearly">Yearly Days</Label>
              <Input
                id="workingSummary.yearly"
                name="workingSummary.yearly"
                value={formData.workingSummary.yearly}
                onChange={handleChange}
                placeholder="e.g., 300 days"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional information about the laborer"
            rows={3}
          />
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            <UserCheck className="mr-2 h-4 w-4" />
            {laborer ? 'Update Laborer' : 'Add Laborer'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LaborerForm;
