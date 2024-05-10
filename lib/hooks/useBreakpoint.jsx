import { useState, useEffect, useMemo } from 'react';
import tailwindConfig from '../../tailwind.config';

const { screens } = tailwindConfig.theme;

function useBreakpoint() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };

    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const activeBreakpoint = useMemo(() => {
    const breakpointKeys = Object.keys(screens);
    let match = 'xs';

    breakpointKeys.forEach((key) => {
      const minWidth = parseInt(screens[key], 10);

      if (width >= minWidth) {
        match = key;
      }
    });

    return match;
  }, [width]);

  return activeBreakpoint;
}

export default useBreakpoint;
