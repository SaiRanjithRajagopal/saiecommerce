import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { NavLink } from 'react-router-dom';

import './Login.css'

import Spinner from '../Loader/Spinner';
import { registerUser, clearErrors } from '../Redux_Thunk/Actions/UserAction'

const RegisterUser = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const { loading, user, error, newUserCreated } = useSelector(state => state.newUser);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, newUserCreated]);

    const registerNewUser = (e) => {
        e.preventDefault();
        dispatch(registerUser(userName, password, name));
    }

    return (
        <React.Fragment>
            {loading ? <Spinner /> : (
                <div className="form-signin text-center">
                    <form onSubmit={registerNewUser}>
                        <h1 className="h3 mb-3 fw-normal">User Register Page</h1>

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

                        <label htmlFor="inputName" className="visually-hidden">Name</label>
                        <input type="text"
                            id="inputName"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Name" required />
                        <br />

                        <button className="btn btn-success" type="submit">Register</button>
                    </form>
                    <br />
                    <div className="col">
                        <NavLink to="/User/Login" className="btn btn-warning" type="button">Login</NavLink>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default RegisterUser;
