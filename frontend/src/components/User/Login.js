import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { NavLink } from 'react-router-dom';

import './Login.css'
// const profileImage = require('../../../public/Images/profileImage.png');

import Spinner from '../Loader/Spinner'
import { authenticateUser, clearErrors } from '../Redux_Thunk/Actions/UserAction'


const Login = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const { loading, isAuthenticated, error, user } = useSelector(state => state.userAuthentication);

    useEffect(() => {
        console.log(`user - ${user.email}`);
        if (user) {
            history.push('/');
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, isAuthenticated, error, history, user]);

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(authenticateUser(userName, password));
    }

    return (
        <React.Fragment>
            {loading ? <Spinner /> : (
                <div className="form-signin text-center">
                    <h1 className="h3 mb-3 fw-normal">User Login</h1>
                    <br />
                    <form onSubmit={loginHandler}>
                        <div className="container">
                            <input type="text"
                                placeholder="Username"
                                className="form-control"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />

                            <input type="password"
                                placeholder="Password"
                                className="form-control"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password} />
                            <br />
                            <button type="submit" className="btn btn-info">Login</button>
                        </div>
                    </form>
                    <br />
                    <div className="row">
                        <div className="col">
                            <NavLink to="/User/ResetPassword" className="btn btn-primary" type="button">Reset Password</NavLink>
                        </div>
                        <div className="col">
                            <NavLink to="/User/Register" className="btn btn-warning" type="button">Register User</NavLink>
                        </div>
                    </div>
                </div>
            )
            }
        </React.Fragment >
    )
}

export default Login
