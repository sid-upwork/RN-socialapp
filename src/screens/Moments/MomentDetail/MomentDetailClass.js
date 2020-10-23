import React, { PureComponent } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Alert,
    Platform, ScrollView, NetInfo
} from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import IconFeather from 'react-native-vector-icons/Feather';
import Header from '../../Common/BackHeader/BackHeader';
import { showProgressDialog, renderErrorNoDataFound, getPostTypeData } from "../../../utils/Utilities";
import Moment from 'moment';

import ParsedText from 'react-native-parsed-text';
import FastImage from 'react-native-fast-image';
var s = require('./MomentDetailStyle');

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getMomentDetail, tweetMoment, likeMoment, deleteAttachedTweetFromMoment, momentDetailUnavailable } from "../../../redux/action/MomentAction";
import { Dimens } from '../../../utils/Dimens';
import colors from '../../../utils/Colors';
import AvView from "../../../utils/AvView";


import parsedTextStyle from '../../../utils/ParsedTextStyle';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const window = Dimensions.get('window');
const ROW_HEIGHT = Platform.OS == "ios" ? (isIphoneXorAbove() ? Dimens.ninety : Dimens.eighty) : Dimens.sixty;
const PARALLAX_HEADER_HEIGHT = window.width;
const STICKY_HEADER_HEIGHT = Platform.OS == "ios" ? (isIphoneXorAbove() ? Dimens.ninety : Dimens.eighty) : Dimens.sixty;


function isIphoneXorAbove() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    );
}

class MomentDetailClass extends PureComponent {

    state = { internetConnected: false }

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu() {
        const { navigation } = this.props;
        const momentId = navigation.getParam("id");
        const userId = navigation.getParam("userId");
        this._menu.hide();

        if (!this.state.internetConnected) {
            Alert.alert("No internet connection!")
            return
        }

        this.props.tweetMoment(JSON.stringify({ moment_id: momentId, user_id: userId, title: "" }));
    };

    showMenu = () => {
        this._menu.show();
    };

    handleBackPress = () => {
        this.goBack(null);
        return true;
    }

