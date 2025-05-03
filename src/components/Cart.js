import { useSelector } from "react-redux";
import { ItemCard } from "./Menu/MenuCardCategory";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);

    return (
        <div className="text-center m-3 p-4">
            <h1 className="text-2xl font-bold">Cart</h1>
            {cartItems.map((card) => (
                <ItemCard key={card.info.id} card={card} isSubcategory={false} />
            ))}
        </div>
    );
};

export default Cart;