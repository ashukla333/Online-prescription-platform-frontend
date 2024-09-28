"use client"
import React from 'react';
import ToasterContainerSnackbar from '../common/Tostify';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { usePathname } from 'next/navigation';

const Layout = ({ children }) => {
  const pathname = usePathname();
  const hiddenPages = ['/admin'];
  const isHiddenLayout = hiddenPages.includes(pathname);

  return (
    <>
      {!isHiddenLayout && <Header />}
      <main>
        <ToasterContainerSnackbar>{children}</ToasterContainerSnackbar>
      </main>
      {!isHiddenLayout && <Footer />}
    </>
  );
};

export default Layout;
