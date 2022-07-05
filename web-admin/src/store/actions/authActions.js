import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";
import { USER_AUTH, APP_READY, USER,} from "../storeConstants";

export const login = (email, password) => {
    return async dispatch => {
        const authRes = await authApi().login(email, password);
        if (authRes.data) {
            const userRes = await userApi().getUser();

            dispatch({ type: USER_AUTH, payload: true });
           // dispatch({ type: USER, payload: userRes });
            dispatch({ type: APP_READY, payload: true });
        }
    }
}

export const checkLogin = () => {
    return async dispatch => {
        const authRes = await authApi().checkWebLogin()
            .catch(e => {
                console.log(e);
            });

        if (authRes.data && authRes.data.result) {
            const userRes = await userApi().getUser();
            dispatch({ type: USER_AUTH, payload: true });
            //dispatch({ type: USER, payload: userRes });
            dispatch({ type: APP_READY, payload: true });
        } else {
            dispatch({ type: USER_AUTH, payload: false });
            dispatch({ type: APP_READY, payload: true });
        }
        return authRes;
    }
}

export const logout = () => {
    return async dispatch => {
        await authApi().logout();

        dispatch({ type: USER_AUTH, payload: false });
        //dispatch({ type: USER, payload: userRes });
    }
}