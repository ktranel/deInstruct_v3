import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {Routes, BrowserRouter as Router, Route} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'normalize.css';
import "shed-css/dist/index.css";
import './styles.css';

// pages
import Login from "./pages/login/login";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <div className="app-container">
                <Suspense fallback={<div></div>}>
                    <Routes>
                        <Route path="/" exact element={<Login/>} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
