import { AccountContent, BackDrop, PopUpDialog, StyledButton, StyledButton2 } from "@components/styledComponents.js";
import { styles } from "@components/account/AccountProducts/styles.js";
import { useEffect, useState } from "react";
import { GenericInput } from "@components/common/GenericInput/GenericInput.jsx";
import { formatProductData } from "@components/account/AccountProducts/accountProductsUtils.jsx";
import { GenericTable } from "@components/common/GenericTable/GenericTable.jsx";
import { GenericTextArea } from "@components/common/GenericTextArea/GenericTextArea.jsx";
import { useUser } from "@context/UserContext.jsx";
import { getItems, postItem, putItem } from "@api";

const headers = [
    { label: "Date added", width: "20%" },
    { label: "Product name", width: "25%" },
    { label: "Price", width: "15%" },
    { label: "Status", width: "15%" },
    { label: "Detail", width: "25%" },
];

export const AccountProducts = () => {
    const {token} = useUser();

    const [products, setProducts] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
    });

    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        getMyProducts();
    }, [token, isAddProductOpen]);

    const getMyProducts = async () => {
        try {
            const items = await getItems(token);
            console.log(items);

            const ownedItems = items.filter(item => (item['is_owner'] === true || item['is_buyer'] === true));

            setProducts(ownedItems);
        } catch (error) {
            console.error(error.message);
            setProducts([]);
        }
    }

    // Open Add Product Dialog
    const handleAddProductClick = () => {
        setFormData({
            title: "",
            price: "",
            description: "",
        });
        setIsAddProductOpen(true);
    };

    // Close Add Product Dialog
    const handleCloseAddProduct = () => {
        setIsAddProductOpen(false);
    };

    // Handle Form Input Change
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submit New Product
    const handleAddProductSubmit = async (e) => {
        e.preventDefault();

        setIsButtonClicked(true);

        try {
            await postItem(token, formData);

            await getMyProducts();

            alert("Added successfully!");

            setIsAddProductOpen(false);
        } catch (error) {
            alert(error.message);
        }

        setIsButtonClicked(false);
        setIsConfirmed(false);
    };

    // Open the detail dialog
    const handleDetailClick = (product) => {
        setSelectedProduct(product);

        setFormData({
            title: product.title,
            price: product.price,
            description: product.description,
        });
    };

    const handleEditProductSubmit = async (e) => {
        e.preventDefault();

        setIsButtonClicked(true);

        try {
            await putItem(token, selectedProduct.id, formData);

            await getMyProducts();

            alert("Edit successfully!");

            setSelectedProduct(null);
        } catch (error) {
            alert(error.message);
        }

        setIsButtonClicked(false);

    };

    // Close the detail dialog
    const handleCloseDetailDialog = () => {
        setSelectedProduct(null);
    };

    const handleCheckboxChange = (event) => {
        setIsConfirmed(event.target.checked);
    };

    // Format the products data for the table
    const tableData = formatProductData(products, handleDetailClick);

    return (
        <AccountContent>
            <div style={styles.headerContainer}>
                <h2 style={styles.title}>My Products</h2>
                <StyledButton style={styles.addButton} onClick={handleAddProductClick}>Add new product</StyledButton>
            </div>
            <GenericTable headers={headers} data={tableData} />

            {isAddProductOpen && (
                <>
                    <PopUpDialog>
                        <h2 style={ { ...styles.title, paddingBottom: '20px' } }>Add New Product</h2>
                        <form onSubmit={handleAddProductSubmit}>
                            <div style={styles.inputField }>
                                <label><strong>Product Name:</strong></label>
                                <GenericInput
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleFormChange}
                                    required={true}
                                />
                            </div>
                            <div style={styles.inputField }>
                                <label><strong>Price:</strong></label>
                                <GenericInput
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleFormChange}
                                    required={true}
                                />
                            </div>
                            <div style={styles.inputField }>
                                <label><strong>Description:</strong></label>
                                <GenericTextArea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    required={true}
                                />
                            </div>
                            <div style={styles.buttonContainer}>
                                <StyledButton2
                                    type="submit"
                                    disabled={isButtonClicked}
                                >
                                    Add Product
                                </StyledButton2>
                                <StyledButton
                                    type="button"
                                    onClick={handleCloseAddProduct}
                                >
                                    Cancel
                                </StyledButton>
                            </div>
                        </form>
                    </PopUpDialog>

                    {/* Backdrop */}
                    <BackDrop onClick={handleCloseAddProduct} />
                </>
            )}

            {/* Product Detail Dialog */}
            {selectedProduct && (
                <>
                    {/* Dialog Content */}
                    <PopUpDialog>
                        <h2 style={ { ...styles.title, paddingBottom: '20px' } }>Edit Product</h2>
                        <p style={ styles.text }><strong>Date
                            added:</strong> { new Date(selectedProduct.date_added).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        }) }</p>
                        <p style={ styles.text }><strong>Product name:</strong> { selectedProduct.title }</p>
                        <p style={ styles.text }><strong>Description:</strong> { selectedProduct.description }</p>
                        <form onSubmit={ handleEditProductSubmit }>

                            { selectedProduct.status !== 'on-sale' ? (
                                <>
                                    <p style={ styles.text }><strong>Price:</strong> { selectedProduct.price }</p>
                                    <p style={ styles.message }>This item can no longer be modified</p>
                                </>
                                ) : (
                                <>
                                    <div style={ styles.inputField }>
                                        <label><strong>Price:</strong></label>
                                        <GenericInput
                                            type="number"
                                            name="price"
                                            value={ formData.price }
                                            onChange={ handleFormChange }
                                            required={ true }
                                        />
                                    </div>
                                    <label style={ styles.checkboxField }>
                                        <input
                                            type="checkbox"
                                            checked={ isConfirmed }
                                            onChange={ handleCheckboxChange }
                                        />
                                        Please confirm to proceed editing.
                                    </label>
                                </>
                            )}
                        <div style={ styles.buttonContainer }>
                            <StyledButton2
                                type="submit"
                                disabled={ !isConfirmed || isButtonClicked || selectedProduct.status !== 'on-sale' }
                            >
                                Edit Price
                            </StyledButton2>
                            <StyledButton
                                type="button"
                                onClick={ handleCloseDetailDialog }
                            >
                                Cancel
                            </StyledButton>
                        </div>
                    </form>
                </PopUpDialog>

            {/* Backdrop */ }
            <BackDrop onClick={ handleCloseDetailDialog }/>
        </>
    )
}
</AccountContent>
)
    ;
};