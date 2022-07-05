import {logApi} from "../api/logApi";

// send a log error to the server for consumption by the appropriate service
export async function logError(message) {
    return logApi().log(message);
}