import { styles } from "@components/product/ProductList/styles.js";
import { ProductCard } from "@components/product/ProductCard/ProductCard.jsx";

export const ProductList = ({ products }) => {
    return (
        <div style={styles.productGrid}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};