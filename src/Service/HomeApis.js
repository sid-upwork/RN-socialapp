import { POST, APP_HEADER, GET_ALL_SPARKS } from '../utils/URLs';

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


export function getHomeTweetList(jsonObject, URL) {
    return fetch(GET_ALL_SPARKS, {
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
