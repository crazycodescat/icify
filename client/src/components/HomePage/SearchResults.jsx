/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const SearchResults = ({ product, loading, queryError }) => {
  return (
    <div className="">
      {queryError && (
        <div
          className="text-black
        "
        >
          {queryError}
        </div>
      )}
      {loading && (
        <div
          className="text-black
        "
        >
          ..Loading
        </div>
      )}
      {/* {product && } */}
      {product && (
        <div className="">
          <ul className="flex flex-col gap-1">
            {product.parts.map((part, i) => {
              return (
                <div
                  className="flex justify-between items-center pr-2 bg-blue-500 rounded-lg overflow-hidden text-xs text-white w-full"
                  key={i}
                >
                  <li className="flex items-center gap-2 w-full">
                    <img
                      className="w-[48px] h-[48px]"
                      src={part.PhotoUrl}
                      alt=""
                    />
                    <div className="flex flex-col gap-1">
                      <div>
                        <Link className=" underline">
                          {part.ManufacturerProductNumber}
                        </Link>
                      </div>
                      <div>
                        {part.Category && <Link>{part.Category.Name}</Link>}
                      </div>
                    </div>
                  </li>
                  <div className=" text-end ">
                    {part.Manufacturer && (
                      <span className="">{part.Manufacturer.Name}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
