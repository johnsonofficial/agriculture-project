
import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, PieChart, TrendingUp, DollarSign } from 'lucide-react';
import ExpenseChart from '@/components/ExpenseChart';
import RevenueTab from '@/components/RevenueTab';
import ReportsTab from '@/components/ReportsTab';

const ExpenseTracker = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8 text-center">
            <div className="inline-flex items-center gap-2 bg-earth-100 dark:bg-earth-900/30 rounded-full px-3 py-1 text-sm font-medium text-earth-800 dark:text-earth-300 mb-3">
              <BarChart3 className="h-4 w-4" />
              <span>Financial Management</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Farm Expense Tracker</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Track, analyze and optimize your farm's financial performance with our comprehensive expense tracking tools.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Dashboard Overview */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-medium">Total Expenses</h3>
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                      <DollarSign className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold">₹24,518.35</div>
                  <div className="text-sm text-red-600 dark:text-red-400 mt-2">+8.5% from last month</div>
                </div>
                
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-medium">Total Revenue</h3>
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                      <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold">₹63,102.50</div>
                  <div className="text-sm text-green-600 dark:text-green-400 mt-2">+12.3% from last month</div>
                </div>
                
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-medium">Net Profit</h3>
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                      <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold">₹38,584.15</div>
                  <div className="text-sm text-blue-600 dark:text-blue-400 mt-2">+14.7% from last month</div>
                </div>
                
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-medium">ROI</h3>
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                      <PieChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold">157.4%</div>
                  <div className="text-sm text-purple-600 dark:text-purple-400 mt-2">+5.2% from last month</div>
                </div>
              </div>
            </div>
            
            {/* Expense Analytics */}
            <div className="mb-12">
              <Tabs defaultValue="expenses">
                <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
                  <TabsTrigger value="expenses">Expenses</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                
                <TabsContent value="expenses">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <ExpenseChart />
                    </div>
                    
                    <div className="glass-card p-6">
                      <h3 className="text-lg font-medium mb-4">Top Expense Categories</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Seeds & Planting</span>
                            <span className="text-sm font-medium">₹6,542.50</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '28%' }}></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">28% of total expenses</div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Fertilizers</span>
                            <span className="text-sm font-medium">₹5,128.30</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '21%' }}></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">21% of total expenses</div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Equipment</span>
                            <span className="text-sm font-medium">₹4,805.15</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '19%' }}></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">19% of total expenses</div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Labor</span>
                            <span className="text-sm font-medium">₹3,950.80</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '16%' }}></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">16% of total expenses</div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Others</span>
                            <span className="text-sm font-medium">₹4,091.60</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '16%' }}></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">16% of total expenses</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="revenue">
                  <RevenueTab />
                </TabsContent>
                
                <TabsContent value="reports">
                  <ReportsTab />
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Feature Description */}
            <div className="glass-card p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6">Track Every Penny on Your Farm</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Comprehensive Expense Tracking</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Log and categorize all farm-related expenses with our intuitive interface. From seeds to equipment, never miss a transaction.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Insightful Analytics</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Visualize your farm's financial health with customizable charts and reports. Identify trends and make data-driven decisions.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Budget Planning</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Set budgets for different categories and track your spending against them. Receive alerts when you're approaching your limits.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Profit Analysis</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Calculate the profitability of different crops and farming activities. Compare costs and returns across seasons.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Tax Preparation</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Export detailed financial reports for tax season. Categorize expenses according to tax deductible categories.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Secure Data Storage</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your financial information is securely stored and backed up. Access your data from any device with your account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExpenseTracker;
