var React = require('react-native');
import { Dimens } from "../../../utils/Dimens";

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import colors from '../../../utils/Colors';
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    dialogContainer: {
        zIndex: Dimens.five,
        elevation: Dimens.five,
        opacity: 1
    },
    mainContainer: {
        width: wp(100),
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.backgroundColor
    },
    headerStyle: {
        color: colors.textDarkColor,
        paddingVertical: Dimens.fifteen,
        paddingHorizontal: Dimens.ten,
        fontSize: Dimens.extraLargerTextSize,
        fontWeight: '500',
    },
    headerDetailStyle: {
        color: colors.textDarkColor,
        paddingVertical: Dimens.five,
        paddingHorizontal: Dimens.ten,
        fontSize: Dimens.smallTextSize,
    },
    filterContainer: {
        backgroundColor: colors.white,
        paddingLeft: Dimens.fifteen,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    textStyling: {
        flex: .75,
        color: colors.black,
        paddingVertical: Dimens.tweleve,
        fontSize: Dimens.mediumTextSize,
    },
    innnerTextStyling: {
        color: colors.textLightColor,
        fontSize: Dimens.extraSmallTextSize,
        alignSelf: 'flex-end'
    },
    ipTextStyling: {
        color: colors.appRed,
        fontSize: Dimens.extraSmallTextSize,
        alignSelf: 'flex-end'
    },
    divider: {
        height: Dimens.dividerHeight,
        backgroundColor: colors.appDividerColor
    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    inLineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingEnd: Dimens.ten
    },
    ipAddressHeaderStyle: {
        color: colors.appRed,
        fontSize: Dimens.extraLargerTextSize
    },
    ipAddressStyle: {
        color: colors.appRed,
        fontSize: Dimens.mediumTextSize
    },
    dialogHeader:{
        fontSize: Dimens.extraLargerTextSize,
        color: colors.white,
        paddingVertical: Dimens.five
    },
    dialogHeaderTextConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: Dimens.ten,
    }
})