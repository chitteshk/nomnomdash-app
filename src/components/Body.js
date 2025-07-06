import { useNavigate } from "react-router-dom";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect } from "react";

const Body = () => {
  const navigate = useNavigate();
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const [searchText, setSearchText] = useState("");
  const RestaurantCardWithLabel = withPromotedLabel(RestaurantCard);

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
    <div className="body bg-gray-50 min-h-screen">
      {/* Filters Section */}
      <div className="filters flex flex-col lg:flex-row lg:justify-between items-center bg-white shadow-md p-4 mb-6">
        <div className="search-container flex items-center w-full lg:w-2/3">
          <input
            value={searchText}
            data-testid = "search"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            type="text"
            placeholder="Search for restaurants..."
            className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={showSearchedRestaurants}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
          >
            Search
          </button>
        </div>
        <button
          onClick={showTopRestaurants}
          className="mt-4 lg:mt-0 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
        >
          {showTop ? "Show All Restaurants" : "Top Restaurants"}
        </button>
      </div>

      {/* Cards Container */}
      <div data-testid = "resCard" className="cards-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {loading ? (
          <p className="col-span-full text-center text-lg text-gray-500">
            Loading...
          </p>
        ) : (
          filteredRestaurants.map((resData) =>
            resData.info.promoted ? (
              <RestaurantCardWithLabel resData={resData} key={resData.info.id} onClick={() => showResMenu(resData)}/>
            ) : (
              <RestaurantCard
                key={resData.info.id}
                onClick={() => showResMenu(resData)}
                resData={resData}
                className="cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all"
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default Body;
