import { styles } from "@components/ProductCard/styles.js";
import { useNavigate } from "react-router-dom";
import { PriceDisplay } from "@components/PriceDisplay/PriceDisplay.jsx";
import { StyledCard } from "@components/styledComponents.js";

export const ProductCard = ({ product }) => {
    const { id, image, title, price, isOnSale, salePrice } = product;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${id}`);
    };

    return (
        <StyledCard onClick={handleClick}>
            <img src={image} alt={title} style={styles.image} />
            <div style={styles.info}>
                <h3 style={styles.name}>{title}</h3>
                <div style={styles.priceSection}>
                    <PriceDisplay price={price} isOnSale={isOnSale} salePrice={salePrice} />
                </div>
            </div>
        </StyledCard>
    );
};