import { styles } from "@components/cart/CartItem/styles.js";

export const CartItem = ({ item, onRemove }) => {
    return (
        <div style={styles.container}>
            <img src={item.image} alt={item.title} style={styles.image} />
            <div style={styles.details}>
                <div>
                    <h3 style={styles.title}>{item.title}</h3>
                    <p>${item.price}</p>
                </div>
                <div style={styles.modificationSection}>
                    <button style={styles.button} onClick={() => onRemove(item.id)}>
                        Remove
                    </button>
                </div>

            </div>
        </div>
    );
};
