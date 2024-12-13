import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getCart, loginUser, postCart } from "@api";

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
        <UserContext.Provider value={{ token, setToken, cartList, setCartList, handleLogin, handleLogout, handleGetCart, handlePostCart }}>
            {children}
        </UserContext.Provider>
    );
};
