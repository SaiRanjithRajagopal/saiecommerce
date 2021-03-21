import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import Spinner from '../Loader/Spinner'
import { resetUserPassword } from '../Redux_Thunk/Actions/UserAction'

const ResetPassword = ({ match, history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { loading, success } = useSelector(state => state.updatePassword);

    useEffect(() => {

        if (success == false) {
            return alert.error('Internal Server error');
        }

        if (success) {
            history.push('/');
        }

    }, [dispatch, alert, success]);

    const updateNewPassword_Handler = (e) => {
        e.preventDefault();
        dispatch(resetUserPassword(password, confirmPassword, match.params.link));
    };

    return (
        <React.Fragment>
            {loading ? <Spinner /> : (
                <div className="form-signin text-center">
                    <form onSubmit={updateNewPassword_Handler}>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                        <label htmlFor="inputPassword" className="visually-hidden">Email address</label>
                        <input type="text" id="inputPassword"
                            className="form-control"
                            placeholder="New Password" required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label htmlFor="inputConfirmPassword" className="visually-hidden">Password</label>
                        <input type="text"
                            id="inputConfirmPassword"
                            className="form-control"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            placeholder="Confirm New Password" required />
                        <br />
                        <br />
                        <button className="btn btn-success" type="submit">Reset Password</button>
                    </form>
                    <br />
                </div>
            )}
        </React.Fragment>
    )
}

export default ResetPassword;
