import { SearchBar } from "@components/SearchBar/SearchBar.jsx";
import { ProductList } from "@components/ProductList/ProductList.jsx";
import { sampleProducts } from "../../constants.js";
import { Page } from "@components/styledComponents.js";


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