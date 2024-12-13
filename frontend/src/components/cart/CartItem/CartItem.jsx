import { styles } from "@components/cart/CartItem/styles.js";
import { ColorSquare } from "@components/common/ColorSquare/ColorSquare.jsx";

export const CartItem = ({ item, onRemove }) => {
    return (
        <div style={styles.container}>
            <ColorSquare alt={item.title} styles={styles.image} />
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
