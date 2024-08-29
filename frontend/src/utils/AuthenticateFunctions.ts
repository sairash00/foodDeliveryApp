import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { NavigateFunction } from 'react-router-dom';

interface Response {
  status: number;
  success: boolean;
  user: {
    admin: boolean;
  };
}

interface Props {
  admin?: boolean;
  navigate?: NavigateFunction | null;
}

interface AuthStatus {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const CheckLoggedIn = async ({ admin = false, navigate }: Props): Promise<AuthStatus> => {
  try {
    const response: AxiosResponse<Response> = await axios.get(import.meta.env.VITE_IS_LOGGED_IN);
    
    if (!response.data.success) {
      if (navigate) {
        toast.error("Please Login First");
        navigate("/login");
      }
      return { isAuthenticated: false, isAdmin: false };
    }
    
    if (admin && !response.data.user.admin) {
      if (navigate) {
        toast.error("You don't have permission to access this page");
        navigate("/products");
      }
      return { isAuthenticated: true, isAdmin: false };
    }
    
    return { isAuthenticated: true, isAdmin: response.data.user.admin };
    
  } catch (error) {
    if (navigate) {
      toast.error("Please Login First");
      navigate('/login');
    }
    return { isAuthenticated: false, isAdmin: false };
  }
};
