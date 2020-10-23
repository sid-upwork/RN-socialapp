var React = require('react-native');
import colors from "../../utils/Colors";
import { Dimens } from "../../utils/Dimens";

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    mainContainer: {
        width: wp(100),
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white
    },
    hideVerifiedIconStyle: {
        flex: .1,
        margin: Dimens.five,
        alignSelf: 'flex-start',
        display: 'none'
    },
    showVerifiedIconStyle: {
        flex: .1,
        margin: Dimens.five,
        alignSelf: 'flex-start',
        display: 'flex'
    },
    //FlatList Styling
    flatListContainer: {
        flex: 1
    },
    bodyContainer: {
        flexDirection: 'column',
    },
    bodyDetailContainer: {
        flexDirection: 'row',
        padding: Dimens.fifteen
    },
    imageStyle: {
        borderRadius: Dimens.postImageBorderRadius,
        backgroundColor: colors.imageLightBackgroundColor,
        alignSelf: 'flex-start',
        width: Dimens.postImageSize,
        height: Dimens.postImageSize,
    },
    rightContainer: {
        flex: 1,
        marginLeft: Dimens.fifteen,
        flexDirection: 'column'
    },
    upperContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    nameContainer: {
        flexDirection: 'column'
    },
    nameStyle: {
        fontSize: Dimens.extraLargerTextSize,
        fontWeight: '400',
        color: colors.textDarkColor
    },
    usernameStyle: {
        fontSize: Dimens.mediumTextSize,
        fontWeight: '200',
        color: colors.textLightColor
    },
    detailTextStyle: {
        fontSize: Dimens.mediumTextSize,
        fontWeight: '200',
        marginTop: Dimens.seven,
        color: colors.textLightColor
    },
    divider: {
        height: Dimens.dividerHeight,
        backgroundColor: colors.appDividerColor
    },
    followContainer: {
        borderRadius: Dimens.hundred,
        width: wp(24),
        backgroundColor: colors.white,
        marginLeft: wp(50),
        position: 'absolute',
        alignSelf: 'flex-start',
        borderWidth: Dimens.two,
        borderColor: colors.appRed
    },
    followingContainer: {
        borderRadius: Dimens.hundred,
        width: wp(24),
        backgroundColor: colors.appRed,
        marginLeft: wp(50),
        position: 'absolute',
        borderColor: colors.appRed,
        alignSelf: 'flex-start',
        borderWidth: Dimens.two
    },
    followTextStyle: {
        fontSize: Dimens.mediumTextSize,
        alignSelf: 'center',
        color: colors.appRed,
    },
    followingTextStyle: {
        fontSize: Dimens.mediumTextSize,
        alignSelf: 'center',
        color: colors.white,
    },
    followerRequestContainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    actionButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});