import { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { setNotification, setError } from '@/store/slices/appSlice';
import Header from './portfolio/Header';
import Footer from './Footer';
import Hero from './portfolio/Hero';
import Notification from './common/Notification';
import { withWidth } from '@/lib/hooks/useWidth';
import useBreakpoint from '@/lib/hooks/useBreakpoint';
import tailwindConfig from '@/tailwind.config';
import useClient from '@/lib/hooks/useClient';

import styles from '@/styles/components/Layout.module.css';

const Layout = ({
  children,
  showHeader = true,
  showFooter = true,
  showHero = true,
  width = 0,
  fonts = {},
  toggleDarkMode,
  darkMode = true,
}: {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showHero?: boolean;
  width?: number;
  fonts?: any;
  toggleDarkMode: () => void;
  darkMode?: boolean;
}) => {
  const isClient = useClient();

  const breakpoint = useBreakpoint();
  const isMdOrBelow = ['xs', 'sm', 'md'].includes(breakpoint); // < 1024px
  const isMobile = isClient && width < 768;
  const leftSpacing = isClient && width >= 1280 ? 48 : isClient && width >= 1024 ? 32 : 0;

  const notification = useSelector((state: any) => state.app.notification);
  const error = useSelector((state: any) => state.app.error);
  const dispatch = useDispatch();

  const [headerVisible, setHeaderVisible] = useState(!isMdOrBelow);

  useEffect(() => {
    setHeaderVisible(!isMdOrBelow);
  }, [isMdOrBelow]);

  const toggleHeaderVisibility = () => {
    setHeaderVisible(!headerVisible);
  };

  return (
    <div
      className={`app portfolio flex text-light-white dark:text-white font-body ${fonts.montserrat.variable} ${fonts.roboto.variable} ${fonts.firaCode.variable}`}
    >
      {showHeader && <Header isMdOrBelow={isMdOrBelow} headerVisible={headerVisible} toggleHeaderVisibility={toggleHeaderVisibility} />}
      <div className={`flex-1${showHeader ? ` ml-${leftSpacing}` : ''}`}>
        {showHero && (
          <Hero
            width={width}
            leftSpacing={leftSpacing}
            headerVisible={headerVisible}
            toggleHeaderVisibility={toggleHeaderVisibility}
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
          />
        )}
        <main className="bg-light-background dark:bg-background">{children}</main>
        {showFooter && <Footer />}
        {notification && <Notification type="info" message={notification} onClose={() => dispatch(setNotification(''))} />}
        {error && <Notification type="error" message={error} onClose={() => dispatch(setError(''))} />}
      </div>
    </div>
  );
};

export default withWidth(Layout);
