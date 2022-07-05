import mainApi from "./mainApi";

export function authApi() {
    return {
        login: function(email, password) {
            return mainApi.post(`/api/auth/web-login`, {email, password});
        },
        checkWebLogin: function() {
            return mainApi.get('/api/auth/web-login-check');
        },
        logout: function() {
            return mainApi.get('/api/logout');
        }
    }
}