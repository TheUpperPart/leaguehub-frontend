'use client';

import StartMsw from '@/src/app/msw';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <title>League Hub</title>
      <body className={inter.className}>
        <StartMsw>{children}</StartMsw>
      </body>
    </html>
  );
}
