import { forwardRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NextRequest } from 'next/server';
// import { useCookies } from 'react-cookie';
import Icon from '@/components/common/Icon';
import { SunIcon, MoonIcon } from '@/components/common/Icons';
import Tooltip from '@/components/common/Tooltip';
import useClient from '@/lib/hooks/useClient';

const NavSecondary = forwardRef(
  (
    {
      leftSpacing = 0,
      scrollY = 0,
      headerVisible = true,
      toggleHeaderVisibility,
      toggleDarkMode,
      darkMode = true,
    }: {
      leftSpacing?: number;
      scrollY?: number;
      headerVisible?: boolean;
      toggleHeaderVisibility: () => void;
      toggleDarkMode: () => void;
      darkMode?: boolean;
    },
    ref,
  ) => {
    // const [cookies, setCookie] = useCookies(['token']);

    const win = typeof window !== 'undefined' ? window : null;
    const isClient = useClient();

    const activeClass = (path: string) => {
      // return (path !== '/' && win?.location.pathname.includes(path)) || (path === '/' && win?.location.pathname.length === 1) ? 'active' : '';
      return usePathname() === path ? 'active' : '';
    };

    return (
      <nav
        className={`header-nav top-0 left-${leftSpacing} right-0 z-20 flex justify-between items-center p-3 space-x-5 text-xs transition-colors duration-300 absolute text-white`}
        aria-label="Secondary navigation"
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <ul className="flex gap-5">
          <li>
            <Link href="/" className={activeClass('/')}>
              <Icon name="home" /> Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className={activeClass('/blog')}>
              <Icon name="blog" /> Blog
            </Link>
          </li>
          <li>
            <Link href="/wiki" className={activeClass('/wiki')}>
              <Icon name="book-open" /> Wiki
            </Link>
          </li>
          {/* {cookies.jwt && (
            <li>
              <Link href="/wiki" className={activeClass('/admin/')}>
                <Icon name="cog" /> Admin
              </Link>
            </li>
          )} */}
        </ul>
        <button onClick={() => toggleDarkMode()}>
          {darkMode ? <Icon name="sun" className="regular-icon" /> : <Icon name="moon" className="regular-icon" />}
        </button>
        {!headerVisible && (
          <button className="side-nav-toggle-btn absolute right-3 block lg:hidden" title="Toggle side menu" onClick={toggleHeaderVisibility}>
            <Icon name="bars" />
          </button>
        )}
      </nav>
    );
  },
);

export default NavSecondary;
