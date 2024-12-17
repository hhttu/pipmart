import { AccountContent, BackDrop, PopUpDialog, StyledButton } from "@components/styledComponents.js";
import { styles } from "@components/account/AccountOrders/styles.js";
import { GenericTable } from "@components/common/GenericTable/GenericTable.jsx";
import { useEffect, useState } from "react";
import { formatOrderData, getProductDetails } from "@components/account/AccountOrders/accountOrdersUtils.jsx";
import { useUser } from "@context/UserContext.jsx";
import { getItemById, getOrder } from "@api";

const headers = [
    { label: "Date", width: "25%" },
    { label: "Order Number", width: "45%" },
    { label: "Detail", width: "30%" },
];

const productHeaders = [
    { label: "Product Name", width: "35%" },
    { label: "Price", width: "25%" },
    { label: "Description", width: "40%" },

]

export const AccountOrders = () => {
    const {token} = useUser();

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        const getMyOrders = async () => {
            try {
                const orders = await getOrder(token);

                setOrders(orders);
            } catch (error) {
                console.error(error.message);
                setOrders([]);
            }
        }

        getMyOrders();
    }, [token]);

    // Open dialog with products for a selected order
    const handleDetailClick = async (order) => {
        let errorMessage = "";

        try {
            // Fetch all items in parallel
            const orderedItems = await Promise.all(
                order.items.map(async (itemId) => {
                    try {
                        return await getItemById(token, itemId);
                    } catch (error) {
                        errorMessage = "There was a problem when fetching your order! Please try again.";
                        console.error(`Error fetching item ${ itemId }:`, error.message);
                        return null;
                    }
                })
            );

            // Filter out any failed fetches (null values)
            const validItems = orderedItems.filter(item => item !== null);

            // Update the cart items
            if (errorMessage !== "") {
                throw new Error(errorMessage);
            }

            setOrderItems(validItems);
            setSelectedOrder(order);
        } catch (error) {
            alert(error.message);
            setSelectedOrder(null);
        }
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
                <>
                    <PopUpDialog>
                        <h2 style={styles.title}>Order Details</h2>
                        <p style={styles.text}><strong>Date:</strong> {selectedOrder.date}</p>
                        <p style={styles.text}><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
                        <p style={styles.text}><strong>Products:</strong></p>
                        <GenericTable
                            headers={productHeaders}
                            data={getProductDetails(orderItems).map((product) => ({
                                "Product Name": product.title,
                                "Price": `$${product.price}`,
                                "Description": product.description,
                            }))}
                        />
                        <StyledButton
                            style={{marginTop: '10px'}}
                            onClick={handleCloseDialog}
                        >
                            Close
                        </StyledButton>
                    </PopUpDialog>
                    <BackDrop onClick={handleCloseDialog} />
                </>
            )}
        </AccountContent>
    );
};