import React from 'react';
import { Outlet } from 'react-router-dom';
//
import Header from './Header';
//
//
//
//
//
const TopPage: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          {/* тут динаміка */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TopPage;
