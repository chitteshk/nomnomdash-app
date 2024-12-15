import { useNavigate } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";

const Body = () => {
  const navigate = useNavigate();
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://instafood.onrender.com/api/restaurants?lat=12.9351929&lng=77.62448069999999"
      );
      const data = await response.json();
      setRestaurantList(
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || []
      );
      setFilteredRestaurants(
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || []
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const showTopRestaurants = () => {
    setShowTop((prevState) => {
      const newState = !prevState;
      if (newState) {
        const topRestaurant = filteredRestaurants.filter(
          (resData) => resData.info.avgRating > 4.5
        );
        setFilteredRestaurants(topRestaurant);
      } else {
        fetchRestaurants();
      }
      return newState;
    });
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const showResMenu = (resData) => {
    navigate(`/restaurants/${resData.info.id}`);
  };

  const showSearchedRestaurants = () => {
    const searchedRestaurants = restaurantList.filter((resData) =>
      resData.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(searchedRestaurants);
  };

  return (
    <div className="body">
      <div className="filters">
        <div className="search-container">
          <input
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            type="text"
          />
          <button onClick={showSearchedRestaurants}>Search</button>
        </div>
        <button onClick={showTopRestaurants}>
          {showTop ? "Show All Restaurants" : "Top Restaurants"}
        </button>
      </div>
      <div className="cards-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredRestaurants.map((resData) => (
            <RestaurantCard
              onClick={() => showResMenu(resData)}
              key={resData.info.id}
              resData={resData}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
