var React = require('react-native');
import color from "../../../../../utils/Colors";
import { fontSize, Dimens } from "../../../../../utils/Dimens";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../../../utils/Colors';
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
    imagesContainer: {
        flexDirection: 'column',
        marginTop: Dimens.five,
    },
    imageStyle: {
        width: wp(95),
        height: wp(52.5),
        flexDirection: "row",
        margin: Dimens.ten,
        backgroundColor: color.imageLightBackgroundColor,
    },
    divider: {
        height: Dimens.dividerHeight,
        backgroundColor: color.imageLightBackgroundColor
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