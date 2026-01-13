import type { ReactNode } from 'react';
import './globals.css';
import { RootClientLayout } from '@/components/RootClientLayout';

export const metadata = {
  title: 'Eveliina Tahvanainen | Portfolio',
  description: 'Visual designer & creative director',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/nws8wix.css" />
      </head>
      <body>
        <RootClientLayout>
          <main>{children}</main>
        </RootClientLayout>
      </body>
    </html>
  );
}
