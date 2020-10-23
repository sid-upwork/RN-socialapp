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
        backgroundColor: colors.imageLightBackgroundColor
    },
    bodyContainer: {
        flexDirection: 'row',
        padding: Dimens.ten,
        marginTop: Dimens.one,
        backgroundColor: colors.white
    },
    suggestionText: {
        color: colors.appGreen,
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
        color: colors.textDarkColor,
        margin: Dimens.five,
        fontSize: Dimens.extraLargerTextSize
    },
    draftConatiner: {
        paddingHorizontal: Dimens.ten,
        color: colors.appRed,
        fontSize: Dimens.extraSmallTextSize
    },
    usernameStyle: {
        paddingHorizontal: Dimens.five,
        color: colors.textDarkColor,
        fontSize: Dimens.smallTextSize
    },
    nameStyle: {
        paddingHorizontal: Dimens.five,
        color: colors.textDarkColor,
        fontSize: Dimens.smallTextSize
    },
    userImageStyle: {
        marginTop: Dimens.five,
        width: Dimens.twenty,
        height: Dimens.twenty,
        borderRadius: Dimens.ten
    },
    momentBannerStyle:{
        flex: 0.2,
        height: Dimens.oneTwenty,
        borderRadius: Dimens.ten
    }
});