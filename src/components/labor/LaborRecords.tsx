import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Search, Edit, Trash2, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Laborer } from '@/pages/LaborManagement';

// Sample data - in a real app this would come from your database
const SAMPLE_RECORDS = [
  { 
    id: '1', 
    laborerId: '1', 
    laborerName: 'Amit Kumar',
    date: new Date('2023-10-15'),
    season: 'Kharif',
    month: 'October',
    hours: 8,
    task: 'Harvesting Rice',
    wage: 350,
    totalPaid: 2800,
    notes: 'Completed harvesting the east field'
  },
  { 
    id: '2', 
    laborerId: '2', 
    laborerName: 'Priya Singh',
    date: new Date('2023-10-14'),
    season: 'Kharif',
    month: 'October',
    hours: 6,
    task: 'Seed Sorting',
    wage: 330,
    totalPaid: 1980,
    notes: 'Sorted wheat seeds for next season'
  },
  { 
    id: '3', 
    laborerId: '3', 
    laborerName: 'Rajesh Verma',
    date: new Date('2024-02-10'),
    season: 'Rabi',
    month: 'February',
    hours: 9,
    task: 'Irrigation',
    wage: 380,
    totalPaid: 3420,
    notes: 'Set up irrigation for new crop'
  },
  { 
    id: '4', 
    laborerId: '4', 
    laborerName: 'Sunita Devi',
    date: new Date('2024-03-05'),
    season: 'Rabi',
    month: 'March',
    hours: 7,
    task: 'Weeding',
    wage: 320,
    totalPaid: 2240,
    notes: 'Cleared weeds from south field'
  },
];

interface LaborRecordsProps {
  onAddNew: () => void;
  onEdit?: (id: string) => void;
  laborers: Laborer[];
}

const LaborRecords = ({ onAddNew, onEdit, laborers }: LaborRecordsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [records, setRecords] = useState(SAMPLE_RECORDS);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
  
  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.laborerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.task.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeason = selectedSeason ? record.season === selectedSeason : true;
    const matchesMonth = selectedMonth ? record.month === selectedMonth : true;
    
    return matchesSearch && matchesSeason && matchesMonth;
  });
  
  const handleDelete = (id: string) => {
    setRecordToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (recordToDelete) {
      setRecords(records.filter(r => r.id !== recordToDelete));
      setRecordToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleEdit = (id: string) => {
    if (onEdit) {
      onEdit(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search records..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={selectedSeason} onValueChange={setSelectedSeason}>
            <SelectTrigger>
              <SelectValue placeholder="All Seasons" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Seasons</SelectItem>
              <SelectItem value="Kharif">Kharif</SelectItem>
              <SelectItem value="Rabi">Rabi</SelectItem>
              <SelectItem value="Zaid">Zaid</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue placeholder="All Months" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Months</SelectItem>
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
        
        <Button onClick={onAddNew} className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Record
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Season</TableHead>
              <TableHead>Laborer</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Wage (₹)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> 
                      {format(record.date, 'dd MMM yyyy')}
                    </div>
                  </TableCell>
                  <TableCell>{record.season} ({record.month})</TableCell>
                  <TableCell className="font-medium">{record.laborerName}</TableCell>
                  <TableCell>{record.task}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {record.hours}
                    </div>
                  </TableCell>
                  <TableCell>₹{record.totalPaid}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(record.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(record.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this labor record. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LaborRecords;
