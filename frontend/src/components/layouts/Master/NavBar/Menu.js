import React from 'react'

const menu = () => {
    return (
        <React.Fragment>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ">
                    <li className="nav-item active">
                        <a className="nav-link" href="index.html">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="about.html"> About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="product.html">Products</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="why.html">Why Us</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="testimonial.html">Testimonial</a>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default menu
