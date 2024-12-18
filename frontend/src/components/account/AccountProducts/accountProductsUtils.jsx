import { StyledButton, StyledChip } from "@components/styledComponents.js";
import { styles } from "@components/account/AccountProducts/styles.js";

export const formatProductData = (products, handleDetailClick) => {
    const getStatusColor = (status, isBuyer) => {
        if (status === "purchased" && isBuyer) {
            return "#EDDBF9";
        }

        if (status === "purchased" && !isBuyer) {
            return "#CDFFE1";
        }

        return "#FFEEC1"
    }

    const getStatusFontColor = (status, isBuyer) => {
        if (status === "purchased" && isBuyer) {
            return "#662AA4";
        }

        if (status === "purchased" && !isBuyer) {
            return "#2B8768";
        }

        return "#FFB800";
    }

    const getStatusText = (status, isBuyer) => {
        if (status === "purchased" && isBuyer) {
            return "Purchased";
        }

        if (status === "purchased" && !isBuyer) {
            return "Sold";
        }

        return "On sale";
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
                color={getStatusFontColor(product.status, product.is_buyer)}
                backgroundcolor={getStatusColor(product.status, product.is_buyer)}
            >
                {getStatusText(product.status, product.is_buyer)}
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