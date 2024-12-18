import { styles } from "@components/cart/CartPriceDisplay/styles.js";

export const CartPriceDisplay = ({price, changedPrice}) => {
    return (
        <div>
            {changedPrice ? (
                <>
                    <span style={styles.cartPrice}>${price.toFixed(2)}</span>
                    <span style={styles.changedPrice}> ${changedPrice.toFixed(2)}</span>
                </>
            ) : (
                <span style={styles.price}>${price.toFixed(2)}</span>
            )}
        </div>
    );
}