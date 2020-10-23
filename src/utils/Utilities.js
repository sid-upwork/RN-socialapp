import React from "react";
import {
  View, Text, Alert, ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FastImage from "react-native-fast-image";
import Moment from 'moment';

import LineIcon from "react-native-vector-icons/SimpleLineIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Dialog, {
  ScaleAnimation,
  DialogButton,
  DialogTitle
} from "react-native-popup-dialog";
import ParsedText from 'react-native-parsed-text';

import parsedTextStyle from "./ParsedTextStyle";
import colors from "./Colors";
import style from "./UtilitiesStyle";
import { Dimens } from "./Dimens";

import AvView from "./AvView";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { RETWEET_POST, ADD_REMOVE_BOOKMARK, COMMENT_POST } from "./URLs";


export function showError(title, text) {
  return Alert.alert(title, text);
}

export function showLoader(showLoading) {
  return (
    <View style={style.loaderContainerStyle} >
      <ActivityIndicator style={style.loaderStyle} size="large" color="white" animating={showLoading} />
      <Text style={style.loaderTextStyle} children={"Please wait... "} />
    </View>
  );
}

export function showProgressDialog(showDialog) {
  return (
    <Dialog
      animationDuration={500}
      height={0.18}
      width={0.6}
      containerStyle={style.dialogContainer}
      rounded
      visible={showDialog}
      dialogAnimation={
        new ScaleAnimation({ toValue: 0, useNativeDriver: true })
      }
    >
      <View style={style.dialogBodyContainer}>
        <ActivityIndicator
          size={"large"}
          style={style.activityIndicatorStyle}
        />
        <Text style={style.dialogTextStyle}>Please Wait ....</Text>
      </View>
    </Dialog>
  );
}

export function renderErrorNoDataFound(message) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white
      }}
    >
      <Text
        style={{
          color: colors.appRed,
          fontSize: Dimens.headingTextSize
        }}
        children={message}
      />
    </View>
  );
}

export function shareDialog(visibilityStatus, triggerEvent, userId, postId) {
  return (
    <Dialog
      animationDuration={500}
      height={0.5}
      width={0.7}
      containerStyle={{ zIndex: Dimens.five, elevation: Dimens.five }}
      rounded
      visible={visibilityStatus}
      OnTouchOutside={() => { triggerEvent.showShareDialog(false, "", "share") }}
      OnHardwareBackPress={() => { triggerEvent.showShareDialog(false, "share") }}
      dialogAnimation={new ScaleAnimation({ toValue: 0, useNativeDriver: true })}
      dialogTitle={
        < DialogTitle
          style={{ backgroundColor: colors.appRed }}
          textStyle={{
            fontSize: Dimens.mediumTextSize,
            color: colors.white,
            paddingVertical: Dimens.five
          }}
          title="Please select"
        />
      }
      actions={
        [
          <DialogButton
            key={postId}
            textStyle={{
              fontSize: Dimens.mediumTextSize,
              color: colors.appRed,
              paddingVertical: Dimens.five
            }}
            text="Cancel"
            onPress={() => triggerEvent.showActionDialogs(false, "", 'share')}
          />
        ]}
    >
      <View style={{ flex: 1, flexDirection: "column" }}>

        <TouchableOpacity style={{ marginHorizontal: Dimens.ten, flex: 1, flexDirection: "row", alignItems: "center" }}
          onPress={() => triggerEvent.postForHomePost(ADD_REMOVE_BOOKMARK, JSON.stringify({
            user_id: userId, post_id: postId
          }))}>
          <FontAwesomeIcon name={"bookmark-o"} size={Dimens.extraSmallIconSize} color={colors.textLightColor} />
          <Text style={{ marginHorizontal: Dimens.ten, fontSize: Dimens.fifteen, color: colors.appGreen }} children={"Bookmark"} />
        </TouchableOpacity>

        <View style={{ height: Dimens.dividerHeight, backgroundColor: colors.appDividerColor }} />

        <TouchableOpacity style={{ marginHorizontal: Dimens.ten, flex: 1, flexDirection: "row", alignItems: "center" }}
          onPress={() => { }}>
          <LineIcon name={"share"} size={Dimens.extraSmallIconSize} color={colors.textLightColor} />
          <Text style={{ marginHorizontal: Dimens.ten, fontSize: Dimens.fifteen, color: colors.appGreen }} children={"Share"} />
        </TouchableOpacity>

        <View style={{ height: Dimens.dividerHeight, backgroundColor: colors.appDividerColor }} />

      </View>
    </Dialog >
  );
}

