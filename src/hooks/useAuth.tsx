
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User, UserType, LoginCredentials, RegisterCandidateData, RegisterEmployerData } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  userType: UserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  registerCandidate: (data: RegisterCandidateData) => Promise<void>;
  registerEmployer: (data: RegisterEmployerData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status on mount
    checkAuth().finally(() => {
      setIsLoading(false);
    });
  }, []);

  const checkAuth = async (): Promise<boolean> => {
    try {
      const token = authService.getToken();
      if (!token) {
        return false;
      }

      // Try to get user profile with current token
      const user = await authService.getUserProfile();
      setUser(user);
      setUserType(user.user_type as UserType);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Authentication check failed:', error);
      // Clear invalid auth data
      authService.clearAuth();
      setUser(null);
      setUserType(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);
      setUser(response.user);
      setUserType(response.user_type);
      setIsAuthenticated(true);
      
      // Navigate based on user type
      if (response.user_type === 'candidate') {
        navigate('/candidate/dashboard');
      } else {
        navigate('/employer/dashboard');
      }
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${response.user.first_name}!`,
      });
    } catch (error: any) {
      console.error('Login failed:', error);
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerCandidate = async (data: RegisterCandidateData): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authService.registerCandidate(data);
      setUser(response.user);
      setUserType('candidate');
      setIsAuthenticated(true);
      navigate('/candidate/dashboard');
      
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
    } catch (error: any) {
      console.error('Registration failed:', error);
      toast({
        title: "Registration failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerEmployer = async (data: RegisterEmployerData): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authService.registerEmployer(data);
      setUser(response.user);
      setUserType('employer');
      setIsAuthenticated(true);
      navigate('/employer/dashboard');
      
      toast({
        title: "Registration successful",
        description: "Your employer account has been created.",
      });
    } catch (error: any) {
      console.error('Registration failed:', error);
      toast({
        title: "Registration failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
    navigate('/');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        isAuthenticated,
        isLoading,
        login,
        registerCandidate,
        registerEmployer,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const ProtectedRoute = ({ 
  children, 
  userTypes 
}: { 
  children: ReactNode; 
  userTypes?: UserType[] 
}) => {
  const { isAuthenticated, userType, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
    
    if (!isLoading && isAuthenticated && userTypes && !userTypes.includes(userType as UserType)) {
      if (userType === 'candidate') {
        navigate('/candidate/dashboard');
      } else {
        navigate('/employer/dashboard');
      }
    }
  }, [isLoading, isAuthenticated, userType, navigate, userTypes]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : null;
};
