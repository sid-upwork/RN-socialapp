var React = require('react-native');
import colors from "../../../utils/Colors";
import { Dimens } from "../../../utils/Dimens";

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    mainContainer: {
        width: wp(100),
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.imageLightBackgroundColor
    },
    bodyContainer: {
        flexDirection: 'row',
        padding: Dimens.ten,
        marginTop: Dimens.one,
        backgroundColor: colors.white
    },
    suggestionText: {
        fontSize: Dimens.smallTextSize,
        padding: Dimens.ten,
        backgroundColor: colors.white
    },
    flatListContainer: {
        flex: 1,
        marginTop: Dimens.ten
    },
    parsedTextContainer: {
        paddingLeft: Dimens.five,
        color: colors.white,
        marginTop: Dimens.ten,
        marginHorizontal: Dimens.five,
        fontSize: Dimens.extraLargerTextSize
    },
    parsedHeaderTextContainer: {
        paddingLeft: Dimens.five,
        color: colors.white,
        marginTop: Dimens.ten,
        marginHorizontal: Dimens.five,
        fontSize: Dimens.smallTextSize
    },
    draftConatiner: {
        paddingHorizontal: Dimens.ten,
        color: colors.appRed,
        fontSize: Dimens.extraSmallTextSize
    },
    usernameStyle: {
        paddingHorizontal: Dimens.five,
        color: colors.white,
        fontSize: Dimens.largeTextSize
    },
    nameStyle: {
        paddingHorizontal: Dimens.five,
        color: colors.white,
        fontSize: Dimens.extraLargerTextSize
    },
    userImageStyle: {
        marginTop: Dimens.four,
        width: Dimens.fifty,
        height: Dimens.fifty,
        borderRadius: Dimens.twentyFive
    },
    momentBannerStyle: {
        flex: 0.2,
        height: Dimens.oneTwenty,
        borderRadius: Dimens.ten
    },
    retweetImageViewContainer: {
        width: Dimens.fifty,
        height: Dimens.fifty,
        borderRadius: Dimens.twentyFive,
    }, Row2Container: {
        flex: 1,
        flexDirection: "column",
        marginHorizontal: Dimens.ten,
    },
    retweetStyleNameTimeContainer: {
        flex: 0.2,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    retweetStyleTweetName: {
        color: colors.textDarkColor,
        flex: 0.7,
        fontSize: Dimens.largeTextSize,
        alignSelf: 'flex-start',
    },

    styleTweetTime: {
        marginTop: Dimens.five,
        flex: 0.4,
        color: colors.textDarkColor,
        textAlignVertical: "center",
        alignSelf: 'center',
        fontSize: Dimens.smallTextSize
    },
    styleTweetUserName: {
        color: colors.textDarkColor,
        flex: 0.8,
        fontSize: Dimens.largeTextSize,
        alignSelf: 'flex-start',
    },
    divider: {
        height: Dimens.dividerHeight,
        backgroundColor: colors.appDividerColor
    },
    flatListMainContainer: {
        flex: 1,
        flexDirection: "row",
        padding: Dimens.ten,
        overflow: 'hidden'
    },
    deleteIconStyle: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    postTitleStyle: {
        marginVertical: Dimens.ten,
        fontSize: Dimens.mediumTextSize,
        color: colors.appRed
    }, textNowStyle: {
        paddingLeft: Dimens.five,
        color: colors.white,
        marginTop: Dimens.ten,
        marginHorizontal: Dimens.five,
        fontSize: Dimens.extraLargerTextSize
    }, likeStyle: {
        paddingLeft: Dimens.five,
        color: colors.white,
        marginTop: Dimens.ten,
        marginHorizontal: Dimens.five,
        fontSize: Dimens.mediumTextSize
    },
    backIconStyle: {
        marginLeft: "3%",
        marginTop: Dimens.fifteen,
        padding: Dimens.two,
        alignSelf: "center",
        opacity: .6,
        borderRadius: Dimens.fifty,
        backgroundColor: colors.white
    },
    likeIconStyle: {
        marginTop: Dimens.fifteen,
        padding: Dimens.two,
        alignSelf: "center",
        opacity: .6,
        borderRadius: Dimens.fifty,
        backgroundColor: colors.white
    },
    newTweetStyle: {
        marginLeft: "2%",
        marginTop: Dimens.fifteen,
        padding: Dimens.one,
        alignSelf: "center",
        opacity: .6,
        borderRadius: Dimens.fifty,
        backgroundColor: colors.white
    }
});