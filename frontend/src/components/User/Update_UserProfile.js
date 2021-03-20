import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'

import Spinner from '../Loader/Spinner';
import { updateUserProfile } from '../Redux_Thunk/Actions/UserAction'

const selectOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' }
]

const Update_UserProfile = () => {

    const dispatch = useDispatch();
    const { loading, error, user } = useSelector(state => state.userAuthentication);
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(user && user.avatar && user.avatar.url !== '' ? user.avatar.url : '/Images/profileImage.png');
    const [updateUser, setUpdateUser] = useState({
        name: user && user.name ? user.name : '',
        email: user && user.email ? user.email : '',
        role: user && user.role ? user.role : ''
    });

    const { name, email, role } = updateUser;

    const saveUser = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);

        if (user && user.role === 'admin') {
            formData.append('role', role);
        }

        formData.append('avatar', avatar);
        console.log(formData);
        dispatch(updateUserProfile(formData));
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
            setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
        }
    }

    const selectOnChange = (selectedOption) => {
        if (user && user.role === 'admin' && selectedOption) {
            setUpdateUser({ ...updateUser, role: selectedOption.role });
        }
    }

    return (
        <React.Fragment>
            {loading ? <Spinner /> : (<div className="container" style={{ marginTop: 25 }}>
                <form onSubmit={saveUser}>
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col">
                                    <img src={avatarPreview} alt="Avatar" style={{ width: 200, borderRadius: 50 }} />
                                </div>
                            </div>
                            <div className="row">
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
                        <div className="col">
                            <h1 className="h3 mb-3 fw-normal">Update User</h1>

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
                                disabled
                            />
                            {user && user.role === 'admin' ? (<div><label htmlFor="inputPassword" className="visually-hidden">Password</label>
                                <Select
                                    options={selectOptions}
                                    onChange={selectOnChange}
                                    value={selectOptions.filter(option => option.value === updateUser.role)}
                                /></div>) : ""}
                            <br />
                            <div style={{ textAlign: 'center' }}>
                                <button className="btn btn-success" type="submit" disabled={loading ? true : false}>Update</button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>)}
        </React.Fragment>
    )
}

export default Update_UserProfile;
