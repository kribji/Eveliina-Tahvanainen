import type { ReactNode } from 'react';
import { Gulzar } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const gulzar = Gulzar({
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata = {
  title: 'Eveliina Tahvanainen | Portfolio',
  description: 'Visual designer & creative director',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={gulzar.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
