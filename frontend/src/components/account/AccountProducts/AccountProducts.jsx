import { AccountContent, BackDrop, PopUpDialog, StyledButton, StyledButton2 } from "@components/styledComponents.js";
import { styles } from "@components/account/AccountProducts/styles.js";
import { sampleMyProducts } from "../../../constants.js";
import { useState } from "react";
import sampleImage2 from "@assets/sample_product_2.jpg";
import { GenericInput } from "@components/common/GenericInput/GenericInput.jsx";
import { formatProductData } from "@components/account/AccountProducts/accountProductsUtils.jsx";
import { GenericTable } from "@components/common/GenericTable/GenericTable.jsx";
import { GenericTextArea } from "@components/common/GenericTextArea/GenericTextArea.jsx";
import { GenericSelection } from "@components/common/GenericSelection/GenericSelection.jsx";

const headers = [
    { label: "Date added", width: "20%" },
    { label: "Product name", width: "25%" },
    { label: "Price", width: "15%" },
    { label: "Status", width: "15%" },
    { label: "Detail", width: "25%" },
];

export const AccountProducts = () => {
    // const {userId} = useUser();

    const [products, setProducts] = useState(sampleMyProducts);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        status: "On sale",
    });

    const [selectedProduct, setSelectedProduct] = useState(null);

    // Open Add Product Dialog
    const handleAddProductClick = () => {
        setFormData({
            title: "",
            price: "",
            description: "",
            status: "On sale",
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
    const handleAddProductSubmit = (e) => {
        e.preventDefault();

        const productId = 100 + sampleMyProducts.length;
        const date = new Date().toISOString().split("T")[0]

        // Add new product to the product list (must be replace by recall API)
        sampleMyProducts.push({
            ...formData,
            id: productId,
            dateAdded: date,
            image: sampleImage2,
            price: Number(formData.price),
            status: "On sale",
        });
        setProducts(sampleMyProducts);
        setIsAddProductOpen(false);

        alert("Add product successfully !");
    };

    // Open the detail dialog
    const handleDetailClick = (product) => {
        setSelectedProduct(product);

        setFormData({
            title: product.title,
            price: product.price,
            status: product.status,
            description: product.description,
        });
    };

    const handleEditProductSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = {
            ...selectedProduct,
            name: formData.name,
            price: formData.price,
            status: formData.status,
            description: formData.description,
        };

        // Update the product in the product list by ID
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === selectedProduct.id ? updatedProduct : product
            )
        );
        setSelectedProduct(null);
    };

    // Close the detail dialog
    const handleCloseDetailDialog = () => {
        setSelectedProduct(null);
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

            {/* Add Product Dialog */}
            {isAddProductOpen && (
                <>
                    {/* Dialog Content */}
                    <PopUpDialog>
                        <h2>Add New Product</h2>
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
                                <StyledButton
                                    type="submit"
                                >
                                    Add Product
                                </StyledButton>
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
                        <h2 style={ { ...styles.title, paddingBottom: '20px'  } }>Edit Product</h2>
                        <p style={ styles.text }><strong>Date added:</strong> { selectedProduct.dateAdded }</p>
                        <form onSubmit={ handleEditProductSubmit }>
                            <div style={ styles.inputField }>
                                <label><strong>Product Name:</strong></label>
                                <GenericInput
                                    type="text"
                                    name="title"
                                    value={ formData.title }
                                    onChange={ handleFormChange }
                                    required={ true }
                                />
                            </div>
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
                            <div style={ styles.inputField }>
                                <label><strong>Status:</strong></label>
                                <GenericSelection
                                    name="status"
                                    value={ formData.status }
                                    onChange={ handleFormChange }
                                    required={ true }
                                    options={ ["On sale", "Sold"] }
                                />
                            </div>
                            <div style={ styles.inputField }>
                                <label><strong>Description:</strong></label>
                                <GenericTextArea
                                    name="description"
                                    value={ formData.description }
                                    onChange={ handleFormChange }
                                    required={ true }
                                />
                            </div>
                            <div style={ styles.buttonContainer }>
                                <StyledButton2
                                    type="submit"
                                >
                                    Edit Product
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
            ) }
        </AccountContent>
    );
};