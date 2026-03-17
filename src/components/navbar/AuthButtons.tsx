
import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { UserPlus, User, UserCog, LogOut } from 'lucide-react';

interface AuthButtonsProps {
  isAuthenticated: boolean;
  user: { email: string; role: string } | null;
  handleLogout: () => void;
}

const AuthButtons = ({ isAuthenticated, user, handleLogout }: AuthButtonsProps) => {
  const isAdmin = user?.role === 'admin';

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {isAdmin ? <UserCog className="h-4 w-4 text-primary" /> : <User className="h-4 w-4" />}
          <span className="text-sm font-medium">{user?.email}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-1">
          <UserPlus className="h-4 w-4" />
          <span>Account</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link to="/login" className="w-full cursor-pointer">
            Login
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/register" className="w-full cursor-pointer">
            Sign Up
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButtons;
