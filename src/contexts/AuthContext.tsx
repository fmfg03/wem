
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Define types for user and auth context
export type User = {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  createdAt: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

// Mock user data (would come from a backend in production)
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@wem.com.mx',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'customer@example.com',
    password: 'customer123',
    name: 'Customer User',
    role: 'customer' as const,
    createdAt: '2023-02-15T00:00:00Z',
  },
];

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for saved user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('wem_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('wem_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Create a safe user object without password
      const safeUser: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        createdAt: foundUser.createdAt,
      };
      
      // Save user to state and local storage
      setUser(safeUser);
      localStorage.setItem('wem_user', JSON.stringify(safeUser));
      
      toast.success(`Bienvenido, ${safeUser.name}!`);
      return true;
    } else {
      toast.error('Credenciales inválidas. Inténtalo de nuevo.');
      return false;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if email already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      toast.error('Este correo electrónico ya está registrado');
      return false;
    }
    
    // In a real app, this would be a server call
    // For mock, we'll just create a new user object (not actually adding to MOCK_USERS)
    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      name,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    
    // Save user to state and local storage
    setUser(newUser);
    localStorage.setItem('wem_user', JSON.stringify(newUser));
    
    toast.success('¡Registro exitoso! Bienvenido a WEM México');
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('wem_user');
    toast.info('Has cerrado sesión correctamente');
  };

  // Build the context value
  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
