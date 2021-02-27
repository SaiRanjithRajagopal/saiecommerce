import React from 'react'
import Contact from './Contact'
import Search from './Search'
import UserAccount from './UserAccount'
import CompanyName from './CompanyName'
import NavigationMenu from './NavigationMenu'

const MenuBar = () => {
    return (
        <React.Fragment>
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
                                <NavigationMenu />
                            </nav>
                        </div>
                    </div>
                </header>
            </div>
        </React.Fragment>
    )
}

export default MenuBar
