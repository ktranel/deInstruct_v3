// handle any token errors
export const handleTokenErrors = (dispatch, response) => {
    // handle response if not successful
    if (!response.success && response.status !== 200) {
        console.log(response);
        dispatch({ type: 'GENERAL_ERROR' });
    }
    // pass response through to next handler
    return response;
};