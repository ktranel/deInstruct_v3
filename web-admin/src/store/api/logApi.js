import mainApi from "./mainApi";

export function logApi() {
    return {
        // send a log to the server
        log: function(message) {
            return mainApi.post('/api/log', {message, origin: 'web'});
        }
    }
}