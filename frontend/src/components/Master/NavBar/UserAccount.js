import React from 'react'
import { Link } from 'react-router-dom'

const UserAccount = () => {
    return (
        <div className="user_option_box" >
            <Link className="account-link" to="/User/Login" >
                <i className="fa fa-user" aria-hidden="true"></i>
                <span>My Account</span>
            </Link>
            <Link className="cart-link" to="/" >
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                <span>Cart</span>
            </Link>
        </div>
    )
}

export default UserAccount

