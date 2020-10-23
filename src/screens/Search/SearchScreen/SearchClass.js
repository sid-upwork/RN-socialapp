import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity, ScrollView, AsyncStorage, FlatList, NetInfo } from "react-native";
import FastImage from 'react-native-fast-image';
import { showProgressDialog, renderErrorNoDataFound, shareDialog, retweetDialog, retweetWithCommentDialog, commentDialog } from "../../../utils/Utilities";
import { DrawerActions } from "react-navigation";

import IconMaterial from "react-native-vector-icons/MaterialIcons";
import IconFeather from 'react-native-vector-icons/Feather';
import ParsedText from 'react-native-parsed-text';

import parsedTextStyle from "../../../utils/ParsedTextStyle";
import color from "../../../utils/Colors";
import { Dimens } from "../../../utils/Dimens";
import CommonView from "../../Common/CommonView";


var s = require("./SearchStyle.js");
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getPopularPostData,
  postForHomePost,
  postVotePoll,
  showActionDialogs,
  deletePost,
  blockUser,
  muteUser,
  reportSpark
} from "../../../redux/action/SearchActions";
import colors from "../../../utils/Colors";

class SearchClass extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { userId: "", profilePic: "", internetConnected: false };
    this.showPost = this.showPost.bind(this);
    this.searchHashtag = this.searchHashtag.bind(this)
    this.getUserId();
  }

  async getUserId() {
    try {
      await AsyncStorage.getItem("loginResponse").then(
        response => {
          this.setState({
            profilePic: JSON.parse(response).loginResposneObj.profile_image,
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
      if (!isConnected) {
        Alert.alert("No internet connection..!")
        return;
      }
      this.setState({ internetConnected: isConnected },
        () => this.props.getPopularPostData(
          JSON.stringify({ user_id: this.state.userId })
        ))
    })
  }

  handleConnectivityChange = (connected) => {
    this.setState({ internetConnected: connected });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }


  openDrawers() {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  openNewTweet() {
    this.props.navigation.navigate('NewTweetScreen');
  }

  showPost(item) {
    this.props.navigation.navigate('ViewPostClass', { id: item.post_id, userId: this.state.userId });
  }

  showProfile(item) {
    this.props.navigation.navigate('ProfileClass', {
      'userID': this.state.userId,
      'userName': item.at_username,
    });
  }

  searchHashtag(hashtag) {
    console.log(hashtag);
    this.props.navigation.navigate('SearchDetailClass', { key: hashtag, userId: this.state.userId });
  }


  handleHashtagPress = (hashtag) => {
    this.searchHashtag(hashtag);
  }

  renderPopularPostData(search) {
    return (
      <View style={s.mainContainer}>

        <ScrollView style={{ flex: 0.5 }}>
          <TouchableOpacity style={s.ViewPagerContainer}
            activeOpacity={.9}
            onPress={() => this.showPost(search.trendpost)}>
            <FastImage
              style={s.viewPagerImage}
              source={{
                uri: search.trendpost.postImgData[0].file,
                priority: FastImage.priority.high
              }}
              resizeMode={FastImage.resizeMode.cover}
            />

            <Text numberOfLines={1} style={s.viewPagerText}>{search.trendpost.name}</Text>

            <ParsedText
              numberOfLines={1}
              style={s.viewPagerTitle}
              parse={[
                { type: 'url', style: parsedTextStyle.url, onPress: this.handleUrlPress },
                { type: 'phone', style: parsedTextStyle.phone, onPress: this.handlePhonePress },
                { type: 'email', style: parsedTextStyle.email, onPress: this.handleEmailPress },
                { pattern: /\[(@[^:]+):([^\]]+)\]/i, style: parsedTextStyle.username, onPress: this.handleNamePress, renderText: this.renderText },
                { pattern: /42/, style: parsedTextStyle.magicNumber },
                { pattern: /#(\w+)/, style: parsedTextStyle.hashTag, onPress: this.handleHashtagPress },
              ]}
              childrenProps={{ allowFontScaling: false }}>
              {search.trendpost.post_title}
            </ParsedText>

          </TouchableOpacity>

          {search.popularpost.length > 0 && <Text style={s.textHeaderContainer} children={"What's Happening"} />}

          <FlatList
            style={{ flex: 1 }}
            data={search.popularpost}
            removeClippedSubviews={true}
            maxToRenderPerBatch={100}
            onEndReachedThreshold={1200}
            initialNumToRender={5}
            keyExtractor={item => item.post_id.toString()}
            showsVerticalScrollIndicator={true}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={{
                flexDirection: "row",
                alignItems: 'center',
                padding: Dimens.two,
                marginTop: Dimens.one,
                marginHorizontal: Dimens.five,
                backgroundColor: colors.white
              }}
                activeOpacity={50}
                onPress={() => this.showPost(item)}>

                <View style={{ flex: 0.75 }}>

                  <Text onPress={() => this.showProfile(item)} style={{
                    paddingHorizontal: Dimens.ten,
                    color: color.textDarkColor,
                    fontSize: Dimens.extraLargerTextSize
                  }} children={item.name} />

                  <Text style={{
                    paddingHorizontal: Dimens.ten,
                    color: color.textLightColor,
                    fontSize: Dimens.mediumTextSize
                  }} children={item.at_username} />

                  <ParsedText
                    numberOfLines={2}
                    style={{
                      paddingLeft: Dimens.five,
                      color: color.textLightColor,
                      margin: Dimens.five,
                      fontSize: Dimens.mediumTextSize
                    }}
                    parse={[
                      { type: 'url', style: parsedTextStyle.url, onPress: this.handleUrlPress },
                      { type: 'phone', style: parsedTextStyle.phone, onPress: this.handlePhonePress },
                      { type: 'email', style: parsedTextStyle.email, onPress: this.handleEmailPress },
                      { pattern: /\[(@[^:]+):([^\]]+)\]/i, style: parsedTextStyle.username, onPress: this.handleNamePress, renderText: this.renderText },
                      { pattern: /42/, style: parsedTextStyle.magicNumber },
                      { pattern: /#(\w+)/, style: parsedTextStyle.hashTag, onPress: this.handleHashtagPress },
                    ]}
                    childrenProps={{ allowFontScaling: false }}>
                    {item.post_title}
                  </ParsedText>

                </View>

                <FastImage
                  style={{ flex: 0.25, height: Dimens.ninety, margin: Dimens.five, borderRadius: Dimens.ten }}
                  source={{
                    uri: item.postImgData[0].file,
                    priority: FastImage.priority.high
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </TouchableOpacity>
            )} />

          {/* <Text style={s.showMoreConainer} children={"Show More"} /> */}

          {search.tagsPost.length > 0 && < Text style={s.textHeaderContainer} children={'Trending'} />}

          <FlatList
            style={{ flex: 1 }}
            data={search.tagsPost}
            removeClippedSubviews={true}
            maxToRenderPerBatch={100}
            onEndReachedThreshold={1200}
            initialNumToRender={5}
            keyExtractor={item => item.post_id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View style={{
                flexDirection: "row",
                alignItems: 'center',
                padding: Dimens.two,
                marginTop: Dimens.one,
                marginHorizontal: Dimens.five,
                backgroundColor: colors.white
              }}>

                <CommonView
                  index={index}
                  onNamePress={() => this.showProfile(item)}
                  item={item}
                  userId={this.state.userId}
                  triggerEvents={this.props}
                  onPressEvent={() => this.showPost(item)}
                />
              </View>
            )} />

          {/* <Text style={s.showMoreConainer} children={"Show More"} /> */}

        </ScrollView>

      </View >
    );
  }

  render() {
    const { userId } = this.state;
    const { searchResponse, isFetching, error, post_id, showDialog, dialogType } = this.props.SearchReducers;

    return <View style={{ flex: 1 }}>
      <View style={s.headerContainer}>

        <TouchableOpacity style={s.headerImageStyleOpacity}
          onPress={this.openDrawers.bind(this)}>
          <FastImage style={s.headerImageStyle}
            source={{
              uri: this.state.profilePic,
              priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.cover}
          />

        </TouchableOpacity>

        <TouchableOpacity style={s.searchContainer} onPress={() => this.props.navigation.navigate("SearchUserClass", { "userId": this.state.userId })}>
          <IconMaterial style={s.searchIconStyle} name={"search"} size={Dimens.mediumIconSize} color={"white"} />
          <Text style={s.headerTextStyle} children={"Search..."} />
        </TouchableOpacity>

        <IconMaterial onPress={() => this.props.navigation.navigate("ConnectUserClass", { "userId": this.state.userId })}
          style={s.settingIconStyle} name={"person-add"} size={Dimens.largeIconSize} color={colors.white} />
      </View>

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
      {!error && searchResponse != "" ? this.renderPopularPostData(searchResponse) : renderErrorNoDataFound("No popular sparks found !")}

      <TouchableOpacity style={s.floatingButton} onPress={this.openNewTweet.bind(this)}>
        <IconFeather name={'plus'} color={colors.white} size={Dimens.largeIconSize} />
      </TouchableOpacity>
    </View>

  }
}

function mapStateToProps(state) {
  return {
    SearchReducers: state.SearchReducers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      getPopularPostData,
      postForHomePost,
      postVotePoll,
      showActionDialogs,
      deletePost,
      blockUser,
      muteUser,
      reportSpark
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchClass);
