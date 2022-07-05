import {combineReducers} from 'redux';

import {appStateReducer} from "./reducers/appStateReducer";
import {userReducer} from "./reducers/userReducer";

export default combineReducers({
    // state regarding app readiness
    appState: appStateReducer,

    // logged in user object
    userState: userReducer,
});