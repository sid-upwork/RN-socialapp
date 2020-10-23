var React = require('react-native');
import colors from '../../utils/Colors';
import { Dimens } from '../../utils/Dimens';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
var { StyleSheet, Platform } = React;

module.exports = StyleSheet.create({
    mainContainer: {
        width: wp(100),
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: 'column',
    },
    //Body Styling
    SparkContainer: {
        backgroundColor: colors.white,
        padding: Dimens.fifteen,
        flexDirection: 'row',
    },
    textContainer: {
        flex: 1,
        marginLeft: Dimens.ten,
        flexDirection: 'column',
        alignItems: "flex-start",
    },
    upperTextStyle: {
        alignSelf: "flex-start",
        fontSize: Dimens.largeTextSize,
        color: colors.textDarkColor,
    },
    mainNameTextStyle: {
        alignSelf: 'flex-start',
        fontSize: Dimens.extraLargerTextSize,
        color: colors.textDarkColor,
    },
    mainUserNameStyle: {
        alignSelf: 'flex-start',
        fontSize: Dimens.mediumTextSize,
        color: colors.textLightColor,
    },
    SparkDetailStyle: {
        paddingVertical: Dimens.ten,
        paddingRight: Dimens.ten,
        alignSelf: "flex-start",
        fontSize: Dimens.mediumTextSize,
        marginLeft: Dimens.fifteen,
        color: colors.textDarkColor,
        textAlign: 'justify'
    },
    likeCommentContainer: {
        flexDirection: 'row',
        padding: Dimens.five,
        paddingTop: Dimens.ten,
        paddingBottom: Dimens.ten,
        color: colors.textDarkColor,
    },
    likeStyle: {
        marginLeft: Dimens.ten,
        fontSize: Dimens.smallTextSize,
    },
    commentStyle: {
        marginLeft: Dimens.twentyFive,
        fontSize: Dimens.smallTextSize,
    },
    iconsContainer: {
        flex: .15,
        flexDirection: 'row'
    },
    iconContainer: {
        padding: Dimens.ten,
        flex: .25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconStyling: {
        alignSelf: 'center'
    },
    flatListContainer: {
        flex: .9,
        backgroundColor: colors.white,
    },
    mainImageStyle: {
        alignSelf: 'flex-start',
        width: Dimens.postImageSize,
        height: Dimens.postImageSize,
        borderRadius: Dimens.postImageBorderRadius,
        backgroundColor: colors.imageLightBackgroundColor,
    },
    imageStyle: {
        alignSelf: 'flex-start',
        width: Dimens.postCommentSize,
        height: Dimens.postCommentSize,
        borderRadius: Dimens.postCommentBorderRadius,
        backgroundColor: colors.imageLightBackgroundColor,
    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingRight: Dimens.fifteen,
        paddingVertical: Dimens.ten,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: Dimens.fifteen,
    },
    upperContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    dropDownIconStyle: {
        alignSelf: 'flex-start',
        flex: .1
    },
    upperTextStyle: {
        flex: .8,
        fontSize: Dimens.largeTextSize,
        color: colors.textDarkColor,
        alignSelf: "flex-start"
    },
    upperTimeStyle: {
        flex: .35,
        fontSize: Dimens.smallTextSize,
        color: colors.textDarkColor,
        alignSelf: "center"
    },
    userNameStyle: {
        fontSize: Dimens.smallTextSize,
        color: colors.textLightColor,
    },
    middleContainerText: {
        flex: 1,
        fontSize: Dimens.mediumTextSize,
        color: colors.textLightColor,
        marginVertical: Dimens.five,
        justifyContent: 'center'
    },
    lowerContainer: {
        flexDirection: 'row',
        marginTop: Dimens.five,
        alignItems: "center",
    },
    commentContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
    },
    bottomTextStyle: {
        alignSelf: 'center',
        marginLeft: Dimens.five,
        fontSize: Dimens.tinyTextSize,
    },
    bottomIconStyle: {
        marginLeft: Dimens.thirtyFive
    },
    divider: {
        height: Dimens.dividerHeight,
        backgroundColor: colors.appDividerColor
    },
    verticalDivider: {
        width: Dimens.dividerHeight,
        backgroundColor: colors.appDividerColor
    },
    // Dialog Styling 
    activityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: "center",
        padding: Dimens.zero
    },
    dialogBodyContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: "center",
        backgroundColor: colors.black
    },
    dialogContainer: {
        opacity: .9,
        backgroundColor: colors.black
    },
    dialogTextStyle: {
        alignSelf: 'center',
        fontSize: Dimens.extraLargerTextSize,
        color: colors.appGreen,
        marginRight: Dimens.thirty
    },

    styleInputViewSpark: {
        width: wp(90),
        flexDirection: "row",
        marginRight: wp(1),
        marginLeft: wp(1),
        paddingHorizontal: Dimens.fifteen,
        paddingVertical: Dimens.ten,
        borderRadius: Dimens.fifteen,
        backgroundColor: colors.white,
        borderColor: colors.appGreen,
        marginVertical: Dimens.two,
        borderWidth: Dimens.two,
        alignItems: 'center',
    },
    commentTypeContainer: {
        flex: .1,
        alignItems: "center",
        justifyContent: 'center',
        width: wp(100),
        bottom: Dimens.zero,
        elevation: Dimens.five,
        backgroundColor: colors.appGreen,
        flexDirection: 'row',
        borderColor: colors.white,
        padding: Dimens.one,
        // position: "absolute",
    },
    retweetImageViewContainer: {
        width: Dimens.fifty,
        height: Dimens.fifty,
        borderRadius: Dimens.twentyFive,
    },
    retweetStyleNameTimeContainer: {
        flex: 0.2,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    retweetStyleTweetUserName: {
        color: colors.textDarkColor,
        flex: 0.8,
        fontSize: Dimens.smallTextSize,
        alignSelf: 'flex-start',
    }, Row2Container: {
        flex: 1,
        flexDirection: "column",
        marginHorizontal: Dimens.ten,
    }, styleTweetTime: {
        marginTop: Dimens.five,
        flex: 0.4,
        color: colors.textDarkColor,
        textAlignVertical: "center",
        alignSelf: 'flex-start',
        fontSize: Dimens.smallTextSize
    }, styleTweetUserName: {
        color: colors.textDarkColor,
        flex: 0.8,
        fontSize: Dimens.largeTextSize,
        alignSelf: 'flex-start',
    }, retweetStyleTweetName: {
        color: colors.textDarkColor,
        flex: 0.8,
        fontSize: Dimens.largeTextSize,
        alignSelf: 'flex-start',
    },
});