import React from 'react'
import { Link } from 'react-router-dom'

const menu = () => {
    return (
        <React.Fragment>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link">Home<span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/About" className="nav-link">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Products" className="nav-link">Product</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/WhyUs" className="nav-link">Why Us</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Testimonial" className="nav-link">Testimonial</Link>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default menu
