import { AccountContent, StyledButton } from "@components/styledComponents.js";
import { styles } from "@components/AccountProducts/styles.js";

export const AccountProducts = () => {
    return (
        <AccountContent>
            <div style={styles.headerContainer}>
                <h2 style={styles.title}>My Products</h2>
                <StyledButton>Add new product</StyledButton>
            </div>

        </AccountContent>
    );
};