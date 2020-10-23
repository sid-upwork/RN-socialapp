var React = require('react-native');
import colors from "../../../utils/Colors";
import { fontSize, Dimens } from "../../../utils/Dimens";

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
var { StyleSheet, Dimensions, Platform } = React;

export function isIphoneXorAbove() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    );
}

module.exports = StyleSheet.create({
    dropDownIconStyle: {
        alignSelf: 'flex-start',
        flex: .1,
        marginTop: Dimens.two,
    },
    // Style
    mainContainer: {
        width: wp(100),
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white
    },
    divider: {
        height: Dimens.dividerHeight,
        backgroundColor: colors.appDividerColor,
    },
    followerFollowingStyle: {
        backgroundColor: colors.red,
        flexDirection: 'row',
        marginTop: Dimens.ten,
    },
    followFollowingCount: {
        color: colors.white,
        fontWeight: '500',
        fontSize: Dimens.mediumTextSize
    },
    followFollowingText: {
        color: colors.white,
        fontWeight: '500',
        fontSize: Dimens.tinyTextSize
    },
    followerStyle: {
        flex: 1,
        flexDirection: 'column',
        padding: Dimens.five,
        alignItems: 'center',
        justifyContent: 'center'
    },
    followingStyle: {
        flex: 1,
        flexDirection: 'column',
        padding: Dimens.five,
        alignItems: 'center',
        justifyContent: 'center'
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Dimens.tweleve
    },
    locationIconStyle: {
        marginStart: Dimens.five,
        fontSize: Dimens.smallTextSize,
        color: colors.textDarkColor,
    },
    nameStyle: {
        fontWeight: '500',
        color: colors.textDarkColor,
        fontSize: Dimens.headingTextSize,
    },
    userNameStyle: {
        color: colors.textDarkColor,
        fontSize: Dimens.mediumTextSize,
        paddingLeft: Dimens.ten
    },
    profileStyle: {
        color: colors.textDarkColor,
        fontSize: Dimens.mediumTextSize,
        marginTop: Dimens.ten,
        paddingLeft: Dimens.ten
    },
    editProfileContainer: {
        borderRadius: Dimens.hundred,
        padding: Dimens.five,
        width: wp(26),
        borderColor: colors.textDarkColor,
        borderWidth: Dimens.two
    },
    editProfileTextStyle: {
        fontSize: Dimens.extraSmallTextSize,
        alignSelf: 'center',
        color: colors.textDarkColor,
    },
    stickyContainer: {
        height: Dimens.thousand
    },
    bannerContainerStyle: {
        position: 'absolute',
        top: Dimens.zero,
        left: Dimens.zero,
        right: Dimens.zero,
        backgroundColor: colors.appRed,
        height: Platform.OS == "ios" ?
            (isIphoneXorAbove() ? Dimens.twoHundred : Dimens.oneNinety)
            : Dimens.oneSeventy,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Platform.OS == "ios" ?
            (isIphoneXorAbove() ? Dimens.thirty : Dimens.twenty)
            : Dimens.zero
    },
    bannerImageContainer: {
        height: Platform.OS == "ios" ?
            (isIphoneXorAbove() ? Dimens.twoHundred : Dimens.oneNinety)
            : Dimens.oneSeventy,
        width: "100%",
        position: 'absolute'
    },
    noTweetContainer: {
        flex: 1,
        color: colors.appRed,
        fontSize: Dimens.extraLargerTextSize
    },
    sparkHeadingContainer: {
        backgroundColor: colors.imageLightBackgroundColor,
        flexDirection: 'row',
        padding: Dimens.ten,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sparkTextContainer: {
        color: colors.textDarkColor,
        fontWeight: '400',
        fontSize: Dimens.extraLargerTextSize
    },
    headerContainer: {
        zIndex: Dimens.five,
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: Platform.OS == "ios" ?
            (isIphoneXorAbove() ? Dimens.thirty : Dimens.twenty)
            : Dimens.zero
    },
    profileHeaderStyle: {
        margin: Dimens.ten,
        opacity: .8,
        alignSelf: "flex-start",
        borderRadius: Dimens.fifteen,
        backgroundColor: colors.white,
        overflow: 'hidden',
    },
    profilePicContainer: {
        height: Dimens.eighty,
        width: Dimens.eighty,
        borderRadius: Dimens.fourty,
        borderColor: colors.white,
        borderWidth: Dimens.two,
        elevation: Dimens.one,
        overflow: 'hidden',
        marginTop: Platform.OS == "ios" ?
            (isIphoneXorAbove() ? Dimens.oneSixty : Dimens.oneFifty)
            : Dimens.oneFourty,
        marginLeft: Dimens.ten
    },
    profilePicStyle: {
        flex: 1,
        width: null,
        height: null
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Dimens.ten
    }
});