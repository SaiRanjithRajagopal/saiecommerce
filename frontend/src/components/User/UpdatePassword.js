import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../Loader/Spinner';
import { updateUserPassword, logout_User } from '../Redux_Thunk/Actions/UserAction'

const UpdatePassword = ({ history }) => {

    const dispatch = useDispatch();
    const { loading, success } = useSelector(state => state.updatePassword);

    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const { oldPassword, newPassword, confirmNewPassword } = password;

    const onChange_Handler = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const updatePassword_Handler = (e) => {
        e.preventDefault()
        if (password.newPassword === password.confirmNewPassword) {
            dispatch(updateUserPassword(password.oldPassword, password.newPassword));
        }
        else {
            console.log('password dont match')
        }
        //Add Validation Password not matched
    };

    return (
        <React.Fragment>
            {loading ? <Spinner /> : (<div className="container" style={{ marginTop: 25 }}>
                <form onSubmit={updatePassword_Handler}>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-6">
                            <h1 className="h3 mb-3 fw-normal">Update Password</h1>

                            <input type="text"
                                id="inputOldPassword"
                                className="form-control"
                                onChange={onChange_Handler}
                                value={oldPassword}
                                name="oldPassword"
                                placeholder="oldPassword" required />

                            <input type="text"
                                id="inputNewPassword"
                                className="form-control"
                                onChange={onChange_Handler}
                                value={newPassword}
                                name="newPassword"
                                placeholder="New Password" required />

                            <input type="text" id="inputConfirmNewPassword"
                                className="form-control"
                                placeholder="Confirm New Password" required
                                value={confirmNewPassword}
                                name="confirmNewPassword"
                                onChange={onChange_Handler}
                            />
                            <br />
                            <div style={{ textAlign: 'center' }}>
                                <button className="btn btn-success" type="submit" disabled={loading ? true : false} style={{ marginRight: 20 }}>Update Profile</button>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                </form>
            </div>)}
        </React.Fragment>
    )
}

export default UpdatePassword
