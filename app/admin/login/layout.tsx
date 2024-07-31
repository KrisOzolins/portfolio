import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

// Fonts
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin - krisozolins.com',
  description: "Admin panel for Krisjanis Ozolins' portfolio and blog.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="flex flex-col justify-center items-center min-h-screen w-full">{children}</section>;
}
