// src/hocs/withAuth.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

interface WithAuthProps {
  component: React.ComponentType;
  admin?: boolean;
}

interface Response {
  status: number;
  success: boolean;
  user: {
    admin: boolean;
  };
}

const Authenticate = ({ component: Component, admin = false }: WithAuthProps) => {

  const AuthenticatedComponent: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response: AxiosResponse<Response> = await axios.get(import.meta.env.VITE_IS_LOGGED_IN);

          if (!response.data.success) {
            navigate('/login');
            return;
          }

          if (admin && !response.data.user.admin) {
            toast.error("Access denied");
            navigate("/products");
          }

        } catch (error) {
          navigate('/login');
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message || "Something went wrong");
          } else {
            toast.error("Something went wrong");
          }
        }
      };

      checkAuth();
    }, [navigate]);

    return <Component />;
  };

  return AuthenticatedComponent;
};

export default Authenticate;
