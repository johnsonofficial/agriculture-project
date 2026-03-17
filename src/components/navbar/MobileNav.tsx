
import React from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, LogOut, UserCog, User } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

interface MobileNavProps {
  isAuthenticated: boolean;
  user: { email: string; role: string } | null;
  mounted: boolean;
  handleLogout: () => void;
}

const MobileNav = ({ isAuthenticated, user, mounted, handleLogout }: MobileNavProps) => {
  const isAdmin = user?.role === 'admin';

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-4 border-b">
            <Logo />
          </div>
          
          <nav className="flex flex-col gap-1 py-4">
            <Link to="/" className="px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              Home
            </Link>
            <Link to="/seed-guide" className="px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              Seed Guide
            </Link>
            <details className="group w-full">
              <summary className="px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md list-none flex justify-between cursor-pointer">
                Features <ChevronDown className="h-4 w-4" />
              </summary>
              <div className="ml-4 border-l pl-2 mt-1">
                <Link to="/expense-tracker" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Expense Tracker
                </Link>
                <Link to="/iot-monitoring" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  IoT Monitoring
                </Link>
                <Link to="/weather" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Weather Forecast
                </Link>
                <Link to="/disease-scanner" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Plant Disease Scanner
                </Link>
                <Link to="/labor-management" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Labor Management
                </Link>
              </div>
            </details>
            <Link to="/contact" className="px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
              Contact
            </Link>
          </nav>
          
          <div className="mt-auto p-4 border-t">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Switch Theme</span>
              {mounted && <ThemeToggle />}
            </div>
            
            {isAuthenticated ? (
              <div className="space-y-1">
                <div className="flex items-center gap-1 mb-1">
                  {isAdmin ? <UserCog className="h-4 w-4 text-primary" /> : <User className="h-4 w-4" />}
                  <span className="text-sm font-medium">{user?.email}</span>
                </div>
                <Button className="w-full" variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" className="col-span-1">
                  <Button className="w-full" variant="outline">Login</Button>
                </Link>
                <Link to="/register" className="col-span-1">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
