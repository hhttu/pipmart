import { Page } from "@components/Page/Page.jsx";
import { SearchBar } from "@components/SearchBar/SearchBar.jsx";
import { ProductList } from "@components/ProductList/ProductList.jsx";
import { sampleProducts } from "../../constants.js";


export const HomePage = () => {
    const handleSearch = (query) => {
        console.log(`Searching for: ${query}`);
        // Insert after with API call for searching
    };

    return (
        <Page>
            <h1>Home Page</h1>
            <SearchBar onSearch={handleSearch} />
            <ProductList products={sampleProducts} />
        </Page>
    )
}