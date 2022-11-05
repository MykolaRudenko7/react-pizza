import React from 'react';
//
import styles from './Categories.module.scss';
//
//
//
//
//
type CategoriesProps = {
  value: number;
  clickOnCategoty: (index: number) => void; //  void - пуста
};

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, clickOnCategoty }) => {
  const categories = ['Всі', "М'ясні", 'Веганські', 'Гриль', 'Гострі', 'Закриті'];

  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={(value === index) ? styles.active : ''}
            onClick={() => clickOnCategoty(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});
