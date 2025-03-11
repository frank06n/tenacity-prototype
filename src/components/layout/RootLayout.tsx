// src/components/layout/RootLayout.tsx
import { PropsWithChildren } from 'react';
import Header from './Header';
import Footer from './Footer';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;