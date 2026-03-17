
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserPlus, Search, Edit, Trash2, Phone, Calendar, Clock } from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';
import { Laborer } from '@/pages/LaborManagement';

interface LaborersListProps {
  laborers: Laborer[];
  onAddNew: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const LaborersList = ({ laborers, onAddNew, onEdit, onDelete }: LaborersListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [laborerToDelete, setLaborerToDelete] = useState<string | null>(null);
  const [selectedLaborer, setSelectedLaborer] = useState<string | null>(null);
  
  const filteredLaborers = laborers.filter(laborer => 
    laborer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    laborer.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    laborer.phone.includes(searchTerm)
  );
  
  const handleDelete = (id: string) => {
    setLaborerToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (laborerToDelete) {
      onDelete(laborerToDelete);
      setLaborerToDelete(null);
      setDeleteDialogOpen(false);
      // Clear selection if the deleted laborer was selected
      if (selectedLaborer === laborerToDelete) {
        setSelectedLaborer(null);
      }
    }
  };

  const handleView = (id: string) => {
    setSelectedLaborer(id === selectedLaborer ? null : id);
  };

  const handleEdit = (id: string) => {
    onEdit(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-auto flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search laborers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={onAddNew} className="w-full sm:w-auto">
          <UserPlus className="mr-2 h-4 w-4" /> Add New Laborer
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Working Days</TableHead>
              <TableHead>Daily Wage (₹)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLaborers.length > 0 ? (
              filteredLaborers.map((laborer) => (
                <React.Fragment key={laborer.id}>
                  <TableRow className={selectedLaborer === laborer.id ? "bg-muted/50" : ""}>
                    <TableCell className="font-medium">
                      <button 
                        className="text-left hover:underline focus:outline-none" 
                        onClick={() => handleView(laborer.id)}
                      >
                        {laborer.name}
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {laborer.phone}
                      </div>
                    </TableCell>
                    <TableCell>{laborer.specialization}</TableCell>
                    <TableCell>{laborer.workingDays}</TableCell>
                    <TableCell>₹{laborer.wageRate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(laborer.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(laborer.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {selectedLaborer === laborer.id && (
                    <TableRow>
                      <TableCell colSpan={6} className="p-0">
                        <Card className="border-0 shadow-none bg-muted/20">
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Laborer Information</h4>
                                <p className="text-sm"><span className="font-medium">Address:</span> {laborer.address}</p>
                                <p className="text-sm mt-1"><span className="font-medium">Notes:</span> {laborer.notes}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Working Summary</h4>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="bg-background rounded p-2 text-center">
                                    <div className="flex justify-center items-center mb-1">
                                      <Clock className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Daily</p>
                                    <p className="font-medium">{laborer.workingSummary?.daily}</p>
                                  </div>
                                  <div className="bg-background rounded p-2 text-center">
                                    <div className="flex justify-center items-center mb-1">
                                      <Calendar className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Monthly</p>
                                    <p className="font-medium">{laborer.workingSummary?.monthly}</p>
                                  </div>
                                  <div className="bg-background rounded p-2 text-center">
                                    <div className="flex justify-center items-center mb-1">
                                      <Calendar className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Yearly</p>
                                    <p className="font-medium">{laborer.workingSummary?.yearly}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No laborers found.
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
              This will permanently delete this laborer's record. This action cannot be undone.
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

export default LaborersList;
