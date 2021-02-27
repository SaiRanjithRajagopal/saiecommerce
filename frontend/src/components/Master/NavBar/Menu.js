import React from 'react'
import { NavLink } from 'react-router-dom'

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
                        <NavLink to="/Products" className="nav-link">Product</NavLink>
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
