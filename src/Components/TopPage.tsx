import React from 'react';
import { Outlet } from 'react-router-dom';
//
import { Header } from './Header';
//
//
//
//
//
export const TopPage: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        {/* тут динаміка */}
        <Outlet />
      </div>
    </div>
  );
};
