
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, Trash2, UserCog, Mail, User, ShieldCheck, PencilRuler } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Sample user data - in a real app this would come from your database
const SAMPLE_USERS = [
  { id: '1', name: 'Admin User', email: 'admin@farmapp.com', role: 'admin', status: 'active' },
  { id: '2', name: 'Manager Singh', email: 'manager@farmapp.com', role: 'manager', status: 'active' },
  { id: '3', name: 'Farm Worker', email: 'worker@farmapp.com', role: 'user', status: 'active' },
  { id: '4', name: 'Guest Account', email: 'guest@farmapp.com', role: 'guest', status: 'inactive' },
];

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(SAMPLE_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'user',
    password: '',
    confirmPassword: '',
  });
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDelete = (id: string) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete));
      
      toast({
        title: "User Deleted",
        description: "The user has been successfully removed.",
      });
      
      setUserToDelete(null);
      setDeleteDialogOpen(false);
    }
  };
  
  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUserForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRoleChange = (value: string) => {
    setNewUserForm(prev => ({ ...prev, role: value }));
  };
  
  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!newUserForm.name || !newUserForm.email || !newUserForm.password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (newUserForm.password !== newUserForm.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would add this user to your database
    const newUser = {
      id: (users.length + 1).toString(),
      name: newUserForm.name,
      email: newUserForm.email,
      role: newUserForm.role,
      status: 'active',
    };
    
    setUsers([...users, newUser]);
    
    toast({
      title: "User Added",
      description: `${newUserForm.name} has been added successfully.`,
    });
    
    // Reset form
    setNewUserForm({
      name: '',
      email: '',
      role: 'user',
      password: '',
      confirmPassword: '',
    });
  };
  
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'manager':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'user':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };
  
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <ShieldCheck className="h-3 w-3" />;
      case 'manager':
        return <PencilRuler className="h-3 w-3" />;
      case 'user':
        return <User className="h-3 w-3" />;
      default:
        return <User className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">User List</h3>
                <div className="relative max-w-xs">
                  <Input
                    type="search"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" /> {user.email}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                              {getRoleIcon(user.role)}
                              <span className="ml-1 capitalize">{user.role}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              user.status === 'active' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                            }`}>
                              <span className="relative flex h-2 w-2 mr-1">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                                  user.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                                } opacity-75`}></span>
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                                  user.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                                }`}></span>
                              </span>
                              <span className="capitalize">{user.status}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No users found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Add New User</h3>
              
              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    name="name"
                    value={newUserForm.name}
                    onChange={handleNewUserChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={newUserForm.email}
                    onChange={handleNewUserChange}
                    placeholder="user@example.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">User Role <span className="text-red-500">*</span></Label>
                  <Select 
                    value={newUserForm.role} 
                    onValueChange={handleRoleChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select user role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="user">Regular User</SelectItem>
                      <SelectItem value="guest">Guest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={newUserForm.password}
                    onChange={handleNewUserChange}
                    placeholder="Enter password"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={newUserForm.confirmPassword}
                    onChange={handleNewUserChange}
                    placeholder="Confirm password"
                    required
                  />
                </div>
                
                <div className="pt-2">
                  <Button type="submit" className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" /> Add User
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <UserCog className="mr-2 h-4 w-4" /> Manage Permissions
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Permissions</DialogTitle>
            <DialogDescription>
              Configure access levels and permissions for different user roles.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-2">Admin Role</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Full access to all features, including user management and system settings.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">User Management</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Reports & Exports</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">System Settings</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Data Management</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-2">Manager Role</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Can manage labor records and access reports, but cannot modify system settings.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>
                  <span className="text-sm">User Management</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Reports & Exports</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>
                  <span className="text-sm">System Settings</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Data Management</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-2">Regular User</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Limited to adding and viewing labor records. Cannot modify system settings or access reports.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>
                  <span className="text-sm">User Management</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>
                  <span className="text-sm">Reports & Exports</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>
                  <span className="text-sm">System Settings</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Data Management</span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this user account. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;
