import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Routes, Route,} from 'react-router-dom';

// actions
import {logError} from "../../store/actions/logActions";
import {checkLogin} from "../../store/actions/authActions";

// components
import Login from "../login/login";

const AuthWrapper = props => {
    // state
    const { appState } = props;
    // actions
    const {checkLogin} = props;

    useEffect(() => {
        checkLogin()
            .catch(e => {
                logError(e.message);
            })
    }, []);

    // ensure app is in ready state before loading any content
    if (!appState.appReady) {
        return (
            <div/>
        )
    }
    return (
        <>
            <Routes>
                <Route path='/' exact element={<Login/>}/>
            </Routes>
        </>
    )
}

function mapStateToProps({appState}) {
    return {appState};
}

const actions = {
    checkLogin,
}

export default connect(mapStateToProps, actions)(AuthWrapper);