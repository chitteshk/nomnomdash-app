import { useState, useEffect } from "react";

const ItemCard = ({ card, isSubcategory }) => {
  // Conditionally render the item card if it's not a subcategory
  return card?.info && !isSubcategory ? (
    <>
      <div
        key={card.info.id}
        className="menu-item flex justify-between items-start bg-white shadow-md rounded-lg p-4 mb-4 transition-transform hover:scale-105"
      >
        <div className="menu-item-description flex-1 pr-4">
          <h3 className="text-lg font-semibold text-gray-800">{card.info.name}</h3>
          <p className="text-sm text-gray-600 mt-2">
            <strong className="font-medium">Description:</strong> {card.info.description}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong className="font-medium">Price:</strong>{" "}
            {`Rs ${card?.info?.price / 100 || card?.info?.defaultPrice / 100}`}
          </p>
        </div>
        {/* Menu Item Image */}
        <div className="menu-item-img flex-shrink-0">
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${card?.info?.imageId}`}
            alt={card.info.name}
            className="w-24 h-24 object-cover rounded-md"
          />
        </div>
      </div>
    </>
  ) : null;
};

const SubCategory = ({ subCategoryData }) => (
  <div className="sub-category-container space-y-6 mt-6">
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
    <div className="menu-category-container bg-gray-50 p-6 rounded-lg shadow-md mb-8">
      {/* Category Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {categoryData.title || "Menu Category"}
      </h2>
      
      {/* Items in the Category */}
      <div className="menu-items-container space-y-4">
        {itemData.length > 0 ? (
          itemData.map((item) => (
            <ItemCard
              key={item.card.info.id}
              card={item.card}
              isSubcategory={item.isSubcategory}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No items available</p>
        )}
      </div>
      
      {/* Subcategories Section */}
      {subCategories.length > 0 && (
        <div className="sub-categories-container mt-6">
          {subCategories.map((subCategory, index) => (
            <SubCategory key={index} subCategoryData={subCategory} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuCardCategory;