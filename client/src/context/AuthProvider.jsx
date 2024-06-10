/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, createContext, useState } from 'react';
import axios from 'axios';

// Create authentication context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // Function to refresh access token
  const refreshAccessToken = async () => {
    const tokenEndpoint = 'https://api.digikey.com/v1/oauth2/token';
    const client_id = import.meta.env.VITE_DIGIKEY_PROD_CLIENT_ID;
    const client_secret = import.meta.env.VITE_DIGIKEY_PROD_CLIENT_SECRET;
    const redirect_uri = 'https://localhost:3000/oauth/callback';
    const grant_type = 'authorization_code';

    const requestBody = {
      code: 'sTgKrx3P',
      client_id,
      client_secret,
      redirect_uri,
      grant_type,
    };

    try {
      const response = await axios.post(
        tokenEndpoint,
        new URLSearchParams(requestBody),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      // console.log(response);
    } catch (error) {
      return error.status;
    }
  };

  useEffect(() => {
    const handleUnauthorizedError = async (error) => {
      if (error.response && error.response.status === 401) {
        await refreshAccessToken();
      } else {
        console.error('Error making API request:', error);
      }
    };

    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // Add access token to request headers
        if (accessToken) {
          // console.log(config);
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        await handleUnauthorizedError(error);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, refreshToken, setRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
