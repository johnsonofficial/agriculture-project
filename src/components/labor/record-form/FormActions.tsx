
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarPlus } from 'lucide-react';

interface FormActionsProps {
  onCancel: () => void;
  isEditing: boolean;
}

const FormActions = ({ onCancel, isEditing }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-2 pt-4">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">
        <CalendarPlus className="mr-2 h-4 w-4" />
        {isEditing ? 'Update Record' : 'Add Record'}
      </Button>
    </div>
  );
};

export default FormActions;
