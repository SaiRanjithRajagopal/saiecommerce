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
    LOAD_USER_FAIL
} from '../../../constants/UserConstants';


export const authenticateReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case LOGIN_REQUEST:
        case CREATE_NEW_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }

        case LOGIN_SUCCESS:
        case CREATE_NEW_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }

        case LOGIN_FAIL:
        case CREATE_NEW_USER_FAIL:
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            }

        default:
            return state;
    }
};



// export const authenticationReducer = (state = { user: {} }, action) => {
//     switch (action.type) {

//         case LOGIN_REQUEST:
//             return {
//                 loading: true,
//                 isAuthenticated: false
//             }

//         case LOGIN_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 isAuthenticated: true,
//                 user: action.payload,
//             }

//         case LOGIN_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 isAuthenticated: false,
//                 user: null,
//                 error: action.payload
//             }

//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 loading: false,
//                 error: null
//             }

//         default:
//             return state;
//     }
// };

// export const createUser_Reducer = (state = { user: {} }, action) => {
//     switch (action.type) {

//         case CREATE_NEW_USER_REQUEST:
//             return {
//                 loading: true,
//                 newUserCreated: false
//             }

//         case CREATE_NEW_USER_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 newUserCreated: true
//             }

//         case CREATE_NEW_USER_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 newUserCreated: false,
//                 error: action.payload
//             }

//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null
//             }

//         default:
//             return state;
//     }
// };

export const forgotPassword_Reducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case CREATE_NEW_USER_REQUEST:
            return {
                loading: true
            }

        case CREATE_NEW_USER_SUCCESS:
            return {
                ...state,
                loading: false
            }

        case CREATE_NEW_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
};

export const updatePassword_Reducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case UPDATE_PASSWORD_REQUEST:
            return {
                loading: true
            }

        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false
            }

        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
};

//Load User
// export const loadUser_Reducer = (state = { user: {} }, action) => {
//     switch (action.type) {

//         case LOAD_USER_REQUEST:
//             return {
//                 loading: true
//             }

//         case LOAD_USER_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 user: action.payload,
//             }

//         case LOAD_USER_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload
//             }

//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null
//             }

//         default:
//             return state;
//     }
// };

