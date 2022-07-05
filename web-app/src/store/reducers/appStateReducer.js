import { USER_AUTH, APP_READY, } from "../storeConstants";

const initialState = {
    isLoggedIn: false,
    appReady: false,
}

export const appStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_AUTH:
            return {
                ...state,
                isLoggedIn: action.payload,
            }
        case APP_READY:
            return {
                ...state,
                appReady: action.payload,
            }
        default:
            return state;
    }
}