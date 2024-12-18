import { Page } from "@components/styledComponents.js";
import { useUser } from "@context/UserContext.jsx";
import { styles } from "@pages/CartPage/styles.js";
import { CartItem } from "@components/cart/CartItem/CartItem.jsx";
import { CartSummary } from "@components/cart/CartSummary/CartSummary.jsx";
import cartEmptyImage from "@assets/empty_cart.png";
import { useEffect, useState } from "react";
import { getItemById, postPurchase } from "@api";


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
        try {
            // Fetch all items in parallel
            const fetchedItems = await Promise.all(
                cartList.map(async (itemId) => {
                    try {
                        return await getItemById(token, itemId);
                    } catch (error) {
                        console.error(`Error fetching item ${ itemId }:`, error.message);
                        return null;
                    }
                })
            );

            // Filter out any failed fetches (null values)
            const validItems = fetchedItems.filter(item => item !== null);

            setCartItems(validItems);
        } catch (error) {
            alert(error.message);
        }
    }

    const handlePurchaseCartItems = async () => {
        try {
            const orderItems = cartItems.map(({ id, price }) => ({ id, price }));

            await postPurchase(token, orderItems);
            await handleDeleteCart();

            alert("Purchased successfully!");
        } catch (error) {
            console.error(error.message);

            const parsedError = JSON.parse(error.message);
            const errorType = parsedError.error_type;

            if (errorType === 'already-sold') {
                await handleFetchCartItems();
                alert(parsedError.error);
            } else if (errorType === 'changed-price') {
                console.log(parsedError.changed_items);
                console.log(cartItems);
                const changedItemsMessage = parsedError.changed_items.reduce((message, changedItem) => {
                    const foundItem = cartItems.find(item => Number(changedItem.id) === item.id);
                    console.log(foundItem);
                    if (foundItem) {
                        const obj = {
                            title: foundItem.title,
                            oldPrice: Number(changedItem.cart_price),
                            price: Number(changedItem.current_price),
                        };
                        return message
                            ? `${message},\n${JSON.stringify(obj)}`
                            : JSON.stringify(obj);
                    }
                    return message;
                }, "");
                console.log(changedItemsMessage);
                alert(`${parsedError.error}\nItem(s) that have been modified the price:\n${changedItemsMessage}\nPlease reload the page!`);
            }
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
                            <CartItem key={item.id} item={item} onRemove={handleRemove} />
                        ))}
                    </div>
                )}
                <CartSummary isEmpty={cartList.length === 0} subtotal={subtotal} shipping={shipping} handlePurchase={handlePurchaseCartItems}/>
            </div>
        </Page>
    )
}