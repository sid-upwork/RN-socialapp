import React, { Component } from "react";
import { View, FlatList, TextInput, Keyboard, NetInfo, Platform, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import FastImage from 'react-native-fast-image';

import Dialog, { ScaleAnimation } from 'react-native-popup-dialog';
import Swiper from 'react-native-swiper';
import IonIcons from "react-native-vector-icons/Ionicons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LineIcons from "react-native-vector-icons/SimpleLineIcons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import ParsedText from 'react-native-parsed-text';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import parsedTextStyle from "../../utils/ParsedTextStyle";
import colors from "../../utils/Colors";
import { Dimens } from "../../utils/Dimens";
import AvView from "../../utils/AvView";
import { NavigationActions, StackActions } from "react-navigation";

import { LIKE_DISLIKE_POST, RETWEET_POST, COMMENT_POST, ADD_REMOVE_BOOKMARK } from '../../utils/URLs';
import InternetConnection from '../../utils/InternetConnection';

import Header from "../Common/BackHeader/BackHeader";
import Moment from 'moment';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    getPostDetail, postForHomePost,
    showActionDialogs, postVotePoll,
    deletePost, blockUser, muteUser,
    initializeState, reportSpark
} from "../../redux/action/GetPostDetailAction";
import {
    showProgressDialog, renderErrorNoDataFound, getPostTypeData,
    retweetDialog, retweetWithCommentDialog
} from "../../utils/Utilities";

import s from "./ViewPostStyle";
var comment = '';

class ViewPostClass extends Component {

