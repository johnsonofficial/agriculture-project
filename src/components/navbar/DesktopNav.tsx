
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const DesktopNav = () => {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
        Home
      </Link>
      <Link to="/seed-guide" className="text-sm font-medium hover:text-primary transition-colors">
        Seed Guide
      </Link>
      <div className="relative group">
        <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
          Features <ChevronDown className="h-4 w-4" />
        </button>
        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
          <div className="py-1">
            <Link to="/expense-tracker" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
              Expense Tracker
            </Link>
            <Link to="/iot-monitoring" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
              IoT Monitoring
            </Link>
            <Link to="/weather" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
              Weather Forecast
            </Link>
            <Link to="/disease-scanner" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
              Plant Disease Scanner
            </Link>
            <Link to="/labor-management" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
              Labor Management
            </Link>
          </div>
        </div>
      </div>
      <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
        Contact
      </Link>
    </nav>
  );
};

export default DesktopNav;
