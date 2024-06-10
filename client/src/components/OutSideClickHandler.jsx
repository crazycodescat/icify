/**import { useEffect, useRef } from 'react';

const OutsideClickHandler = ({ handleClickOutSideHandler, children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        console.log(containerRef.current.contains(event.target));
        handleClickOutsideHandler();
      }
    };

    // Add event listener when component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return <div ref={containerRef}>{children}</div>;
};

export default OutsideClickHandler;
**/