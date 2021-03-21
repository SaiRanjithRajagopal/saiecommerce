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
        if (user && user._id) {
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


                <div className="container container-fluid">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={loginHandler}>
                                <h1 className="mb-3" id="loginHeader">Login</h1>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        placeholder="Email Address"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)} />
                                </div>
                                <br />
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password} />
                                </div>

                                <button
                                    id="login_btn"
                                    type="submit"
                                    className="btn btn-block py-3" style={{ fontWeight: 'bold' }}>Login</button>
                                <br /> <br />

                                <div className="row">
                                    <div className="col">
                                        <NavLink to="/User/ForgotPassword" type="button" style={{ color: 'black' }}>Forgot Password</NavLink>
                                    </div>
                                    <div className="col"></div>
                                    <div className="col">
                                        <NavLink to="/User/Register" className="float-right mb-4" type="button" style={{ color: 'black', marginLeft: 20 }}>Create Account</NavLink>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>)
            }
        </React.Fragment >
    )
}

export default Login;


// <div className="form-signin text-center">
                //     <h1 className="h3 mb-3 fw-normal">User Login</h1>
                //     <br />
                //     <form onSubmit={loginHandler} className="shadow-lg">
                //         <div className="container">
                //             <input type="text"
                //                 placeholder="Username"
                //                 className="form-control"
                //                 value={userName}
                //                 onChange={(e) => setUserName(e.target.value)}
                //             />

                //             <input type="password"
                //                 placeholder="Password"
                //                 className="form-control"
                //                 onChange={(e) => setPassword(e.target.value)}
                //                 value={password} />
                //             <br />
                //             <button type="submit" className="btn btn-info">Login</button>
                //         </div>
                //     </form>
                //     <br />
                //     <div className="row">
                //         <div className="col">
                //             <NavLink to="/User/ForgotPassword" className="btn btn-primary" type="button">Forgot Password</NavLink>
                //         </div>
                //         <div className="col">
                //             <NavLink to="/User/Register" className="btn btn-warning" type="button">Register User</NavLink>
                //         </div>
                //     </div>
                // </div>