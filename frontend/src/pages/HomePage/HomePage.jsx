import { Page } from "@components/Page/Page.jsx";
import { SearchBar } from "@components/SearchBar/SearchBar.jsx";
import { ProductCard } from "@components/ProductCard/ProductCard.jsx";
import sampleImage1 from "@assets/sample_product_1.jpg";
import sampleImage2 from "@assets/sample_product_2.jpg";
import sampleImage3 from "@assets/sample_product_3.jpg";
import sampleImage4 from "@assets/sample_product_4.jpg";
import { ProductList } from "@components/ProductList/ProductList.jsx";


export const HomePage = () => {
    const handleSearch = (query) => {
        console.log(`Searching for: ${query}`);
        // Insert after with API call for searching
    };
    const sampleProducts = [
        {
            id: 1,
            image: sampleImage1,
            name: 'Product 1',
            price: 120.0,
            isOnSale: true,
            salePrice: 99.99,
        },
        {
            id: 2,
            image: sampleImage2,
            name: 'Product 2',
            price: 75.0,
            isOnSale: false,
            salePrice: null,
        },
        {
            id: 3,
            image: sampleImage3,
            name: 'Product 3',
            price: 50.0,
            isOnSale: true,
            salePrice: 40.0,
        },
        {
            id: 4,
            image: sampleImage4,
            name: 'Product 4',
            price: 200.0,
            isOnSale: false,
            salePrice: null,
        },
        {
            id: 5,
            image: sampleImage1,
            name: 'Product 5',
            price: 89.99,
            isOnSale: false,
        },
        {
            id: 6,
            image: sampleImage2,
            name: 'Product 6',
            price: 110.0,
            isOnSale: true,
            salePrice: 95.0,
        },
        {
            id: 7,
            image: sampleImage3,
            name: 'Product 7',
            price: 150.0,
            isOnSale: false,
        },
        {
            id: 8,
            image: sampleImage4,
            name: 'Product 8',
            price: 45.0,
            isOnSale: true,
            salePrice: 30.0,
        },
        {
            id: 9,
            image: sampleImage1,
            name: 'Product 9',
            price: 250.0,
            isOnSale: true,
            salePrice: 200.0,
        },
        {
            id: 10,
            image: sampleImage2,
            name: 'Product 10',
            price: 60.0,
            isOnSale: false,
        },
        {
            id: 11,
            image: sampleImage3,
            name: 'Product 11',
            price: 99.99,
            isOnSale: true,
            salePrice: 79.99,
        },
        {
            id: 12,
            image: sampleImage4,
            name: 'Product 12',
            price: 130.0,
            isOnSale: false,
        },
    ];

    return (
        <Page>
            <h1>Home Page</h1>
            <SearchBar onSearch={handleSearch} />
            <ProductList products={sampleProducts} />
        </Page>
    )
}