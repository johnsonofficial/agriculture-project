
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SeasonMonthSelectorProps {
  season: string;
  month: string;
  onSelectChange: (name: string, value: string) => void;
}

const SeasonMonthSelector = ({ season, month, onSelectChange }: SeasonMonthSelectorProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="season">Season <span className="text-red-500">*</span></Label>
        <Select 
          value={season} 
          onValueChange={(value) => onSelectChange('season', value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select season" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Kharif">Kharif (June-October)</SelectItem>
            <SelectItem value="Rabi">Rabi (November-March)</SelectItem>
            <SelectItem value="Zaid">Zaid (April-May)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="month">Month <span className="text-red-500">*</span></Label>
        <Select 
          value={month} 
          onValueChange={(value) => onSelectChange('month', value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="January">January</SelectItem>
            <SelectItem value="February">February</SelectItem>
            <SelectItem value="March">March</SelectItem>
            <SelectItem value="April">April</SelectItem>
            <SelectItem value="May">May</SelectItem>
            <SelectItem value="June">June</SelectItem>
            <SelectItem value="July">July</SelectItem>
            <SelectItem value="August">August</SelectItem>
            <SelectItem value="September">September</SelectItem>
            <SelectItem value="October">October</SelectItem>
            <SelectItem value="November">November</SelectItem>
            <SelectItem value="December">December</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default SeasonMonthSelector;
