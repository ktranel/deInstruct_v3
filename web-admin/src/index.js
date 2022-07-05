import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {Routes, BrowserRouter as Router, Route} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import configureStore from "./store/configureStore";
import { Provider } from 'react-redux';
import 'normalize.css';
import "shed-css/dist/index.css";
import './styles.css';

// pages
import Login from "./pages/login/login";
import AdminArea from "./pages/adminArea/adminArea";

const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <div className="app-container">
                    <Suspense fallback={<div></div>}>
                        <Routes>
                            <Route path="/" exact element={<Login/>} />
                            <Route path='admin/*' element={<AdminArea/>}/>
                        </Routes>
                    </Suspense>
                </div>
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
