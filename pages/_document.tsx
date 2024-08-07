import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    // <Html lang="en" className="dark">
    <Html className="dark">
      <Head />
      <body className="font-body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
