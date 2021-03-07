import React from 'react'
import { Route } from 'react-router-dom'
import Contact from './Contact'
import SearchProduct from './SearchProduct'
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
                                <Route render={({ history }) => <SearchProduct history={history} />} />
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
