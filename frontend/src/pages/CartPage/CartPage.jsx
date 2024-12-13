import { Page } from "@components/styledComponents.js";
import { useUser } from "@context/UserContext.jsx";
import { styles } from "@pages/CartPage/styles.js";
import { CartItem } from "@components/cart/CartItem/CartItem.jsx";
import { CartSummary } from "@components/cart/CartSummary/CartSummary.jsx";
import cartEmptyImage from "@assets/empty_cart.png";
import { useEffect, useState } from "react";
import { getItemById } from "@api";



export const CartPage = () => {
    const { token, cartList, handleRemoveCartItem, handleDeleteCart } = useUser();
    const [ cartItems, setCartItems ] = useState([]);

    useEffect(() => {
        setCartItems([]);
    }, [token])

    useEffect(() => {
        handleFetchCartItems();
    },[cartList]);

    const handleFetchCartItems = async () => {
        let errorMessage = "";

        try {
            // Fetch all items in parallel
            const fetchedItems = await Promise.all(
                cartList.map(async (itemId) => {
                    try {
                        const item = await getItemById(token, itemId);

                        // Check if the price has changed
                        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
                        if (existingItem && existingItem.price !== item.price) {
                            errorMessage = "There are some items' prices that have changed.";
                        }

                        return item; // Return the fetched item
                    } catch (error) {
                        errorMessage = "There was a problem with your cart! Please try again.";
                        console.error(`Error fetching item ${ itemId }:`, error.message);
                        return null;
                    }
                })
            );

            // Filter out any failed fetches (null values)
            const validItems = fetchedItems.filter(item => item !== null);

            // Update the cart items
            if (errorMessage !== "") {
                throw new Error(errorMessage);
            }

            setCartItems(validItems);
        } catch (error) {
            alert(error.message);
        }
    }

    const handleRemove = async (item_id) => {
        if (cartList.length === 1) {
            const message = await handleDeleteCart();
            if (message !== "") {
                alert(message);
            }
        } else {
            const message = await handleRemoveCartItem(item_id);
            if (message !== "") {
                alert(message);
            }
        }

    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const shipping = subtotal > 0 ? 10 : 0;

    return (
        <Page>
            <div style={styles.container}>
                {cartItems.length === 0 ? (
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
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} onRemove={handleRemove}/>
                        ))}
                    </div>
                )}
                <CartSummary isEmpty={cartList.length === 0} subtotal={subtotal} shipping={shipping}/>
            </div>
        </Page>
    )
}