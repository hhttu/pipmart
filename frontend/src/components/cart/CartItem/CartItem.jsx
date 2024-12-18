import { styles } from "@components/cart/CartItem/styles.js";
import productImage from "@assets/loading-cat.jpg";

export const CartItem = ({ item, onRemove }) => {
    return (
        <div style={styles.container}>
            <img src={ productImage } alt={ item.title } style={ styles.image }/>
            <div style={ styles.details }>
                <div>
                    <h3 style={styles.title}>{item.title}</h3>
                    <p>${item.price}</p>
                </div>
                <div style={styles.modificationSection}>
                    {item['status'] === "purchased" && (
                        <p style={styles.message}>This item is no longer for sale. Please remove it from your cart</p>
                    )}
                    <button style={styles.button} onClick={() => onRemove(item.id)}>
                        Remove
                    </button>
                </div>

            </div>
        </div>
    );
};
