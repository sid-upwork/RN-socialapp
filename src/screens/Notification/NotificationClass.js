import React, { PureComponent } from "react";
import { View, FlatList, Text, AsyncStorage, TouchableOpacity, Alert, NetInfo } from 'react-native';

import IconFoundation from 'react-native-vector-icons/Foundation';
import IconFeather from 'react-native-vector-icons/Feather';

import Header from '../Common/Header/MainHeader';
import colors from "../../utils/Colors";
import { Dimens } from '../../utils/Dimens';
import FastImage from 'react-native-fast-image';
import { showProgressDialog, renderErrorNoDataFound } from "../../utils/Utilities";

var s = require("./NotificationStyle");

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getNotificationList } from "../../redux/action/NotificationAction";

class NotificationClass extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { userId: "", profilePic: "", internetConnected: false }
    this.getUserId()
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    NetInfo.isConnected.fetch().done((isConnected) => {
      if (!isConnected) {
        Alert.alert("No internet connection..!")
        return;
      }
      this.setState({ internetConnected: isConnected },
        () => this.props.getNotificationList(
          JSON.stringify({ user_id: this.state.userId })
        )
      )
    })
  }

  handleConnectivityChange = (connected) => {
    this.setState({ internetConnected: connected });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  async getUserId() {
    try {
      await AsyncStorage.getItem("loginResponse").then(
        response => {
          this.setState({
            userId: JSON.parse(response).loginResposneObj.id,
            profilePic: JSON.parse(response).loginResposneObj.profile_image,
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


  handleRefresh = () => {
    if (!this.state.internetConnected) {
      Alert.alert("No internet connection!")
      return
    }
    this.getUserId();
  }

  onNotificationView(item) {
    let className = "";
    let params = "";

    if (item.notification_type == "retweet"
      || item.notification_type == "retweet_title"
      || item.notification_type == "post_like"
      || item.notification_type == "post_comment") {
      className = "ViewPostClass"
      params = {
        'userId': this.state.userId,
        'id': item.action_id,
      }
    } else if (item.notification_type == "send_request"
      || item.notification_type == "follow"
      || item.notification_type == "accept_request") {
      className = "ProfileClass"
      params = {
        'userID': this.state.userId,
        'userName': item.username,
      }
    } else if (item.notification_type == "tweet_in_moment") {
      className = 'MomentDetailClass'
      params = {
        'id': item.action_id,
        'userId': this.state.userId
      }
    } else if (item.notification_type == "add_to_list") {
      className = "ListDetailClass"
      params = { "list_data": item.listDetail }
    } else {
      return;
    }
    this.props.navigation.navigate(className, params)
  }

  renderNotificationData(notificationData, isFetching) {
    return (
      <FlatList style={s.flatListContainer}
        data={notificationData}
        ItemSeparatorComponent={this.renderDivider}
        showsVerticalScrollIndicator={false}
        onRefresh={this.handleRefresh}
        refreshing={isFetching}
        keyExtractor={item => item.notification_id}
        renderItem={({ item }) =>

          <TouchableOpacity style={s.bodyContainer} onPress={() => item.status == "1" ? this.onNotificationView(item) : Alert.alert("Not a valid post or user")} >
            <IconFoundation style={s.starIconStyle} name="star" size={Dimens.largeIconSize} color={colors.appRed} />

            <FastImage
              style={s.imageStyle}
              source={{
                uri: item.sender_profile_image,
                priority: FastImage.priority.high
              }}
              resizeMode={FastImage.resizeMode.cover} />
            <Text numberOfLines={2} style={s.upperTextStyle} children={item.message} />
          </TouchableOpacity>


        } />
    );
  }

  renderDivider = () => {
    return <View style={s.divider} />;
  }

  openNewTweet() {
    this.props.navigation.navigate('NewTweetScreen');
  }

  render() {
    const { isFetching, error, notificationData } = this.props.NotificationReducer;

    return <View style={s.mainContainer}>
      <Header
        profileImage={this.state.profilePic}
        headerTitleName='Notifications'
        triggeredScreenName='SettingAndPrivacyStack'
        showSettingButton={true}
        screenProps={{ navigation: this.props.navigation }} />

      {/* {showProgressDialog(isFetching)} */}
      {!error && (notificationData != null && notificationData.length > 0)
        ? this.renderNotificationData(notificationData, isFetching)
        : renderErrorNoDataFound("No notifications yet!")}

      <TouchableOpacity style={s.floatingButton} onPress={this.openNewTweet.bind(this)}>
        <IconFeather name={'plus'} color={colors.white} size={Dimens.largeIconSize} />
      </TouchableOpacity>

    </View>
  }
}

function mapStateToProps(state) {
  return {
    NotificationReducer: state.NotificationReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ getNotificationList }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationClass);

