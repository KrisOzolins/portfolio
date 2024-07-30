function Error({ statusCode }: { statusCode: number }) {
  return (
    <div role="alert" className="flex justify-center items-center text-center h-screen">
      <h1>Oops!</h1>
      <p>Sorry, {statusCode ? `an unexpected error ${statusCode} has occurred on server` : 'an unexpected error occurred on client'}</p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
