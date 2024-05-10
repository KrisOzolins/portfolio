import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;

// Usage:
// const isDesktop = useMediaQuery('(min-width: 960px)'); // You can use any @media property.

// HOC implementation (could be moved to a separate file (src/lib/hocs/withMediaQuery.jsx)):
const withMediaQuery = (query) => (Component) => (props) => {
  const matches = useMediaQuery(query);
  return <Component {...props} matches={matches} />;
};

export { withMediaQuery };

// Usage:
// const MyComponent = ({ matches }) => {
//   return matches ? 'Desktop' : 'Mobile'
// };
// export default withMediaQuery('(min-width: 960px)')(MyComponent);

// Now, you can use the `matches` prop to conditionally render your component based on the media query.
// This is a very simple example, but you can use this pattern to create more complex components that
// change their behavior based on the screen size.
