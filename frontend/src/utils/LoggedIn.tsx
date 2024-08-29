// src/hocs/withGuest.tsx

import React, { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

interface WithGuestProps {
  component: React.ComponentType;
}

interface Response {
  status: number;
  success: boolean;
}

const LoggedIn = ({ component: Component }: WithGuestProps) => {

  const GuestComponent: React.FC = () => {
    const navigate:NavigateFunction = useNavigate();

    useEffect(() => {
      const checkIfLoggedIn = async ():Promise<void> => {
        try {
          const response: AxiosResponse<Response> = await axios.get(import.meta.env.VITE_IS_LOGGED_IN);

          if (response.data.success) {
            navigate('/products'); 
          }

        } catch (error) {
          if(error){
            return
        }
      };
    }
      checkIfLoggedIn();
    },[]);

    return <Component />;
  };

  return GuestComponent;
};

export default LoggedIn;
