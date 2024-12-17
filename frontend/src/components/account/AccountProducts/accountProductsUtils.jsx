import { StyledButton, StyledChip } from "@components/styledComponents.js";
import { styles } from "@components/account/AccountProducts/styles.js";

export const formatProductData = (products, handleDetailClick) => {
    const getStatusColor = (status) => {
        if (status === "on-sale") {
            return "#FFEEC1";
        }

        if (status === "sold") {
            return "#CDFFE1";
        }

        return "#EDDBF9"
    }

    const getStatusFontColor = (status) => {
        if (status === "on-sale") {
            return "#FFB800";
        }

        if (status === "sold") {
            return "#2B8768";
        }

        return "#662AA4";
    }

    return products.map((product) => ({
        "Date added": new Date(product.date_added).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }),
        "Product name": product.title,
        Price: `$${product.price}`,
        Status: (
            <StyledChip
                color={getStatusFontColor(product.status)}
                backgroundcolor={getStatusColor(product.status)}
            >
                {product.status.replace(/-/g, ' ')}
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