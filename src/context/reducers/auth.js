import {REGISTER_FAIL,
    REGISTER_SUCCESS,
    REGISTER_LOADING,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_AUTH_STATE,
    LOGOUT_USER} from "../../constants/actionTypes";

const auth = (state, {type, payload}) => {
    switch (type) {
        case LOGIN_LOADING:
        case REGISTER_LOADING:
            return {
                ...state,
                loading:true,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading:false,
                data:payload,
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                loading:false,
                error:payload,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading:false,
                data:payload,
                isLoggedIn:true,
            };    

        case CLEAR_AUTH_STATE:
            return {
                ...state,
                loading: false,
                data: null,
                error: null
            };
        case LOGOUT_USER:
            return{
                ...state,
                loading: false,
                data: null,
                isLoggedIn: false,
            }
        default :
            return state;
    }
}

export default auth;