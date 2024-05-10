import { useState, useEffect } from 'react';

// Hook implementation.
const useWidth = (query) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
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
