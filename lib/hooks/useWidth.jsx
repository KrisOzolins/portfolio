import { useState, useEffect } from 'react';

// Hook implementation.
const useWidth = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setWidth(window.innerWidth);

    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

// HOC implementation.
export const withWidth = (Component) => (props) => {
  const width = useWidth();
  return <Component {...props} width={width} />;
};

export default useWidth;
