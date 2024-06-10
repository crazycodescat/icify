/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';

import PriceDisplay from '../../components/PriceDisplay';

const SearchResultBox = ({ partDetail, distributor }) => {
  const [showDetails, setShowDetails] = useState(false);
  console.log(partDetail, distributor);
  const detailsToggler = () => {
    setShowDetails((prev) => !prev);
  };
  return (
    <div className="w-full">
      <div className="w-full mt-4">
        <div className="flex flex-col gap-2 relative  pl-1">
          <div className="flex justify-between w-full text-xs">
            <div className="flex w-[100px] font-semibold">
              <p>Part #</p>
            </div>
            <div className="w-full text-xs ">
              <a
                target="_blank"
                href={
                  distributor === 'DigiKey'
                    ? partDetail.ProductUrl
                    : distributor === 'Mouser Electronics'
                    ? partDetail.ProductDetailUrl
                    : null
                }
                className="text-blue-500"
              >
                {distributor === 'DigiKey'
                  ? partDetail.ManufacturerProductNumber
                  : distributor === 'Mouser Electronics'
                  ? partDetail.ManufacturerPartNumber
                  : null}
              </a>
              {distributor === 'DigiKey' ? (
                <p className="text-gray-400">
                  {partDetail.ProductVariations[0].DigiKeyProductNumber}
                </p>
              ) : distributor === 'Mouser Electronics' ? (
                <p>{partDetail.MouserPartNumber}</p>
              ) : null}
            </div>
            <button
              onClick={detailsToggler}
              className="flex items-center absolute right-0"
            >
              <IoMdArrowDropright
                className={showDetails && 'rotate-90 duration-200'}
              />
              <p className="text-blue-600 text-xs">Details</p>
            </button>
          </div>
          <div className="flex justify-between w-full text-xs">
            <div className="flex font-semibold w-[100px]">
              <p>Mfg.</p>
            </div>
            <div className="w-full text-xs ">
              {distributor === 'DigiKey' ? (
                <p>{partDetail.Manufacturer.Name}</p>
              ) : distributor === 'Mouser Electronics' ? (
                <p>{partDetail.Manufacturer}</p>
              ) : null}
            </div>
          </div>
          {showDetails && (
            <>
              <div className="flex justify-between w-full text-xs">
                <div className="flex font-semibold w-[100px]">
                  <p className="">Description</p>
                </div>
                <div className="w-full text-xs ">
                  {distributor === 'DigiKey' ? (
                    <p className="text-black">
                      {partDetail.Description.ProductDescription}
                    </p>
                  ) : distributor === 'Mouser Electronics' ? (
                    <p className="text-black">{partDetail.Description}</p>
                  ) : null}
                </div>
              </div>
              <div className="flex justify-between w-full text-xs">
                <div className="flex font-semibold w-[100px] ">
                  <p>Min Qty</p>
                </div>
                <div className="w-full text-sm">
                  {distributor === 'DigiKey' ? (
                    <p className="text-blue-600">
                      {partDetail.Description.ProductDescription}
                    </p>
                  ) : distributor === 'Mouser Electronics' ? (
                    <p className="text-blue-600">{partDetail.Description}</p>
                  ) : null}
                </div>
              </div>
              <div className="flex justify-between w-full text-xs">
                <div className="flex font-semibold w-[100px] ">
                  <p>Lead Time</p>
                </div>
                <div className="w-full text-sm">
                  {distributor === 'DigiKey' ? (
                    <p
                      className={`text-green-800 font-semibold ${
                        partDetail.ManufacturerLeadWeeks === null
                          ? 'text-red-600'
                          : 'text-green-800'
                      }`}
                    >
                      {partDetail.ManufacturerLeadWeeks === null
                        ? 'Lead Time Not Specified'
                        : `${partDetail.ManufacturerLeadWeeks} Weeks`}
                    </p>
                  ) : distributor === 'Mouser Electronics' ? (
                    <p className="text-green-800 font-semibold">
                      {partDetail.LeadTime}
                    </p>
                  ) : null}
                </div>
              </div>
              {distributor === 'DigiKey' ? (
                <div className="flex justify-between w-full text-xs">
                  <div className="flex font-semibold w-[100px]">
                    <p>Container</p>
                  </div>
                  <div className="w-full text-sm">
                    {distributor === 'DigiKey' ? (
                      <p className="text-green-500">
                        {partDetail.ProductVariations[0].PackageType.Name}
                      </p>
                    ) : distributor === 'Mouser Electronics' ? (
                      <p className="text-green-500">
                        {partDetail.ROHSStatus && partDetail.ROHSStatus}
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : distributor === 'Mouser Electronics' ? (
                <div className="flex justify-between w-full text-xs">
                  <div className="flex font-semibold w-[100px]">
                    <p>RoHS:</p>
                  </div>
                  <div className="w-full text-sm">
                    {distributor === 'DigiKey' ? (
                      <p className="text-green-500">
                        {partDetail.ProductVariations[0].PackageType.Name}
                      </p>
                    ) : distributor === 'Mouser Electronics' ? (
                      <p className="text-green-500">
                        {partDetail.ROHSStatus &&
                          partDetail.ROHSStatus.split(' ')[1]}
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </>
          )}
          <div className="flex justify-between w-full text-xs">
            <div className="flex w-[100px] font-semibold">
              <p>Stock</p>
            </div>
            <div className="w-full text-sm font-semibold">
              {distributor === 'DigiKey' ? (
                <>
                  <p className="text-black">
                    {partDetail.QuantityAvailable > 0
                      ? partDetail.QuantityAvailable
                      : partDetail.QuantityAvailable === 0
                      ? partDetail.QuantityAvailable
                      : null}
                  </p>
                  <p className="text-green-500">
                    {partDetail.QuantityAvailable > 0
                      ? 'In Stock'
                      : partDetail.QuantityAvailable === 0
                      ? 'Out of stock'
                      : null}
                  </p>
                </>
              ) : distributor === 'Mouser Electronics' ? (
                <>
                  <p className="text-black">
                    {partDetail.Availability.split(' ')[0]}
                  </p>
                  <p className="text-green-500">
                    {partDetail.Availability.split(' ').slice(1).join(' ')}
                  </p>
                </>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between w-full text-xs">
            <div className="flex  w-[100px] font-semibold">
              <p>Price</p>
            </div>
            <div className="flex flex-col w-full text-sm font-semibold">
              <div className="flex justify-between border-b-[1px] border-dashed border-gray-500 text-xs text-gray-500">
                <p>100</p>
                <p>&#8377;1,266.7369</p>
              </div>
              <div className="flex justify-between border-b-[1px] border-dashed border-gray-500 text-xs text-gray-500">
                <p>10</p>
                <p>&#8377;1,477.7369</p>
              </div>
              <div className="flex justify-between border-b-[1px] border-dashed border-gray-500 text-xs text-gray-500">
                <p>1</p>
                <p>&#8377;1,266.7369</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full text-xs">
            <div className="flex  w-[100px] font-semibold">
              <p>Buy</p>
            </div>
            <div className="w-full text-xs">
              <button className="px-6 py-2  bg-gradient-to-b from-green-600 to-green-700 active:bg-gradient-to-b active:from-green-700 active:to-green-800 active:scale-95 text-white font-bold w-full text-sm">
                Buy Now
              </button>
              <p className="mt-2 text-blue-500">EE-1006 Part Details</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-4 w-full border-gray-300 border-[1px]" />
    </div>
  );
};

export default SearchResultBox;
