import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './MasterPage.scss';

import store from './../Redux_Thunk/Store';
import MenuBar from './NavBar/MenuBar';
import HomePage_BodyContent from '../Home/Body/BodyContent';
import About from '../About/AboutPage';
import Products from '../Products/All_Products/ProductsPage';
import WhyUs from '../WhyUs/WhyusPage';
import TestimonialPage from '../Testimonial/TestimonialPage';
import ProductInfo from '../Products/Product_Details/ProductInfo';
import Login from '../User/Login'
import RegisterUser from '../User/RegisterUser'
import ForgotPassword from '../User/ForgotPassword'
import ResetPassword from '../User/ResetPassword'
import Display_Products from '../Products/Update_Product/Display_Products'
import Create_Products from '../Products/CreateProduct/NewProduct'
import { loadUser } from '../Redux_Thunk/Actions/UserAction';
import Update_UserProfile from '../User/Update_UserProfile'
import ProtectedRoute from '../Route/ProtectedRoute'
import UpdatePassword from '../User/UpdatePassword'
import GetAllOrder from '../Orders/GetOrders'

const MasterPage = () => {

    const { user } = useSelector(state => state.userAuthentication);

    useEffect(() => {
        //if (typeof user !== 'undefined' && user !== null && typeof user.email !== 'undefined') {
        store.dispatch(loadUser());
        //}
    }, []);

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
                    <Route path="/User/ForgotPassword" component={ForgotPassword} exact />
                    <Route path="/User/ResetPassword/:link" component={ResetPassword} exact />
                    <ProtectedRoute path="/User/UpdateProfile" component={Update_UserProfile} exact />
                    <ProtectedRoute path="/User/UpdatePassword" component={UpdatePassword} exact />
                    <ProtectedRoute path="/AdminUser/GetAllOrders" component={GetAllOrder} exact />
                    <Route path="/Product/UpdateExisting" component={Display_Products} exact />
                    <Route path="/Product/CreateNew" component={Create_Products} exact />
                    <Route path="/" component={HomePage_BodyContent} exact />
                </div>
            </div>
        </Router>
    )
}

export default MasterPage;
