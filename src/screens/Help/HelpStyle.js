var React = require('react-native');
var { StyleSheet } = React;

import colors from '../../utils/Colors';
import { Dimens } from '../../utils/Dimens'

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white,
    },
    divider: {
        width: "100%",
        height: Dimens.one,
        backgroundColor: colors.appDividerColor
    },
    textStyle: {
        fontSize: Dimens.extraLargerTextSize,
        color: colors.appRed,
        padding: Dimens.ten,
        margin: Dimens.ten,
    }


});