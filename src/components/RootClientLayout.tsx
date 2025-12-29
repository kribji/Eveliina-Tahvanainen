'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export function RootClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <CartDrawer />
      {children}
      <Footer />
    </CartProvider>
  );
}
