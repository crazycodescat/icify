import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useClickAway } from 'react-use';
import { useRef } from 'react';

import { IoIosMenu, IoIosClose } from 'react-icons/io';
import MobileNaviation from './MobileNaviation';

const Header = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setOpen(false);
  });

  const MobileNavToggle = (e) => {
    console.log(e);
    setOpen((prev) => !prev);
  };
  return (
    <header className="relative">
      <div
        className="flex gap-4 items-center justify-between text-white p-2 bg-blue-800
      "
      >
        <div className="uppercase text-lg">centry parts</div>
        {!open ? (
          <div onClick={() => MobileNavToggle()} className="p-1 cursor-pointer">
            <IoIosMenu className="text-3xl" />
          </div>
        ) : (
          <div onClick={() => MobileNavToggle()} className="p-1 cursor-pointer">
            <IoIosClose className="text-3xl" />
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden">
          <Link className="text-xs font-medium text-white p-4">
            Electronic Parts
          </Link>
          <Link className="text-xs font-medium text-white p-4">
            Manufacturers
          </Link>
          <Link className="text-xs font-medium text-white p-4">Sign In</Link>
        </nav>
      </div>
      {/* Mobile Navigation  */}
      {open && <MobileNaviation forwardRef={ref} />}
    </header>
  );
};

export default Header;
