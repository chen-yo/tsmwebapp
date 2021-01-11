import * as actionTypes from './actionTypes';

const login = ( { email, name, imageUrl, accessToken }) => {
    return {
        type: actionTypes.LOGIN,
        payload: { email, name, imageUrl, accessToken }
      }
}

const logut = () => {
    return {
        type: actionTypes.LOGOUT,
      }
}

const setError = (error) => {
    return {
        type: actionTypes.SET_ERROR,
        payload: error
      }
}

export  {
    login,
    logut,
    setError
}