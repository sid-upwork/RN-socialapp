var React = require('react-native');
var { StyleSheet } = React;

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import colors from '../../../utils/Colors';
import { Dimens } from "../../../utils/Dimens";

module.exports = StyleSheet.create({
    mainContainer: {
        width: wp(100),
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.imageLightBackgroundColor
    },
    headerMargin: {
        marginTop: Dimens.ten
    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    filterContainer: {
        backgroundColor: colors.white,
        paddingLeft: Dimens.fifteen,
    },
    headerStyle: {
        color: colors.textDarkColor,
        padding: Dimens.fifteen,
        fontSize: Dimens.extraLargerTextSize,
        fontWeight: '400',
    },
    switchConatiner: {
        flex: 1,
        flexDirection: 'column',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textStyling: {
        flex: .8,
        color: colors.black,
        paddingVertical: Dimens.tweleve,
        fontSize: Dimens.mediumTextSize,
    },
    innnerTextStyling: {
        color: colors.textLightColor,
        fontSize: Dimens.extraSmallTextSize,
    },
    rightIconStyle: {
        marginRight: Dimens.ten
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    divider: {
        height: Dimens.dividerHeight,
        backgroundColor: colors.appDividerColor
    },
    learnMoreContainer: {
        color: colors.appRed,
        fontSize: Dimens.smallTextSize,
    },
    qualityFilterDetailContainer: {
        flexDirection: 'row',
        marginRight: Dimens.ten,
        marginBottom: Dimens.ten,
    },
    qualityFilterDetailStyle: {
        color: colors.textLightColor,
        fontSize: Dimens.smallTextSize,
    },
    deleteContainer: {
        flex: 1,
        width: wp(100),
        marginTop: Dimens.ten,
        paddingHorizontal: Dimens.twenty,
        paddingVertical: Dimens.ten,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    deleteStyle: {
        fontSize: Dimens.mediumTextSize,
        fontWeight: "200",
        color: colors.appRed,
    },
    learnMoreContainer: {
        color: colors.appRed,
        fontSize: Dimens.extraSmallTextSize,
    },
    dialogHeaderTextStyle: {
        fontSize: Dimens.mediumTextSize,
        color: colors.textDarkColor,
        paddingVertical: Dimens.five
    },
    dialogButtonStyle: {
        fontSize: Dimens.mediumTextSize,
        color: colors.appRed,
        paddingVertical: Dimens.five
    },
    DialogContainer: {
        zIndex: Dimens.five,
        elevation: Dimens.five
    },
    dialogBodyContainer: {
        flex: 1,
        paddingStart: Dimens.fifteen
    },
    dialogTitle: {
        fontSize: Dimens.mediumTextSize,
        color: colors.white,
        paddingVertical: Dimens.five
    },
    input: {
        fontSize: Dimens.mediumTextSize,
        color: colors.appRed,
    },
});