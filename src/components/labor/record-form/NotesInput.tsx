
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface NotesInputProps {
  notes: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const NotesInput = ({ notes, onChange }: NotesInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="notes">Additional Notes</Label>
      <Textarea
        id="notes"
        name="notes"
        value={notes}
        onChange={onChange}
        placeholder="Any additional information about the work or payment"
        rows={3}
      />
    </div>
  );
};

export default NotesInput;
