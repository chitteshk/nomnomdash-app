import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuCardCategory from "./MenuCardCategory";


const MenuCard = () => {
  const { resID } = useParams();
  const [resData, setResData] = useState(null);
  const [cardGroupData, setCardsGroupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuDetails = async () => {
      try {
        const response = await fetch(
          `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=${resID}&catalog_qa=undefined&submitAction=ENTER`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const resInfo = data.data.cards.filter((item) => item.card?.card?.info);
        setResData(resInfo);

        const relevantCards = data.data.cards.find((item) => item.groupedCard)
          ?.groupedCard?.cardGroupMap?.REGULAR?.cards;

        const cardGroups = relevantCards?.filter(
          ({ card }) => card?.card?.title
        );
        setCardsGroupData(cardGroups);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuDetails();
  }, [resID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="menu-wrapper">
      {resData && resData.length > 0 ? (
        <div className="res-card-container">
          {resData.map((item,index) => {
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
          { cardGroupData.map((categories, index) => (
            <MenuCardCategory key={index} categoryData={categories.card.card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
