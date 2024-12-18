import { StyledButton } from "@components/styledComponents.js";
import { styles } from "@components/account/AccountOrders/styles.js";

export const formatOrderData = (orders, handleDetailClick) => {
    return orders.map((order) => ({
        Date: new Date(order.date_purchased).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }),
        "Order Number": `ORDER${order.id}`,
        Detail: (
            <StyledButton
                style={styles.viewButton}
                onClick={() => handleDetailClick(order)}
            >
                View
            </StyledButton>
        ),
    }));
};