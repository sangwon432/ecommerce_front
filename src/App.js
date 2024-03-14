import React from 'react';
import ProductList from "./pages/ProductList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductCreate from "./pages/ProductCreate";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;