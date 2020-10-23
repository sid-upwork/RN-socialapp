import React from 'react';
import { View, FlatList, StatusBar, Alert, NetInfo } from 'react-native';
import Header from '../Common/BackHeader/BackHeader';
import CommonView from "../Common/CommonView";
import {
    getBookmarkList,
    clearBookmarkList,
    showActionDialogs,
    postForHomePost,
    deletePost,
    blockUser,
    muteUser
} from "../../redux/action/BookmarkAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import InternetConnection from "../../utils/InternetConnection"
import {
    showProgressDialog, renderErrorNoDataFound,
    retweetDialog, shareDialog, retweetWithCommentDialog,
    commentDialog
} from "../../utils/Utilities";

var s = require('./BookMarkStyle');

class BookMarkClass extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.navigation.getParam("userID"),
            internetConnected: false
        }
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected) {
                this.setState({ internetConnected: isConnected },
                    () => this.props.getBookmarkList(JSON.stringify({ "user_id": this.state.userId }))
                )
            } else {
                Alert.alert("No internet connection..!")
            }
        });
    }

    handleConnectivityChange = (connected) => {
        this.setState({ internetConnected: connected });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    clearBookmarkList() {
        if (this.state.internetConnected)
            this.props.clearBookmarkList(JSON.stringify({ "user_id": this.state.userId }))
        else
            Alert.alert("No internet connected!")
    }

    showPost(item) {
        this.props.navigation.navigate('ViewPostClass', {
            id: item.post_id,
            userId: this.state.userId
        });
    }

    showProfile(item) {
        this.props.navigation.navigate('ProfileClass', {
            'userID': this.state.userId,
            'userName': item.at_username,
        });
    }

    handleRefresh = () => {
        if (!this.state.internetConnected) {
            Alert.alert("No internet connected!")
            return
        }
        this.props.getBookmarkList(JSON.stringify({ "user_id": this.state.userId }))
    }

    renderBookmarkView(bookmarkData, isFetching) {
        return (
            <View style={s.mainContainer} >
                <InternetConnection />
                <FlatList
                    style={{ flex: .5 }}
                    data={bookmarkData}
                    onEndReachedThreshold={1200}
                    initialNumToRender={5}
                    onRefresh={this.handleRefresh}
                    refreshing={isFetching}
                    keyExtractor={item => item.post_id}
                    showsVerticalScrollIndicator={true}
                    renderItem={({ item, index }) => (
                        <CommonView
                            item={item}
                            index={index}
                            userId={this.state.userId}
                            triggerEvents={this.props}
                            onNamePress={() => this.showProfile(item)}
                            onPressEvent={() => this.showPost(item)}
                        />
                    )} />

            </View >
        );
    }

    render() {
        const { userId } = this.state;
        const { bookmarkData, isFetching, error, post_id, showDialog, dialogType } = this.props.BookMarkReducer
        return (
            <View style={{ flex: 1 }} >
                <StatusBar backgroundColor={colors.drawerBack} barStyle="light-content" />
                <Header title="Bookmarks"
                    backValue={false}
                    showDoneButton={true}
                    iconName={"delete-sweep"}
                    rightIcon={"icon"}
                    onPress={this.clearBookmarkList.bind(this)}
                    goBackProp={this.props.navigation} />
                <InternetConnection />
                {dialogType === 'share' ?
                    (shareDialog(showDialog, this.props, userId, post_id))
                    : dialogType === 'retweet' ?
                        (retweetDialog(showDialog, this.props, userId, post_id))
                        : dialogType === 'retweetWithComment' ?
                            (retweetWithCommentDialog(showDialog, this.props, userId, post_id))
                            : dialogType === 'comment' ?
                                (commentDialog(showDialog, this.props, userId, post_id))
                                : null}

                {/* {showProgressDialog(isFetching)} */}
                {!error &&
                    bookmarkData != null &&
                    bookmarkData.length > 0 &&
                    bookmarkData != null ?
                    this.renderBookmarkView(bookmarkData, isFetching) :
                    renderErrorNoDataFound("No Bookmarks added!")}
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        BookMarkReducer: state.BookMarkReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            getBookmarkList,
            clearBookmarkList,
            showActionDialogs,
            postForHomePost,
            deletePost,
            blockUser,
            muteUser
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookMarkClass);
