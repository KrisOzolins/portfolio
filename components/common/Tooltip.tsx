import React, { useEffect, useRef } from 'react';

const Tooltip = (props: { children: JSX.Element; text: string }) => {
  const { children, text } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {}, []);

  return <div ref={ref}>{children}</div>;
};

export default Tooltip;

// Usage:
// <Tooltip text="This is a tooltip">
//   <button>Hover me</button>
// </Tooltip>;
