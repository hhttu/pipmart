import { NavBar } from "@components/NavBar/NavBar.jsx";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage.jsx";
import { AccountPage } from "./pages/AccountPage/AccountPage.jsx";
import { HomePage } from "./pages/HomePage/HomePage.jsx";
import { CartPage } from "./pages/CartPage/CartPage.jsx";
import { ProductDetailPage } from "./pages/ProductDetailPage/ProductDetailPage.jsx";

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [userId, setUserId] = useState("");
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        setIsLogin(false);
        setCartItemCount(5);
    }, [])

    return (
        <>
            <NavBar isLogin={isLogin} cartItemCount={cartItemCount} />
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<LoginPage/>} />
                    <Route path='/account' element={<AccountPage/>} />
                    <Route path='/cart' element={<CartPage/>} />
                    <Route path='/product/:id' element={<ProductDetailPage/>} />
                    <Route path='/' element={<HomePage/>} />

                    <Route element={<Navigate to='/' />} path="*" />
                </Routes>
            </BrowserRouter>
        </>
      )
}

export default App
