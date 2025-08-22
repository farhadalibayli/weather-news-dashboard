import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, VerificationCredentials } from '../types';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  verifyCode: (credentials: VerificationCredentials) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
  token?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: undefined
  });

  // Check for existing session on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = (): boolean => {
    const token = localStorage.getItem('sessionToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          token
        });
        return true;
      } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
        return false;
      }
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        token: undefined
      });
      return false;
    }
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      // Use real backend authentication
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: 'password123' // Default password for demo
        })
      });

      if (response.ok) {
        const data = await response.json();
        const user: User = {
          id: data.user.id.toString(),
          email: data.user.email,
          name: data.user.name
        };
        
        // Store session data
        localStorage.setItem('sessionToken', data.token);
        localStorage.setItem('userData', JSON.stringify(user));
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          token: data.token
        });
        
        return true;
      } else {
        // If login fails, try to register the user
        return await register(credentials);
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: 'password123' // Default password for demo
        })
      });

      if (response.ok) {
        const data = await response.json();
        const user: User = {
          id: data.user.id.toString(),
          email: data.user.email,
          name: data.user.name
        };
        
        // Store session data
        localStorage.setItem('sessionToken', data.token);
        localStorage.setItem('userData', JSON.stringify(user));
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          token: data.token
        });
        
        return true;
      } else {
        console.error('Registration failed');
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const verifyCode = async (credentials: VerificationCredentials): Promise<boolean> => {
    // For now, we'll use the email as the login credential
    return await login({ email: credentials.email });
  };

  const logout = () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('userData');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: undefined
    });
  };

  const value: AuthContextType = {
    ...authState,
    login,
    verifyCode,
    logout,
    checkAuth,
    token: authState.token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
