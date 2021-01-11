import axios from 'axios';
import React, {createContext, useReducer} from 'react';
import reducer from './reducer';

const initState = {

        isAuth: false,
        email: '',
        name: '',
        accessToken: '',
        imageUrl: '',
        loading: false,
        error: null

};

export const AppContext = createContext(initState);


export default function AppContextProvider(props) {
    const [state, dispatch] = useReducer(reducer, initState);
    // ax = axios.create();

    // ax.interceptors.response.use(
    //   respond => respond,
    //   err => {
    //     dispatch({type:})
    //   }
    // );

    // ax.interceptors.request.use(request => {
    //   dispatch
    //   return request;
    // });

    

    return (
       <AppContext.Provider value={{state, dispatch}}>
            {props.children}
       </AppContext.Provider>
    )
}
