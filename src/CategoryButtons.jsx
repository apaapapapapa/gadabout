import React from 'react';

function CategoryButtons({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="buttons">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={selectedCategory === cat ? "active" : ""}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryButtons;
