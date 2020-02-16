import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = ()=>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId)=>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error)=>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = ()=>{
    return{
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTime = (expirationTime)=>{
    return dispatch =>{
       setTimeout(()=>{ 
        dispatch(logout()); 
       }, expirationTime * 1000);
    }
};
export const auth = (email, password, isSignup) =>{
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCmtjtGBP6-bwJFgVLelCxafq7Uor6nUP8';
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmtjtGBP6-bwJFgVLelCxafq7Uor6nUP8'
        }
        axios.post(url, authData)
        .then(resp =>{
            console.log(resp);
            dispatch(authSuccess(resp.data.idToken, resp.data.localId));
            dispatch(checkAuthTime(resp.data.expiresIn))
        })
        .catch(err =>{
            console.log(err);
            dispatch(authFail(err.response.data.error));
        })
    };
};