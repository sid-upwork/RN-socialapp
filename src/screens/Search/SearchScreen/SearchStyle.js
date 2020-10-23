var React = require('react-native');
var { StyleSheet, Dimensions, Platform } = React;

import colors from '../../../utils/Colors';
import { Dimens } from '../../../utils/Dimens';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


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
    mainContainer: {
        width: wp(100),
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.imageLightBackgroundColor
    },
    //Header Styling
    headerContainer: {
        width: wp(100),
        flex: 0.1,
        padding: Dimens.five,
        backgroundColor: colors.appRed,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        elevation: Dimens.five,
        alignItems: 'center',
        paddingTop: Platform.OS == "ios" ?
            (isIphoneXorAbove() ? Dimens.thirty : Dimens.twenty)
            : Dimens.zero
    },
    headerImageStyleOpacity: {
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
    drawerIconStyle: {
        flex: .1,
        margin: Dimens.five,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    settingIconStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        flex: .1,
        marginHorizontal: Dimens.five,
    },
    searchContainer: {
        flex: .8,
        padding: Dimens.five,
        borderRadius: Dimens.thirty,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "#F86055",
        marginHorizontal: Dimens.five
    },
    headerTextStyle: {
        fontSize: Dimens.headerSize,
        flex: .8,
        fontWeight: '200',
        color: "#FAB0AB",
    },
    searchIconStyle: {
        flex: .1,
    },
    //ViewPager Styling
    ViewPagerContainer: {
        flex: .325,
        width: wp(100),
    },
    viewPagerImage: {
        width: wp(100),
        height: hp(30)
    },
    viewPagerText: {
        width: wp(90),
        fontSize: Dimens.extraLargerTextSize,
        position: 'absolute',
        color: colors.white,
        marginTop: hp(20),
        fontWeight: "500",
        marginHorizontal: Dimens.ten,
    },
    viewPagerTitle: {
        width: wp(90),
        fontSize: Dimens.extraLargerTextSize,
        position: 'absolute',
        color: colors.white,
        marginTop: hp(24),
        fontWeight: "500",
        marginHorizontal: Dimens.ten,
    },
    //Body Header
    textHeaderContainer: {
        padding: Dimens.ten,
        fontSize: Dimens.headingTextSize,
        fontWeight: '500',
        color: colors.textColorDark,
        marginHorizontal: Dimens.five,
        marginTop: Dimens.two,
        backgroundColor: colors.white
    },
    showMoreConainer: {
        padding: Dimens.ten,
        fontSize: Dimens.smallTextSize,
        fontWeight: '500',
        color: colors.appRed,
        marginHorizontal: Dimens.five,
        marginTop: Dimens.two,
        backgroundColor: colors.white
    },
    bodyHeaderSettingIconStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginLeft: wp(100),
        marginRight: Dimens.five,
    },
    //Body Styling
    bodyContainer: {
        flex: .5,
        flexDirection: 'column',
        margin: Dimens.five,
        backgroundColor: "#EFF3F6",
    },
    imageStyle: {
        marginLeft: Dimens.eight,
        borderRadius: Dimens.hundred,
        backgroundColor: colors.imageLightBackgroundColor,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(16),
        height: wp(16),
    },
    textContainer: {
        marginLeft: Dimens.ten,
        flexDirection: 'column',
        flex: 1
    },
    middleContainer: {
        flexDirection: 'column'
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
