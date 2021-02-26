import React from 'react'

const useraccount = () => {
    return (
        <React.Fragment>
            <div className="user_option_box">
                <a href="" className="account-link">
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <span>My Account</span>
                </a>
                <a href="" className="cart-link">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    <span>Cart</span>
                </a>
            </div>
        </React.Fragment>
    )
}

export default useraccount
