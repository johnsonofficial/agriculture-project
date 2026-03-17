import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Lightbulb, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const RevenueTab = () => {
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line'>('bar');

  const monthlyRevenueData = [
    { month: 'Jan', income: 45000, lastYear: 42000 },
    { month: 'Feb', income: 52000, lastYear: 48000 },
    { month: 'Mar', income: 68000, lastYear: 61000 },
    { month: 'Apr', income: 71000, lastYear: 65000 },
    { month: 'May', income: 84000, lastYear: 76000 },
    { month: 'Jun', income: 92000, lastYear: 83000 },
    { month: 'Jul', income: 88000, lastYear: 81000 },
    { month: 'Aug', income: 95000, lastYear: 87000 },
    { month: 'Sep', income: 76000, lastYear: 70000 },
    { month: 'Oct', income: 63000, lastYear: 59000 },
    { month: 'Nov', income: 58000, lastYear: 54000 },
    { month: 'Dec', income: 61000, lastYear: 57000 }
  ];

  const categoryData = [
    { name: 'Crop Sales', value: 380000, color: '#22c55e', growth: 12.5 },
    { name: 'Livestock Sales', value: 165000, color: '#3b82f6', growth: 8.3 },
    { name: 'Dairy Products', value: 89000, color: '#f59e0b', growth: 15.2 },
    { name: 'Government Subsidies', value: 45000, color: '#8b5cf6', growth: 5.8 },
    { name: 'Equipment Rental', value: 32000, color: '#ef4444', growth: -2.1 },
    { name: 'Other Income', value: 22000, color: '#06b6d4', growth: 18.7 }
  ];

  const yearlyComparison = [
    { year: '2022', revenue: 650000, profit: 185000 },
    { year: '2023', revenue: 733000, profit: 248000 },
    { year: '2024', revenue: 825000, profit: 312000 }
  ];

  const formatRupees = (amount: number) => `₹${amount.toLocaleString()}`;

  const totalRevenue = categoryData.reduce((sum, item) => sum + item.value, 0);
  const avgGrowth = categoryData.reduce((sum, item) => sum + item.growth, 0) / categoryData.length;

  return (
    <div className="space-y-6">
      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              Total Annual Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupees(totalRevenue)}</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-sm text-green-600">+{avgGrowth.toFixed(1)}% vs last year</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Best Performing Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Dairy Products</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-sm text-green-600">+15.2% growth</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Monthly Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatRupees(Math.round(totalRevenue / 12))}</div>
            <div className="text-sm text-muted-foreground mt-1">Per month revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Revenue Analytics</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={chartType === 'bar' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setChartType('bar')}
                  >
                    Monthly
                  </Button>
                  <Button
                    variant={chartType === 'pie' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setChartType('pie')}
                  >
                    Category
                  </Button>
                  <Button
                    variant={chartType === 'line' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setChartType('line')}
                  >
                    Trends
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {chartType === 'bar' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatRupees(value as number)} />
                      <Bar dataKey="income" fill="hsl(var(--primary))" name="Current Year" />
                      <Bar dataKey="lastYear" fill="hsl(var(--muted-foreground))" name="Last Year" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
                {chartType === 'pie' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${((entry.value / totalRevenue) * 100).toFixed(1)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatRupees(value as number)} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
                {chartType === 'line' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={yearlyComparison}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatRupees(value as number)} />
                      <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} name="Revenue" />
                      <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} name="Profit" />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Revenue Categories */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Revenue Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{formatRupees(category.value)}</span>
                      {category.growth >= 0 ? (
                        <Badge variant="secondary" className="text-green-600 bg-green-100 dark:bg-green-900/30">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {category.growth}%
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-red-600 bg-red-100 dark:bg-red-900/30">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          {Math.abs(category.growth)}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${(category.value / totalRevenue) * 100}%`,
                        backgroundColor: category.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Revenue Optimization Suggestions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Revenue Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="font-medium text-sm">Expand Dairy Production</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Dairy shows highest growth (+15.2%). Consider increasing production capacity.
                </div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="font-medium text-sm">Seasonal Crop Optimization</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Plant high-yield crops during peak season months (May-Aug).
                </div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="font-medium text-sm">Direct Market Sales</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Eliminate middlemen for 15-20% better pricing on crop sales.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RevenueTab;