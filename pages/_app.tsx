import type { AppProps } from 'next/app';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { Montserrat, Roboto, Fira_Code } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from '@/store';
const { library } = require('@fortawesome/fontawesome-svg-core'); // Need to use CJS import here because of a bug - https://github.com/FortAwesome/Font-Awesome/issues/19348.
import { faC, fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { NextIntlClientProvider } from 'next-intl';
// import { getMessages } from 'next-intl/server';
import { AuthProvider } from '../lib/context/AuthContext';
import config from '@/config';

import Layout from '@/components/Layout';
import GDPRConsent from '@/components/common/GDPRConsent';
import ErrorBoundary from '@/components/common/ErrorBoundary';

// Styles
import '@/styles/globals.scss';

// Add Font Awesome icons.
library.add(fas, far, fab);

// Fonts
const montserrat = Montserrat({ subsets: ['latin'], display: 'swap', variable: '--font-montserrat' });
const roboto = Roboto({ subsets: ['latin'], display: 'swap', variable: '--font-roboto', weight: ['400', '500', '700', '900'] });
const firaCode = Fira_Code({ subsets: ['latin'], display: 'swap', variable: '--font-fira-code' });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = usePathname() || '';
  const isRoot = pathname === '/';
  const isBlog = pathname.includes('/blog');
  const isWiki = pathname.includes('/wiki');
  const title = isRoot
    ? 'Portfolio'
    : pathname
        .replace('/', '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

  const [isClient, setIsClient] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState<any>({});
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  const { locale, defaultLocale } = router;

  useEffect(() => {
    setIsClient(true);
    // console.log('process.browser: ', process.browser);
    // console.log('locale: ', locale);

    // initMessages();

    const darkMode = localStorage.getItem('darkMode');
    setDarkMode(darkMode === 'true' || darkMode === null);

    // Set dark mode class on root html element.
    if (darkMode === 'true' || darkMode === null) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const loadMessages = async () => (await import(`../messages/${locale}.json`)).default as any;

  const initMessages = async () => {
    const messages = await loadMessages();

    setMessages(messages);
  };

  const toggleDarkMode = () => {
    localStorage.setItem('darkMode', (!darkMode).toString());
    setDarkMode(!darkMode);

    // Set dark mode class on root html element.
    document.documentElement.classList.toggle('dark');

    // todo: Set dark mode in user settings and init from SSR already.
  };

  return (
    <>
      <Head>
        <title>{`${title} - KrisOzolins.com`}</title>
        <meta name="description" content="Krisjanis Ozolin's portfolio and blog." />
        <meta name="keywords" content="portfolio, web, development, javascript, react, nextjs, nodejs" />
        <meta name="author" content="Krisjanis Ozolins" />
        <meta property="og:title" content="Krisjanis Ozolins Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={config.baseUrl} />
        <meta property="og:image" content={`${config.baseUrl}/resources/images/og-bg.png`} />
        <meta property="og:description" content="Krisjanis Ozolin's portfolio and blog." />
        <meta property="og:site_name" content="Krisjanis Ozolins Portfolio" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <ErrorBoundary>
        <Provider store={store}>
          <Layout
            showHeader={isRoot}
            showFooter={isRoot}
            showHero={isRoot}
            fonts={{ montserrat, roboto, firaCode }}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          >
            <AuthProvider>
              <NextIntlClientProvider
                locale={locale}
                // defaultLocale={defaultLocale as string}
                timeZone="Europe/Riga"
                messages={pageProps.messages}
                // messages={messages as any}
              >
                <Component {...pageProps} />
              </NextIntlClientProvider>
            </AuthProvider>
          </Layout>
        </Provider>
        <GDPRConsent />
        {!config.dev && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_ANALYTICS_ID || ''} />}
      </ErrorBoundary>
    </>
  );
}
