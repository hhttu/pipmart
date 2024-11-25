import { Page } from "@components/Page/Page.jsx";
import { useParams } from "react-router-dom";
import { detailedProducts } from "../../constants.js";
import { FaAngleLeft } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import { StyledLinkSpan } from "@components/styledComponents.js";
import { styles } from "@pages/ProductDetailPage/styles.js";
import { PriceDisplay } from "@components/PriceDisplay/PriceDisplay.jsx";
import { useState } from "react";
import { useUser } from "@context/UserContext.jsx";

export const ProductDetailPage = () => {
    const { id } = useParams();

    const [errorMessage, setErrorMessage] = useState('');
    const {isLogin, cartItemCount, setCartItemCount} = useUser()

    // Will be replaced by API call
    const product = detailedProducts.find((p) => p.id === parseInt(id, 10));

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

        // Proceed with adding to cart
        setCartItemCount(cartItemCount + 1);
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
                        <h2 style={styles.productTitle}>{title}</h2>
                        <div style={styles.priceSection}>
                            <PriceDisplay price={price} isOnSale={isOnSale} salePrice={salePrice} />
                        </div>
                    </div>

                    <div style={styles.quantitySection}>
                        <span>Quantity: </span>
                        <input
                            type="number"
                            id="quantity"
                            defaultValue={1}
                            style={styles.quantityInput}
                            min="1"
                        />
                    </div>

                    <button style={styles.addToCartButton} onClick={handleAddToCart}>Add to Bag</button>
                    {errorMessage && (
                        <div style={styles.warningBox}>
                            <IoWarningOutline style={styles.warningIcon} />
                            {errorMessage}
                        </div>
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