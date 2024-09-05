import './globals.css';
import type { Metadata } from 'next';
import { Jersey_10 } from 'next/font/google';
import Navbar from '../components/navbar/Navbar';

const jersey = Jersey_10({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jersey',
});

export const metadata: Metadata = {
  title: 'PokeDock',
  description: 'All-in-one pokemon library.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jersey.variable}`}>{children}</body>
    </html>
  );
}
