import { UPLOADING, UPLOADING_SUCCESS, UPLOADING_FAILURE, INITIAL_STATE } from '../../utils/Constants';

const initialState = {
    uploading: false,
    uploaded_successfully: false,
}

export default function UploadData(state = initialState, action) {

    switch (action.type) {
        case UPLOADING:
            return {
                ...state,
                uploading: true
            }
        case UPLOADING_FAILURE:
            return {
                ...state,
                uploading: false,
            }
        case UPLOADING_SUCCESS:
            return {
                uploading: false,
                uploaded_successfully: true
            }
        case INITIAL_STATE:
            return {
                uploading: false,
                uploaded_successfully: false,
            }
        default:
            return state
    }
}


