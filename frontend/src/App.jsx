import { NavBar } from "@components/common/NavBar/NavBar.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage.jsx";
import { AccountPage } from "./pages/AccountPage/AccountPage.jsx";
import { HomePage } from "./pages/HomePage/HomePage.jsx";
import { CartPage } from "./pages/CartPage/CartPage.jsx";
import { ProductDetailPage } from "./pages/ProductDetailPage/ProductDetailPage.jsx";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage.jsx";

function App() {
    return (
        <>
            <NavBar />
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
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
