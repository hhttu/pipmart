import { styles } from "./styles.js";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import logo from "@assets/logo.png"
import { UserSpan } from "@components/NavBar/styledComponents.js";
import { useUser } from "@context/UserContext.jsx";

export const NavBar = () => {
    const { isLogin, cartItemCount, setUserId } = useUser();

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
                        <UserSpan>My account</UserSpan>
                    </a>
                ) : (
                    <a href="/login" style={styles.link}>
                        <FaRegCircleUser style={styles.userLogo}/>
                        <UserSpan>Sign In/Register</UserSpan>
                    </a>
                )}
                {isLogin && (
                    <a href="/" style={styles.link} onClick={handleLogOut}>
                        <FiLogOut style={styles.userLogo}/>
                        <UserSpan>Logout</UserSpan>
                    </a>
                )}
                {isLogin && (
                    <a href="/cart" style={styles.cartLink}>
                        <IoCartOutline style={styles.cartIcon}/>
                        <span style={styles.cartBadge}>{cartItemCount}</span>
                    </a>
                )}
            </div>
        </nav>
    );
}