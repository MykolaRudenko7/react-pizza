import React from 'react';
//Styles
import styles from './NotFoundBlock.module.scss';
//
//
//
//
//
export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <h1>
        <span>:(</span>
        <br />
        Нічого не знайдено
      </h1>
      <p className={styles.notFound__describe}>На жаль дана сторінка відсутня</p>
    </div>
  );
};