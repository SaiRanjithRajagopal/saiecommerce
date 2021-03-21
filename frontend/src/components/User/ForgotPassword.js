import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import './Login.css'

import Spinner from '../Loader/Spinner'
import { forgotUserPassword, clearErrors } from '../Redux_Thunk/Actions/UserAction'

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [email, setEmail] = useState('');
    const { loading, error } = useSelector(state => state.forgotPassword);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error]);

    const resetPassword_Handler = (e) => {
        e.preventDefault();
        dispatch(forgotUserPassword(email));
    }

    return (
        <div className="form-signin text-center">
            <form onSubmit={resetPassword_Handler}>
                <h1 className="h3 mb-3 fw-normal">Reset Password</h1>

                <label htmlFor="inputEmail" className="visually-hidden">Email address</label>
                <input type="email" id="inputEmail"
                    className="form-control"
                    placeholder="Email address" required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <button className="btn btn-success" type="submit">Reset Password</button>
            </form>
        </div>
    )
}

export default ForgotPassword;