export function retweetDialog(visibilityValue, triggerEvent, userId, itemAtIndex, className) {
  return (
    <Dialog
      animationDuration={500}
      height={0.4}
      width={0.6}
      onTouchOutside={() => { triggerEvent.showActionDialogs(false, "", 'retweet', className) }}
      OnHardwareBackPress={() => { triggerEvent.showActionDialogs(false, "", 'retweet', className) }}
      containerStyle={style.dialogRetweetContainer}
      rounded
      visible={visibilityValue}
      dialogAnimation={new ScaleAnimation({ toValue: 0, useNativeDriver: true })}
      dialogTitle={
        <DialogTitle
          style={{ backgroundColor: colors.appRed }}
          textStyle={style.dialogTitle}
          title="Please select"
        />
      }
      actions={[
        <DialogButton key={0} textStyle={style.dialogButtonStyle}
          text="Cancel" onPress={() => triggerEvent.showActionDialogs(false, "", 'retweet', className)} />
      ]}
    >
      <View style={style.dialogRetweetBodyContainer}>
        <TouchableOpacity
          style={style.retweetDialogSparkHeaderContainer}
          onPress={() =>
            triggerEvent.postForHomePost(RETWEET_POST, JSON.stringify({
              user_id: userId,
              post_id: itemAtIndex.post_id,
              retweet_status: "retweet"
            }), className)
          }
        >
          <Text style={style.retweetDialogSparkStyle} children={"Re-Spark"} />
        </TouchableOpacity>

        <View style={style.retweetDialogDivider} />

        <TouchableOpacity style={style.retweetDialogSparkHeaderContainer}
          onPress={() => {
            triggerEvent.showActionDialogs(false, "", 'retweet')
            triggerEvent.showActionDialogs(true, itemAtIndex, 'retweetWithComment')
          }}>
          <Text style={style.retweetDialogSparkStyle} children={"Re-Spark with comment"} />
        </TouchableOpacity>

      </View>
    </Dialog >
  );
}

