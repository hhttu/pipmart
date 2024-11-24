import { styles } from "@components/ProductCard/styles.js";
import { StyledCard } from "@components/ProductCard/styledComponents.js";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {
    const { id, image, name, price, isOnSale, salePrice } = product;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${id}`);
    };

    return (
        <StyledCard onClick={handleClick}>
            <img src={image} alt={name} style={styles.image} />
            <div style={styles.info}>
                <h3 style={styles.name}>{name}</h3>
                <div style={styles.priceSection}>
                    {isOnSale ? (
                        <>
                            <span style={styles.originalPrice}>${price.toFixed(2)}</span>
                            <span style={styles.salePrice}>${salePrice.toFixed(2)}</span>
                        </>
                    ) : (
                        <span style={styles.price}>${price.toFixed(2)}</span>
                    )}
                </div>
            </div>
        </StyledCard>
    );
};