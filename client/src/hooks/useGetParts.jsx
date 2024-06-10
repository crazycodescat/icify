import axios from 'axios';

// import { useAuth } from './useAuth';
import { useAccessToken } from './useAccessToken';
import { useState } from 'react';

const useGetParts = () => {
  // const { accessToken } = useAuth();
  const { accessToken } = useAccessToken();
  const [loading, setLoading] = useState(false);
  const products = [];

  const fetchParts = async (searchKeyword, limit = 20) => {
    const distributorsRequestConfig = [
      {
        url: import.meta.env.VITE_DIGIKEY_SEARCH_URL,
        method: 'post',
        data: {
          Keywords: searchKeyword,
          Limit: limit,
          offset: 0,
          FilterOptionsRequest: {
            //Specify any filters you want to  apply
          },
          SortOptions: {
            Field: 'None',
            SortOrder: 'Ascending',
          },
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-DIGIKEY-Client-Id': import.meta.env.VITE_DIGIKEY_PROD_CLIENT_ID,
          'X-DIGIKEY-Locale-Site': 'US',
          'X-DIGIKEY-Locale-Currency': 'USD',
        },
      },
      // {
      //   url: `https://api.mouser.com/api/v1/search/keyword`,
      //   method: 'post',
      //   data: {
      //     SearchByKeywordRequest: {
      //       keyword: searchKeyword,
      //       records: limit,
      //       startingRecord: 0,
      //       searchOptions: 'string',
      //       searchWithYourSignUpLanguage: 'string',
      //     },
      //   },
      //   params: {
      //     apiKey: import.meta.env.VITE_MOUSER_SEARCH_API_KEY,
      //   },
      // },
    ];

    try {
      setLoading(true);
      for (let i = 0; i < distributorsRequestConfig.length; i++) {
        const response = await axios.request(distributorsRequestConfig[i]);
        products.push({
          parts: response.data.Products
            ? [...response.data.Products, { distributor: 'Digikey' }]
            : response.data.SearchResults
            ? [...response.data.SearchResults.Parts, { distributor: 'Mouser' }]
            : null,
        });
      }
      setLoading(false);
      return products;
    } catch (error) {
      console.log('ERROR: While Fetching Parts', error.message);
      console.error(error);
    }
  };
  return { fetchParts, loading };
};

export { useGetParts };