export function retweetWithCommentDialog(visibilityValue, triggerEvent, userId, itemAtIndex, className) {

  var retweetTitle = '';
  Moment.locale('en');
  return (<Dialog animationDuration={500} height={.85} width={.9} containerStyle={style.dialogRetweetContainer}
    rounded visible={visibilityValue}
    onTouchOutside={() => { triggerEvent.showActionDialogs(false, "", 'retweetWithComment', className) }}
    dialogAnimation={new ScaleAnimation({ toValue: 0, useNativeDriver: true })}
    dialogTitle={
      <DialogTitle style={{ backgroundColor: colors.appRed }}
        textStyle={style.dialogTitle}
        title="Re-Spark with comment" />}
    actions={[
      <DialogButton
        key={1}
        textStyle={style.dialogButtonStyle}
        text="Cancel"
        onPress={() => triggerEvent.showActionDialogs(false, "", 'retweetWithComment', className)} />,
      <DialogButton
        key={0}
        textStyle={style.dialogButtonStyle}
        text="Done"
        onPress={() => {
          triggerEvent.postForHomePost(RETWEET_POST,
            JSON.stringify({
              user_id: userId,
              post_id: itemAtIndex.post_id,
              title: retweetTitle,
              retweet_status: "retweet_title"
            }), className
          );
        }} />
    ]}
  >
    {visibilityValue && (
      <View style={style.dialogRetweetBodyContainer}>
        <TextInput
          keyboardAppearance="default"
          autoCorrect={false}
          placeholder="Enter title"
          placeholderTextColor={colors.placeHolderColor}
          textAlign={"auto"}
          style={style.titleInputView}
          onChangeText={(title) => retweetTitle = title}
        />

        <TouchableOpacity style={style.bodyContainer} activeOpacity={50}>
          <FastImage
            style={style.imageViewContainer}
            source={{
              uri: itemAtIndex.profile_image,
              priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.cover}
          />

          <View style={style.Row2Container}>
            <View style={style.styleNameTimeContainer}>
              <Text style={style.styleTweetName}>{itemAtIndex.name === "" ? "" : itemAtIndex.name}</Text>
              < Text style={style.styleTweetTime}>{Moment(itemAtIndex.created).format('hh:mm a')}</Text>
            </View>

            <Text style={style.styleTweetUserName}>@{itemAtIndex.username === "" ? "" : itemAtIndex.username}</Text>

            <ParsedText
              style={{ marginBottom: Dimens.five, fontSize: Dimens.mediumTextSize, color: colors.appRed }}
              parse={[
                { type: 'url', style: parsedTextStyle.url, onPress: this.handleUrlPress },
                { type: 'phone', style: parsedTextStyle.phone, onPress: this.handlePhonePress },
                { type: 'email', style: parsedTextStyle.email, onPress: this.handleEmailPress },
                { pattern: /\[(@[^:]+):([^\]]+)\]/i, style: parsedTextStyle.username, onPress: this.handleNamePress, renderText: this.renderText },
                { pattern: /42/, style: parsedTextStyle.magicNumber },
                { pattern: /#(\w+)/, style: parsedTextStyle.hashTag, onPress: this.handleHashtagPress },
              ]}
              childrenProps={{ allowFontScaling: false }}>
              {itemAtIndex.post_title}
            </ParsedText>

            <AvView
              AVDimen={{ width: wp(65), height: wp(60) }}
              type={itemAtIndex.posttype}
              expiry_days_left={itemAtIndex.expiry_days_left}
              poll_expiry={itemAtIndex.poll_expiry}
              pollVoteStatus={itemAtIndex.pollVoteStatus}
              source={getPostTypeData(itemAtIndex.posttype, itemAtIndex)}
            />
          </View>
        </TouchableOpacity>
      </View>
    )}
  </Dialog>
  );
}

export function getPostTypeData(type, source) {
  if (type === "image") {
    return source.postImgData;
  }
  if (type === "video") {
    return source.postImgData;
  }
  if (type === "text") {
    return source.post_title;
  }
  if (type === "poll") {
    return source.pollData;
  }
  if (type === "retweet") {
    return source.retweetData;
  }
  if (type === "retweet_title") {
    return source.retweetData;
  }
  if (type === "moment") {
    return source.momentData;
  }
}

export function commentDialog(visibilityValue, triggerEvent, userId, item, className) {
  var commentText = "";
  return (
    <Dialog
      animationDuration={500}
      height={.85}
      width={.9}
      onTouchOutside={() => { triggerEvent.showActionDialogs(false, "", 'comment', className) }}
      containerStyle={style.dialogRetweetContainer}
      rounded
      visible={visibilityValue}
      dialogAnimation={
        new ScaleAnimation({ toValue: 0, useNativeDriver: true })
      }
      dialogTitle={
        < DialogTitle
          style={{ backgroundColor: colors.appRed }}
          textStyle={style.dialogTitle}
          title="Reply to spark" />}
      actions={[
        <DialogButton
          key={0}
          textStyle={style.dialogButtonStyle}
          text="Cancel"
          onPress={() =>
            triggerEvent.showActionDialogs(false, "", 'comment', className)} />,
        <DialogButton
          key={1}
          textStyle={style.dialogButtonStyle}
          text="Done"
          onPress={() => {
            triggerEvent.postForHomePost(COMMENT_POST,
              JSON.stringify({
                user_id: userId,
                post_id: item.post_id,
                comment_text: commentText,
              }), className);
          }}
        />
      ]}
    >
      {visibilityValue && (
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View style={style.dialogRetweetBodyContainer}>
            <TouchableOpacity style={style.bodyContainer} activeOpacity={50}>
              <FastImage
                style={style.imageViewContainer}
                source={{
                  uri: item.profile_image,
                  priority: FastImage.priority.high
                }}
                resizeMode={FastImage.resizeMode.cover}
              />

              <View style={style.Row2Container}>
                <View style={style.styleNameTimeContainer}>
                  <Text style={style.styleTweetName} children={item.name === "" ? "" : item.name} />
                  <Text style={style.styleTweetTime} children={Moment(item.created).format("hh:mm a")} />
                </View>

                <Text style={style.styleTweetUserName} children={item.at_username === "" ? "" : item.at_username} />

                <ParsedText
                  style={{
                    marginVertical: Dimens.ten,
                    fontSize: Dimens.mediumTextSize,
                    color: colors.appRed
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

                <AvView
                  AVDimen={{ width: wp(65), height: wp(58) }}
                  type={item.posttype}
                  expiry_days_left={item.expiry_days_left}
                  poll_expiry={item.poll_expiry}
                  pollVoteStatus={item.pollVoteStatus}
                  source={getPostTypeData(item.posttype, item)}
                />
              </View>
            </TouchableOpacity>

            <Text style={style.styleTextReplyTweet}>{"Reply to spark"}</Text>

            <TextInput
              keyboardAppearance="default"
              autoCorrect={false}
              placeholder="Enter comment"
              multiline={true}
              placeholderTextColor={colors.placeHolderColor}
              textAlign={"auto"}
              style={style.styleInputViewSpark}
              onChangeText={(comment) => commentText = comment}
            />
          </View>
        </KeyboardAwareScrollView>
      )}
    </Dialog >
  );
}