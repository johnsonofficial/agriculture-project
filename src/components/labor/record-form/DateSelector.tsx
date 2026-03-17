
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface DateSelectorProps {
  date: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateSelector = ({ date, onChange }: DateSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="date">Date <span className="text-red-500">*</span></Label>
      <Input
        id="date"
        name="date"
        type="date"
        value={date}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default DateSelector;
