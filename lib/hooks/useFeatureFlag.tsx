import { useState, useEffect } from 'react';
import client from '../utils/api/client';

const getABVariant = (enabled: boolean) => {
  return enabled ? (Math.random() < 0.5 ? 'A' : 'B') : false;
};

const useFeatureFlag = (flag: string): boolean | string => {
  const [flagEnabled, setFlagEnabled] = useState(false);

  useEffect(() => {
    const fetchFlag = async () => {
      // const response = await fetch(`/api/feature-flags/${flag}`);
      // const data = await response.json();
      const response = await client.get(`/feature-flags/${flag}`);
      const data = response.data;

      setFlagEnabled(data.type === 'flag' ? data.enabled : getABVariant(data.enabled));
    };

    fetchFlag();
  }, [flag]);

  return flagEnabled;
};

export default useFeatureFlag;

// Usage:
// import useFeatureFlag from '@/lib/hooks/useFeatureFlag';
// const MyComponent = () => {
//   const abVariant = useFeatureFlag('my-ab-test');
//   if (abVariant === 'A') {
//     return <div>Variant A!</div>;
//   } else if (abVariant === 'B') {
//     return <div>Variant B!</div>;
//   }
//   const flagEnabled = useFeatureFlag('my-flag');
//   if (flagEnabled) {
//     return <div>Flag is enabled!</div>;
//   }
//   return <div>Flag is disabled!</div>;
// };
