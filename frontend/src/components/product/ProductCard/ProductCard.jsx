import { styles } from "@components/product/ProductCard/styles.js";
import { useNavigate } from "react-router-dom";
import { StyledCard } from "@components/styledComponents.js";
import { ColorSquare } from "@components/common/ColorSquare/ColorSquare.jsx";
import { SellerChip } from "@components/common/SellerChip/SellerChip.jsx";

export const ProductCard = ({ product }) => {
    const { id, title, price, is_owner } = product;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${id}`);
    };

    return (
        <StyledCard onClick={handleClick}>
            <ColorSquare alt={title} styles={styles.image} />
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