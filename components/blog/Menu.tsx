import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import OAuthLogin from '@components/blog/OAuthLogin';

const Menu = ({ user, setShowSearch, breadcrumbs = [] }: { user: any; setShowSearch: any; breadcrumbs?: any[] }) => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');
    setDarkMode(darkMode === 'true' || darkMode === null);

    // Set dark mode class on root html element.
    if (darkMode === 'true' || darkMode === null) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setSearchTerm(document.location.search.split('s=')[1] || '');
  }, []);

  const toggleDarkMode = () => {
    localStorage.setItem('darkMode', (!darkMode).toString());
    setDarkMode(!darkMode);

    // Set dark mode class on root html element.
    document.documentElement.classList.toggle('dark');

    // todo: Set dark mode in user settings and init from SSR already.
  };

  const handleButtonClick = (e: any) => {
    e.stopPropagation();
    setShowSearch(true);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center">
          <Link href="/">
            <Icon name="arrow-left" /> krisozolins.com
          </Link>
          {breadcrumbs.map((breadcrumb: any, idx: number) => (
            <React.Fragment key={idx}>
              <Icon name="chevron-right" size="xs" className="mx-1" />
              <Link href={breadcrumb.url}>{breadcrumb.name}</Link>
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center space-x-3">
          <a href="/blog/archive">Archive</a>
          <a href="/blog/tags">Tags</a>
          <button onClick={(e) => handleButtonClick(e)} className="flex items-center">
            <Icon name="search" className="regular-icon me-1" />
            {searchTerm && <span className="text-xs me-1">{searchTerm}</span>}
            <span className="border border-light-white dark:border-white rounded-md px-1 py-0.5 text-light-white dark:text-white text-xs">⌘+K</span>
          </button>
          <button onClick={() => toggleDarkMode()}>
            {darkMode ? <Icon name="sun" className="regular-icon" /> : <Icon name="moon" className="regular-icon" />}
          </button>
        </div>
        {/* <div className="google oauth profile info">
          {user && (
            <div className="flex items-center">
              <img src={user.photos[0].value} alt={user.displayName} className="w-8 h-8 rounded-full" />
              <span className="mx-2">{user.displayName}</span>
              <LogoutButton />
            </div>
          )}
          {!user && <LoginButton />}
        </div> */}
        <OAuthLogin user={user} />
      </div>
    </>
  );
};

export default Menu;
