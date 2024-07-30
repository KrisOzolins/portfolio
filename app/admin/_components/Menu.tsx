'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { setShowMenu } from '@/store/slices/appSlice';
import useWidth from '@/lib/hooks/useWidth';
import Logout from '@/app/admin/_components/Logout';

const Menu = ({ isLoggedIn, currentUser }: { isLoggedIn: any; currentUser: any }) => {
  const width = useWidth();
  const showMenu = useSelector((state: any) => state.app.showMenu);
  const dispatch = useDispatch();

  useEffect(() => {
    const closeNav = (e: MouseEvent) => {
      if (showMenu && width < 768 && !(e.target as HTMLElement).closest('aside')) {
        dispatch(setShowMenu(!showMenu));
      }
    };

    if (showMenu && width >= 768) {
      dispatch(setShowMenu(false));
    }

    document.addEventListener('click', closeNav);

    return () => {
      document.removeEventListener('click', closeNav);
    };
  }, [showMenu, width]);

  return (
    <>
      {isLoggedIn && currentUser?.banned === false && (
        <aside
          className={`w-64 bg-gray-800 text-gray-200 z-10 transition-transform duration-300 ease-in ${showMenu && width < 768 ? 'translate-x-0 fixed' : '-translate-x-64 md:ease-out md:translate-x-0 fixed md:relative'} h-screen`}
          style={{ boxShadow: '0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22) !important' }}
        >
          <div className="flex justify-start items-center h-16 p-4 text-xl font-bold border-b border-gray-700">Admin Dashboard</div>
          <nav className="mt-4">
            <ul>
              <li>
                <Link href="/admin" className="block py-2.5 px-4 hover:bg-gray-700">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/admin/posts" className="block py-2.5 px-4 hover:bg-gray-700">
                  Posts
                </Link>
              </li>
              {currentUser?.role === 'admin' && (
                <li>
                  <Link href="/admin/users" className="block py-2.5 px-4 hover:bg-gray-700">
                    Users
                  </Link>
                </li>
              )}
              {/* <li>
                  <Link href="/admin/settings" className="block py-2.5 px-4 hover:bg-gray-700">
                    Settings
                  </Link>
                </li> */}
              {/* <li>
                  <Link href="/admin/reports" className="block py-2.5 px-4 hover:bg-gray-700">
                    Reports
                  </Link>
                </li> */}
              <li>
                <hr className="my-4 border-t border-gray-700" />
              </li>
              {/* <li>
                    <Link href="/admin/profile" className="block py-2.5 px-4 hover:bg-gray-700">
                      Profile
                    </Link>
                  </li> */}
              <li>
                <Logout />
              </li>
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
};

export default Menu;
