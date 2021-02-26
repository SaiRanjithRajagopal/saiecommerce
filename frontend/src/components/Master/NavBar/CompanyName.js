import React from 'react'
import { Link } from 'react-router-dom'

const companyname = () => {
    return (
        <React.Fragment>
            <Link className="navbar-brand" to="/">
                <Link to="/" className="nav-link"><span>Minics</span></Link>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className=""> </span>
            </button>
        </React.Fragment>
    )
}

export default companyname
