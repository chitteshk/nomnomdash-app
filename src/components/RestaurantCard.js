import { CDN_URL } from "./utils/constants";

const RestaurantCard = ({ resData, onClick }) => {
  const { info } = resData;

  return (
    <div
      className="restaurant-card bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 cursor-pointer"
      onClick={onClick}
    >
      {/* Restaurant Image */}
      <img
        src={`${CDN_URL}/${info.cloudinaryImageId}`}
        alt={info.name}
        className="w-full h-40 rounded-md object-cover mb-4"
      />

      {/* Restaurant Name */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
        {info.name}
      </h3>

      {/* Cuisines */}
      <h4 className="text-gray-600 text-sm mb-2 truncate">
        {info.cuisines.join(", ")}
      </h4>

      {/* Details (Rating, Delivery Time, Cost for Two) */}
      <div className="flex items-center justify-between text-gray-600 text-sm">
        <span
          className={`font-bold ${
            info.avgRating >= 4 ? "text-green-600" : "text-orange-500"
          }`}
        >
          ⭐ {info.avgRating}
        </span>
        <span>{info.sla.deliveryTime} mins</span>
        <span>{info.costForTwo}</span>
      </div>
    </div>
  );
};

export default RestaurantCard;