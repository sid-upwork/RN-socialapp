import {
    POST, APP_HEADER,
    GET_MOMENT_LIST,
    GET_MOMENT_DETAIL,
    LIKE_MOMENT,
    TWEET_MOMENT,
    DELETE_MOMENT,
    DELETE_TWEET_MOMENT
} from '../utils/URLs';

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


export function getMomentList(jsonObject) {
    return fetch(GET_MOMENT_LIST, {
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


export function deleteMoment(jsonObject) {
    return fetch(DELETE_MOMENT, {
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


export function getMomentDetail(jsonObject) {
    return fetch(GET_MOMENT_DETAIL, {
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


export function likeMoment(jsonObject) {
    return fetch(LIKE_MOMENT, {
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


export function tweetMoment(jsonObject) {
    return fetch(TWEET_MOMENT, {
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


export function deleteAttachedTweetFromMoment(jsonObject) {
    return fetch(DELETE_TWEET_MOMENT, {
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

