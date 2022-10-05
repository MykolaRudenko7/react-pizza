import React from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ['Все', "М'ясні", 'Веганські', 'Гриль', 'Пекучі', 'Закриті'];

  const onClickCategory = (i) => {
    setActiveIndex(i);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            className={activeIndex === index ? 'active' : ''}
            onClick={() => onClickCategory(index)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
