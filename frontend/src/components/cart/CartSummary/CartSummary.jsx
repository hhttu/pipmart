import { styles } from "@components/cart/CartSummary/styles.js";
import { StyledButton2 } from "@components/styledComponents.js";

export const CartSummary = ({ isEmpty, subtotal, shipping }) => {
    const total = subtotal + shipping;

    const handleClick = () => {
        console.log("Check out!");
    }

    return (
        <div style={styles.container}>
            <p style={styles.text}>
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
            </p>
            <p style={styles.text}>
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
            </p>
            <hr />
            <p style={{ ...styles.text, ...styles.total }}>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </p>
            <StyledButton2 disabled={isEmpty} onClick={handleClick}>Check Out</StyledButton2>
        </div>
    );
};