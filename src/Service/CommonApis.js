import { POST, APP_HEADER, DELETE_POST, BLOCK_USER, MUTE_USER, DELETE_COMMENT, REPORT_POST } from '../utils/URLs';

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


export function postOnHomePost(jsonObject, URL) {
    return fetch(URL, {
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



export function postVotePollApi(jsonObject, URL) {
    return fetch(URL, {
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

export function deletePost(jsonObject, deletePost) {
    return fetch(deletePost ? DELETE_POST : DELETE_COMMENT, {
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


export function blockUser(jsonObject) {
    return fetch(BLOCK_USER, {
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

export function muteUser(jsonObject) {
    return fetch(MUTE_USER, {
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

export function reportSpark(jsonObject) {
    return fetch(REPORT_POST, {
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



