import nomnomdashlogo from "../../public/logo/nomnomdashlogo.jpg";
import { Link } from "react-router-dom";
import useOnlineStatus from "./utils/useOnlineStatus";

export default Header = () => {

  const onlineStatus = useOnlineStatus();
  return (
    <div className="header">
      <div className="logo">
        <img src={nomnomdashlogo} alt="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            {onlineStatus ? 'Online' : 'Offline'}
          </li>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About us</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact us</Link>
          </li>
          <li>
            <Link to={"/"}>Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
