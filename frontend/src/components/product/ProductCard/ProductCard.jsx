import { styles } from "@components/product/ProductCard/styles.js";
import { useNavigate } from "react-router-dom";
import { StyledCard } from "@components/styledComponents.js";
import { SellerChip } from "@components/common/SellerChip/SellerChip.jsx";
import productImage from "@assets/loading-cat.jpg";

export const ProductCard = ({ product }) => {
    const { id, title, price, is_owner } = product;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${id}`);
    };

    return (
        <StyledCard onClick={handleClick}>
            <img src={productImage} alt={title} style={styles.image} />
            <div style={ styles.info }>
                <div style={ styles.titleContainer }>
                    <h3 style={ styles.title }>{ title }</h3>
                    { is_owner && (
                        <SellerChip/>
                    ) }
                </div>

                <div style={ styles.priceSection }>
                    <span style={ styles.price }>€{ price.toFixed(2) }</span>
                </div>
            </div>
        </StyledCard>
    );
};