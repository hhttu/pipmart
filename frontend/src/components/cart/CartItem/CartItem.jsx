import { styles } from "@components/cart/CartItem/styles.js";
import { QuantityInput } from "@components/common/QuantityInput/QuantityInput.jsx";

export const CartItem = ({ item, onQuantityChange, onRemove }) => {
    return (
        <div style={styles.container}>
            <img src={item.image} alt={item.title} style={styles.image} />
            <div style={styles.details}>
                <div>
                    <h3 style={styles.title}>{item.title}</h3>
                    <p>${item.price}</p>
                </div>
                <div style={styles.modificationSection}>
                    <QuantityInput item={item} onQuantityChange={onQuantityChange} />
                    <button style={styles.button} onClick={() => onRemove(item.id)}>
                        Remove
                    </button>
                </div>

            </div>
        </div>
    );
};
