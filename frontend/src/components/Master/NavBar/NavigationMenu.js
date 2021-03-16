import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavigationMenu.css'

const menu = () => {

    return (
        <React.Fragment>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ">
                    <li className="nav-item active">
                        <NavLink to="/" className="nav-link active">Home<span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/About" className="nav-link">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <a className="dropdown-toggle nav-link" data-toggle="dropdown" href="#">Products
                        <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <NavLink to="/Products" className="nav-link overrideCss_NavBar_DropDownMenu" style={{ color: 'black' }}>Product</NavLink>
                            <NavLink to="/Product/CreateNew" className="nav-link overrideCss_NavBar_DropDownMenu" style={{ color: 'black' }}>Create Product</NavLink>
                            <NavLink to="/Product/UpdateExisting" className="nav-link overrideCss_NavBar_DropDownMenu" style={{ color: 'black' }}>Update Product</NavLink>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/WhyUs" className="nav-link">Why Us</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Testimonial" className="nav-link">Testimonial</NavLink>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default menu
