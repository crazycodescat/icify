import { useState } from 'react';

import SearchResults from '../../components/HomePage/SearchResults';
import CustomAnimatedLetters from '../../components/CustomAnimatedLetters';
import { useGetParts } from '../../hooks/useGetParts';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const { fetchParts, loading } = useGetParts();
  const [keyword, setKeyword] = useState('');
  const [product, setProduct] = useState(false);
  const [queryError, setQueryError] = useState('');
  const [isPartEntered, setIsPartEntered] = useState(false);
  const [mainLoading, setMainLoading] = useState(false);

  const searchHandler = async () => {
    // setProduct(false);
    if (keyword.length > 0) {
      const product = await fetchParts(keyword, 5);
      if (product.length > 0) {
        setProduct(product[0]);
        return;
      }

      setQueryError('Please enter a Valid Query');
      setProduct(false);
    }
    return;
  };

  const searchOnChangeHandler = async (e) => {
    setKeyword(e.target.value);
    await searchHandler();
    // keyword.length === 0 ? setIsPartEntered(true) : setIsPartEntered(false);
  };

  const searchOnClickHandler = async (e) => {
    setKeyword(e.target.value);
    if (keyword.length === 0) {
      setIsPartEntered(true);
      return;
    }
    setMainLoading(true);
    if (keyword.length !== 0) {
      navigate(`/search/${keyword}`);
      return;
    }
  };

  return (
    <div className="flex flex-col gap-14 items-center justify-center p-2 py-16 bg-blue-700 text-white">
      <div className="">
        <div className="max-w-[600px]">
          <CustomAnimatedLetters
            text="Unleash "
            classes="text-blue-100 uppercase text-3xl font-semibold inline-block"
            animationValue={defaultAnimations}
            transition={{ staggerChildren: 0.09, type: 'tween' }}
            viewport
          />
          <span className="text-sm uppercase font-semibold">
            Your Innovations with Our Vast Electronic Component Repository -
            Limitless Possibilities Awaits
          </span>
        </div>
      </div>
      <div className="max-w-[500px] flex flex-col gap-2 w-full relative">
        <div className=" flex justify-between bg-blue-500 rounded-full shadow-2xl shadow-blue-300">
          <input
            value={keyword}
            onChange={(e) => searchOnChangeHandler(e)}
            className="w-full p-4 rounded-full rounded-r-none focus:outline-none font-semibold text-blue-700 text-xs placeholder:text-blue-700 placeholder:text-xs"
            type="search"
            name="keyword"
            placeholder="Part Number / Keyword"
            id=""
          />
          <button
            onClick={(e) => searchOnClickHandler(e)}
            className="flex items-center gap-2 p-4 font-semibold text-white active:scale-75 duration-500"
          >
            Search
            {mainLoading && (
              <svg
                width="28"
                height="28"
                viewBox="0 0 38 38"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    x1="8.042%"
                    y1="0%"
                    x2="65.682%"
                    y2="23.865%"
                    id="a"
                  >
                    <stop stopColor="#fff" stopOpacity="0" offset="0%" />
                    <stop
                      stopColor="#fff"
                      stopOpacity=".631"
                      offset="63.146%"
                    />
                    <stop stopColor="#fff" offset="100%" />
                  </linearGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                  <g transform="translate(1 1)">
                    <path
                      d="M36 18c0-9.94-8.06-18-18-18"
                      id="Oval-2"
                      stroke="url(#a)"
                      strokeWidth="2"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="0.9s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <circle fill="#fff" cx="36" cy="18" r="1">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="0.9s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                </g>
              </svg>
            )}
          </button>
        </div>
        {/* Parts List */}
        {/* {keyword && (
          <SearchResults
            product={product}
            loading={loading}
            queryError={queryError}
          />
        )} */}
        {keyword && (
          <SearchResults
            product={product}
            loading={loading}
            queryError={queryError}
          />
        )}
        {/* {enterPartNumber && 
      } */}
        {isPartEntered && (
          <div className="max-w-[500px] bg-white p-3">
            <span className="text-[#ff0808]">
              Please enter a full or partial manufacturer part number with a
              minimum of 3 letters or numbers
            </span>
          </div>
        )}
      </div>
      {/* <div className="w-full h-full bg-[#2a2a2aab] absolute top-0 left-0"></div> */}
    </div>
  );
};

export default HomePage;

const defaultAnimations = {
  hidden: { y: -10, x: -10, opacity: 0 },
  visible: {
    y: 0,
    x: 0,
    opacity: 1,
  },
};
