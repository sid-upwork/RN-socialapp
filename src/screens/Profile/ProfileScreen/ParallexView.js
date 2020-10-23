import React from "react";
import { ScrollView, TouchableOpacity, AsyncStorage, FlatList, BackHandler, View, Text, StatusBar, NetInfo } from "react-native";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import IconFeather from 'react-native-vector-icons/Feather';

import FastImage from 'react-native-fast-image';
import { Dimens } from '../../../utils/Dimens';
import colors from '../../../utils/Colors';
import s from './ParallexStyle';
import Moment from "moment";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getProfileData, postForHomePost, postVotePoll, showActionDialogs,
  followUser, deletePost, clearReducer, muteUser, reportSpark, blockUser
} from "../../../redux/action/ProfileActions";
import CommonView from "../../Common/CommonView";
import {
  showProgressDialog, renderErrorNoDataFound,
  retweetDialog, shareDialog,
  retweetWithCommentDialog, commentDialog
} from "../../../utils/Utilities";

class ParallaxDemo extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      stateUsername: "",
      stateSearchedUsername: this.props.navigation.getParam("userName"),
      stateUserId: this.props.navigation.getParam("userID"),
      internetConnected: false
    }
    this.getUserName();
  }

  async getUserName() {
    try {
      await AsyncStorage.getItem("loginResponse").then(
        response => {
          this.setState({ stateUsername: JSON.parse(response).loginResposneObj.at_username })
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
    const { stateSearchedUsername, stateUserId } = this.state

    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange)
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    NetInfo.isConnected.fetch().done((isConnected) => {
      if (!isConnected) {
        Alert.alert("No internet connection..!")
        return;
      }
      this.setState({ internetConnected: isConnected },
        () => this.props.getProfileData(JSON.stringify({ 'username': stateSearchedUsername, 'user_id': stateUserId }), stateSearchedUsername)
      )
    })
  }

  handleConnectivityChange = (connected) => {
    this.setState({ internetConnected: connected });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack(null)
    return true;
  }

  openScreen(classType, route) {
    const { stateUserId, stateSearchedUsername } = this.state;
    this.props.navigation.navigate(route, { "classType": classType, "userId": stateUserId, "username": stateSearchedUsername });
  }

  renderProfileData(profileResponse) {
    return (
      <ScrollView style={{ flex: 1 }}
        scrollEventThrottle={16}>

        <View style={s.bannerContainerStyle}>
          <View style={s.bannerImageContainer}>
            <FastImage
              style={{ flex: 1, width: null, height: null }}
              source={{
                uri: profileResponse.banner_image,
                priority: FastImage.priority.high
              }}
              resizeMode={FastImage.resizeMode.cover} />
          </View >
        </View >

        {this.renderProfile(profileResponse)}
      </ScrollView >
    );
  }

  showButton(profileResponse) {
    const { stateUsername, stateSearchedUsername, stateUserId } = this.state;

    if (stateUsername == stateSearchedUsername) {
      return <TouchableOpacity style={s.editProfileContainer}
        onPress={() => this.props.navigation.navigate('EditProfileClass')}>
        <Text style={s.editProfileTextStyle}>Edit Profile</Text>
      </TouchableOpacity>;
    }
    else {
      return <View>

        <TouchableOpacity style={s.editProfileContainer}
          onPress={() => {
            if (!this.state.internetConnected) {
              Alert.alert("No internet connection!")
              return
            }
            this.props.followUser(JSON.stringify({ 'user_id': stateUserId, 'follower_id': profileResponse.user_id }))
          }}>
          <Text style={s.editProfileTextStyle}>{profileResponse.followStatus == "1" ? "Following" : profileResponse.followStatus == "0" ? "Follow" : "Pending"}</Text>
        </TouchableOpacity>
      </View>
    }
  }

  renderProfile(profileResponse) {
    const { stateUsername, stateSearchedUsername } = this.state;

    return (
      <View style={{ flex: 1 }} >
        <View style={s.profilePicContainer}>

          <FastImage
            style={s.profilePicStyle}
            source={{
              uri: profileResponse.profile_image,
              priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.cover} />
        </View>

        <View style={{ flex: 1, flexDirection: "column" }}>

          <View style={s.nameContainer}>
            <Text style={s.nameStyle}>{profileResponse.name}</Text>
            {this.showButton(profileResponse)}
          </View>

          <Text style={s.userNameStyle} >{profileResponse.at_username}</Text>
          {profileResponse.bio != "" || profileResponse.bio != undefined || profileResponse.bio != null && <Text style={s.profileStyle} >{profileResponse.bio}</Text>}

          <View style={s.followerFollowingStyle}>
            <TouchableOpacity style={s.followerStyle} activeOpacity={1}
              onPress={() => this.openScreen("FollowingClass", "ProfileFollowerFollowingClass")}>
              <Text style={s.followFollowingCount}>{profileResponse.totalFollowing}</Text>
              <Text style={s.followFollowingText}>FOLLOWING</Text>
            </TouchableOpacity>

            <View style={{ width: Dimens.one, backgroundColor: colors.white }} />


            <TouchableOpacity activeOpacity={1} style={s.followingStyle}
              onPress={() => this.openScreen("FollowerClass", "ProfileFollowerFollowingClass")}>
              <Text style={s.followFollowingCount}>{profileResponse.totalFollowers}</Text>
              <Text style={s.followFollowingText}>{profileResponse.totalFollowers > "1" ? "FOLLOWERS" : "FOLLOWER"}</Text>
            </TouchableOpacity>
          </View>

          <View style={s.locationContainer}>
            <IconFeather name="calendar" size={Dimens.smallIconSize} color={colors.appRed} />
            <Text style={s.locationIconStyle}>Joined {Moment(profileResponse.created).format('DD-MMM-YYYY')}</Text>

            {profileResponse.address != null && profileResponse.address != undefined && profileResponse.address != ""
              && <IconFeather style={{ marginStart: Dimens.thirty }} name="map-pin" size={Dimens.smallIconSize} color={colors.appRed} />}
            <Text style={s.locationIconStyle} children={profileResponse.address} />

          </View>

          <View style={s.divider} />
        </View>

        <View style={s.sparkHeadingContainer}>
          <Text style={s.sparkTextContainer} children={"Sparks"} />
        </View>

        {stateUsername == stateSearchedUsername ?
          profileResponse.myTweets.length > 0 ? this.renderPostList(profileResponse) : this.noSparkYet()
          :
          profileResponse.isPrivate == "1" || profileResponse.followStatus == "1" ?
            profileResponse.myTweets.length > 0 ? this.renderPostList(profileResponse) : this.noSparkYet() :
            this.cannotViewProtectedProfile()
        }

      </View >

    );
  }


  cannotViewProtectedProfile() {
    return <View style={{ marginTop: Dimens.twenty, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={s.noTweetContainer} children={"Sparks are protected!!"} />
    </View>
  }

  noSparkYet() {
    return <View style={{ marginTop: Dimens.twenty, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={s.noTweetContainer} children={"No spark has been posted yet!"} />
    </View>
  }

  showPost(item) {
    const { stateUserId } = this.state;
    this.props.navigation.navigate('ViewPostClass',
      {
        id: item,
        userId: stateUserId
      });
  }

  renderPostList(profileResponse) {
    const { stateUserId } = this.state;

    return <View style={{ flex: 1, height: "100%" }}>
      <FlatList style={s.flatListContainer}
        data={profileResponse.myTweets}
        removeClippedSubviews={true}
        maxToRenderPerBatch={100}
        onEndReachedThreshold={1200}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.post_id.toString()}
        renderItem={({ item, index }) =>

          <CommonView item={item}
            index={index}
            userId={stateUserId}
            triggerEvents={this.props}
            className={""}
            onPressEvent={() => this.showPost(item.post_id)} />

        } />
    </View>

  }

  setMenuRef = ref => {
    this._menu = ref;
  }

  hideMenu(routeName, profileResponse) {
    this._menu.hide();
    const { stateUserId } = this.state;
    var id = profileResponse.user_id;

    if (!this.state.internetConnected) {
      Alert.alert("No internet connection!")
      return
    }

    if (routeName == "ListClass")
      this.props.navigation.navigate(routeName, { "passedUserId": id });
    else if (routeName == 'MomentsClass')
      this.props.navigation.navigate(routeName, { "passedUserId": id });
    else if (routeName == 'Mute')
      this.props.muteUser(id, JSON.stringify({ user_id: stateUserId, receiver_id: id }))
    else if (routeName == "Block")
      this.props.blockUser(id, JSON.stringify({ user_id: stateUserId, receiver_id: id }))
  }

  showMenu = () => {
    this._menu.show();
  }

  componentWillReceiveProps(nextProps) {
    const { userBlocked } = nextProps.ProfileReducers;
    if (userBlocked) {
      this.props.navigation.goBack()
    }

  }

  render() {
    const { stateUserId, stateSearchedUsername } = this.state;
    // profileResponse, error, dialogType, post_id, showDialog
    const { key, error, } = this.props.ProfileReducers;
    let index = key.findIndex(key => key.keyValue === stateSearchedUsername);
    if (index == -1) {
      index = 0
    }
    return (<View style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.drawerBack} barStyle="light-content" />
      <TouchableOpacity style={s.headerContainer} >
        <IconFeather name={'chevron-left'}
          onPress={() => this.props.navigation.goBack(null)}
          style={s.profileHeaderStyle} size={Dimens.largeIconSize} color={colors.textLightColor} />

        {stateUserId == key[index].data.profileResponse.user_id ? null :


          <TouchableOpacity
            onPress={this.showMenu}
            style={s.profileHeaderStyle} >
            <Menu
              ref={this.setMenuRef}
              button={
                <IconFeather
                  name={'more-vertical'}
                  size={Dimens.largeIconSize}
                  color={colors.textDarkColor} />
              }>
              <MenuItem onPress={() => this.hideMenu("ListClass", key[index].data.profileResponse)}>View Lists</MenuItem>
              <MenuDivider />
              <MenuItem onPress={() => this.hideMenu("MomentsClass", key[index].data.profileResponse)}>View Instants</MenuItem>
              <MenuDivider />
              <MenuItem onPress={() => this.hideMenu("Mute", key[index].data.profileResponse)}>{'Mute ' + key[index].data.profileResponse.username}</MenuItem>
              <MenuDivider />
              <MenuItem onPress={() => this.hideMenu("Block", key[index].data.profileResponse)}>{"Block " + key[index].data.profileResponse.username}</MenuItem>
              <MenuDivider />
            </Menu>
          </TouchableOpacity>

        }
      </TouchableOpacity >


      {key[index].data.dialogType === 'share' ?
        (shareDialog(key[index].data.showDialog, this.props, key[index].data.stateUserId, key[index].data.post_id))
        : key[index].data.dialogType === 'retweet' ?
          (retweetDialog(key[index].data.showDialog, this.props, key[index].data.stateUserId, key[index].data.post_id))
          : key[index].data.dialogType === 'retweetWithComment' ?
            (retweetWithCommentDialog(key[index].showDialog, this.props, key[index].data.stateUserId, key[index].post_id))
            : key[index].data.dialogType === 'comment' ?
              (commentDialog(key[index].data.showDialog, this.props, key[index].data.stateUserId, key[index].data.post_id))
              : null}

      {/* {showProgressDialog(isFetching)} */}


      {!error && key[index].data.profileResponse != ""
        ? this.renderProfileData(key[index].data.profileResponse)
        : renderErrorNoDataFound()}
    </View>);

  }
}

function mapStateToProps(state) {
  return {
    ProfileReducers: state.ProfileReducers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      getProfileData,
      deletePost,
      postForHomePost,
      showActionDialogs,
      followUser,
      postVotePoll,
      clearReducer,
      muteUser,
      reportSpark,
      blockUser
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParallaxDemo);
