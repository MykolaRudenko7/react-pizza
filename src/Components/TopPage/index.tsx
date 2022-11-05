import React from 'react';
import { Outlet } from 'react-router-dom';
//
import { Header } from '../Header';
import styles from './TopPage.module.scss';
//
//
//
//
//
export const TopPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
        {/* тут динаміка */}
        <Outlet />
      </div>
  );
};
