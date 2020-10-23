var React = require('react-native');
var { StyleSheet } = React;

import colors from '../../../utils/Colors';
import { Dimens } from '../../../utils/Dimens';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
    mainContainer: {
        width: wp(100),
        flex: 1,
        flexDirection: 'column',
    },
    // Notification Tab
    tab: {
        padding: Dimens.five,
        marginLeft: Dimens.one
    },
    indicator: {
        width: wp(33),
        height: Dimens.two,
        backgroundColor: colors.appRed
    },
    label: {
        fontSize: Dimens.mediumTextSize
    },
    tabDivider: {
        marginRight: Dimens.two,
    },
    tabBar: {
        backgroundColor: colors.bgNotificationTabColor,
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
        backgroundColor: colors.appRed,
        borderRadius: Dimens.floatingButtonRadius,
    },
});
