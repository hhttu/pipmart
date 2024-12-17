import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
    changeUserPassword,
    deleteCart,
    fetchUserDetails,
    getCart,
    loginUser,
    postCart,
    putCart,
    registerUser
} from "@api";
import error from "eslint-plugin-react/lib/util/error.js";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get('authToken') || null);
    const [cartList, setCartList] = useState(() => {
        try {
            const storedCart = Cookies.get('cartList');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Failed to parse cartList from cookies:", error);
            return [];
        }
    });

    const handleGetUserDetails = async () => {
        try {
            return await fetchUserDetails(token);
        } catch (error) {
            console.error("Get user details failed:", error.message);
            return null;
        }
    }

    const handleRegister = async (username, email, password) => {
        try {
            const { token: authToken } = await registerUser(username, email, password);
            setToken(authToken);

            return '';
        } catch (error) {
            console.error("Register failed:", error.message);
            setToken(null);

            return error.message;
        }
    };

    const handleLogin = async (username, password) => {
        try {
            const { token: authToken } = await loginUser(username, password);
            setToken(authToken);

            return '';
        } catch (error) {
            console.error("Login failed:", error.message);
            setToken(null);

            return error.message;
        }
    };

    const handleLogout = () => {
        setToken(null);
        setCartList([]);
    };

    const handleChangePassword = async (currentPassword, newPassword) => {
        try {
            await changeUserPassword(token, currentPassword, newPassword);
            return '';
        } catch (error) {
            console.error("Change password failed:", error.message);
            return error.message;
        }
    }

    const handleGetCart = async () => {
        try {
            const { items } = await getCart(token);
            setCartList(items);

            return items.length;
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setCartList([]);

            return 0;
        }
    }

    const handlePostCart = async (item_id) => {
        try {
            const { items } = await postCart(token, item_id);
            setCartList(items);

            return '';
        } catch (error) {
            console.error("Add to cart failed:", error.message);
            return error.message;
        }
    }

    const handleRemoveCartItem = async (item_id) => {
        try {
            const { items } = await putCart(token, item_id);
            setCartList(items);

            return '';
        } catch (error) {
            console.error("Remove item failed: ", error.message);
            return error.message;
        }
    }

    const handleDeleteCart = async () => {
        try {
            await deleteCart(token);
            setCartList([]);

            return '';
        } catch (error) {
            console.error("Delete cart failed: ", error.message);
            return error.message;
        }
    }

    useEffect(() => {
        if (token) {
            Cookies.set('authToken', token, { expires: 1 });
        } else {
            Cookies.remove('authToken');
        }
    }, [token]);

    useEffect(() => {
        if (cartList.length > 0) {
            Cookies.set('cartList', JSON.stringify(cartList), { expires: 1 });
        } else {
            Cookies.remove('cartList');
        }
    }, [cartList]);

    return (
        <UserContext.Provider value={{ token, setToken, cartList, setCartList, handleGetUserDetails, handleLogin, handleRegister, handleLogout, handleChangePassword, handleGetCart, handlePostCart, handleRemoveCartItem, handleDeleteCart }}>
            {children}
        </UserContext.Provider>
    );
};
