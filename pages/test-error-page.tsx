import React from 'react';

const TestErrorPage = () => {
  throw new Error('Test error page.');

  return (
    <>
      <p>See me?</p>
    </>
  );
};

export default TestErrorPage;
