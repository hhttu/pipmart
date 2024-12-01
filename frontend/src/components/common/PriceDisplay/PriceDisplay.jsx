import { styles } from "@components/common/PriceDisplay/styles.js";

export const PriceDisplay = ({ isOnSale, price, salePrice }) => (
    <div>
        {isOnSale ? (
            <>
                <span style={styles.originalPrice}>${price.toFixed(2)}</span>
                <span style={styles.salePrice}> ${salePrice.toFixed(2)}</span>
            </>
        ) : (
            <span style={styles.price}>${price.toFixed(2)}</span>
        )}
    </div>
);
