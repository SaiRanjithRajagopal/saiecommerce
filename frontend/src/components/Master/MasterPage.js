import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './MasterPage.scss';
import MenuBar from './NavBar/MenuBar';
import HomePage_BodyContent from '../Home/Body/BodyContent';
import About from '../About/AboutPage';
import Products from '../Products/All_Products/ProductsPage';
import WhyUs from '../WhyUs/WhyusPage';
import TestimonialPage from '../Testimonial/TestimonialPage';
import ProductInfo from '../Products/Product_Details/ProductInfo';
import Login from '../User/Login'
import RegisterUser from '../User/RegisterUser'
import ResetPassword from '../User/ForgotPassword'
import UpdatePassword from '../User/UpdatePassword'

const MasterPage = () => {
    return (
        <Router>
            <div className="hero_area">
                <MenuBar />
                <div>
                    <Route path="/About" component={About} exact />
                    <Route path="/Products" component={Products} exact />
                    <Route path="/Products/:keyword" component={Products} exact />
                    <Route path="/WhyUs" component={WhyUs} exact />
                    <Route path="/Testimonial" component={TestimonialPage} exact />
                    <Route path="/ProductInfo/:id" component={ProductInfo} exact />
                    <Route path="/User/Login" component={Login} exact />
                    <Route path="/User/Register" component={RegisterUser} exact />
                    <Route path="/User/ResetPassword" component={ResetPassword} exact />
                    <Route path="/User/UpdatePassword/:link" component={UpdatePassword} exact />
                    <Route path="/" component={HomePage_BodyContent} exact />
                </div>
            </div>
        </Router>
    )
}

export default MasterPage;
