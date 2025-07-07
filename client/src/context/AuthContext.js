import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
    toast.info('Logged out successfully');
  }, [navigate]);

  // Check token on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          const response = await api.get('/user/profile');

          // Assuming /user/profile returns user data directly
          setUser(response.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [logout]);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const token = response.data.token;

      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(response.data.user);
      setIsAuthenticated(true);
      toast.success('Login successful');

      navigate(getRedirectPath(response.data.user?.role || 'user'));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const token = response.data.token;

      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(response.data.user);
      setIsAuthenticated(true);
      toast.success('Registration successful');

      navigate(getRedirectPath(response.data.user?.role || 'user'));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  // Change password function
  const changePassword = async (currentPassword, newPassword) => {
    try {
      await api.put('/auth/change-password', { currentPassword, newPassword });
      toast.success('Password changed successfully');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password change failed');
      throw error;
    }
  };

  // Redirect based on role
  const getRedirectPath = (role) => {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'store_owner':
        return '/store-owner/ratings';
      case 'user':
        return '/user/stores';
      default:
        return '/';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        changePassword
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
