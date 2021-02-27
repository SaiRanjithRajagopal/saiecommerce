import { BrowserRouter as Router, Route } from 'react-router-dom'
import Carousel from 'react-bootstrap/Accordion'


import './MasterPage.scss';
import Contact from './NavBar/Contact'
import Search from './NavBar/Search'
import UserAccount from './NavBar/UserAccount'
import CompanyName from './NavBar/CompanyName'
import Menu from './NavBar/Menu'
import HomePage_BodyContent from '../Home/Body/BodyContent'
import Products from '../Products/ProductsPage'
import About from '../About/AboutPage'
import WhyUs from '../WhyUs/WhyusPage'
import TestimonialPage from '../Testimonial/TestimonialPage'

const MasterPage = () => {
    return (
        <Router>
            <div className="hero_area">
                <div>
                    <header className="header_section">
                        <div className="header_top">
                            <div className="container-fluid">
                                <div className="top_nav_container">
                                    <Contact />
                                    <Search />
                                    <UserAccount />
                                </div>
                            </div>
                        </div>
                        <div className="header_bottom">
                            <div className="container-fluid">
                                <nav className="navbar navbar-expand-lg custom_nav-container ">
                                    <CompanyName />
                                    <Menu />
                                </nav>
                            </div>
                        </div>
                    </header>
                </div>
                <div>
                    <Route path="/Products" component={Products} exact />
                    <Route path="/About" component={About} exact />
                    <Route path="/WhyUs" component={WhyUs} exact />
                    <Route path="/Testimonial" component={TestimonialPage} exact />
                    <Route path="/" component={HomePage_BodyContent} exact />
                </div>
            </div>
        </Router>
    )
}

export default MasterPage;
