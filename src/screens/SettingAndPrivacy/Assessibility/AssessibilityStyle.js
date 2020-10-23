var React = require('react-native');
import { Dimens } from "../../../utils/Dimens";

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import colors from '../../../utils/Colors';
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    mainContainer: {
        width: wp(100),
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.imageLightBackgroundColor
    },
    //FlatList Styling
    flatListContainer: {
        flex: .925
    },
    upperHeader: {
        color: colors.textDarkColor,
        padding: Dimens.fifteen,
        fontSize: Dimens.headingTextSize,
        fontWeight: '400',
    },
    lowerHeader: {
        color: colors.textDarkColor,
        padding: Dimens.fifteen,
        fontSize: Dimens.headingTextSize,
        fontWeight: '400',
        marginTop: Dimens.ten,
    },
    filterConatainer: {
        backgroundColor: colors.white,
        paddingLeft: Dimens.fifteen,
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
        fontSize: Dimens.largeTextSize,
    },
    innnerTextStyling: {
        color: colors.textLightColor,
        fontSize: Dimens.smallTextSize,
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
        fontSize: Dimens.mediumTextSize,
    },
    qualityFilterDetailContainer: {
        flexDirection: 'row',
        marginRight: Dimens.fifteen,
        marginBottom: Dimens.ten,
    },
    qualityFilterDetailStyle: {
        color: colors.textLightColor,
        fontSize: Dimens.mediumTextSize,
    },
    checkbox: {
        backgroundColor: colors.appDividerColor,
        borderWidth: Dimens.zero,
        padding: Dimens.zero,
        flex: .2
    },
    viewComponentContainer: {
        backgroundColor: colors.white,
        paddingLeft: Dimens.fifteen,
    },
    disabledViewComponentContainer: {
        backgroundColor: colors.white,
        paddingLeft: Dimens.fifteen,
        opacity: .5
    },
});