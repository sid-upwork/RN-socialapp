import { POST, APP_HEADER, CLEAR_BOOKMARK_LIST, GET_BOOKMARK_LIST } from '../utils/URLs';

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


export function getBookmarkList(jsonObject) {
    return fetch(GET_BOOKMARK_LIST, {
        method: POST,
        body: jsonObject,
        headers: APP_HEADER
    })
        .then(handleResponse)
        .then(raw => {
            let data = raw.data;
            return data;
        });
}

export function clearBookmarkList(jsonObject) {
    return fetch(CLEAR_BOOKMARK_LIST, {
        method: POST,
        body: jsonObject,
        headers: APP_HEADER
    })
        .then(handleResponse)
        .then(raw => {
            let data = raw.data;
            return data;
        });
}