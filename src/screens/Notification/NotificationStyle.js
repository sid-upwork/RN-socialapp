var React = require('react-native');
var { StyleSheet } = React;

import colors from '../../utils/Colors';
import { Dimens } from '../../utils/Dimens';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
    mainContainer: {
        width: wp(100),
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: 'column',
    },
    flatListContainer: {
        flex: .9
    },
    bodyContainer: {
        flexDirection: 'row',
        marginVertical: Dimens.ten,
        marginHorizontal: Dimens.ten
    },
    starIconStyle: {
        alignSelf: 'flex-start',
        marginLeft: Dimens.five
    },
    imageStyle: {
        alignSelf: 'center',
        marginLeft: Dimens.five,
        width: Dimens.headerImageSize,
        height: Dimens.headerImageSize,
        borderRadius: Dimens.headerImageBorderRadius,
        backgroundColor: colors.imageLightBackgroundColor,
    },
    upperTextStyle: {
        flex: 1,
        marginHorizontal: Dimens.ten,
        fontSize: Dimens.mediumTextSize,
        color: colors.textDarkColor,
        alignSelf: 'flex-start',
        justifyContent: "space-evenly"
    },
    divider: {
        height: Dimens.dividerHeight,
        backgroundColor: colors.appDividerColor
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
