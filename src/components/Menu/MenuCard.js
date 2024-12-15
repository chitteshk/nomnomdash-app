import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuCardCategory from "./MenuCardCategory";
import { useCardGroupData } from "../utils/useCardGroupData";


const MenuCard = () => {
  const { resID } = useParams();
  const { resInfo, cardGroups, loading, error } = useCardGroupData(resID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="menu-wrapper">
      {resInfo && resInfo.length > 0 ? (
        <div className="res-card-container">
          {resInfo.map((item,index) => {
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
              <div key={index} className="res-info">
                <h2>{name}</h2>
                <div className="res-info-items">
                  <p>
                    <strong>Cuisine:</strong> {cuisines.join(", ")}
                  </p>
                  <p>
                    <strong>Rating:</strong> {avgRating} stars (
                    {totalRatingsString})
                  </p>
                  <p>
                    <strong>Cost for Two:</strong> {costForTwoMessage}
                  </p>
                  <p>
                    <strong>Location:</strong> {locality}, {city}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {availability.opened ? "Open" : "Closed"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No menu details available</p>
      )}

      <div className="menu-container">
        <div className="category-container">
          { cardGroups.map((categories, index) => (
            <MenuCardCategory key={index} categoryData={categories.card.card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
