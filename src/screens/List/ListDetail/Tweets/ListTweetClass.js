import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  AsyncStorage,
  NetInfo
} from "react-native";

import {
  showProgressDialog,
  renderErrorNoDataFound,
  retweetDialog,
  retweetWithCommentDialog, commentDialog
} from "../../../../utils/Utilities";

import {
  postForHomePost,
  postVotePoll,
  deletePost,
  blockUser,
  showActionDialogs,
  muteUser,
  reportSpark
} from "../../../../redux/action/MyListAction";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import StyleTab from "../../../Home/HomeTabStyle";
import CommonView from "../../../Common/CommonView";

class ListTweetClass extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: "", internetConnected: false };
    this.getUserId();
  }

  async getUserId() {
    try {
      await AsyncStorage.getItem("loginResponse").then(
        response => {
          this.setState({
            userId: JSON.parse(response).loginResposneObj.id
          })
        },
        error => {
          console.log(error);
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    NetInfo.isConnected.fetch().done((isConnected) => {
      this.setState({ internetConnected: isConnected })
    })
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (connected) => {
    this.setState({ internetConnected: connected });
  };

  showPost(item) {
    this.props.navigation.navigate('ViewPostClass', { id: item.post_id, userId: this.state.userId });
  }

  renderHomeScreen(dataMain) {
    return (
      <View style={{ flex: 1 }}>
        <View style={StyleTab.MainContainer}>
          <FlatList
            style={{ flex: 1 }}
            data={dataMain}
            removeClippedSubviews={true}
            maxToRenderPerBatch={100}
            onEndReachedThreshold={1200}
            initialNumToRender={5}
            keyExtractor={item => item.post_id}
            showsVerticalScrollIndicator={true}
            renderItem={({ item, index }) => (
              <CommonView
                className={""}
                index={index}
                item={item}
                userId={this.state.userId}
                triggerEvents={this.props}
                onNamePress={() => { }}
                onPressEvent={() => this.showPost(item)} />
            )} />
        </View>
      </View>
    );
  }

  render() {
    const { userId } = this.state;
    const { listDetailData, post_id, showDialog, dialogType } = this.props.MyListReducer;
    return (
      <View style={{ flex: 1 }}>


        {dialogType === 'retweet' ?
          (retweetDialog(showDialog, this.props, userId, post_id))
          : dialogType === 'retweetWithComment' ?
            (retweetWithCommentDialog(showDialog, this.props, userId, post_id))
            : dialogType === 'comment' ?
              (commentDialog(showDialog, this.props, userId, post_id))
              : null}

        {
          listDetailData.allpost != null &&
            listDetailData.allpost != undefined &&
            listDetailData.allpost.length > 0
            ? this.renderHomeScreen(listDetailData.allpost)
            : renderErrorNoDataFound("No Sparks from this List Users!!")
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    MyListReducer: state.MyListReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      postForHomePost,
      postVotePoll,
      deletePost,
      blockUser,
      showActionDialogs,
      muteUser,
      reportSpark
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTweetClass);
