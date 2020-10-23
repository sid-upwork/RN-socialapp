var React = require('react-native');
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import colors from '../../../../../utils/Colors';
import { Dimens } from '../../../../../utils/Dimens';
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    mainContainer: {
        width: wp(100),
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white
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
        margin: Dimens.five,
        alignSelf: 'flex-start',
        width: Dimens.postCommentSize,
        height: Dimens.postCommentSize,
        borderRadius: Dimens.postCommentBorderRadius,
        backgroundColor: colors.imageLightBackgroundColor,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: Dimens.five,
    },
    profileImages: {
        marginTop: Dimens.five,
        width: wp(79),
        height: wp(50),
        backgroundColor: colors.imageLightBackgroundColor
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
        marginTop: Dimens.two,
        alignSelf: 'flex-start',
        color: colors.textDarkColor
    },
    upperTimeStyle: {
        flex: .2,
        fontSize: Dimens.mediumTextSize,
        color: colors.textDarkColor,
        alignSelf: 'flex-start',
        marginTop: Dimens.five,
        marginHorizontal: Dimens.five,
    },
    userNameStyle: {
        fontSize: Dimens.mediumTextSize,
        color: colors.textLightColor,
    },
    dropDownIconStyle: {
        marginRight: Dimens.five,
        alignSelf: 'flex-start',
        flex: .1,
    },
    divider: {
        height: Dimens.dividerHeight,
        backgroundColor: colors.appDividerColor
    }
});