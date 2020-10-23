import { POST, APP_HEADER, GET_POST_DETAIL } from '../utils/URLs';

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

export function getSinglePostDetail(jsonObject) {
    return fetch(GET_POST_DETAIL, {
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







