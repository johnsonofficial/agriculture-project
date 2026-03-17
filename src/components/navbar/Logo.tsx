
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="bg-primary rounded-full p-1.5">
        <Leaf className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="font-bold text-xl">AgriAssist</span>
    </Link>
  );
};

export default Logo;
