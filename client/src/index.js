import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import 'bootstrap/dist/css/bootstrap.min.css'
import AppContextProvider from './context/auth-context';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
                <AppContextProvider>
                    <Router>
                        <App />
                    </Router>
                </AppContextProvider>, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
