import { AccountContent, BackDrop, PopUpDialog, StyledButton } from "@components/styledComponents.js";
import { styles } from "@components/account/AccountOrders/styles.js";
import { GenericTable } from "@components/common/GenericTable/GenericTable.jsx";
import { useState } from "react";
import { formatOrderData } from "@components/account/AccountOrders/accountOrdersUtils.jsx";

const headers = [
    { label: "Date", width: "25%" },
    { label: "Order Number", width: "25%" },
    { label: "Status", width: "25%" },
    { label: "Detail", width: "25%" },
];

const orders = [
    {
        date: "2024-11-28",
        orderNumber: "ORD12345",
        status: "Ordered",
        products: ["Product A", "Product B"],
    },
    {
        date: "2024-11-29",
        orderNumber: "ORD12346",
        status: "Delivered",
        products: ["Product C", "Product D", "Product E"],
    },
];

export const AccountOrders = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Open dialog with products for a selected order
    const handleDetailClick = (order) => {
        setSelectedOrder(order);
    };

    // Close dialog
    const handleCloseDialog = () => {
        setSelectedOrder(null);
    };

    // Format the orders data for the table
    const tableData = formatOrderData(orders, handleDetailClick);

    return (
        <AccountContent>
            <h2 style={styles.title}>My Orders</h2>
            <GenericTable headers={headers} data={tableData} />

            {selectedOrder && (
                <PopUpDialog>
                    <h2 style={styles.title}>Order Details</h2>
                    <p style={styles.text}><strong>Date:</strong> {selectedOrder.date}</p>
                    <p style={styles.text}><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
                    <p style={styles.text}><strong>Products:</strong></p>
                    <ul>
                        {selectedOrder.products.map((product, index) => (
                            <li key={index}>{product}</li>
                        ))}
                    </ul>
                    <StyledButton
                        onClick={handleCloseDialog}
                    >
                        Close
                    </StyledButton>
                </PopUpDialog>
            )}

            {selectedOrder && (
                <BackDrop onClick={handleCloseDialog} />
            )}
        </AccountContent>
    );
};