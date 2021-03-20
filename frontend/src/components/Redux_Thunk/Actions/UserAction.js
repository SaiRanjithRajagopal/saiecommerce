import axios from 'axios';

import {
    CLEAR_ERRORS,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CREATE_NEW_USER_REQUEST,
    CREATE_NEW_USER_SUCCESS,
    CREATE_NEW_USER_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    UPDATE_USERPROFILE_REQUEST,
    UPDATE_USERPROFILE_SUCCESS,
    UPDATE_USERPROFILE_FAIL
} from '../../../constants/UserConstants';

export const registerUser = (formData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_NEW_USER_REQUEST });
        const config = {
            headers: { "Content-Type": "multipart/form-data" }
        }
        const { data } = await axios.post(`/api/v1/user/register`, formData, config);

        dispatch({
            type: CREATE_NEW_USER_SUCCESS,
            payload: data.user
        })
    }
    catch (error) {
        console.log(error.response.data);
        dispatch({
            type: CREATE_NEW_USER_FAIL,
            payload: error.response.data.message
        })
    }
};

export const authenticateUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/v1/user/login`, { email, password }, config);
        console.log(data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
    }
    catch (error) {
        console.log(error);
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
};

export const updateUserProfile = (formData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USERPROFILE_REQUEST });
        const config = {
            headers: { "Content-Type": "multipart/form-data" }
        }
        const { data } = await axios.put(`/api/v1/user/updateprofile`, formData, config);

        dispatch({
            type: UPDATE_USERPROFILE_SUCCESS,
            payload: data.user
        })
    }
    catch (error) {
        console.log(error.response.data);
        dispatch({
            type: UPDATE_USERPROFILE_FAIL,
            payload: error.response.data.message
        })
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`/api/v1/user/userprofile`);
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    }
    catch (error) {
        console.log(error.response.data);
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
};

export const logout_User = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/user/logout`);
        dispatch({
            type: LOGOUT_USER_SUCCESS
        })
    }
    catch (error) {
        console.log(error.response.data);
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.message
        })
    }
};


export const forgotUserPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/v1/user/forgotpassword`, { email }, config);

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.user
        })
    }
    catch (error) {
        console.log(error.response.data);
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
};

export const updateUserPassword = (password, hashedLink) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/user/resetPassword/${hashedLink}`, { password }, config);

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.user
        })
    }
    catch (error) {
        console.log(error.response.data);
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
};



//clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}