import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Download, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  BarChart3,
  PieChart,
  FileText
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, ComposedChart, Line } from 'recharts';

const ReportsTab = () => {
  const [reportType, setReportType] = useState<'overview' | 'detailed' | 'comparison'>('overview');

  // Mock comprehensive financial data
  const financialSummary = {
    totalExpenses: 245183,
    totalRevenue: 631025,
    netProfit: 385842,
    profitMargin: 61.2,
    roi: 157.4,
    breakEvenPoint: 180000
  };

  const monthlyComparison = [
    { month: 'Jan', expenses: 18500, revenue: 45000, profit: 26500 },
    { month: 'Feb', expenses: 21200, revenue: 52000, profit: 30800 },
    { month: 'Mar', expenses: 24800, revenue: 68000, profit: 43200 },
    { month: 'Apr', expenses: 28500, revenue: 71000, profit: 42500 },
    { month: 'May', expenses: 32100, revenue: 84000, profit: 51900 },
    { month: 'Jun', expenses: 35200, revenue: 92000, profit: 56800 },
    { month: 'Jul', expenses: 33800, revenue: 88000, profit: 54200 },
    { month: 'Aug', expenses: 29500, revenue: 95000, profit: 65500 },
    { month: 'Sep', expenses: 26300, revenue: 76000, profit: 49700 },
    { month: 'Oct', expenses: 23100, revenue: 63000, profit: 39900 },
    { month: 'Nov', expenses: 20400, revenue: 58000, profit: 37600 },
    { month: 'Dec', expenses: 21800, revenue: 61000, profit: 39200 }
  ];

  const expenseBreakdown = [
    { category: 'Seeds & Planting', amount: 65425, percentage: 26.7, trend: 'up', change: 8.5 },
    { category: 'Fertilizers', amount: 51283, percentage: 20.9, trend: 'up', change: 12.3 },
    { category: 'Equipment', amount: 48051, percentage: 19.6, trend: 'down', change: -3.2 },
    { category: 'Labor', amount: 39508, percentage: 16.1, trend: 'up', change: 5.7 },
    { category: 'Irrigation', amount: 24518, percentage: 10.0, trend: 'up', change: 15.4 },
    { category: 'Others', amount: 16398, percentage: 6.7, trend: 'down', change: -1.8 }
  ];

  const revenueBreakdown = [
    { category: 'Crop Sales', amount: 380000, percentage: 60.2, performance: 'excellent' },
    { category: 'Livestock Sales', amount: 165000, percentage: 26.2, performance: 'good' },
    { category: 'Dairy Products', amount: 89000, percentage: 14.1, performance: 'excellent' },
    { category: 'Government Subsidies', amount: 45000, percentage: 7.1, performance: 'average' },
    { category: 'Equipment Rental', amount: 32000, percentage: 5.1, performance: 'poor' },
    { category: 'Other Income', amount: 22000, percentage: 3.5, performance: 'good' }
  ];

  const keyInsights = [
    {
      type: 'opportunity',
      title: 'Reduce Fertilizer Costs',
      description: 'Fertilizer expenses increased by 12.3%. Consider bulk purchasing or organic alternatives.',
      priority: 'high',
      potentialSaving: 8500
    },
    {
      type: 'success',
      title: 'Dairy Revenue Growth',
      description: 'Dairy products show 15.2% growth - highest performing category.',
      priority: 'medium',
      potentialSaving: 0
    },
    {
      type: 'warning',
      title: 'Equipment Rental Decline',
      description: 'Equipment rental income down 2.1%. Review pricing strategy.',
      priority: 'medium',
      potentialSaving: 3200
    },
    {
      type: 'opportunity',
      title: 'Irrigation Efficiency',
      description: 'Irrigation costs up 15.4%. Invest in drip irrigation for long-term savings.',
      priority: 'high',
      potentialSaving: 12000
    }
  ];

  const formatRupees = (amount: number) => `₹${amount.toLocaleString()}`;

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'good': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'average': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'poor': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Target className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Financial Report</h2>
          <p className="text-muted-foreground">Comprehensive analysis of farm financial performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">Total Revenue</div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">{formatRupees(financialSummary.totalRevenue)}</div>
            <div className="text-xs text-muted-foreground">+12.3% from last period</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">Total Expenses</div>
              <TrendingUp className="h-4 w-4 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-red-600">{formatRupees(financialSummary.totalExpenses)}</div>
            <div className="text-xs text-muted-foreground">+8.5% from last period</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">Net Profit</div>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{formatRupees(financialSummary.netProfit)}</div>
            <div className="text-xs text-muted-foreground">+14.7% from last period</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">ROI</div>
              <Target className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{financialSummary.roi}%</div>
            <div className="text-xs text-muted-foreground">+5.2% from last period</div>
          </CardContent>
        </Card>
      </div>

      {/* Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Income vs Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatRupees(value as number)} />
                  <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                  <Bar dataKey="revenue" fill="#22c55e" name="Revenue" />
                  <Line dataKey="profit" stroke="#3b82f6" strokeWidth={2} name="Profit" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Revenue Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={revenueBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.category}: ${entry.percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {revenueBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatRupees(value as number)} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenseBreakdown.map((expense, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{expense.category}</TableCell>
                    <TableCell>{formatRupees(expense.amount)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {expense.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 text-red-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-green-500" />
                        )}
                        <span className={expense.trend === 'up' ? 'text-red-600' : 'text-green-600'}>
                          {expense.change > 0 ? '+' : ''}{expense.change}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Revenue Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueBreakdown.map((revenue, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{revenue.category}</TableCell>
                    <TableCell>{formatRupees(revenue.amount)}</TableCell>
                    <TableCell>
                      <Badge className={getPerformanceColor(revenue.performance)}>
                        {revenue.performance}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights and Recommendations */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Key Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keyInsights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getPriorityIcon(insight.priority)}
                    <span className="font-medium">{insight.title}</span>
                  </div>
                  {insight.potentialSaving > 0 && (
                    <Badge variant="secondary" className="text-green-600">
                      Save {formatRupees(insight.potentialSaving)}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Financial Health Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{financialSummary.profitMargin}%</div>
              <div className="text-sm text-muted-foreground">Profit Margin</div>
              <div className="text-xs text-green-600 mt-1">Excellent profitability</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{formatRupees(financialSummary.breakEvenPoint)}</div>
              <div className="text-sm text-muted-foreground">Break-even Point</div>
              <div className="text-xs text-blue-600 mt-1">Monthly target</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{financialSummary.roi}%</div>
              <div className="text-sm text-muted-foreground">Return on Investment</div>
              <div className="text-xs text-purple-600 mt-1">Above industry average</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsTab;