import { useSelector, useDispatch } from "react-redux";
import { ItemCard } from "./Menu/MenuCardCategory";
import { clearCart } from "./utils/redux/cardSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="text-center m-3 p-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      {cartItems.map((card) => (
        <ItemCard key={card.info.id} card={card} isSubcategory={false} />
      ))}
      {cartItems.length === 0 && <h1>Cart is empty. Add something first!</h1>}
      <button
        className="
    bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 mt-3 rounded shadow
    transition duration-150 ease-in-out
    focus:ring-2 focus:ring-red-400
    active:scale-95
    disabled:bg-gray-300
    disabled:cursor-not-allowed
    disabled:text-gray-500
    disabled:focus:ring-0
    disabled:focus:outline-none
  "
        disabled={cartItems.length === 0}
        onClick={handleClearCart}
      >
        Clear cart
      </button>
    </div>
  );
};

export default Cart;
