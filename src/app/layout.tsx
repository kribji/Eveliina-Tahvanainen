import type { ReactNode } from 'react';
import { Roboto_Condensed } from 'next/font/google';
import './globals.css';

import { RootClientLayout } from '@/components/RootClientLayout';

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export const metadata = {
  title: 'Eveliina Tahvanainen | Portfolio',
  description: 'Visual designer & creative director',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={robotoCondensed.className}>
        {/* Wrap everything in the client-side cart provider, header, drawer, footer */}
        <RootClientLayout>
          <main>{children}</main>
        </RootClientLayout>
      </body>
    </html>
  );
}
