import React, { useState } from 'react'


const SearchProduct = ({ history }) => {

    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/Products/${keyword}`)
        } else {
            history.push(`/`)
        }
    }

    return (
        <React.Fragment>
            <form onSubmit={searchHandler}>
                <div className="search_form">
                    <input type="text" className="form-control" placeholder="Search here..." onChange={(e) => setKeyword(e.target.value)} />
                    <button className="" type="submit">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default SearchProduct
