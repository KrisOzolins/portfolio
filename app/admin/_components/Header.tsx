'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { setShowMenu } from '@/store/slices/appSlice';

// import Icon from '@/components/common/Icon';
import Icon from '@/app/admin/_components/Icon';
import NextBreadcrumb from './NextBreadcrumb';

const Header = ({ title, actions = null }: { title: string; actions?: React.ReactNode }) => {
  // const darkMode = false;
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  // Redux state.
  const dispatch = useDispatch();
  const showMenu = useSelector((state: any) => state.app.showMenu);

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');
    setDarkMode(darkMode === 'true' || darkMode === null);

    // Set dark mode class on root html element.
    if (darkMode === 'true' || darkMode === null) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    localStorage.setItem('darkMode', (!darkMode).toString());
    setDarkMode(!darkMode);

    // Set dark mode class on root html element.
    document.documentElement.classList.toggle('dark');

    // todo: Set dark mode in user settings and init from SSR already.
  };

  const handleMenuToggle = () => {
    dispatch(setShowMenu(!showMenu));
  };

  return (
    <>
      {/* <header className="flex items-center justify-between pb-4 border-b">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add New</button>
      </header> */}
      <header className="bg-white dark:bg-gray-800 shadow px-4 -mx-6 -mt-6 mb-6">
        <div className="container mx-auto flex justify-between items-center h-16">
          <button className="text-gray-800 dark:text-white block md:hidden" onClick={handleMenuToggle}>
            MENU
          </button>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{title}</h1>
          {/* {actions && <div className="flex justify-end items-center space-x-4"> */}
          <div className="flex justify-end items-center space-x-4">
            {/* <div className="mr-4 text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-white"> */}
            <div className="mr-1 text-gray-500 dark:text-white hover:text-gray-600 dark:hover:text-gray-400">
              <button className="flex items-center" onClick={() => toggleDarkMode()}>
                {darkMode ? <Icon name="faSun" className="w-4 h-4" /> : <Icon name="faMoon" className="w-4 h-4" />}
              </button>
            </div>
            {actions}
            {/* <span className="text-gray-600">Admin</span>
            <button className="text-gray-600 flex items-center">
              Sort
              <Icon name="chevron-up" className="w-4 h-4 ms-2" />
            </button>
            <Link href="/admin/posts/new" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add New
            </Link> */}
          </div>
        </div>
      </header>
      <div className="container mx-auto">
        <NextBreadcrumb
          homeElement={'Admin'}
          // separator={<span>{' > '}</span>}
          separator={<Icon name="faArrowRight" className="text-sm"></Icon>}
          activeClasses="text-amber-500 font-bold"
          containerClasses="flex items-center flex-wrap gap-1 text-gray-500 dark:text-gray-300"
          listClasses="hover:underline mx-1"
          startElement={1}
          capitalizeLinks
        />
      </div>
    </>
  );
};

export default Header;
