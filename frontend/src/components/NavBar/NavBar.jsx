import { styles } from "./styles.js";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import logo from "@assets/logo.png"
import { useUser } from "@context/UserContext.jsx";
import { StyledLink, StyledLinkSpan } from "@components/styledComponents.js";

export const NavBar = () => {
    const { isLogin, cartList, setUserId } = useUser();

    const handleLogOut = () => {
        setUserId(null);
        alert("Logout successfully");
    }

    return (
        <nav style={styles.navbar}>
            <div>
                <a href="/" style={styles.logoLink}>
                    <img
                        src={logo}
                        alt="Logo"
                        style={styles.logoImage}
                    />
                </a>
            </div>

            <div style={styles.buttons}>
                {isLogin ? (
                    <a href="/account" style={styles.link}>
                        <FaRegCircleUser style={styles.userLogo}/>
                        <StyledLinkSpan>My account</StyledLinkSpan>
                    </a>
                ) : (
                    <a href="/login" style={styles.link}>
                        <FaRegCircleUser style={styles.userLogo}/>
                        <StyledLinkSpan>Sign In/Register</StyledLinkSpan>
                    </a>
                )}
                {isLogin && (
                    <a href="/" style={styles.link} onClick={handleLogOut}>
                        <FiLogOut style={styles.userLogo}/>
                        <StyledLinkSpan>Logout</StyledLinkSpan>
                    </a>
                )}
                {isLogin && (
                    <StyledLink href="/cart">
                        <IoCartOutline style={styles.cartIcon}/>
                        <span style={styles.cartBadge}>{cartList.length}</span>
                    </StyledLink>
                )}
            </div>
        </nav>
    );
}