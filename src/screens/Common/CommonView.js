import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AvView from "../../utils/AvView";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LineIcon from "react-native-vector-icons/SimpleLineIcons";
import FastImage from "react-native-fast-image";
import StyleTab from "../Home/HomeTabStyle";
import ParsedText from "react-native-parsed-text";
import { Dimens } from "../../utils/Dimens";
import colors from "../../utils/Colors";
import parsedTextStyle from "../../utils/ParsedTextStyle";

import Moment from "moment";
import { LIKE_DISLIKE_POST, RETWEET_POST, ADD_REMOVE_BOOKMARK } from "../../utils/URLs";
import { getPostTypeData } from "../../utils/Utilities";

export default class CommonView extends PureComponent {
    constructor(props) {
        super(props)
        this.searchHashtag = this.searchHashtag.bind(this)
    }

    hideMenu(name, item, index) {
        const { userId, triggerEvents, className } = this.props;

        if (name == "delete")
            triggerEvents.deletePost(index, JSON.stringify({ user_id: userId, post_id: item.post_id }), className);
        else if (name == 'username')
            triggerEvents.blockUser(item.user_id, JSON.stringify({ user_id: userId, receiver_id: item.user_id }), className)
        else if (name == 'mute')
            triggerEvents.muteUser(item.user_id, JSON.stringify({ user_id: userId, receiver_id: item.user_id }), className)
        else {
            triggerEvents.reportSpark(JSON.stringify({ user_id: userId, post_id: item.post_id, "type": "post" }))
        }
    };

    searchHashtag(hashtag) {
        console.log(hashtag);
        this.props.triggerEvents.navigation.navigate('SearchDetailClass', { key: hashtag, userId: this.props.userId });
    }

    handleHashtagPress = (hashtag) => {
        this.searchHashtag(hashtag);
    }

