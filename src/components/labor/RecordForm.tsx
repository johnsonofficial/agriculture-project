
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LaborerSelector from './record-form/LaborerSelector';
import DateSelector from './record-form/DateSelector';
import SeasonMonthSelector from './record-form/SeasonMonthSelector';
import TaskInput from './record-form/TaskInput';
import WorkPaymentInputs from './record-form/WorkPaymentInputs';
import NotesInput from './record-form/NotesInput';
import FormActions from './record-form/FormActions';
import { 
  initializeFormData,
  RecordFormData,
  RecordType
} from './utils/formUtils';
import { Laborer } from '@/pages/LaborManagement';

interface RecordFormProps {
  onCancel: () => void;
  record?: RecordType;
  laborers: Laborer[];
}

const RecordForm = ({ onCancel, record, laborers }: RecordFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<RecordFormData>(initializeFormData(record));
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Automatically calculate total paid amount if hours or wage changes
    if (name === 'hours' || name === 'wage') {
      const hours = name === 'hours' ? parseFloat(value) : parseFloat(formData.hours);
      const wage = name === 'wage' ? parseFloat(value) : parseFloat(formData.wage);
      
      if (!isNaN(hours) && !isNaN(wage)) {
        setFormData(prev => ({ ...prev, totalPaid: (hours * wage).toString() }));
      }
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Set default wage when selecting a laborer
    if (name === 'laborerId') {
      const laborer = laborers.find(l => l.id === value);
      if (laborer) {
        setFormData(prev => ({ 
          ...prev, 
          wage: laborer.wageRate.toString(),
          totalPaid: (parseFloat(prev.hours) * laborer.wageRate).toString()
        }));
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.laborerId || !formData.date || !formData.task || !formData.hours || !formData.wage) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, you would save this data to your database
    console.log("Saving labor record:", formData);
    
    toast({
      title: record ? "Record Updated" : "Record Added",
      description: `Labor record for ${formData.date} has been ${record ? 'updated' : 'added'} successfully.`,
    });
    
    onCancel(); // Return to list view
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onCancel} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <h3 className="text-lg font-medium">{record ? 'Edit Labor Record' : 'Add New Labor Record'}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LaborerSelector 
            laborerId={formData.laborerId} 
            onSelectChange={handleSelectChange}
            laborers={laborers}
          />
          <DateSelector 
            date={formData.date}
            onChange={handleChange}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SeasonMonthSelector 
            season={formData.season}
            month={formData.month}
            onSelectChange={handleSelectChange}
          />
          <TaskInput 
            task={formData.task}
            onChange={handleChange}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <WorkPaymentInputs 
            hours={formData.hours}
            wage={formData.wage}
            totalPaid={formData.totalPaid}
            onChange={handleChange}
          />
        </div>
        
        <NotesInput 
          notes={formData.notes}
          onChange={handleChange}
        />
        
        <FormActions 
          onCancel={onCancel}
          isEditing={!!record}
        />
      </form>
    </div>
  );
};

export default RecordForm;
