import { useState, useEffect } from "react";

const ItemCard = ({ card }) => (
  card?.info ?  (
    <div key={card.info.id} className="menu-item">
      <h3>{card.info.name}</h3>
      <p><strong>Description:</strong> {card.info.description}</p>
      <p><strong>Price:</strong> {card.info.price}</p>
    </div>
  ) : null
);

const SubCategory = ({ subCategoryData }) => (
  <div className="sub-category-container">
    <h3>{subCategoryData.title || "Subcategory"}</h3>
    {subCategoryData.categories && subCategoryData.categories.map((cat, index) => (
      <MenuCardCategory key={index} categoryData={cat} />
    ))}
  </div>
);

const MenuCardCategory = ({ categoryData }) => {
  const [itemData, setItemData] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const getItemCards = (data) => {
      let itemCards = [];

      const traverse = (categories) => {
        if (Array.isArray(categories)) {
          categories.forEach((category) => {
            if (category.itemCards && Array.isArray(category.itemCards)) {
              itemCards = itemCards.concat(category.itemCards);
            }

            if (category.categories && Array.isArray(category.categories)) {
              traverse(category.categories);
            }
          });
        }
      };

      traverse(data);
      return itemCards;
    };

    const categoryArray = Array.isArray(categoryData) ? categoryData : [categoryData];
    const extractedItemCards = getItemCards(categoryArray);
    setItemData(extractedItemCards);

    const categoriesWithSubCategories = categoryArray.filter(
      (category) => Array.isArray(category.categories) && category.categories.length > 0
    );
    setSubCategories(categoriesWithSubCategories);
  }, [categoryData]);

  return (
    <div className="menu-category-container">
      <h2>{categoryData.title || "Menu Category"}</h2>
      <div className="menu-items-container">
        {itemData.length > 0 ? (
          itemData.map((item) => (
            <ItemCard key={item.card.info.id} card={item.card} />
          ))
        ) : (
          <p>No items available</p>
        )}
      </div>
      {subCategories.length > 0 && (
        <div className="sub-categories-container">
          {subCategories.map((subCategory, index) => (
            <SubCategory key={index} subCategoryData={subCategory} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuCardCategory;
