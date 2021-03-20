import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import { logout_User } from '../../Redux_Thunk/Actions/UserAction';

const UserAccount = () => {

    const dispatch = useDispatch();
    const { loading, isAuthenticated, error, user } = useSelector(state => state.userAuthentication);

    const userlogout = () => {
        dispatch(logout_User());
    }

    return (
        <div className="user_option_box" >
            <Link className="cart-link" to="/" >
                {/* <i className="fa fa-shopping-cart" aria-hidden="true"></i> */}
                <span style={{ color: '#f3c93e', fontWeight: 'bold' }}>2</span>
                <span>Cart</span>
            </Link>
            {
                user ? (<div id="mydiv" className="account-link dropdown transparentbar" style={{ "zindex": 4 }}>
                    <button className="btn btn-default dropdown-toggle" type="button" id="mybyn" style={{ color: 'white' }} data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        <img src={user.avatar && user.avatar.url} className="avatar" style={{ width: 25, height: 25 }} /><span style={{ marginLeft: 5 }}>My Account</span><span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                        <Link to="/User/UpdateProfile" className="nav-link overrideCss_NavBar_DropDownMenu" style={{ color: 'black', 'textTransform': 'none' }}>My Profile</Link>
                        {
                            user && user.role !== 'admin' ?
                                (<Link to="/" className="nav-link overrideCss_NavBar_DropDownMenu" style={{ color: 'black', 'textTransform': 'none' }}>Orders</Link>)
                                : (<Link to="/" className="nav-link overrideCss_NavBar_DropDownMenu" style={{ color: 'black', 'textTransform': 'none' }}>DashBoard</Link>)
                        }
                        <Link to="/" onClick={userlogout}
                            className="nav-link overrideCss_NavBar_DropDownMenu"
                            style={{ color: 'black', 'textTransform': 'none' }}>Log Out</Link>
                    </ul>
                </div>) : !loading && (
                    <Link className="account-link" to="/User/Login" >
                        <i className="fa fa-user" aria-hidden="true"></i>
                        <span >Login</span>
                    </Link>

                )
            }
        </div>
    )
}

export default UserAccount

