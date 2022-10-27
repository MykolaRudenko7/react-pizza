import React from 'react';
//
//
//
type CategoriesProps = {
  value: number;
  clickOnCategoty: any;
};

const Categories: React.FC<CategoriesProps> = ({ value, clickOnCategoty }) => {
  const categories = ['Всі', "М'ясні", 'Веганські', 'Гриль', 'Гострі', 'Закриті'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={value === index ? 'active' : ''}
            onClick={() => clickOnCategoty(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;