    componentDidMount() {
        const { navigation } = this.props;
        const momentId = navigation.getParam("id");
        const userId = navigation.getParam("userId");
        const momentStatus = navigation.getParam("momentStatus");

        if (momentStatus == "inactive") {
            this.props.momentDetailUnavailable();
            return;
        }

        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (!isConnected) {
                Alert.alert("No internet connection..!")
                return;
            }
            this.setState({ internetConnected: isConnected },
                () => this.props.getMomentDetail(JSON.stringify({ moment_id: momentId, user_id: userId }))
            )
        })
    }

    handleConnectivityChange = (connected) => {
        this.setState({ internetConnected: connected });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }


    showProfile(item) {
        const { navigation } = this.props;
        const userId = navigation.getParam("userId");

        this.props.navigation.navigate('ProfileClass', {
            'userID': userId,
            'userName': item.at_username,
        });
    }

    deleteAttachedTweet(item, index) {
        const { navigation } = this.props;
        const momentId = navigation.getParam("id");
        const userId = navigation.getParam("userId");

        Alert.alert(
            'Alert!', 'Are you sure you want to delete this tweet?',
            [{ text: 'No', onPress: () => { null } },
            {
                text: 'Yes', onPress: () => {
                    if (!this.state.internetConnected) {
                        Alert.alert("No internet connection!")
                        return
                    }
                    this.props.deleteAttachedTweetFromMoment(JSON.stringify({
                        attach_tweet_id: item.post_id,
                        user_id: userId,
                        moment_id: momentId
                    }), index)
                }
            }]
            , { cancelable: true }
        )
    }

    render() {
        const { isFetching, momentDetailData, momentDetailError } = this.props.MomentReducers;

        return (
            <View style={s.mainContainer} >
                {showProgressDialog(isFetching)}
                {!momentDetailError && momentDetailData != "" ?
                    this.renderMainView(momentDetailData)
                    :
                    <View style={s.mainContainer} >
                        <Header title="Instants"
                            backValue={false}
                            showDoneButton={false}
                            goBackProp={this.props.navigation} />
                        <View style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: colors.white
                        }}>
                            <Text
                                style={{
                                    color: colors.appRed,
                                    fontSize: Dimens.headingTextSize
                                }}
                                children="Instant has been deleted by user."
                            />
                        </View>
                    </View>
                }
            </View>
        );
    }

    renderError = () => {
        return <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.white,
                margin: Dimens.ten
            }}
        >
            <Text
                style={{
                    color: colors.appRed,
                    fontSize: Dimens.headingTextSize
                }}
                children={"No Sparks are attached to this instant yet!"}
            />
        </View>
    }

    renderMainView(data) {
        const { onScroll = () => { } } = this.props;
        const { navigation } = this.props;
        const momentId = navigation.getParam("id");
        const userId = navigation.getParam("userId");
        var like = data.momentsDetail.totalLikes == "1" ? "Like" : "Likes";

        if ((momentId == undefined || momentId == null || momentId == "")
            && (userId == undefined || userId == null || userId == "")) {
            return renderErrorNoDataFound("No Instant found ");
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
                    <FlatList style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)' }}
                        data={data.momentsDetail.posts}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.post_id.toString()}
                        ListEmptyComponent={this.renderError}
                        renderItem={({ item, index }) =>
                            <View style={s.flatListMainContainer}>
                                <FastImage
                                    style={s.retweetImageViewContainer}
                                    source={{
                                        uri: item.profile_image,
                                        priority: FastImage.priority.high
                                    }}
                                    resizeMode={FastImage.resizeMode.cover} />

                                <View style={s.Row2Container}>
                                    <View style={s.retweetStyleNameTimeContainer}>
                                        <Text onPress={() => this.showProfile(item)}
                                            style={s.retweetStyleTweetName}
                                            children={item.name === "" ? "" : item.name} />

                                        <Text style={s.styleTweetTime}>{Moment(item.created).format('hh:mm a')}</Text>
                                        <IconFeather
                                            onPress={() => this.deleteAttachedTweet(item, index)}
                                            style={s.deleteIconStyle}
                                            name={'more-vertical'}
                                            size={Dimens.smallIconSize}
                                            color={colors.textDarkColor} />

                                    </View>

                                    <Text style={s.rr}>{item.at_username === "" ? "" : item.at_username}</Text>

                                    {(item.post_title !== '' || item.post_title !== null) &&

                                        <ParsedText
                                            style={s.postTitleStyle}
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

                                    {
                                        (item.posttype == "image" || item.posttype == "video" || item.posttype == "text")
                                        &&
                                        <AvView
                                            AVDimen={{ width: widthPercentageToDP(75), height: widthPercentageToDP(60) }}
                                            dispatch={this.props}
                                            user_id={this.props.userId}
                                            post_id={item.post_id}
                                            type={item.posttype}
                                            source={getPostTypeData(item.posttype, item)}
                                        />
                                    }
                                </View>

                                <View style={s.divider} />
                            </View>
                        }
                        renderScrollComponent={props => (
                            <ParallaxScrollView
                                onScroll={onScroll}
                                headerBackgroundColor="#fff"
                                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                                backgroundSpeed={10}

                                renderBackground={() => (
                                    <View key="background">
                                        <FastImage
                                            style={{
                                                width: window.width,
                                                height: PARALLAX_HEADER_HEIGHT
                                            }}
                                            source={{
                                                uri: data.momentsDetail.file,
                                                priority: FastImage.priority.high
                                            }}
                                            resizeMode={FastImage.resizeMode.cover}
                                        />
                                        <View style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            width: window.width,
                                            backgroundColor: 'rgba(0,0,0,.2)',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-end',
                                            height: PARALLAX_HEADER_HEIGHT,
                                            paddingVertical: Dimens.ten
                                        }} >


                                        </View>
                                    </View>
                                )}
                                renderForeground={() => (
                                    <View key="parallax-header" style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        width: window.width,
                                        backgroundColor: 'rgba(0,0,0,.4)',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        height: PARALLAX_HEADER_HEIGHT,
                                        paddingVertical: Dimens.ten
                                    }} >

                                        <View style={{ flexDirection: 'row', marginLeft: Dimens.ten }}>
                                            <FastImage
                                                style={s.userImageStyle}
                                                source={{
                                                    uri: data.momentsDetail.profile_image,
                                                    priority: FastImage.priority.high
                                                }}

                                                resizeMode={FastImage.resizeMode.cover}
                                            />
                                            <View style={{ flexDirection: 'column', marginLeft: Dimens.ten }}>
                                                <Text onPress={() => this.showProfile(data.momentsDetail)} style={s.nameStyle} children={data.momentsDetail.name} />
                                                <Text style={s.usernameStyle} children={data.momentsDetail.username} />
                                            </View>

                                        </View>

                                        <ParsedText
                                            numberOfLines={1}
                                            style={s.parsedTextContainer}
                                            parse={[
                                                { type: 'url', style: parsedTextStyle.url, onPress: this.handleUrlPress },
                                                { type: 'phone', style: parsedTextStyle.phone, onPress: this.handlePhonePress },
                                                { type: 'email', style: parsedTextStyle.email, onPress: this.handleEmailPress },
                                                { pattern: /\[(@[^:]+):([^\]]+)\]/i, style: parsedTextStyle.username, onPress: this.handleNamePress, renderText: this.renderText },
                                                { pattern: /42/, style: parsedTextStyle.magicNumber },
                                                { pattern: /#(\w+)/, style: parsedTextStyle.hashTag, onPress: this.handleHashtagPress },
                                            ]}
                                            childrenProps={{ allowFontScaling: false }}>
                                            {data.momentsDetail.title}
                                        </ParsedText>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            <Text style={s.textNowStyle} children={"Now"} />

                                            {
                                                data.momentsDetail.totalLikes != "0"
                                                &&
                                                < Text style={s.likeStyle} children={data.momentsDetail.totalLikes + " " + like} />
                                            }
                                        </View>


                                        <ParsedText
                                            style={s.parsedHeaderTextContainer}
                                            numberOfLines={10}
                                            parse={[
                                                { type: 'url', style: parsedTextStyle.url, onPress: this.handleUrlPress },
                                                { type: 'phone', style: parsedTextStyle.phone, onPress: this.handlePhonePress },
                                                { type: 'email', style: parsedTextStyle.email, onPress: this.handleEmailPress },
                                                { pattern: /\[(@[^:]+):([^\]]+)\]/i, style: parsedTextStyle.username, onPress: this.handleNamePress, renderText: this.renderText },
                                                { pattern: /42/, style: parsedTextStyle.magicNumber },
                                                { pattern: /#(\w+)/, style: parsedTextStyle.hashTag, onPress: this.handleHashtagPress },
                                            ]}
                                            childrenProps={{ allowFontScaling: false }}>
                                            {data.momentsDetail.description}
                                        </ParsedText>

                                    </View>
                                )}

                                renderStickyHeader={() => (
                                    <View key="sticky-header" style={styles.stickySection}>
                                        <Text numberOfLines={1} style={styles.stickySectionText}>{data.momentsDetail.title}</Text>
                                    </View>
                                )}

                                renderFixedHeader={() => (
                                    <View key="fixed-header" style={styles.fixedSection}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.goBack()}
                                            style={s.backIconStyle}>
                                            <IconFeather name={'chevron-left'} size={Dimens.largeIconSize} color={colors.textDarkColor} />
                                        </TouchableOpacity >

                                        <TouchableOpacity
                                            onPress={() => {
                                                if (!this.state.internetConnected) {
                                                    Alert.alert("No internet connection!")
                                                    return
                                                }
                                                this.props.likeMoment(JSON.stringify({ moment_id: momentId, user_id: userId }))
                                            }}
                                            style={{ ...s.likeIconStyle, ...{ 'marginLeft': data.momentsDetail.isPublished == "1" ? "67%" : "77%" } }} >
                                            {data.momentsDetail.likeStatus == '1' ?
                                                <IconFeather name="heart" size={Dimens.largeIconSize} color={colors.appRed} />
                                                : <IconFeather name="heart" size={Dimens.largeIconSize} color={colors.textLightColor} />}

                                        </TouchableOpacity >

                                        {data.momentsDetail.isPublished == "1" &&
                                            <TouchableOpacity onPress={this.showMenu}
                                                style={s.newTweetStyle} >
                                                <Menu
                                                    ref={this.setMenuRef}
                                                    button={
                                                        <IconFeather
                                                            name={'more-vertical'}
                                                            size={Dimens.largeIconSize}
                                                            color={colors.textDarkColor} />
                                                    }>
                                                    <MenuItem onPress={this.hideMenu.bind(this)}>Spark this</MenuItem>
                                                </Menu>
                                            </TouchableOpacity>
                                        }
                                    </ View>
                                )} />)}
                    />
                </View>
            );
        }
    }
}


