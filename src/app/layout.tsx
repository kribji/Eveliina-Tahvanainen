import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

import { RootClientLayout } from '@/components/RootClientLayout';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Eveliina Tahvanainen | Portfolio',
  description: 'Visual designer & creative director',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootClientLayout>
          <main>{children}</main>
        </RootClientLayout>
      </body>
    </html>
  );
}
