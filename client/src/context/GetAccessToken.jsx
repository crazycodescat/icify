/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create authentication context
export const AccessTokenContext = createContext();

export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  // Function to get access token
  const getAccessToken = async () => {
    const requestBody = {
      client_id: import.meta.env.VITE_DIGIKEY_PROD_CLIENT_ID,
      client_secret: import.meta.env.VITE_DIGIKEY_PROD_CLIENT_SECRET,
      grant_type: 'client_credentials',
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_ACCESS_TOKEN_ENDPOINT,
        new URLSearchParams(requestBody),
        { headers }
      );
      return response.data.access_token;
    } catch (error) {
      return error.status;
    }
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      const newAccessToken = await getAccessToken();
      if (newAccessToken) {
        setAccessToken(newAccessToken);
      }
    };

    fetchAccessToken();
  }, []);
  return (
    <AccessTokenContext.Provider value={{ accessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};
