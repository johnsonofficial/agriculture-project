
import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Button } from '@/components/ui/button';

// Mock data
const monthlyData = [
  { name: 'Jan', expense: 1200, income: 0 },
  { name: 'Feb', expense: 1800, income: 0 },
  { name: 'Mar', expense: 2400, income: 0 },
  { name: 'Apr', expense: 1500, income: 0 },
  { name: 'May', expense: 900, income: 2800 },
  { name: 'Jun', expense: 600, income: 5500 },
  { name: 'Jul', expense: 1700, income: 8900 },
  { name: 'Aug', expense: 1100, income: 7200 },
  { name: 'Sep', expense: 1900, income: 0 },
  { name: 'Oct', expense: 2300, income: 0 },
  { name: 'Nov', expense: 1400, income: 0 },
  { name: 'Dec', expense: 800, income: 0 },
];

const categoryData = [
  { name: 'Seeds', value: 2500, color: '#4CAF50' },
  { name: 'Fertilizers', value: 3800, color: '#8BC34A' },
  { name: 'Labor', value: 5200, color: '#CDDC39' },
  { name: 'Equipment', value: 2900, color: '#FFC107' },
  { name: 'Irrigation', value: 1800, color: '#03A9F4' },
];

const ExpenseChart = () => {
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  // Format number as rupees
  const formatRupees = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Financial Overview</h3>
        <div className="flex space-x-2">
          <Button 
            variant={chartType === 'bar' ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType('bar')}
          >
            Monthly
          </Button>
          <Button 
            variant={chartType === 'pie' ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType('pie')}
          >
            Categories
          </Button>
        </div>
      </div>

      <div className="h-[350px]">
        {chartType === 'bar' ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `₹${value}`} />
              <Tooltip 
                formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: 'none'
                }}
              />
              <Legend />
              <Bar dataKey="expense" name="Expenses" fill="#FF5252" radius={[4, 4, 0, 0]} />
              <Bar dataKey="income" name="Income" fill="#4CAF50" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: 'none'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
          <p className="text-xl font-semibold text-green-600">{formatRupees(24400)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
          <p className="text-xl font-semibold text-red-500">{formatRupees(16700)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Net Profit</p>
          <p className="text-xl font-semibold text-primary">{formatRupees(7700)}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
