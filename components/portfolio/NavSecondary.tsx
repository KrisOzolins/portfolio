import { forwardRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { SunIcon, MoonIcon } from '@/components/common/Icons';
import Tooltip from '@/components/common/Tooltip';

const NavSecondary = forwardRef(
  (
    {
      leftSpacing = 0,
      scrollY = 0,
      headerVisible = true,
      toggleHeaderVisibility,
    }: { leftSpacing?: number; scrollY?: number; headerVisible?: boolean; toggleHeaderVisibility: () => void },
    ref,
  ) => {
    const activeClass = (path: string) => {
      return (path !== '/' && window.location.pathname.includes(path)) || (path === '/' && window.location.pathname.length === 1) ? 'active' : '';
    };

    return (
      <nav
        className={`header-nav top-0 left-${leftSpacing} right-0 z-20 flex justify-start items-center p-3 space-x-5 text-xs transition-colors duration-300 absolute`}
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
        </ul>
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
