import { SEARCH_FAILURE, SEARCH_REQUEST, SEARCH_SUCCESS } from './actionTypes'

export const searchRequest = () => ({ type: SEARCH_REQUEST });
export const searchSuccess = (results) => ({ type: SEARCH_SUCCESS, payload: results });
export const searchFailure = (error) => ({ type: SEARCH_FAILURE, payload: error });

export const fetchSearchResults = (query) => async (dispatch) => {
    dispatch(searchRequest());
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums?q=${query}`);
        const data = await response.json();
        dispatch(searchSuccess(data));
    } catch (error) {
        dispatch(searchFailure(error.message));
    }
};
