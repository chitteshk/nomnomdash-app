import { Link } from "react-router-dom";
import useOnlineStatus from "./utils/useOnlineStatus";
import { useSelector } from "react-redux";


const Header = () => {

  const cartItems = useSelector((store) => store.cart.items);
  const onlineStatus = useOnlineStatus();

  return (
    <div className="header flex justify-between items-center bg-white shadow-md p-8">
      {/* Logo Section */}
      <div className="logo flex items-center">
        <img
          src=""
          alt="NomNomDash Logo"
          className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
        />
        <span className="ml-3 text-lg font-semibold text-gray-800">
          NomNomDash
        </span>
      </div>

      {/* Navigation Links */}
      <div className="nav-items">
        <ul className="flex space-x-6 text-gray-700 text-sm md:text-base font-medium">
          <li className={onlineStatus ? "text-green-600" : "text-gray-500"}>{onlineStatus ? "Online" : "Offline"}</li>
          <li>
            <Link
              to="/"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Cart ({cartItems.length} items)
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;