import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { NavLink } from 'react-router-dom';

import './Login.css'

import Spinner from '../Loader/Spinner'
import { authenticateUser, clearErrors } from '../Redux_Thunk/Actions/UserAction'


const Login = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const { loading, isAuthenticated, error } = useSelector(state => state.userAuthentication);

    useEffect(() => {

        if (isAuthenticated) {
            history.push('/');
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, isAuthenticated, error, history]);

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(authenticateUser(userName, password));
    }

    return (
        <React.Fragment>
            {loading ? <Spinner /> : (
                <div className="form-signin text-center">
                    <form onSubmit={loginHandler}>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                        <label htmlFor="inputEmail" className="visually-hidden">Email address</label>

                        <input type="email" id="inputEmail"
                            className="form-control"
                            placeholder="Email address" required
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />

                        <label htmlFor="inputPassword" className="visually-hidden">Password</label>

                        <input type="password"
                            id="inputPassword"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Password" required />
                        <button className="btn btn-success" type="submit">Sign in</button>
                    </form>
                    <br />
                    <div className="row">
                        <div className="col">
                            <NavLink to="/User/ResetPassword" className="btn btn-primary" type="button">Reset Password</NavLink>
                        </div>
                        <div className="col">
                            <NavLink to="/User/Register" className="btn btn-warning" type="button">Register</NavLink>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default Login
