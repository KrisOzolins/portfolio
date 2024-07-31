import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { headers, cookies } from 'next/headers';

const { config, library } = require('@fortawesome/fontawesome-svg-core'); // Need to use CJS import here because of a bug - https://github.com/FortAwesome/Font-Awesome/issues/19348.
import '@fortawesome/fontawesome-svg-core/styles.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { AuthProvider } from '@/app/admin/_lib/context/AuthContext';
import client from '@/lib/utils/api/client';
import UsersService from '@/lib/services/Users';
import store from '@/store';
// import { setUser } from '@/store/slices/appSlice';
import StoreProvider from '@/app/admin/_components/StoreProvider';
import Header from '@/app/admin/_components/Header';
import Logout from '@/app/admin/_components/Logout';
import Menu from './_components/Menu';

// Styles
import './globals.scss';

// Config for Font Awesome
config.autoAddCss = false;

// Fonts
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin - krisozolins.com',
  description: "Admin panel for Krisjanis Ozolins' portfolio and blog.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = headers();
  const isLoggedIn = cookies().get('jwt') || false;
  // const state = store.getState();

  // console.log('isLoggedIn:', isLoggedIn);
  // console.log('requestHeaders:', requestHeaders);
  // console.log('state:', state);

  let currentUser = null;

  if (isLoggedIn) {
    const token = isLoggedIn.value;

    UsersService.token = token;

    currentUser = await UsersService.getUser(token);

    // Set token for axios client.
    // client.defaults.headers.common.Authorization = `Bearer ${token}`;

    // Set Redux user state.
    // store.dispatch(setUser(currentUser));
  }

  return (
    <html lang="en">
      <head>{/* <title>Test</title> */}</head>
      <body className={inter.className}>
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-600">
          {/* <AuthProvider> */}
          <StoreProvider currentUser={currentUser}>
            <Menu isLoggedIn={isLoggedIn} currentUser={currentUser} />
            <main className="flex-1 p-6">{children}</main>
          </StoreProvider>
          {/* </AuthProvider> */}
        </div>
        <ToastContainer
          position="bottom-center"
          // autoClose={false}
          // style={{ width: "384px" }}
        />
      </body>
    </html>
  );
}
