import { styles } from "@components/AccountSideBar/styles.js";
import { useUser } from "@context/UserContext.jsx";
import { users } from "../../constants.js";
import { StyledLinkSpan } from "@components/styledComponents.js";
import userLogo from "@assets/user-logo.jpg"

export const AccountSideBar = ({option, setOption}) => {
    const { userId } = useUser();

    // Will be replaced by API call
    const user = users.find((p) => p.id === parseInt(userId, 10));

    return (
        <div style={styles.sidebar}>
            <div style={styles.profileSection}>
                <img src={userLogo} style={styles.avatar}></img>
                <h3 style={styles.username}>{user.name}</h3>
                <p style={styles.email}>{user.email}</p>
            </div>
            <div style={styles.nav}>
            <div style={styles.navItem} onClick={() => setOption("orders")}>
                    <StyledLinkSpan color={option === 'orders' ? '#C14859' : '#000'}>My Orders</StyledLinkSpan>
                </div>
                <div style={styles.navItem} onClick={() => setOption("products")}>
                    <StyledLinkSpan color={option === 'products' ? '#C14859' : '#000'}>My Products</StyledLinkSpan>
                </div>
            </div>
        </div>
    );
};