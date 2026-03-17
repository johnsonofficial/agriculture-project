
import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LaborersList from '@/components/labor/LaborersList';
import LaborerForm from '@/components/labor/LaborerForm';
import LaborRecords from '@/components/labor/LaborRecords';
import RecordForm from '@/components/labor/RecordForm';
import { ClipboardList, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define the state interface properly with editLaborerId
interface LaborManagementState {
  laborers: 'list' | 'add' | 'edit';
  records: 'list' | 'add' | 'edit';
  editLaborerId?: string;
  editRecordId?: string;
}

// Define the laborer interface
export interface Laborer {
  id: string;
  name: string;
  phone: string;
  specialization: string;
  workingDays: string;
  wageRate: number;
  address?: string;
  workingSummary?: {
    daily: string;
    monthly: string;
    yearly: string;
  };
  notes?: string;
}

// Sample data for laborers
export const SAMPLE_LABORERS: Laborer[] = [
  { 
    id: '1', 
    name: 'Amit Kumar', 
    phone: '9876543210', 
    specialization: 'Harvesting', 
    workingDays: 'Monday to Saturday', 
    wageRate: 350,
    address: 'Village Raipur, District Bhopal',
    workingSummary: {
      daily: '8 hours',
      monthly: '26 days',
      yearly: '300 days'
    },
    notes: 'Experienced in rice and wheat harvesting. Has own tools.'
  },
  { 
    id: '2', 
    name: 'Priya Singh', 
    phone: '9876543211', 
    specialization: 'Sowing', 
    workingDays: 'Monday to Friday', 
    wageRate: 330,
    address: 'Village Gandhigram, District Indore',
    workingSummary: {
      daily: '7 hours',
      monthly: '22 days',
      yearly: '260 days'
    },
    notes: 'Skilled in traditional and modern sowing techniques.'
  },
  { 
    id: '3', 
    name: 'Rajesh Verma', 
    phone: '9876543212', 
    specialization: 'Irrigation', 
    workingDays: 'All Days', 
    wageRate: 380,
    address: 'Village Khandwa, District Khandwa',
    workingSummary: {
      daily: '9 hours',
      monthly: '30 days',
      yearly: '340 days'
    },
    notes: 'Expert in drip irrigation systems and water management.'
  },
  { 
    id: '4', 
    name: 'Sunita Devi', 
    phone: '9876543213', 
    specialization: 'General', 
    workingDays: 'Monday, Wednesday, Friday', 
    wageRate: 320,
    address: 'Village Bamori, District Gwalior',
    workingSummary: {
      daily: '6 hours',
      monthly: '12 days',
      yearly: '150 days'
    },
    notes: 'Prefers part-time work. Very reliable and punctual.'
  },
];

const LaborManagement = () => {
  const { toast } = useToast();
  // State for tracking active view in each tab
  const [activeView, setActiveView] = useState<LaborManagementState>({
    laborers: 'list', // 'list', 'add', or 'edit'
    records: 'list',  // 'list', 'add', or 'edit'
  });
  
  // State for storing the laborers data
  const [laborers, setLaborers] = useState<Laborer[]>(SAMPLE_LABORERS);

  // Function to handle adding a new laborer
  const handleAddLaborer = (laborer: Omit<Laborer, 'id'>) => {
    // Generate a unique ID (in a real app, this would come from the backend)
    const newId = (laborers.length + 1).toString();
    const newLaborer = { ...laborer, id: newId };
    
    setLaborers([...laborers, newLaborer]);
    setActiveView({...activeView, laborers: 'list'});
    
    toast({
      title: "Laborer Added",
      description: `${laborer.name} has been added successfully.`,
    });
  };

  // Function to handle updating an existing laborer
  const handleUpdateLaborer = (updatedLaborer: Laborer) => {
    const updatedLaborers = laborers.map(lab => 
      lab.id === updatedLaborer.id ? updatedLaborer : lab
    );
    
    setLaborers(updatedLaborers);
    setActiveView({...activeView, laborers: 'list'});
    
    toast({
      title: "Laborer Updated",
      description: `${updatedLaborer.name} has been updated successfully.`,
    });
  };

  // Function to handle deleting a laborer
  const handleDeleteLaborer = (laborerId: string) => {
    const updatedLaborers = laborers.filter(lab => lab.id !== laborerId);
    setLaborers(updatedLaborers);
    
    toast({
      title: "Laborer Deleted",
      description: "The laborer has been deleted successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Farm Labor Management</h1>
            
            <Tabs defaultValue="laborers" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="laborers" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Laborers</span>
                </TabsTrigger>
                <TabsTrigger value="records" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  <span>Labor Records</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="laborers">
                <Card>
                  <CardHeader>
                    <CardTitle>Laborers Management</CardTitle>
                    <CardDescription>
                      Add, edit, and manage laborers who work on your farm.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {activeView.laborers === 'list' ? (
                      <LaborersList 
                        laborers={laborers}
                        onAddNew={() => setActiveView({...activeView, laborers: 'add'})}
                        onEdit={(laborerId) => setActiveView({...activeView, laborers: 'edit', editLaborerId: laborerId})}
                        onDelete={handleDeleteLaborer}
                      />
                    ) : (
                      <LaborerForm 
                        onCancel={() => setActiveView({...activeView, laborers: 'list'})}
                        onAddLaborer={handleAddLaborer}
                        onUpdateLaborer={handleUpdateLaborer}
                        laborer={activeView.editLaborerId ? 
                          // Find the laborer with the matching ID in the data
                          laborers.find(l => l.id === activeView.editLaborerId) 
                          : undefined} 
                      />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="records">
                <Card>
                  <CardHeader>
                    <CardTitle>Labor Records</CardTitle>
                    <CardDescription>
                      Track labor hours, wages, and tasks by season and month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {activeView.records === 'list' ? (
                      <LaborRecords 
                        onAddNew={() => setActiveView({...activeView, records: 'add'})}
                        onEdit={(recordId) => setActiveView({...activeView, records: 'edit', editRecordId: recordId})}
                        laborers={laborers}
                      />
                    ) : (
                      <RecordForm 
                        onCancel={() => setActiveView({...activeView, records: 'list'})}
                        laborers={laborers}
                        record={activeView.editRecordId ? 
                          // Find the record with the matching ID in your data
                          undefined : undefined} 
                      />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LaborManagement;
