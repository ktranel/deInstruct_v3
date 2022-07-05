import {USER} from "../storeConstants";

export function userReducer(state=null, action) {
    switch (action.type) {
        case USER:
            return action.payload;
        default:
            return state;
    }
}
