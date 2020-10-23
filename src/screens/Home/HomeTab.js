import React, { PureComponent } from "react";
import { View, FlatList, AsyncStorage, TouchableOpacity, StatusBar, Alert, NetInfo } from "react-native";

import IconFeather from "react-native-vector-icons/Feather";

import {
  showProgressDialog, renderErrorNoDataFound,
  retweetDialog, shareDialog,
  retweetWithCommentDialog, commentDialog
} from "../../utils/Utilities";
import InternetConnection from "../../utils/InternetConnection";
import colors from "../../utils/Colors";
import { Dimens } from "../../utils/Dimens";

import s from "./HomeTabStyle";
import CommonView from "../Common/CommonView";

import Header from "../Common/Header/MainHeader";
import { firebaseListeners } from '../../services/firebaseNotifications'
console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
import firebaseService from '../../services/firebase';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getHomeTweetList, postForHomePost, postVotePoll,
  showActionDialogs, deletePost, blockUser,
  muteUser, reportSpark
} from "../../redux/action/HomeAction";

class HomeTab extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      profilePic: "",
      internetConnected: false
    };
    this.getUserId()
    firebaseListeners();
  }

  async getUserId() {
    try {
      await AsyncStorage.getItem("loginResponse").then(
        response => {
          this.setState({
            userId: JSON.parse(response).loginResposneObj.id,
            profilePic: JSON.parse(response).loginResposneObj.profile_image
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
      if (!isConnected) {
        Alert.alert("No internet connection..!")
        return;
      }
      this.setState({ internetConnected: isConnected },
        () => this.props.getHomeTweetList(JSON.stringify({ user_id: this.state.userId }))
      )
    })
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (connected) => {
    this.setState({ internetConnected: connected });
  };

  openNewTweet() {
    this.props.navigation.navigate("NewTweetScreen");
  }

  showPost(item) {
    this.props.navigation.navigate('ViewPostClass', {
      id: item.post_id, userId: this.state.userId
    });
  }

  showProfile(item) {
    this.props.navigation.navigate('ProfileClass', {
      'userID': this.state.userId,
      'userName': item.at_username,
    });
  }

  handleRefresh = () => {
    if (!this.state.isConnected) {
      return;
    }
    this.getUserId();
  }

  renderHomeScreen(dataMain, isFetching) {
    return (
      <View style={{ flex: 1 }}>

        <View style={s.MainContainer}>
          <FlatList
            style={{ flex: 1 }}
            data={dataMain}
            extraData={dataMain}
            removeClippedSubviews={true}
            maxToRenderPerBatch={100}
            onEndReachedThreshold={1200}
            onRefresh={this.handleRefresh}
            refreshing={isFetching}
            initialNumToRender={10}
            keyExtractor={item => item.post_id.toString()}
            showsVerticalScrollIndicator={true}
            renderItem={({ item, index }) => (

              <CommonView
                className={""}
                item={item}
                index={index}
                userId={this.state.userId}
                triggerEvents={this.props}
                onNamePress={() => this.showProfile(item)}
                onPressEvent={() => this.showPost(item)} />

            )} />
        </View>
        <InternetConnection />
      </View>
    );
  }

  render() {
    const { userId, isConnected } = this.state;
    const { homeSparksResponse, isFetching, error, post_id, showDialog, dialogType } = this.props.HomeReducer;
    return (
      <View style={{ flex: 1 }}>
        <Header
          profileImage={this.state.profilePic}
          headerTitleName="Home"
          triggeredScreenName=""
          showSettingButton={false}
          screenProps={{ navigation: this.props.navigation }} />

        <StatusBar backgroundColor={colors.drawerBack} barStyle="light-content" />

        {dialogType === 'retweet' ?
          (retweetDialog(showDialog, this.props, userId, post_id))
          : dialogType === 'retweetWithComment' ?
            (retweetWithCommentDialog(showDialog, this.props, userId, post_id))
            : dialogType === 'comment' ?
              (commentDialog(showDialog, this.props, userId, post_id))
              : null}

        {/* {showProgressDialog(isFetching)} */}
        {!error && homeSparksResponse.length > 0 ?
          this.renderHomeScreen(homeSparksResponse, isFetching) :
          renderErrorNoDataFound("No Sparks found !")
        }

        <TouchableOpacity style={s.floatingButton} onPress={this.openNewTweet.bind(this)} >
          <IconFeather name={"plus"} color={colors.white} size={Dimens.largeIconSize} />
        </TouchableOpacity>
      </View>
    );
  }

}

function mapStateToProps(state) {
  return {
    HomeReducer: state.HomeReducer,
    SideBarReducer: state.SideBarReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      getHomeTweetList,
      postForHomePost,
      postVotePoll,
      deletePost,
      blockUser,
      showActionDialogs,
      muteUser,
      reportSpark
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab);
