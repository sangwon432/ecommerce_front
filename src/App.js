import React from 'react';
import ProductList from "./pages/ProductList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductCreate from "./pages/ProductCreate";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/profile";
import ForgotPW from "./pages/forgotPW";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProductList/>}/>
                    <Route path={"/:id"} element={<ProductCreate/>}/>
                    <Route path={"/create"} element={<ProductCreate/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/signup"} element={<Signup/>}/>
                    <Route path={"/profile"} element={<Profile/>}/>
                    <Route path={"/forgot/password"} element={<ForgotPW/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;