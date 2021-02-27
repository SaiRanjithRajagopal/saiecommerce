import React from 'react'
import { Link } from 'react-router-dom'

const AboutPage = () => {
    return (
        <div>
            <section className="about_section">
                <div className="container-fluid  ">
                    <div className="row">
                        <div className="col-md-5 ml-auto">
                            <div className="detail-box pr-md-3">
                                <div className="heading_container">
                                    <h2>We Provide Best For You</h2>
                                </div>
                                <p>Totam architecto rem beatae veniam, cum officiis adipisci soluta perspiciatis ipsa, expedita maiores quae accusantium. Animi veniam aperiam, necessitatibus mollitia ipsum id optio ipsa odio ab facilis sit labore officia!
                                    Repellat expedita, deserunt eum soluta rem culpa. Aut, necessitatibus cumque. Voluptas consequuntur vitae aperiam animi sint earum, ex unde cupiditate, molestias dolore quos quas possimus eveniet facilis magnam? Vero, dicta.</p>
                                <Link to="/">Read More</Link>
                            </div>
                        </div>
                        <div className="col-md-6 px-0">
                            <div className="img-box">
                                <img src="images/about-img.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="info_section ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="info_contact">
                                <h5>
                                    <Link to="/Home" className="navbar-brand">
                                        <span>Minics</span>
                                    </Link>
                                </h5>
                                <p><i className="fa fa-map-marker" aria-hidden="true"></i>Address</p>
                                <p><i className="fa fa-phone" aria-hidden="true"></i>+01 1234567890</p>
                                <p><i className="fa fa-envelope" aria-hidden="true"></i>demo@gmail.com</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="info_info">
                                <h5>Information</h5>
                                <p>Eligendi sunt, provident, debitis nemo, facilis cupiditate velit libero dolorum aperiam enim nulla iste maxime corrupti ad illo libero minus.</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="info_links">
                                <h5>Useful Link</h5>
                                <ul>
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/About">About</Link>
                                    </li>
                                    <li>
                                        <Link to="/Products">Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/WhyUs">WhyUs</Link>
                                    </li>
                                    <li>
                                        <Link to="/Testimonial">Testimonial</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="info_form ">
                                <h5>Newsletter</h5>
                                <form action="">
                                    <input type="email" placeholder="Enter your email" />
                                    <button>Subscribe</button>
                                </form>
                                <div className="social_box">
                                    <Link to="/">
                                        <i className="fa fa-facebook" aria-hidden="true"></i>
                                    </Link>
                                    <Link to="/">
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </Link>
                                    <Link to="/">
                                        <i className="fa fa-instagram" aria-hidden="true"></i>
                                    </Link>
                                    <Link to="/">
                                        <i className="fa fa-youtube" aria-hidden="true"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="footer_section">
                <div className="container">
                    <p>&copy;<span id="displayYear"></span>All Rights Reserved By
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default AboutPage;
