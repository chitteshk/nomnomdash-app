import { useParams } from "react-router-dom";
import { useEffect } from "react";

const MenuCard = () => {
  const { resID } = useParams();

  useEffect(() => {

    const fetchMenuDetails = async() => {
        const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=${resID}&catalog_qa=undefined&submitAction=ENTER`);
        const data = await response.json();
        console.log(data);
    }
    fetchMenuDetails();

  }, []);
  return (
    <div>
      <h1>Menu card container :{resID}</h1>
    </div>
  );
};

export default MenuCard;