    constructor(props) {
        super(props);

        this.props.initializeState();
        const { navigation } = this.props;
        const postId = navigation.getParam("id");
        const userIdd = navigation.getParam("userId");

        this.state = {
            userId: userIdd,
            postId: postId,
            showFullImageDialog: false,
            isConnected: false
        };

        this.postComment = this.postComment.bind(this);
        this.showPost = this.showPost.bind(this);
        this.searchHashtag = this.searchHashtag.bind(this)
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (!isConnected) {
                Alert.alert("No internet connection..!")
                return;
            }
            this.setState({ internetConnected: isConnected },
                () => this.props.getPostDetail(JSON.stringify({ user_id: this.state.userId, post_id: this.state.postId }))
            )
        })
    }

    handleConnectivityChange = (connected) => {
        this.setState({ internetConnected: connected });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    hideMenu(name, postData, index) {
        const { userId } = this.state;

        if (!this.state.internetConnected) {
            Alert.alert("No internet connection!")
            return
        }

        if (name == "delete")
            this.props.deletePost(userId, JSON.stringify({ user_id: userId, post_id: postData.post_id }), true)
        else if (name == 'username')
            this.props.blockUser(JSON.stringify({ user_id: userId, receiver_id: postData.user_id }))
        else if (name == 'mute')
            this.props.muteUser(JSON.stringify({ user_id: userId, receiver_id: postData.user_id }))

        else if (name == 'deleteComment')
            this.props.deletePost(userId, JSON.stringify({ user_id: userId, comment_id: postData.comment_id }), false, index)
        else if (name == 'usernameFromComment')
            this.props.blockUser(JSON.stringify({ user_id: userId, receiver_id: postData.user_id }), postData.user_id)
        else if (name == "muteFromComment")
            this.props.muteUser(JSON.stringify({ user_id: userId, receiver_id: postData.user_id }), postData.user_id)
        else {
            this.props.reportSpark(JSON.stringify({ user_id: userId, post_id: postData.post_id, "type": "post" }))
        }
    }

    ListViewItemSeparator = () => {
        return <View style={s.divider} />;
    };

    searchHashtag(hashtag) {
        this.props.navigation.navigate('SearchDetailClass', { key: hashtag, userId: this.props.userId });
    }

    handleHashtagPress = (hashtag) => {
        this.searchHashtag(hashtag);
    }

    componentWillReceiveProps(nextProps) {
        const { actionDone } = nextProps.GetPostDetailReducers;

        if (actionDone) {
            this.props.initializeState();
            this.props.navigation.goBack(null);
        }
    }

    showProfile(item) {
        this.props.navigation.navigate('ProfileClass', {
            'userID': this.state.userId,
            'userName': item.at_username,
        });
    }

    showPost(item) {
        this.props.navigation.navigate('MomentDetailClass', {
            id: item.momentData.moment_id,
            userId: this.state.userId,
            momentStatus: item.momentData.activeStatus == "0" ? "inactive" : "active"
        });
    }

    renderPostDetailView(postData) {
        const { userId } = this.state;

        return (
            <KeyboardAvoidingView style={{
                flex: 1,
                backgroundColor: colors.white,
            }} enabled={Platform.OS == "ios"} behavior={"padding"}>

                <ScrollView style={{ flex: .9 }}>

                    {this.showFullViewDialog(postData.postImgData)}

                    <View style={s.mainContainer}>

                        <View style={s.SparkContainer}>
                            <FastImage
                                style={s.mainImageStyle}
                                source={{
                                    uri: postData.profile_image,
                                    priority: FastImage.priority.high
                                }}
                                resizeMode={FastImage.resizeMode.cover} />

                            <View style={s.textContainer}>
                                <Text onPress={() => this.showProfile(postData)} style={s.mainNameTextStyle}>{postData.name}</Text>
                                <Text style={s.mainUserNameStyle}>{postData.at_username}</Text>
                            </View>

                            <Menu>
                                <MenuTrigger >
                                    <MaterialIcons
                                        style={s.dropDownIconStyle}
                                        name="keyboard-arrow-down"
                                        size={Dimens.extraLargeIconSize}
                                        color={colors.textDarkColor}
                                    />
                                </MenuTrigger>

                                <MenuOptions>
                                    {userId == postData.user_id &&
                                        <MenuOption
                                            onSelect={() => this.hideMenu('delete', postData)}
                                            disabled={userId != postData.user_id}
                                            text='Delete Spark' />}
                                    {userId != postData.user_id &&
                                        <MenuOption
                                            onSelect={() => this.hideMenu('username', postData)}
                                            disabled={userId == postData.user_id}
                                            text={"Block " + postData.at_username} />}
                                    {userId != postData.user_id &&
                                        <MenuOption
                                            onSelect={() => this.hideMenu('mute', postData)}
                                            disabled={userId == postData.user_id}
                                            text={'Mute ' + postData.at_username} />}
                                    {userId != postData.user_id &&
                                        <MenuOption
                                            onSelect={() => this.hideMenu('report', postData)}
                                            disabled={userId == postData.user_id}
                                            text='Report Spark' />}
                                </MenuOptions>
                            </Menu>

                        </View>

                        <View style={s.divider} />

                        {(postData.post_title !== '' || postData.post_title !== null) &&
                            <ParsedText
                                style={s.SparkDetailStyle}
                                parse={[
                                    { type: 'url', style: parsedTextStyle.url, onPress: this.handleUrlPress },
                                    { type: 'phone', style: parsedTextStyle.phone, onPress: this.handlePhonePress },
                                    { type: 'email', style: parsedTextStyle.email, onPress: this.handleEmailPress },
                                    { pattern: /\[(@[^:]+):([^\]]+)\]/i, style: parsedTextStyle.username, onPress: this.handleNamePress, renderText: this.renderText },
                                    { pattern: /42/, style: parsedTextStyle.magicNumber },
                                    { pattern: /#(\w+)/, style: parsedTextStyle.hashTag, onPress: this.handleHashtagPress },
                                ]}
                                childrenProps={{ allowFontScaling: false }}>
                                {postData.post_title}
                            </ParsedText>
                        }

                        <TouchableOpacity
                            style={{ padding: Dimens.ten }}
                            onPress={() => {
                                if (postData.posttype === "image") {
                                    this.setState({ showFullImageDialog: true })
                                } else if (postData.posttype === 'moment') {
                                    this.showPost(postData);
                                } else {
                                    console.log(this.props)
                                }
                            }}>

                            {postData.posttype === 'retweet_title'
                                ?
                                this.renderRetweetData(postData.retweetData[0]) :
                                <AvView
                                    AVDimen={{ width: wp(95), height: wp(60) }}
                                    dispatch={this.props}
                                    user_id={this.state.userId}
                                    post_id={postData.post_id}
                                    type={postData.posttype}
                                    expiry_days_left={postData.expiry_days_left}
                                    poll_expiry={postData.poll_expiry}
                                    pollVoteStatus={postData.pollVoteStatus}
                                    source={getPostTypeData(postData.posttype, postData)}
                                />}

                        </TouchableOpacity>

                        <View style={s.divider} />

                        <View style={s.likeCommentContainer}>
                            <Text style={s.likeStyle}>{postData.totallike == "0" || postData.totallike == "1" ? postData.totallike + ' Like' : postData.totallike + ' Likes'} </Text>
                            <Text style={s.commentStyle}>{postData.totalComment == "0" || postData.totalComment == "1" ? postData.totalComment + ' Comment' : postData.totalComment + ' Comments'} </Text>
                        </View>

                        <View style={s.divider} />

                        <View style={s.iconsContainer}>
                            <TouchableOpacity style={s.iconContainer} onPress={() => this.input.focus()}>
                                {postData.commentStatus == '1' ?
                                    <FontAwesomeIcons style={s.iconStyling} name="comment" size={Dimens.smallIconSize} color={colors.appRed} />
                                    : <LineIcons style={s.iconStyling} name="bubble" size={Dimens.smallIconSize} color={colors.textLightColor} />}

                            </TouchableOpacity>

                            <View style={s.verticalDivider} />

                            <TouchableOpacity style={s.iconContainer} onPress={() => {
                                if (!this.state.internetConnected) {
                                    Alert.alert("No internet connection!")
                                    return
                                }

                                postData.retweetStatus == "1" ?
                                    this.props.postForHomePost(RETWEET_POST, JSON.stringify({
                                        user_id: this.state.userId,
                                        post_id: postData.post_id,
                                        retweet_status: "retweet"
                                    }))
                                    :
                                    this.props.showActionDialogs(true, postData, 'retweet')
                            }}>
                                <LineIcons style={s.iconStyling} name="refresh" size={Dimens.smallIconSize} color={postData.retweetStatus == '0' ? colors.textLightColor : colors.appRed} />
                            </TouchableOpacity>

                            <View style={s.verticalDivider} />

                            <TouchableOpacity style={s.iconContainer}
                                onPress={() => {
                                    if (!this.state.internetConnected) {
                                        Alert.alert("No internet connection!")
                                        return
                                    }
                                    this.props.postForHomePost(LIKE_DISLIKE_POST, JSON.stringify({
                                        user_id: this.state.userId,
                                        post_id: postData.post_id
                                    }))
                                }}>

                                {postData.likeStatus == '1' ?
                                    <FontAwesomeIcons style={s.iconStyling} name="heart" size={Dimens.smallIconSize} color={colors.appRed} />
                                    : <FontAwesomeIcons style={s.iconStyling} name="heart-o" size={Dimens.smallIconSize} color={colors.textLightColor} />}
                            </TouchableOpacity>

                            <View style={s.verticalDivider} />

                            <TouchableOpacity style={s.iconContainer}
                                onPress={() => {
                                    if (!this.state.internetConnected) {
                                        Alert.alert("No internet connection!")
                                        return
                                    }
                                    this.props.postForHomePost(ADD_REMOVE_BOOKMARK, JSON.stringify({
                                        user_id: userId,
                                        post_id: postData.post_id
                                    }))
                                }}>

                                {postData.bookmarkStatus == '1' ?
                                    <FontAwesomeIcons style={s.iconStyling} name="bookmark" size={Dimens.smallIconSize} color={colors.appRed} />
                                    : <FontAwesomeIcons style={s.iconStyling} name={"bookmark-o"} size={Dimens.smallIconSize} color={colors.textDarkColor} />}
                            </TouchableOpacity>
                        </View>

                        <View style={s.divider} />

                        <FlatList
                            style={s.flatListContainer}
                            data={postData.commentData}
                            showsVerticalScrollIndicator={false}
                            renderSeparator={this.ListViewItemSeparator}
                            keyExtractor={item => item.comment_id}
                            renderItem={({ item, index }) => (
                                <View style={{
                                    flexDirection: "column",
                                    marginTop: Dimens.five,
                                    paddingLeft: Dimens.twentyFive
                                }}>
                                    <View style={s.bodyContainer}>
                                        <FastImage
                                            style={s.imageStyle}
                                            source={{
                                                uri: item.profile_image,
                                                priority: FastImage.priority.high
                                            }}
                                            resizeMode={FastImage.resizeMode.cover} />

                                        <View style={s.rightContainer}>
                                            <View style={s.upperContainer}>
                                                <Text onPress={() => this.showProfile(postData)} style={s.upperTextStyle} children={item.name} />
                                                <Text style={s.upperTimeStyle}>{Moment(item.created).format('hh:mm a')}</Text>

                                                <Menu>
                                                    <MenuTrigger >
                                                        <MaterialIcons
                                                            style={s.dropDownIconStyle}
                                                            name="keyboard-arrow-down"
                                                            size={Dimens.mediumIconSize}
                                                            color={colors.textDarkColor} />
                                                    </MenuTrigger>

                                                    <MenuOptions>
                                                        {(userId == postData.user_id || userId == item.user_id) &&
                                                            <MenuOption
                                                                onSelect={() => this.hideMenu('deleteComment', item, index)}
                                                                text='Delete comment' />
                                                        }
                                                        {userId != item.user_id &&
                                                            <MenuOption
                                                                onSelect={() => this.hideMenu('usernameFromComment', item)}
                                                                disabled={userId == item.user_id}
                                                                text={"Block " + item.at_username} />
                                                        }
                                                        {userId != item.user_id &&
                                                            <MenuOption
                                                                onSelect={() => () => this.hideMenu('muteFromComment', item)}
                                                                disabled={userId == item.user_id}
                                                                text={"Mute" + item.at_username} />
                                                        }
                                                    </MenuOptions>
                                                </Menu>
                                            </View>

                                            <Text style={s.userNameStyle}>{item.at_username}</Text>
                                            <Text style={s.middleContainerText}>{item.comment_text}</Text>

                                        </View>
                                    </View>
                                    <View style={s.divider} />
                                </View>)} />
                    </View>

                </ScrollView>

                <View style={s.commentTypeContainer} >

                    <TextInput
                        keyboardAppearance="default"
                        autoCorrect={false}
                        placeholder="Enter comment"
                        multiline={true}
                        ref={x => this.input = x}
                        placeholderTextColor={colors.placeHolderColor}
                        textAlign={"auto"}
                        style={s.styleInputViewSpark}
                        onChangeText={(c) => comment = c}
                        clearButtonMode='always'
                        onSubmitEditing={() => this.postComment(postData.post_id)} />

                    <MaterialIcons onPress={() => this.postComment(postData.post_id)}
                        name="arrow-forward"
                        size={Dimens.mediumIconSize}
                        color={colors.white} />

                </View>
            </KeyboardAvoidingView>
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
                <View style={{ flexDirection: "column", flex: 1, marginBottom: Dimens.ten, borderColor: colors.appGreen, borderWidth: Dimens.two, borderRadius: Dimens.fifteen, overflow: 'hidden' }}            >
                    <View style={{ flex: 1, flexDirection: "row", padding: Dimens.ten, overflow: 'hidden' }}>
                        <FastImage
                            style={s.retweetImageViewContainer}
                            source={{
                                uri: item.profile_image,
                                priority: FastImage.priority.high
                            }}
                            resizeMode={FastImage.resizeMode.cover} />

                        <View style={s.Row2Container}>
                            <View style={s.retweetStyleNameTimeContainer}>
                                <Text style={s.retweetStyleTweetName}>{item.name === "" ? "" : item.name}</Text>
                                <Text style={s.styleTweetTime}>{Moment(item.created).format('hh:mm a')}</Text>
                            </View>

                            <Text style={s.styleTweetUserName}>{item.at_username === "" ? "" : item.at_username}</Text>

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

                        <View style={s.divider} />
                    </View>
                </View>);
        }
    }

    postComment(post_id) {
        try { Keyboard.dismiss(); } catch (e) { e => console.log(e) }
        this.input.clear();
        if (comment === '') {
            console.log('Please enter comment first!')
            return;
        }

        if (!this.state.internetConnected) {
            Alert.alert("No internet connection!")
            return
        }

        this.props.postForHomePost(COMMENT_POST,
            JSON.stringify({
                user_id: this.state.userId,
                post_id: post_id,
                comment_text: comment,
            }));

        comment = '';
    }

    render() {
        const { userId } = this.state;
        const { postData, isFetching, error, post_id, showDialog, dialogType } = this.props.GetPostDetailReducers;

        return <View style={{ flex: 1 }}>
            <Header title="Post"
                showDoneButton={false}
                backValue={true}
                goBackProp={this.props.navigation} />
            {/* {showProgressDialog(isFetching)} */}

            <InternetConnection />
            {dialogType === 'retweet' ?
                (retweetDialog(showDialog, this.props, userId, post_id))
                : dialogType === 'retweetWithComment' ?
                    (retweetWithCommentDialog(showDialog, this.props, userId, post_id))
                    : null}

            {!error && postData != "" && postData != null && postData != undefined
                ? this.renderPostDetailView(postData[0])
                : renderErrorNoDataFound("No Spark found")}
        </View>
    }

    showFullViewDialog(imageSource) {
        return (
            <Dialog
                haveOverlay={true}
                onTouchOutside={() => {
                    this.setState({ showFullImageDialog: false })
                }}

                animationDuration={500}
                height={.8}
                width={.9}
                show={this.state.showFullImageDialog}
                containerStyle={s.dialogContainer}
                visible={this.state.showFullImageDialog}
                dialogAnimation={new ScaleAnimation({ toValue: 0, useNativeDriver: true })} >
                {this.state.showFullImageDialog
                    &&
                    <View style={s.dialogBodyContainer} >
                        {(imageSource.length < 1) ? this.renderImageView(imageSource) : this.renderMultipleImages(imageSource)}
                    </View >}
            </Dialog >
        );
    }

    renderMultipleImages(imageSource) {
        var imagesView = [];

        for (let i = 0; i < imageSource.length; i++) {
            imagesView.push(
                <FastImage
                    key={imageSource[i].file}
                    style={{ flex: 1 }}
                    source={{
                        uri: imageSource[i].file,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain} />
            )
        }

        return <Swiper style={{ flex: 1, }} showsButtons={true} horizontal>{imagesView}</Swiper>
    }

    renderImageView(imageSource) {
        return (
            <FastImage
                style={{ width: "100%", height: "100%", marginBottom: Dimens.ten }}
                source={{
                    uri: imageSource[0].file,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain} />
        );
    }

}

function mapStateToProps(state) {
    return {
        GetPostDetailReducers: state.GetPostDetailReducers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            getPostDetail,
            postForHomePost,
            showActionDialogs,
            postVotePoll,
            deletePost,
            blockUser,
            muteUser,
            initializeState,
            reportSpark
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPostClass);
