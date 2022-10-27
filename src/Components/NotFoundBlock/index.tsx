import React from 'react';
//Styles
import styles from './NotFoundBlock.module.scss';
//
//
//
const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>:(</span>
        <br />
        Нічого не знайдено
      </h1>
      <p className={styles.describe}>На жаль дана сторінка відсутня</p>
    </div>
  );
};

export default NotFoundBlock;
