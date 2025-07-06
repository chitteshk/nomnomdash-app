import React from "react";
import ReactDOM from "react-dom/client";
import nomnomdashlogo from "./public/logo/nomnomdashlogo.jpg";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={nomnomdashlogo} alt="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About us</li>
          <li>Contact</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};


const RestaurantCard = ({ resData }) => {
  const { info } = resData;
  return (
    <div className="restaurant-card">
      <img
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${info.cloudinaryImageId}`}
      />
      <h3>{info.name}</h3>
      <h4>{info.cuisines.join(", ")}</h4>
      <h4>{info.avgRating}</h4>
      <h4>{info.deliveryTime}</h4>
      <h4>{info.costForTwo}</h4>
    </div>
  );
};

const Body = () => {
  return (
    <div className="body">
      <p>Search</p>
      <div className="cards-container">
        {restaurantListData.map(resData => <RestaurantCard key ={resData.info.id} resData={resData} />)}
      </div>
    </div>
  );
};


const Applayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Applayout />);
