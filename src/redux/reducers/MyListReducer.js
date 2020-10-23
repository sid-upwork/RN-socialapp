import * as constants from "../../utils/Constants";

const initialState = {
  isFetching: false,
  listData: {},
  listDetailData: [],

  searchData: [],

  isCreated: false,
  error: false,
  detailListError: true,

  post_id: '',
  showDialog: false,
  dialogType: '',

  isAdded: false,
  deleteListSuccess: false,
};

export default function ChangeUserVariableReducer(state = initialState, action) {
  switch (action.type) {
    case constants.FETCHING_LIST:
      return {
        ...state,
        isFetching: true
      }

    case constants.HIDE_DIALOG_FETCHING_LIST:
      return {
        ...state,
        isFetching: false
      }

    case constants.FETCH_SUCCESS_LIST:
      return {
        ...state,
        error: false,
        listData: action.payload
      }

    case constants.FETCH_FAILURE_LIST:
      return {
        ...state,
        error: true
      }

    case constants.CREATE_LIST_SUCCESS:
      let main = "";
      if (action.actionType == "2") {
        return {
          ...state,
          error: false,
          isCreated: false
        };
      } else {
        main =
          action.payload != undefined &&
            action.payload != null &&
            action.payload != ""
            ? {
              ...state.listData,
              subscribeTo: [action.payload, ...state.listData.subscribeTo]
            }
            : state.listData;
        return {
          ...state,
          listData: main,
          error: false,
          isCreated: true
        }
      }

    case constants.LIST_DETAIL_SUCCESS:
      return {
        ...state,
        listDetailData: action.payload,
        detailListError: false
      }

    case constants.LIST_DETAIL_FAILURE:
      return {
        ...state,
        isCreated: false,
        detailListError: true,
        listDetailData: []
      }

    case constants.SEARCH_DETAIL_SUCCESS:
      return {
        ...state,
        deleteListSuccess: false,
        searchData: action.payload,
        error: false,
        isAdded: false
      }

    case constants.ADD_DELETE_SUCCESS:
      var actionType = action.actionType;
      let data = "";
      if (actionType == "delete") {
        state.listDetailData.allmembers.splice(action.index, 1);
        return {
          ...state,
          error: false
        };
      } else {
        data = action.payload != undefined && action.payload != null && action.payload != ""
          ? {
            ...state.listDetailData,
            allmembers: [action.item, ...state.listDetailData.allmembers]
          }
          : state.listDetailData;

        return {
          ...state,
          listDetailData: data,
          error: false,
          isAdded: true
        }
      }

    case constants.SET_CREATED_FALSE:
      return {
        ...state,
        isCreated: false
      }

    case constants.DELETE_LIST_SUCCESS:
      let filterPost1 = state.listData.subscribeTo.filter(spark => spark.list_id !== action.listId)
      return {
        ...state,
        deleteListSuccess: true,
        listData: {
          ...state.listData,
          subscribeTo: filterPost1
        }
      }

    case constants.DELETE_LIST_FAILURE:
      return {
        ...state,
        deleteListSuccess: false,
      }

    case constants.SUBSCRIBE_UNSUBSCRIBE_LIST:

      state.listData.member_oflists.filter(item => {
        if (item.list_id == action.listId) {
          item.subscribeStatus = action.payload
        }
      })

      if (action.payload == "0") {
        let filterUnSubscribedPost = state.listData.subscribeTo.filter(spark => { return spark.list_id != action.listId && spark.subscribeStatus != "0" })
        state.listData = {
          ...state.listData,
          subscribeTo: filterUnSubscribedPost
        }
      }
      else {
        let subscribedItem = state.listData.member_oflists.filter(spark => spark.list_id == action.listId)
        state.listData.subscribeTo = [
          ...state.listData.subscribeTo,
          ...subscribedItem
        ]
      }

      return {
        ...state,
      }

    case constants.BLOCKED_USER_POST_LIST:
      let filterPost = state.listDetailData.allpost.filter(spark => spark.user_id !== action.payload)
      return {
        ...state,
        listDetailData: {
          ...state.listDetailData,
          allpost: filterPost
        }
      }

    case constants.POST_DELETED_SUCCESSFULLY_LIST:
      state.listDetailData.allpost.splice(action.ind, 1)
      return {
        ...state
      }

    case constants.SHOW_LIST_SHARE_DIALOG:
      return {
        ...state,
        dialogType: action.dialogType,
        post_id: action.post_id,
        showDialog: action.showDialog
      }

    case constants.UPDATE_INDEX_IN_LIST:
      let allPost = state.listDetailData.allpost.map(spark =>
        spark.post_id === action.payload[0].post_id
          ? { ...spark, ...action.payload[0] }
          : spark
      )

      return {
        ...state,
        listDetailData: {
          ...state.listDetailData,
          allpost: allPost
        }

      }

    case constants.HIDE_DIALOGS_LIST:
      return {
        ...state,
        post_id: "",
        showDialog: false,
        error: false
      }

    default:
      return { ...state }
  }
}
