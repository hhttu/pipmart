import { useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import { Page, StyledLinkSpan } from "@components/styledComponents.js";
import { styles } from "@pages/ProductDetailPage/styles.js";
import { useEffect, useState } from "react";
import { WarningBox } from "@components/common/WarningBox/WarningBox.jsx";
import { SellerChip } from "@components/common/SellerChip/SellerChip.jsx";
import { useUser } from "@context/UserContext.jsx";
import { getItemById } from "@api";
import productImage from "@assets/loading-cat.jpg";

export const ProductDetailPage = () => {
    const { id } = useParams();

    const [ product, setProduct ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState('');
    const { token, handlePostCart } = useUser();

    useEffect(() => {
        const getProductById = async () => {
            try {
                const item = await getItemById(token, id);
                console.log(item);

                setProduct(item);
            } catch (error) {
                console.error(error.message);
                setProduct(null);
            }
        }

        getProductById();
    }, [token]);

    if (!product) {
        return (
            <Page>
                <h3>Product not found!</h3>
            </Page>
        );
    }

    const {
        title,
        description,
        price,
        date_added,
        is_owner,
    } = product;

    const handleAddToCart = async () => {
        if (!token) {
            setErrorMessage('You must log in to add items to the cart!');
            return;
        }

        if (is_owner) {
            setErrorMessage("You cannot buy what you sell!");
            return;
        }
        // Proceed with adding to cart
        const message = await handlePostCart(id);
        if (message === '') {
            alert('Item added to cart!');
        } else {
            setErrorMessage(message);
        }
    };

    return (
        <Page>
            <div style={styles.returnLink}>
                <a href="/" style={styles.link}>
                    <FaAngleLeft style={styles.returnIcon}/>
                    <StyledLinkSpan>Back to Home</StyledLinkSpan>
                </a>
            </div>
            <div style={ styles.productContainer }>
                <img src={ productImage } alt={ title } style={ styles.mainImage }/>

                <div style={ styles.productInfo }>
                    <div style={ styles.productHeader }>
                        <div style={ styles.titleContainer }>
                            <h2 style={ styles.productTitle }>{ title }</h2>
                            { is_owner && (
                                <SellerChip/>
                            ) }
                        </div>
                        <div style={ styles.priceSection }>
                            <span style={ styles.price }>€{ price.toFixed(2) }</span>
                        </div>
                    </div>

                    <button style={ styles.addToCartButton } onClick={ handleAddToCart }>Add to Bag</button>
                    { errorMessage && (
                        <WarningBox errorMessage={ errorMessage }/>
                    ) }

                    <div style={ styles.productDetails }>
                        <h3 style={ styles.detailsTitle }>Details</h3>
                        <p>
                            <strong>Added Date:</strong>{ ' ' }
                            { new Date(date_added).toLocaleDateString('en-GB', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            }) }
                        </p>
                        <p>
                            <strong>Description:</strong> { description }
                        </p>
                    </div>
                </div>
            </div>
        </Page>
    )
}