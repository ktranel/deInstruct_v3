import React from 'react';
import {connect} from 'react-redux';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';

// components
import Dashboard from "../dashboard/dashboard";
import Courses from "../courses/courses";
import SingleCourse from "../singleCourse/singleCourse";

const AdminArea = props => {
    // state
    const { appState } = props;
    // hooks
    const location = useLocation();

    // redirect to log in if user is not logged in
    if (!appState.isLoggedIn || !appState.appReady) {
        return (
            <Navigate to='/' state={{from: location}}/>
        )
    }
    return (
        <div>
            <Routes>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/courses' element={<Courses/>}/>
                <Route path='/course/:courseId' element={<SingleCourse/>}/>
            </Routes>
        </div>
    )
}

function mapStateToProps({appState}) {
    return {appState};
}

export default connect(mapStateToProps)(AdminArea);