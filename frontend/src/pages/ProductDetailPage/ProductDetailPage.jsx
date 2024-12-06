import { useParams } from "react-router-dom";
import { detailedProducts } from "../../constants.js";
import { FaAngleLeft } from "react-icons/fa6";
import { Page, StyledLinkSpan } from "@components/styledComponents.js";
import { styles } from "@pages/ProductDetailPage/styles.js";
import { PriceDisplay } from "@components/common/PriceDisplay/PriceDisplay.jsx";
import { useState } from "react";
import { useUser } from "@context/UserContext.jsx";
import { WarningBox } from "@components/common/WarningBox/WarningBox.jsx";

export const ProductDetailPage = () => {
    const { id } = useParams();

    const [ errorMessage, setErrorMessage ] = useState('');
    const [ quantity, setQuantity ] = useState(1);
    const { userId, isLogin, setCartList } = useUser();

    // Will be replaced by API call
    const product = detailedProducts.find((p) => p.id === parseInt(id, 10));
    const isSeller = product?.seller === userId;

    if (!product) {
        return (
            <Page>
                <div>Product not found!</div>
            </Page>
        );
    }

    const {
        title,
        description,
        price,
        isOnSale,
        salePrice,
        dateAdded,
        image,
    } = product;

    const handleAddToCart = () => {
        if (!isLogin) {
            setErrorMessage('You must log in to add items to the cart!');
            return;
        }

        if (isSeller) {
            setErrorMessage("You cannot buy what you sell!");
            return;
        }

        // Proceed with adding to cart
        setCartList((prevCartList) => [
            ...prevCartList,
            { ...product, quantity }
        ]);
        alert('Item added to cart!');
    };

    return (
        <Page>
            <div style={styles.returnLink}>
                <a href="/" style={styles.link}>
                    <FaAngleLeft style={styles.returnIcon}/>
                    <StyledLinkSpan>Back to Home</StyledLinkSpan>
                </a>
            </div>
            <div style={styles.productContainer}>
                <img src={image} alt={title} style={styles.mainImage}/>

                <div style={styles.productInfo}>
                    <div style={styles.productHeader}>
                        <div style={styles.titleContainer}>
                            <h2 style={styles.productTitle}>{title}</h2>
                            {isSeller && (
                                <div style={styles.sellerChip}>
                                    My selling product
                                </div>
                            )}
                        </div>
                        <div style={styles.priceSection}>
                            <PriceDisplay price={price} isOnSale={isOnSale} salePrice={salePrice} />
                        </div>
                    </div>

                    <div style={styles.quantitySection}>
                        <span>Quantity: </span>
                        <input
                            type="number"
                            id="quantity"
                            style={styles.quantityInput}
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                    </div>

                    <button style={styles.addToCartButton} onClick={handleAddToCart}>Add to Bag</button>
                    {errorMessage && (
                        <WarningBox errorMessage={errorMessage} />
                    )}

                    <div style={styles.productDetails}>
                        <h3 style={styles.detailsTitle}>Details</h3>
                        <p>
                            <strong>Added Date:</strong>{' '}
                            {new Date(dateAdded).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                        </p>
                        <p>
                            <strong>Description:</strong> {description}
                        </p>
                    </div>
                </div>
            </div>
        </Page>
    )
}