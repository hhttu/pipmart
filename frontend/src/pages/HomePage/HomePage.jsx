import { SearchBar } from "@components/common/SearchBar/SearchBar.jsx";
import { ProductList } from "@components/product/ProductList/ProductList.jsx";
import { Page } from "@components/styledComponents.js";
import { useEffect, useState } from "react";
import { useUser } from "@context/UserContext.jsx";
import { getItems, searchItems } from "@api";

export const HomePage = () => {
    const { token } = useUser();
    const [products, setProducts] = useState([]);

    const handleSearch = async (query) => {
        console.log(`Searching for: ${query}`);

        try {
            const items = await searchItems(token, query);
            console.log(items);

            const onSaleFilteredItems = items.filter(item => item['status'] === "on-sale");

            setProducts(onSaleFilteredItems);
        } catch (error) {
            console.error(error.message);
            setProducts([]);
        }
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const items = await getItems(token);
                console.log(items);

                const onSaleItems = items.filter(item => item['status'] === "on-sale");

                setProducts(onSaleItems);
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