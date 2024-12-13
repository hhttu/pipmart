import { styles } from "@components/account/AccountSideBar/styles.js";
import { StyledButton, StyledLinkSpan } from "@components/styledComponents.js";
import userLogo from "@assets/user-logo.jpg"
import { useNavigate } from "react-router-dom";

export const AccountSideBar = ({ option, userDetails }) => {
    const navigate = useNavigate();

    const handleClick = (option) => {
        navigate(`/account/${option}`);
    }

    const handleChangePassword = () => {
        console.log("Change password")
    }

    console.log(userDetails);

    return (
        <div style={styles.sidebar}>
            <div style={styles.profileSection}>
                <img src={userLogo} style={styles.avatar}></img>
                <h3 style={styles.username}>{userDetails.username}</h3>
                <p style={styles.email}>{userDetails.email}</p>
                <StyledButton
                    style={styles.button}
                    onClick={handleChangePassword}
                >
                    Change password
                </StyledButton>
            </div>
            <div style={styles.nav}>
            <div style={styles.navItem} onClick={() => handleClick("myorders")}>
                    <StyledLinkSpan color={option === "myorders" ? "#C14859" : "#000"}>My Orders</StyledLinkSpan>
                </div>
                <div style={styles.navItem} onClick={() => handleClick("myitems")}>
                    <StyledLinkSpan color={option === "myitems" ? "#C14859" : "#000"}>My Items</StyledLinkSpan>
                </div>
            </div>
        </div>
    );
};