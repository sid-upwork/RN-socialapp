import { POST, APP_HEADER, ACCEPT_USER_REQUEST, FOLLOW_UNFOLLOW_USER, GET_FOLLOWING_FOLLOWER} from '../utils/URLs';

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


export function acceptUserRequest(jsonObject) {
    return fetch(ACCEPT_USER_REQUEST, {
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

export function followUser(jsonObject){
    return fetch(FOLLOW_UNFOLLOW_USER, {
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


export function getFollowingFollowerList(jsonObject){
    return fetch(GET_FOLLOWING_FOLLOWER, {
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

