import { SearchBar } from "@components/common/SearchBar/SearchBar.jsx";
import { ProductList } from "@components/product/ProductList/ProductList.jsx";
import { sampleProducts } from "../../constants.js";
import { Page } from "@components/styledComponents.js";
import { useEffect, useState } from "react";

export const HomePage = () => {
    const [products, setProducts] = useState(sampleProducts);

    const handleSearch = (query) => {
        console.log(`Searching for: ${query}`);
        setProducts(sampleProducts);
        // Insert after with API call for searching
    };

    useEffect(() => {
        setProducts(sampleProducts);
    }, []);

    return (
        <Page>
            <h1>Home Page</h1>
            <SearchBar onSearch={handleSearch} />
            <ProductList products={products} />
        </Page>
    )
}