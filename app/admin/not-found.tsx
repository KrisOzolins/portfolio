'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NotFound() {
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');

    if (darkMode === 'true' || darkMode === null) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    // <div className="flex flex-col items-center justify-center h-screen">
    //   <h1 className="text-4xl font-bold text-gray-800">404</h1>
    //   <h2 className="text-2xl font-semibold text-gray-600">Page not found</h2>
    //   <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    //     Go back home
    //   </Link>
    // </div>
    // <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div className="flex flex-col justify-center items-center mx-auto max-w-screen-sm text-center min-h-screen -my-6">
      <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-gray-800 dark:text-white">404</h1>
      <p className="mb-4 text-3xl tracking-tight font-bold text-gray-800 dark:text-white md:text-4xl">Something's missing.</p>
      <p className="mb-4 text-lg font-light text-gray-600 dark:text-white">
        Sorry, we can't find that page. You'll find lots to explore on the home page.
      </p>
      <Link
        href="/admin"
        className="inline-flex text-gray-400 dark:text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Back to Homepage
      </Link>
    </div>
    // </div>
  );
}
