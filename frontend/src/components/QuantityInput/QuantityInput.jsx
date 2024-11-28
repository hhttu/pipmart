import { styles } from "@components/QuantityInput/styles.js";

export const QuantityInput = ({item, onQuantityChange}) => {
    return (
        <div style={styles.quantityControls}>
            <button
                style={styles.quantityButton}
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
            >
                -
            </button>
            <input
                value={item.quantity}
                onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value, 10))}
                style={styles.quantityInput}
            />
            <button
                style={styles.quantityButton}
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            >
                +
            </button>
        </div>
    )
}