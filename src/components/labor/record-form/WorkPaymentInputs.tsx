
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface WorkPaymentInputsProps {
  hours: string;
  wage: string;
  totalPaid: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WorkPaymentInputs = ({ hours, wage, totalPaid, onChange }: WorkPaymentInputsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="hours">Hours Worked <span className="text-red-500">*</span></Label>
        <Input
          id="hours"
          name="hours"
          type="number"
          step="0.5"
          min="0"
          value={hours}
          onChange={onChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="wage">Hourly Wage (₹) <span className="text-red-500">*</span></Label>
        <Input
          id="wage"
          name="wage"
          type="number"
          min="0"
          value={wage}
          onChange={onChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="totalPaid">Total Amount Paid (₹) <span className="text-red-500">*</span></Label>
        <Input
          id="totalPaid"
          name="totalPaid"
          type="number"
          min="0"
          value={totalPaid}
          onChange={onChange}
          required
        />
      </div>
    </>
  );
};

export default WorkPaymentInputs;
