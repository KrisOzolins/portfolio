import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin - krisozolins.com',
  description: "Admin panel for Krisjanis Ozolins' portfolio and blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={inter.className}>{children}</body> */}
      <body className={inter.className}>
        <div className="flex min-h-screen bg-gray-100">
          <aside className="w-64 bg-gray-800 text-gray-200">
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
                <li>
                  <Link href="/admin/users" className="block py-2.5 px-4 hover:bg-gray-700">
                    Users
                  </Link>
                </li>
                <li>
                  <Link href="/admin/settings" className="block py-2.5 px-4 hover:bg-gray-700">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link href="/admin/reports" className="block py-2.5 px-4 hover:bg-gray-700">
                    Reports
                  </Link>
                </li>
                <li>
                  <hr className="my-4 border-t border-gray-700" />
                </li>
                <li>
                  <Link href="/admin/profile" className="block py-2.5 px-4 hover:bg-gray-700">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/logout" className="block py-2.5 px-4 hover:bg-gray-700">
                    Logout
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

          <main className="flex-1 p-6">
            <header className="bg-white shadow px-4 -mx-6 -mt-6 mb-6">
              <div className="container mx-auto flex justify-between items-center h-16">
                <h1 className="text-2xl font-semibold text-gray-800">Overview</h1>
                <div className="flex items-center space-x-4">
                  {/* <span className="text-gray-600">Admin</span> */}
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add New</button>
                </div>
              </div>
            </header>

            {/* <header className="flex items-center justify-between pb-4 border-b">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add New</button>
            </header> */}

            <section className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <article className="p-4 bg-white rounded shadow">
                  <h2 className="text-xl font-semibold">Card Title</h2>
                  <p className="mt-2 text-gray-600">Card content goes here...</p>
                </article>
                <article className="p-4 bg-white rounded shadow">
                  <h2 className="text-xl font-semibold">Card Title</h2>
                  <p className="mt-2 text-gray-600">Card content goes here...</p>
                </article>
                <article className="p-4 bg-white rounded shadow">
                  <h2 className="text-xl font-semibold">Card Title</h2>
                  <p className="mt-2 text-gray-600">Card content goes here...</p>
                </article>
              </div>
            </section>
          </main>
        </div>
      </body>
    </html>
  );
}
