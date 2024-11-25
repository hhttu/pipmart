import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [isLogin, setIsLogin] = useState(userId !== null);
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        if (userId) {
            localStorage.setItem('userId', userId); // Save userId to localStorage
        } else {
            localStorage.removeItem('userId'); // Remove userId from localStorage if logged out
        }

        setIsLogin(userId !== null);
        setCartItemCount(0);
    }, [userId]);

    return (
        <UserContext.Provider value={{ userId, setUserId, isLogin, setIsLogin, cartItemCount, setCartItemCount }}>
            {children}
        </UserContext.Provider>
    );
};
