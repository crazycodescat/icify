/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

const MobileNaviation = ({ forwardRef }) => {
  return (
    <div
      ref={forwardRef}
      className="w-full absolute bg-blue-500 text-white text-sm font-semibold "
    >
      <ul className="flex flex-col justify-cente divide-y-[1px] divide-solid divide-white">
        <Link className="flex justify-between items-center px-4 py-4 active:bg-blue-900">
          <li className=" ">Electronic Parts</li>
          <IoIosArrowForward className="text-xl" />
        </Link>
        <Link className="flex justify-between items-center px-4 py-4 active:bg-blue-900">
          <li className=" ">Manufacturers</li>
          <IoIosArrowForward className="text-xl" />
        </Link>
        <Link className="flex justify-between items-center px-4 py-4 active:bg-blue-900">
          <li className=" ">Sign In</li>
          <IoIosArrowForward className="text-xl" />
        </Link>
      </ul>
    </div>
  );
};

export default MobileNaviation;
