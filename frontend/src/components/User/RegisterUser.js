import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { NavLink } from 'react-router-dom';

import './Login.css'
import './RegisterUser.css'

import Spinner from '../Loader/Spinner';
import { registerUser, clearErrors } from '../Redux_Thunk/Actions/UserAction'

const RegisterUser = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/Images/profileImage.png');
    const { loading, error, user } = useSelector(state => state.userAuthentication);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { name, email, password } = newUser;

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (user) {
            history.push('/');
        }
    }, [dispatch, alert, error, newUser]);

    const registerNewUser = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('avatar', avatar);
        console.log(formData);
        dispatch(registerUser(formData));
    }

    const onChange = e => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            setNewUser({ ...newUser, [e.target.name]: e.target.value });
        }
        console.log(newUser);
    }

    return (
        <React.Fragment>
            {loading ? <Spinner /> : (
                <div className="form-signin text-center">
                    <br />
                    <form onSubmit={registerNewUser}>
                        <h1 className="h3 mb-3 fw-normal">User Register Page</h1>

                        <label htmlFor="inputName" className="visually-hidden">Name</label>
                        <input type="text"
                            id="inputName"
                            className="form-control"
                            onChange={onChange}
                            value={name}
                            name="name"
                            placeholder="Name" required />

                        <label htmlFor="inputEmail" className="visually-hidden">Email address</label>
                        <input type="email" id="inputEmail"
                            className="form-control"
                            placeholder="Email address" required
                            value={email}
                            name="email"
                            onChange={onChange}
                        />

                        <label htmlFor="inputPassword" className="visually-hidden">Password</label>
                        <input type="password"
                            id="inputPassword"
                            className="form-control"
                            onChange={onChange}
                            value={password}
                            name="password"
                            placeholder="Password" required />
                        <br />
                        <div className='d-flex laign-items-center'>
                            <div className="row">
                                <div className="col">
                                    <img src={avatarPreview} className="avatar" />
                                </div>
                                <div className="col">
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        style={{ marginTop: 10, marginLeft: 10 }}
                                        alt='customFile'
                                        accept='images/*'
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <br />

                        <button className="btn btn-success" type="submit" disabled={loading ? true : false}>Register</button>
                    </form>
                    <br />
                </div>
            )}
        </React.Fragment>
    )
}

export default RegisterUser;
