import { Page } from "@components/styledComponents.js";
import { useUser } from "@context/UserContext.jsx";
import { styles } from "@pages/CartPage/styles.js";
import { CartItem } from "@components/cart/CartItem/CartItem.jsx";
import { CartSummary } from "@components/cart/CartSummary/CartSummary.jsx";
import cartEmptyImage from "@assets/empty_cart.png";

export const CartPage = () => {
    const { cartList, setCartList } = useUser();

    const handleRemove = (id) => {
        setCartList(cartList.filter((item) => item.id !== id));
    };

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return; // Prevent invalid quantity
        setCartList(
            cartList.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const subtotal = cartList.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 20 : 0;

    return (
        <Page>
            <div style={styles.container}>
                {cartList.length === 0 ? (
                    <div style={styles.emptyCart}>
                        <h3 style={styles.emptyText}>Your cart is currently empty!</h3>
                        <img
                            src={cartEmptyImage}
                            alt="Empty Cart"
                            style={styles.emptyImage}
                        />
                    </div>
                ) : (
                    <div style={styles.items}>
                        <h2 style={styles.title}>My cart</h2>
                        {cartList.map((item) => (
                            <CartItem key={item.id} item={item} onQuantityChange={handleQuantityChange} onRemove={handleRemove}/>
                        ))}
                    </div>
                )}
                <CartSummary isEmpty={cartList.length === 0} subtotal={subtotal} shipping={shipping}/>
            </div>
        </Page>
    )
}