import { StyledButton, StyledChip } from "@components/styledComponents.js";
import { styles } from "@components/account/AccountOrders/styles.js";

export const formatOrderData = (orders, handleDetailClick) => {
    return orders.map((order) => ({
        Date: order.date,
        "Order Number": order.orderNumber,
        Status: (
            <StyledChip
                color={order.status === "Ordered" ? "orange" : "green"}
                textcolor={order.status === "Ordered" ? "orange" : "green"}
            >
                {order.status}
            </StyledChip>
        ),
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