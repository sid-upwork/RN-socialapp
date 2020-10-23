var React = require('react-native');
import color from "../../../../../utils/Colors";
import { Dimens } from '../../../../../utils/Dimens';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    mainContainer: {
        width: wp(100),
        flex: 1,
        flexDirection: 'column',
    },
    flatListContainer: {
        flex: .9
    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: Dimens.five,
    },
    imageStyle: {
        margin: Dimens.ten,
        alignSelf: 'flex-start',
        width: Dimens.postCommentSize,
        height: Dimens.postCommentSize,
        borderRadius: Dimens.postCommentBorderRadius,
        backgroundColor: color.imageLightBackgroundColor,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: Dimens.five
    },
    upperContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: 'row',
    },
    upperTextStyle: {
        flex: .6,
        fontSize: Dimens.extraLargerTextSize,
        fontWeight: '400',
        marginTop: Dimens.seven,
        alignSelf: 'flex-start',
        color: color.textDarkColor
    },
    upperTimeStyle: {
        flex: .2,
        fontSize: Dimens.smallTextSize,
        color: color.textDarkColor,
        alignSelf: 'flex-start',
        marginTop: Dimens.seven,
        marginHorizontal: Dimens.five,
    },
    dropDownIconStyle: {
        marginRight: Dimens.five,
        alignSelf: 'flex-start',
        flex: .1,
    },
    userNameStyle: {
        marginTop: Dimens.one,
        fontSize: Dimens.mediumTextSize,
        color: color.textLightColor,
        alignSelf: 'flex-start',
        justifyContent: 'center'
    },
    middleContainerText: {
        fontSize: Dimens.mediumTextSize,
        color: color.textLightColor,
        marginTop: Dimens.five,
        justifyContent: 'center'
    },
    lowerContainer: {
        flexDirection: 'row',
        marginVertical: Dimens.five,
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
        fontSize: Dimens.smallTextSize,
    },
    bottomIconStyle: {
        marginLeft: Dimens.twenty,
    },
    divider: {
        height: Dimens.dividerHeight,
        backgroundColor: color.appDividerColor
    },
    floatingButton: {
        alignItems: "center",
        justifyContent: "center",
        width: Dimens.floatingButtonSize,
        height: Dimens.floatingButtonSize,
        position: "absolute",
        bottom: Dimens.twenty,
        right: Dimens.twenty,
        elevation: Dimens.five,
        backgroundColor: color.appRed,
        borderRadius: Dimens.floatingButtonRadius,
    },
});