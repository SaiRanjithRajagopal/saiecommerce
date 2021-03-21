import React from 'react'
import { Link } from 'react-router-dom'

const contact = () => {
    return (
        <React.Fragment>
            <div className="contact_nav">
                {/* <Link to="/">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    <span>Call : +01 123455678990</span>
                </Link> */}
                <Link to="/">
                    <i className="fa fa-envelope" aria-hidden="true" style={{ marginRight: 5 }}></i>
                    <span>Email : sairam@gmail.com</span>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default contact
