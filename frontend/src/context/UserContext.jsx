import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [isLogin, setIsLogin] = useState(userId !== null);
    const [cartList, setCartList] = useState(() => {
        try {
            const storedCart = localStorage.getItem('cartList');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Failed to parse cartList from localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        if (userId) {
            localStorage.setItem('userId', userId);
        } else {
            localStorage.removeItem('userId');
            setCartList([]);
        }

        setIsLogin(userId !== null);
    }, [userId]);

    useEffect(() => {
        if (cartList.length > 0) {
            localStorage.setItem('cartList', JSON.stringify(cartList));
        } else {
            localStorage.removeItem('cartList');
        }
    }, [cartList])

    return (
        <UserContext.Provider value={{ userId, setUserId, isLogin, setIsLogin, cartList, setCartList }}>
            {children}
        </UserContext.Provider>
    );
};
