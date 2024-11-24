import { styles } from "@components/ProductList/styles.js";
import { ProductCard } from "@components/ProductCard/ProductCard.jsx";

export const ProductList = ({ products }) => {
    return (
        <div style={styles.productGrid}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};