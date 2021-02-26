import Carousel from 'react-bootstrap/Accordion'
import './MasterPage.scss';
import Contact from './NavBar/Contact'
import Search from './NavBar/Search'
import UserAccount from './NavBar/UserAccount'
import CompanyName from './NavBar/CompanyName'
import Menu from './NavBar/Menu'
import BodyContent from './Body/BodyContent'

const MasterPage = () => {
    return (
        <div className="hero_area">
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
            <BodyContent />
        </div>
    )
}

export default MasterPage;