function mapStateToProps(state) {
    return {
        MomentReducers: state.MomentReducers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ getMomentDetail, tweetMoment, likeMoment, deleteAttachedTweetFromMoment, momentDetailUnavailable }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MomentDetailClass);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.appRed
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        alignItems: 'center',
        height: STICKY_HEADER_HEIGHT,
        justifyContent: 'flex-end'
    },
    stickySectionText: {
        width: "30%",
        color: colors.white,
        fontSize: Dimens.largeTextSize,
        alignSelf: 'center',
        margin: Dimens.twenty
    },
    fixedSection: {
        width: "100%",
        position: 'absolute',
        flexDirection: 'row',
        paddingTop: Platform.OS == "ios" ?
            (isIphoneXorAbove() ? Dimens.thirty : Dimens.twenty)
            : Dimens.zero
    },
    fixedSectionText: {
        color: colors.appRed,
        fontSize: Dimens.mediumTextSize,
    },
    parallaxHeader: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: Dimens.hundred,
    },
    sectionSpeakerText: {
        color: colors.white,
        fontSize: 24,
        paddingVertical: Dimens.five,
    },
    sectionTitleText: {
        color: colors.white,
        fontSize: Dimens.largeTextSize,
        paddingVertical: Dimens.five,
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: Dimens.ten,
        height: ROW_HEIGHT,
        backgroundColor: colors.white,
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: Dimens.largeTextSize,
    }
});
