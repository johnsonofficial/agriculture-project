
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';

interface User {
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>; // Added checkAuth method to interface
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check authentication status
  const checkAuth = async () => {
    // Check if user is already logged in
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const userData = localStorage.getItem('user');
    
    if (authStatus && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  };

  useEffect(() => {
    // Initial auth check
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      // In a real app, this would be an API call to your backend
      return new Promise((resolve) => {
        setTimeout(() => {
          // For demo: Accept any email with @ and password length >= 6
          if (email.includes('@') && password.length >= 6) {
            const user = { email };
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            setIsAuthenticated(true);
            toast({
              title: "Login successful!",
              description: "Welcome back to AgriAssist.",
            });
            resolve(true);
          } else {
            toast({
              title: "Login failed",
              description: "Invalid email or password. Try demo@agriassist.com / password123",
              variant: "destructive",
            });
            resolve(false);
          }
        }, 1000);
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login.",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          const user = { email, name };
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          setIsAuthenticated(true);
          toast({
            title: "Registration successful!",
            description: "Your account has been created.",
          });
          resolve(true);
        }, 1000);
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