    render() {
        const { item, userId, triggerEvents, onPressEvent, onNamePress, index, className } = this.props;

        return (
            <View style={{ flexDirection: "column", flex: 1 }}>

                {item.posttype === "retweet" && (
                    <View style={{ flex: 1, marginHorizontal: Dimens.eighty, marginTop: Dimens.five, color: colors.textDarkColor, alignItems: "center", flexDirection: "row" }}>
                        <LineIcon name={"refresh"} size={Dimens.tinyIconSize} color={colors.textLightColor} />
                        <Text style={StyleTab.styleCommentReSparkLikeText}>{"You"} Sparked</Text>
                    </View>)}

                <TouchableOpacity style={StyleTab.bodyContainer}
                    activeOpacity={50} onPress={onPressEvent}>

                    <FastImage
                        style={StyleTab.imageViewContainer}
                        source={{
                            uri: item.profile_image,
                            priority: FastImage.priority.high
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />

                    <View style={StyleTab.Row2Container}>
                        <View style={StyleTab.upperContainer}>
                            <View style={StyleTab.nameContainer}>
                                <Text numberOfLines={1} onPress={onNamePress} style={StyleTab.namenameStyle} >{item.name}</Text>
                                <Text numberOfLines={1} style={StyleTab.nameusernameStyle}>{item.at_username}</Text>
                            </View>

                            <Text numberOfLines={1} style={StyleTab.styleTweetTime}>{Moment(item.created).format('hh:mm a')}</Text>

                            <Menu style={StyleTab.dropDownIconStyle}>
                                <MenuTrigger  >
                                    <MaterialIcons
                                        style={StyleTab.dropDownIconStyle}
                                        name="keyboard-arrow-down"
                                        size={Dimens.mediumIconSize}
                                        color={colors.textDarkColor} />
                                </MenuTrigger>
                                <MenuOptions>
                                    {userId == item.user_id &&
                                        <MenuOption
                                            style={{ color: colors.white }}
                                            onSelect={() => this.hideMenu('delete', item, index)}
                                            disabled={userId != item.user_id}
                                            text='Delete Spark' />}
                                    {userId != item.user_id &&
                                        <MenuOption
                                            onSelect={() => this.hideMenu('report', item, index)}
                                            disabled={userId == item.user_id}
                                            text='Report Spark' />}
                                    {userId != item.user_id &&
                                        <MenuOption
                                            onSelect={() => this.hideMenu('mute', item, index)}
                                            disabled={userId == item.user_id}
                                            text={'Mute ' + item.at_username} />}
                                    {userId != item.user_id &&
                                        <MenuOption
                                            onSelect={() => this.hideMenu('username', item, index)}
                                            disabled={userId == item.user_id}
                                            text={"Block " + item.at_username} />}
                                </MenuOptions>
                            </Menu>

                        </View>

                        <ParsedText
                            style={{ fontSize: Dimens.mediumTextSize, color: colors.textDarkColor, marginVertical: Dimens.ten }}
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

                        {
                            item.posttype === 'retweet_title'
                                ? this.renderRetweetData(item.retweetData[0])
                                : < AvView
                                    AVDimen={{ width: wp(75), height: wp(60) }}
                                    dispatch={this.props}
                                    user_id={userId}
                                    post_id={item.post_id}
                                    type={item.posttype}
                                    expiry_days_left={item.expiry_days_left}
                                    poll_expiry={item.poll_expiry}
                                    pollVoteStatus={item.pollVoteStatus}
                                    source={getPostTypeData(item.posttype, item)} />
                        }

                        <View style={StyleTab.styleCommentReSparkLikeContainer} >
                            <TouchableOpacity style={StyleTab.styleTouchableOpacity}
                                onPress={() => triggerEvents.showActionDialogs(true, item, 'comment', className)}>

                                {item.commentStatus == '1' ?
                                    <FontAwesomeIcons style={StyleTab.iconStyling} name="comment" size={Dimens.smallIconSize} color={colors.appRed} />
                                    : <LineIcon style={StyleTab.iconStyling} name="bubble" size={Dimens.smallIconSize} color={colors.textLightColor} />}

                                <Text style={StyleTab.styleCommentReSparkLikeText}>{item.totalComment}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={StyleTab.styleTouchableOpacity}
                                onPress={() => {
                                    item.retweetStatus == "1" ?
                                        triggerEvents.postForHomePost(RETWEET_POST, JSON.stringify({
                                            user_id: userId,
                                            post_id: item.post_id,
                                            retweet_status: "retweet"
                                        }), className) :
                                        triggerEvents.showActionDialogs(true, item, 'retweet', className)
                                }}>
                                <LineIcon name={"refresh"} size={Dimens.extraSmallIconSize} color={item.retweetStatus == "0" ? colors.textLightColor : colors.appRed} />
                                <Text style={StyleTab.styleCommentReSparkLikeText}>{item.totalRetweet}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={StyleTab.styleTouchableOpacity}
                                onPress={() =>
                                    triggerEvents.postForHomePost(LIKE_DISLIKE_POST, JSON.stringify({
                                        user_id: userId,
                                        post_id: item.post_id
                                    }), className)
                                }>

                                {item.likeStatus == '1' ?
                                    <FontAwesomeIcons style={StyleTab.iconStyling} name="heart" size={Dimens.smallIconSize} color={colors.appRed} />
                                    : <FontAwesomeIcons style={StyleTab.iconStyling} name="heart-o" size={Dimens.smallIconSize} color={colors.textLightColor} />}

                                <Text style={StyleTab.styleCommentReSparkLikeText}>{item.totallike}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={StyleTab.styleTouchableOpacity}
                                onPress={() => triggerEvents.postForHomePost(ADD_REMOVE_BOOKMARK, JSON.stringify({
                                    user_id: userId,
                                    post_id: item.post_id
                                }), className)}>

                                {item.bookmarkStatus == "1" ?
                                    <FontAwesomeIcons style={StyleTab.iconStyling} name={"bookmark"} size={Dimens.extraSmallIconSize} color={colors.appRed} />
                                    : <FontAwesomeIcons style={StyleTab.iconStyling} name={"bookmark-o"} size={Dimens.extraSmallIconSize} color={colors.textLightColor} />}

                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={StyleTab.divider} />
            </View >

        );
    }

    renderRetweetData(item) {

        if (item === undefined || item === "" || item === null) {
            return (<View style={{ flex: 1, overflow: 'hidden', padding: Dimens.ten, flexDirection: "column", flex: 1, marginTop: Dimens.five, borderColor: colors.appGreen, borderWidth: Dimens.two, borderRadius: Dimens.fifteen, overflow: 'hidden' }}            >
                <Text style={{
                    color: colors.textDarkColor,
                    flex: 0.7,
                    fontSize: Dimens.largeTextSize,
                    alignSelf: 'flex-start'
                }} children={"This spark has been deleted"} />
            </View>)
        } else {

            return (
                <View style={{ flexDirection: "column", flex: 1, marginTop: Dimens.five, borderColor: colors.appGreen, borderWidth: Dimens.two, borderRadius: Dimens.fifteen, overflow: 'hidden' }}            >
                    <View style={{ flex: 1, flexDirection: "row", padding: Dimens.ten, overflow: 'hidden' }}>
                        <FastImage
                            style={StyleTab.retweetImageViewContainer}
                            source={{
                                uri: item.profile_image,
                                priority: FastImage.priority.high
                            }}
                            resizeMode={FastImage.resizeMode.cover} />

                        <View style={StyleTab.Row2Container}>
                            <View style={StyleTab.retweetStyleNameTimeContainer}>
                                <Text style={StyleTab.retweetStyleTweetName}>{item.name === "" ? "" : item.name}</Text>
                                <Text style={StyleTab.retweetStyleTweetTime}>{Moment(item.created).format('hh:mm a')}</Text>
                            </View>

                            <Text style={StyleTab.styleTweetUserName}>{item.at_username === "" ? "" : item.at_username}</Text>

                            {(item.post_title !== '' || item.post_title !== null) &&

                                <ParsedText
                                    style={{ fontSize: Dimens.mediumTextSize, color: colors.appRed }}
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
                                </ParsedText>}

                            {(item.type === "image" || item.type === "video" || item.type === "text")
                                &&
                                <AvView
                                    AVDimen={{ width: wp(75), height: wp(60) }}
                                    dispatch={this.props}
                                    user_id={this.props.userId}
                                    post_id={item.post_id}
                                    type={item.posttype}
                                    source={getPostTypeData(item.posttype, item)}
                                />}
                        </View>

                        <View style={StyleTab.divider} />
                    </View>
                </View>);
        }
    }
}

