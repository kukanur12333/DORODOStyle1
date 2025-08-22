import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../organisms/Header';
import { Footer } from '../molecules/Footer';
import { TopBar } from '../organisms/TopBar';

export const MainLayout: React.FC = () => {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
