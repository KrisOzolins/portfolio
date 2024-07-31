import React from 'react';

const TestErrorPage = () => {
  if (process.env.NODE_ENV === 'development') {
    throw new Error('Test error page.');
  }

  return (
    <>
      <p>See me?</p>
    </>
  );
};

export default TestErrorPage;
