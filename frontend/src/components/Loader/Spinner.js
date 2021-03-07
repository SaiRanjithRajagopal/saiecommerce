import React from 'react'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './Spinner.css'

const Spinner = () => {
    return (
        <div className='spinner-Align-Center'>
            <Loader type="Circles" color="#3a4468" height={160} width={160} />
        </div>
    )
}

export default Spinner
