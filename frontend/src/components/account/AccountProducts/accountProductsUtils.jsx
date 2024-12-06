import { StyledButton, StyledChip } from "@components/styledComponents.js";
import { styles } from "@components/account/AccountProducts/styles.js";

export const formatProductData = (products, handleDetailClick) => {
    return products.map((product) => ({
        "Date added": product.dateAdded,
        "Product name": product.title,
        Price: `$${product.price}`,
        Status: (
            <StyledChip
                color="#FFF"
                backgroundcolor={product.status === "On sale" ? "orange" : "green"}
            >
                {product.status}
            </StyledChip>
        ),
        Detail: (
            <StyledButton
                style={styles.viewButton}
                onClick={() => handleDetailClick(product)}
            >
                View & Edit
            </StyledButton>
        ),
    }));
};