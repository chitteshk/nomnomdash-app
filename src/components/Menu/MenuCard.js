import { useParams } from "react-router-dom";
import { useCardGroupData } from "../utils/useCardGroupData";
import MenuCardCategory from "./MenuCardCategory";

const MenuCard = () => {
  const { resID } = useParams();
  const { resInfo, cardGroups, loading, error } = useCardGroupData(resID);

  if (loading)
    return (
      <p className="text-center text-gray-500 text-lg mt-8">Loading...</p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 text-lg mt-8">Error: {error}</p>
    );

  return (
    <div className="menu-wrapper bg-gray-50 py-8 px-4 sm:px-8 lg:px-20 h-screen overflow-y-auto">
      {/* Restaurant Info Section */}
      {resInfo && resInfo.length > 0 ? (
        <div className="res-card-container bg-white rounded-lg shadow-md p-6 mb-8">
          {resInfo.map((item, index) => {
            const {
              name,
              cuisines,
              avgRating,
              totalRatingsString,
              costForTwoMessage,
              locality,
              city,
              availability,
            } = item.card.card.info;
            return (
              <div
                key={index}
                className="res-info mb-6 border-b border-gray-200 pb-4 last:border-b-0"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {name}
                </h2>
                <div className="res-info-items space-y-2">
                  <p className="text-gray-600">
                    <strong className="font-semibold">Cuisine:</strong>{" "}
                    {cuisines.join(", ")}
                  </p>
                  <p className="text-gray-600">
                    <strong className="font-semibold">Rating:</strong>{" "}
                    {avgRating} stars ({totalRatingsString})
                  </p>
                  <p className="text-gray-600">
                    <strong className="font-semibold">Cost for Two:</strong>{" "}
                    {costForTwoMessage}
                  </p>
                  <p className="text-gray-600">
                    <strong className="font-semibold">Location:</strong>{" "}
                    {locality}, {city}
                  </p>
                  <p className="text-gray-600">
                    <strong className="font-semibold">Status:</strong>{" "}
                    {availability.opened ? (
                      <span className="text-green-600 font-bold">Open</span>
                    ) : (
                      <span className="text-red-600 font-bold">Closed</span>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No menu details available
        </p>
      )}

      {/* Menu Categories Section */}
      <div className="menu-container">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Menu Categories
        </h3>
        <div className="category-container space-y-6">
          {cardGroups.map((categories, index) => (
            <div
              key={index}
              className="menu-category-card bg-white rounded-lg shadow-md p-6"
            >
              <MenuCardCategory categoryData={categories.card.card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;