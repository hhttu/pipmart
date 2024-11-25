import { styles } from "@components/SearchBar/styles.js";
import { StyledSearchIcon } from "@components/styledComponents.js";

export const SearchBar = ({ onSearch }) => {
    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.searchInput.value;
        if (onSearch) onSearch(query);
    };

    return (
        <form onSubmit={handleSearch} style={styles.searchForm}>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    name="searchInput"
                    placeholder="Labubu..."
                    style={styles.searchInput}
                />
                <button type="submit" style={styles.searchButton}>
                    <StyledSearchIcon />
                </button>
            </div>
        </form>
    )
}