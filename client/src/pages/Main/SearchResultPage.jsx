/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DistributorHeading from '../../components/SearchResultPage/DistributorHeading';
import { IoMdArrowDropright } from 'react-icons/io';
import { useGetProducts } from '../../hooks/useGetProducts';
import SearchResultBox from '../../components/SearchResultPage/SearchResultBox';
import { useAccessToken } from '../../hooks/useAccessToken';

const SearchResultPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [products, setProducts] = useState();
  const { fetchProducts, loading } = useGetProducts();
  const { accessToken } = useAccessToken();
  const params = useParams();
  // console.log(products);

  const detailsToggler = () => {
    setShowDetails((prev) => !prev);
  };

  useEffect(() => {
    const loadParts = async () => {
      if (accessToken) {
        const parts = await fetchProducts(params.keyword, 5);

        setProducts(parts);
      }
    };
    loadParts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <div className="w-full bg-[#ececec] h-full px-4">
      {products &&
        products.map((part, i) => {
          return (
            <div
              key={i}
              className="border border-solid border-gray-300 shadow-md mt-4 bg-white flex flex-col items-center mx-auto max-w-[800px] p-2"
            >
              {part[1].parts.length !== 0 && (
                <DistributorHeading distributor={part[0].distributor} />
              )}
              {part[1].parts.map((partDetail, i) => {
                return (
                  <SearchResultBox
                    key={i}
                    detailsToggler={detailsToggler}
                    showDetails={showDetails}
                    distributor={part[0].distributor}
                    partDetail={partDetail}
                  />
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default SearchResultPage;
