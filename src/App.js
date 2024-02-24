import React from 'react';
import ProductList from "./pages/ProductList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import ProductCreate from "./pages/ProductCreate";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProductList/>}/>
                    <Route path={"/:id"} element={<ProductDetail/>}/>
                    <Route path={"/create"} element={<ProductCreate/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;