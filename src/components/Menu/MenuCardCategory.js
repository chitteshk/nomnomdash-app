import { useState, useEffect } from "react";
const ItemCard = ({ card, isSubcategory }) => {
  // Conditionally render the item card if it's not a subcategory
  return card?.info && !isSubcategory ? (
    <>
      <div key={card.info.id} className="menu-item">
        <div className="menu-item-description">
          <h3>{card.info.name}</h3>
          <p>
            <strong>Description:</strong> {card.info.description}
          </p>
          <p>
            <strong>Price:</strong>{" "}
            {`Rs ${card?.info?.price / 100 || card?.info?.defaultPrice / 100}`}
          </p>
        </div>
        <div className="menu-item-img">
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${card?.info?.imageId}`}
            alt="img"
          />
        </div>
      </div>
      <div className="line-break"></div>
    </>
  ) : null;
};

const SubCategory = ({ subCategoryData }) => (
  <div className="sub-category-container">
    {subCategoryData.categories &&
      subCategoryData.categories.map((cat, index) => (
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

      const traverse = (categories, isSubcategory = false) => {
        if (Array.isArray(categories)) {
          categories.forEach((category) => {
            if (category.itemCards && Array.isArray(category.itemCards)) {
              const modifiedItemCards = category.itemCards.map((itemCard) => ({
                ...itemCard,
                isSubcategory,
              }));
              itemCards = itemCards.concat(modifiedItemCards);
            }

            if (category.categories && Array.isArray(category.categories)) {
              traverse(category.categories, true);
            }
          });
        }
      };

      traverse(data);
      return itemCards;
    };

    const categoryArray = Array.isArray(categoryData)
      ? categoryData
      : [categoryData];
    const extractedItemCards = getItemCards(categoryArray);
    setItemData(extractedItemCards);

    const categoriesWithSubCategories = categoryArray.filter(
      (category) =>
        Array.isArray(category.categories) && category.categories.length > 0
    );
    setSubCategories(categoriesWithSubCategories);
  }, [categoryData]);

  return (
    <div className="menu-category-container">
      <h2>{categoryData.title || "Menu Category"}</h2>
      <div className="menu-items-container">
        {itemData.length > 0 ? (
          itemData.map((item) => (
            <ItemCard
              key={item.card.info.id}
              card={item.card}
              isSubcategory={item.isSubcategory}
            />
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
