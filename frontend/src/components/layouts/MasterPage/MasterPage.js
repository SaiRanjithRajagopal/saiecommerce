import React, { Fragment } from 'react'

const Header = () => {
    return (
        <div className="hero_area">
            <header className="header_section">
                <div class="header_top">
                    <div class="container-fluid">
                        <div class="top_nav_container">
                            <div class="contact_nav">
                                <a href="">
                                    <i class="fa fa-phone" aria-hidden="true"></i>
                                    <span>Call : +01 123455678990</span>
                                </a>
                                <a href="">
                                    <i class="fa fa-envelope" aria-hidden="true"></i>
                                    <span>Email : demo@gmail.com</span>
                                </a>
                            </div>
                            <from class="search_form">
                                <input type="text" class="form-control" placeholder="Search here...">
                                    <button class="" type="submit">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                    </button>
                            </from>
                                <div class="user_option_box">
                                    <a href="" class="account-link">
                                        <i class="fa fa-user" aria-hidden="true"></i>
                                        <span>My Account</span>
                                    </a>
                                    <a href="" class="cart-link">
                                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                        <span>Cart</span>
                                    </a>
                                </div>
                        </div>
                        </div>
                    </div>
            </header>
        </div>
    )
}

export default Header;