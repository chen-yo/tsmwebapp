import * as actionTypes from './actionTypes';

export default function reducer(state, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isAuth: true,
        ...action.payload
      };

    case actionTypes.LOGOUT:
      return {
        isAuth: false,
        email: '',
        name: '',
        accessToken: '',
        imageUrl: ''
      };

    case actionTypes.LOADING:
      return {
        ...state,
        loading: true
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
  }

  return state;
}
