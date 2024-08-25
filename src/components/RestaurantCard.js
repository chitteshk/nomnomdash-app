import { CDN_URL } from "./utils/constants";

export default RestaurantCard = ({ resData, onClick }) => {
    const { info } = resData;
    return (
      <div className="restaurant-card" onClick={onClick}>
        <img
          src={`${CDN_URL}/${info.cloudinaryImageId}`}
        />
        <h3>{info.name}</h3>
        <h4>{info.cuisines.join(", ")}</h4>
        <h4>{info.avgRating}</h4>
        <h4>{info.deliveryTime}</h4>
        <h4>{info.costForTwo}</h4>
      </div>
    );
  };