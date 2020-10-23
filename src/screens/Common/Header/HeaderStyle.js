var React = require('react-native');
var { StyleSheet, Dimensions, Platform } = React;

import colors from '../../../utils/Colors';
import { Dimens } from '../../../utils/Dimens';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


export function isIphoneXorAbove() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    );
}

module.exports = StyleSheet.create({
    headerContainer: {
        width: wp(100),
        flex: 0.1,
        padding: Dimens.five,
        backgroundColor: colors.appRed,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        elevation: Dimens.five,
        paddingTop: Platform.OS == "ios" ?
            (isIphoneXorAbove() ? Dimens.thirty : Dimens.twenty)
            : Dimens.zero
    },
    headerImageBackgroundStyle: {
        alignSelf: "center",
        flex: .1,
        margin: Dimens.five,
    },
    headerImageStyle: {
        alignSelf: "center",
        width: Dimens.headerImageSize,
        height: Dimens.headerImageSize,
        margin: Dimens.five,
        borderRadius: Dimens.headerImageBorderRadius,
        backgroundColor: colors.imageLightBackgroundColor
    },
    headerTextStyle: {
        fontSize: Dimens.headerSize,
        flex: .8,
        fontWeight: '500',
        color: colors.white,
        padding: Dimens.five,
        alignSelf: 'center',
    },
    visibleSettingIconStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        flex: .1,
        marginLeft: Dimens.five,
        marginRight: Dimens.five,
        display: 'flex'
    },
    hiddenSettingIconStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        flex: .1,
        marginLeft: Dimens.five,
        marginRight: Dimens.five,
        display: 'none'
    }
});
