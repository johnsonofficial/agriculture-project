
import { format } from 'date-fns';

export const determineCurrentSeason = () => {
  const today = new Date();
  const month = today.getMonth() + 1; // 1-12
  if (month >= 6 && month <= 10) return 'Kharif';
  if (month >= 11 || month <= 3) return 'Rabi';
  return 'Zaid';
};

export type RecordFormData = {
  laborerId: string;
  date: string;
  season: string;
  month: string;
  hours: string;
  task: string;
  wage: string;
  totalPaid: string;
  notes: string;
};

export type RecordType = {
  id: string;
  laborerId: string;
  date: Date;
  season: string;
  month: string;
  hours: number;
  task: string;
  wage: number;
  totalPaid: number;
  notes?: string;
};

export const initializeFormData = (record?: RecordType): RecordFormData => {
  const today = new Date();
  
  return {
    laborerId: record?.laborerId || '',
    date: record?.date ? format(record.date, 'yyyy-MM-dd') : format(today, 'yyyy-MM-dd'),
    season: record?.season || determineCurrentSeason(),
    month: record?.month || format(today, 'MMMM'),
    hours: record?.hours?.toString() || '8',
    task: record?.task || '',
    wage: record?.wage?.toString() || '',
    totalPaid: record?.totalPaid?.toString() || '',
    notes: record?.notes || '',
  };
};
