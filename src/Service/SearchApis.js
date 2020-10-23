import { POST, APP_HEADER, GET_POPULAR_POST, GET_SEARCH_RESULT, GET_SEARCHED_DATA } from '../utils/URLs';

function handleResponse(response) {
    return response.text()
        .then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                }
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
}

export function getPopularPostData(jsonObject) {
    return fetch(GET_POPULAR_POST, {
        method: POST,
        headers: APP_HEADER,
        body: jsonObject
    })
        .then(handleResponse)
        .then(raw => {
            let data = raw.data;
            return data;
        });
}

export function searchKeyword(jsonObject) {
    return fetch(GET_SEARCH_RESULT, {
        method: POST,
        headers: APP_HEADER,
        body: jsonObject
    })
        .then(handleResponse)
        .then(raw => {
            let data = raw.data;
            return data;
        });
}

export function getSearchedResult(jsonObject) {
    return fetch(GET_SEARCHED_DATA, {
        method: POST,
        headers: APP_HEADER,
        body: jsonObject
    })
        .then(handleResponse)
        .then(raw => {
            let data = raw.data;
            return data;
        });
}


