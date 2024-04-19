import React from 'react';
import ProductList from "./pages/ProductList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductCreate from "./pages/ProductCreate";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/profile";
import ForgotPW from "./pages/forgotPW";
import ChangePW from "./pages/changePW";
import {CookiesProvider} from "react-cookie";
import ProfileCreate from "./pages/ProfileCreate";
import EducationCreate from "./pages/EducationCreate";
import SelfIntroductionCreate from "./pages/SelfIntroductionCreate";

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
                        <Route path={"/change/password"} element={<ChangePW/>}/>
                        <Route path={"/profile/create"} element={<ProfileCreate/>}/>
                        <Route path={"/education/create"} element={<EducationCreate/>}/>
                        <Route path={"/self-introduction/create"} element={<SelfIntroductionCreate/>}/>
                    </Routes>
                </BrowserRouter>

        </div>
    );
};

export default App;