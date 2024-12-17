import { SearchBar } from "@components/common/SearchBar/SearchBar.jsx";
import { ProductList } from "@components/product/ProductList/ProductList.jsx";
import { Page } from "@components/styledComponents.js";
import { useEffect, useState } from "react";
import { useUser } from "@context/UserContext.jsx";
import { getItems } from "@api";

export const HomePage = () => {
    const { token } = useUser();
    const [products, setProducts] = useState([]);

    const handleSearch = (query) => {
        console.log(`Searching for: ${query}`);
        setProducts([]);
        // Insert after with API call for searching
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const items = await getItems(token);
                console.log(items);

                setProducts(items);
            } catch (error) {
                console.error(error.message);
            }
        }

        getProducts();
    }, [token]);

    return (
        <Page>
            <h1>Home Page</h1>
            <SearchBar onSearch={handleSearch} />
            <ProductList products={products} />
        </Page>
    )
}