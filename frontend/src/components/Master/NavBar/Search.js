import React from 'react'

const search = () => {
    return (
        <React.Fragment>
            <div className="search_form">
                <input type="text" className="form-control" placeholder="Search here..." />
                <button className="" type="submit">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
        </React.Fragment>
    )
}

export default search
