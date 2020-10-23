var React = require('react-native');
import color from "../../utils/Colors";
import { Dimens } from "../../utils/Dimens";

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import colors from '../../utils/Colors';
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    mainContainer: {
        width: wp(100),
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white
    },

    //FlatList Styling
    flatListContainer: {
        flex: .9
    },
    scrollViewContainer: {
        width: wp(100),
        backgroundColor: color.black,
    },
    textStyling: {
        color: color.textLightColor,
        paddingVertical: Dimens.tweleve,
        paddingHorizontal: Dimens.fifteen,
        fontSize: Dimens.mediumTextSize,
    },
    headerStyling: {
        color: color.textDarkColor,
        padding: Dimens.tweleve,
        fontSize: Dimens.headingTextSize,
        marginTop: Dimens.eight
    },
    divider: {
        height: Dimens.dividerHeight,
        backgroundColor: color.appDividerColor
    },
});