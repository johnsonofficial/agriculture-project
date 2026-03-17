
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface TaskInputProps {
  task: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TaskInput = ({ task, onChange }: TaskInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="task">Task Performed <span className="text-red-500">*</span></Label>
      <Input
        id="task"
        name="task"
        value={task}
        onChange={onChange}
        placeholder="e.g., Harvesting Rice"
        required
      />
    </div>
  );
};

export default TaskInput;
