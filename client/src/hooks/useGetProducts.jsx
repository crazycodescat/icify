/* eslint-disable no-unused-vars */
import axios from 'axios';

// import { useAuth } from './useAuth';
import { useAccessToken } from './useAccessToken';
import { useState } from 'react';

const useGetProducts = () => {
  // const { accessToken } = useAuth();
  const { accessToken } = useAccessToken();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();
  let arrProducts = [];

  const fetchProducts = async (searchKeyword, limit = 4) => {
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
      {
        // url: `https://api.mouser.com/api/v1/search/keyword`,
        url: import.meta.env.VITE_MOUSER_SEARCH_URL,
        method: 'post',
        data: {
          SearchByKeywordRequest: {
            keyword: searchKeyword,
            records: limit,
            startingRecord: 0,
            searchOptions: 'string',
            searchWithYourSignUpLanguage: 'string',
          },
        },
        params: {
          apiKey: import.meta.env.VITE_MOUSER_SEARCH_API_KEY,
        },
      },
    ];

    try {
      setLoading(true);
      for (let i = 0; i < distributorsRequestConfig.length; i++) {
        const response = await axios.request(distributorsRequestConfig[i]);
        console.log(response);
        arrProducts.push(
          response.data.Products
            ? [
                { distributor: 'DigiKey' },
                { parts: [...response.data.Products] },
              ]
            : response.data.SearchResults.Parts
            ? [
                { distributor: 'Mouser Electronics' },
                { parts: [...response.data.SearchResults.Parts] },
              ]
            : null
        );
      }
      setLoading(false);
      return arrProducts;
    } catch (error) {
      console.error(error.message);
    }
  };
  return { fetchProducts, loading, products, arrProducts };
};

export { useGetProducts };
