import mainApi from "./mainApi";

export function userApi() {
    return {
        // return the currently logged-in user
        getUser: function() {
            return mainApi.get('/api/user/');
        }
    }
}