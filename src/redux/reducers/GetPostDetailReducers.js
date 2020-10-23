import * as constants from '../../utils/Constants';

const initialState = {
    isFetching: false,
    postData: [],
    error: true,
    post_id: '',
    showDialog: false,
    dialogType: '',
    actionDone: false,
}

export default function ChangeUserVariableReducer(state = initialState, action) {

    switch (action.type) {
        case constants.FETCHING_SINGLE_POST:
            return {
                ...state,
                isFetching: true,
            }
        case constants.HIDE_FETCHING_SINGLE_POST:
            return {
                ...state,
                isFetching: false,
            }
        case constants.FETCH_SUCCESS_SINGLE_POST:
            return {
                ...state,
                post_id: "",
                showDialog: false,
                error: false,
                postData: action.payload
            }
        case constants.FETCH_FAILURE_SINGLE_POST:
            return {
                ...state,
                error: true,
                postData: []
            }
        case constants.SHOW_SHARE_DIALOG_SINGLE_POST:
            return {
                ...state,
                dialogType: action.dialogType,
                post_id: action.post_id,
                showDialog: action.showDialog
            }
        case constants.SINGLE_POST_DELETED_SUCCESSFULLY:
            return {
                ...state,
                actionDone: true
            }
        case constants.BLOCKED_USER_SINGLE_POST:
            return {
                ...state,
                actionDone: true
            }
        case constants.BLOCKED_USER_FROM_COMMENT_SINGLE_POST:
            return {
                ...state,
                postData: [{
                    ...state.postData[0],
                    commentData: state.postData[0].commentData.filter(comment => comment.user_id !== action.payload)
                }]
            }
        case constants.SINGLE_POST_DELETED_COMMENT:
            state.postData[0].commentData.splice(action.payload, 1)
            var deleteComment = state.postData[0].commentData
            state.postData[0].totalComment = deleteComment.length
            var newCommentArray = deleteComment.map(sparkCommet => sparkCommet.user_id == action.userId)
            var status = deleteComment.length <= 0 ? "0" : newCommentArray.indexOf(true) == "-1" ? "0" : "1";
            return {
                ...state,
                postData: [{
                    ...state.postData[0],
                    commentStatus: status,
                    commentData: deleteComment.length <= 0 ? [] : deleteComment
                }]
            }
        case constants.SINGLE_POST_INITIALIZE:
            return {
                isFetching: false,
                postData: [],
                error: true,
                post_id: '',
                showDialog: false,
                dialogType: '',
                actionDone: false,
            }

        default:
            return state
    }
}