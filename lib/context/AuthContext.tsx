import React, { createContext, useEffect, useState } from 'react';
import client from '../utils/api/client';
import config from '@/config';

interface AuthContextProps {
  user?: any;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    client
      .get('/auth/user', { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const login = () => {
    window.location.href = `${config.apiServerUrl}/auth/google`;
  };

  const logout = async () => {
    try {
      const response = await client.get(`${config.apiServerUrl}/auth/logout`, {
        withCredentials: true, // Include credentials (cookies, authorization headers, etc.).
      });

      if (response.status === 200) {
        // Redirect to the blog page on the client side.
        window.location.href = '/blog';
      } else {
        console.error('Error logging out:', response.statusText);
      }
    } catch (error: any) {
      console.error('Error during logout:', error);

      // Handle error
      // ...
    }
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
