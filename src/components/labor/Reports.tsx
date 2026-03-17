
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileDown, Calendar, Download, PieChart, UserCheck } from 'lucide-react';

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
    totalPaid: 350
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
    totalPaid: 330
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
    totalPaid: 380
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
    totalPaid: 320
  },
  { 
    id: '5', 
    laborerId: '1', 
    laborerName: 'Amit Kumar',
    date: new Date('2023-11-20'),
    season: 'Rabi',
    month: 'November',
    hours: 8,
    task: 'Sowing Wheat',
    wage: 350,
    totalPaid: 350
  },
  { 
    id: '6', 
    laborerId: '2', 
    laborerName: 'Priya Singh',
    date: new Date('2024-04-10'),
    season: 'Zaid',
    month: 'April',
    hours: 7,
    task: 'Vegetable Planting',
    wage: 330,
    totalPaid: 330
  },
];

const Reports = () => {
  const { toast } = useToast();
  const [selectedSeason, setSelectedSeason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('summary');

  // Filter records based on selections
  const filteredRecords = SAMPLE_RECORDS.filter(record => {
    const matchesSeason = selectedSeason ? record.season === selectedSeason : true;
    
    let matchesDateRange = true;
    if (startDate && endDate) {
      const recordDate = record.date.getTime();
      const startDateTime = new Date(startDate).getTime();
      const endDateTime = new Date(endDate).getTime();
      matchesDateRange = recordDate >= startDateTime && recordDate <= endDateTime;
    }
    
    return matchesSeason && matchesDateRange;
  });

  // Calculate summary data
  const totalWorkHours = filteredRecords.reduce((sum, record) => sum + record.hours, 0);
  const totalWages = filteredRecords.reduce((sum, record) => sum + record.totalPaid, 0);
  const uniqueLaborers = [...new Set(filteredRecords.map(record => record.laborerId))].length;
  
  // Prepare data for charts
  const seasonData = [
    { name: 'Kharif', hours: 0, wages: 0 },
    { name: 'Rabi', hours: 0, wages: 0 },
    { name: 'Zaid', hours: 0, wages: 0 },
  ];
  
  filteredRecords.forEach(record => {
    const seasonIndex = seasonData.findIndex(s => s.name === record.season);
    if (seasonIndex !== -1) {
      seasonData[seasonIndex].hours += record.hours;
      seasonData[seasonIndex].wages += record.totalPaid;
    }
  });

  // Group by month for monthly data
  const monthlyData = Array.from(
    filteredRecords.reduce((acc, record) => {
      const key = record.month;
      if (!acc.has(key)) {
        acc.set(key, { name: key, hours: 0, wages: 0 });
      }
      acc.get(key).hours += record.hours;
      acc.get(key).wages += record.totalPaid;
      return acc;
    }, new Map())
  ).map(([_, value]) => value);

  // Group by task for task data
  const taskData = Array.from(
    filteredRecords.reduce((acc, record) => {
      const key = record.task;
      if (!acc.has(key)) {
        acc.set(key, { name: key, hours: 0, wages: 0 });
      }
      acc.get(key).hours += record.hours;
      acc.get(key).wages += record.totalPaid;
      return acc;
    }, new Map())
  ).map(([_, value]) => value);

  const handleExport = (format: string) => {
    // In a real app, this would generate and download a file
    toast({
      title: "Report Exported",
      description: `The report has been exported as ${format.toUpperCase()} file.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Calendar className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-muted-foreground text-sm">Total Work Hours</p>
              <h3 className="text-2xl font-bold">{totalWorkHours}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <UserCheck className="h-8 w-8 text-blue-500 mb-2" />
              <p className="text-muted-foreground text-sm">Unique Laborers</p>
              <h3 className="text-2xl font-bold">{uniqueLaborers}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <PieChart className="h-8 w-8 text-orange-500 mb-2" />
              <p className="text-muted-foreground text-sm">Avg. Daily Hours</p>
              <h3 className="text-2xl font-bold">
                {filteredRecords.length ? (totalWorkHours / filteredRecords.length).toFixed(1) : '0'}
              </h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Download className="h-8 w-8 text-purple-500 mb-2" />
              <p className="text-muted-foreground text-sm">Total Wages Paid</p>
              <h3 className="text-2xl font-bold">₹{totalWages}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-muted/50">
            <div className="w-full md:w-1/4">
              <Label htmlFor="season" className="block mb-2">Season</Label>
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
            </div>
            
            <div className="w-full md:w-1/4">
              <Label htmlFor="startDate" className="block mb-2">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-1/4">
              <Label htmlFor="endDate" className="block mb-2">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-1/4">
              <Label htmlFor="reportType" className="block mb-2">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Summary</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="h-80 border rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData.length > 0 ? monthlyData : seasonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="hours" name="Work Hours" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="wages" name="Wages (₹)" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg bg-muted/50">
            <h3 className="text-lg font-medium">Export Report</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleExport('excel')}>
                <FileDown className="h-4 w-4 mr-2" /> Excel
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleExport('pdf')}>
                <FileDown className="h-4 w-4 mr-2" /> PDF
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="tasks">
            <TabsList className="w-full">
              <TabsTrigger value="tasks" className="flex-1">By Tasks</TabsTrigger>
              <TabsTrigger value="laborers" className="flex-1">By Laborers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks" className="border rounded-lg mt-4 h-80 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Wages (₹)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taskData.map((task, index) => (
                    <TableRow key={index}>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>{task.hours}</TableCell>
                      <TableCell>₹{task.wages}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="laborers" className="border rounded-lg mt-4 h-80 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Laborer</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Wages (₹)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from(
                    filteredRecords.reduce((acc, record) => {
                      const key = record.laborerName;
                      if (!acc.has(key)) {
                        acc.set(key, { name: key, hours: 0, wages: 0 });
                      }
                      acc.get(key).hours += record.hours;
                      acc.get(key).wages += record.totalPaid;
                      return acc;
                    }, new Map())
                  ).map(([_, value], index) => (
                    <TableRow key={index}>
                      <TableCell>{value.name}</TableCell>
                      <TableCell>{value.hours}</TableCell>
                      <TableCell>₹{value.wages}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {reportType === 'detailed' && (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Season</TableHead>
                <TableHead>Laborer</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Wage (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date.toLocaleDateString()}</TableCell>
                  <TableCell>{record.season} ({record.month})</TableCell>
                  <TableCell>{record.laborerName}</TableCell>
                  <TableCell>{record.task}</TableCell>
                  <TableCell>{record.hours}</TableCell>
                  <TableCell>₹{record.totalPaid}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Reports;
