import { styles } from "@components/account/AccountSideBar/styles.js";
import { useUser } from "@context/UserContext.jsx";
import { users } from "../../../constants.js";
import { StyledLinkSpan } from "@components/styledComponents.js";
import userLogo from "@assets/user-logo.jpg"
import { useNavigate } from "react-router-dom";

export const AccountSideBar = ({option}) => {
    const { userId } = useUser();
    const navigate = useNavigate();

    // Will be replaced by API call
    const user = users.find((p) => p.id === parseInt(userId, 10));

    const handleClick = (option) => {
        navigate(`/account/${option}`);
    }

    return (
        <div style={styles.sidebar}>
            <div style={styles.profileSection}>
                <img src={userLogo} style={styles.avatar}></img>
                <h3 style={styles.username}>{user.name}</h3>
                <p style={styles.email}>{user.email}</p>
            </div>
            <div style={styles.nav}>
            <div style={styles.navItem} onClick={() => handleClick("myorders")}>
                    <StyledLinkSpan color={option === "myorders" ? "#C14859" : "#000"}>My Orders</StyledLinkSpan>
                </div>
                <div style={styles.navItem} onClick={() => handleClick("myitems")}>
                    <StyledLinkSpan color={option === "myitems" ? "#C14859" : "#000"}>My Products</StyledLinkSpan>
                </div>
            </div>
        </div>
    );
};