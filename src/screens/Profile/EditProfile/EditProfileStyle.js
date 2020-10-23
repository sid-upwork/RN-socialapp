var React = require('react-native');
import colors from "../../../utils/Colors";
import { Dimens } from "../../../utils/Dimens";

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
var { StyleSheet, Dimensions, Platform } = React;
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
        backgroundColor: colors.white
    },
    //Header Styling
    headerContainer: {
        width: wp(100),
        flex: .1,
        padding: Dimens.five,
        backgroundColor: colors.appRed,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        elevation: Dimens.five,
        paddingTop: Platform.OS == "ios" ?
            (isIphoneXorAbove() ? Dimens.thirty : Dimens.twenty)
            : Dimens.zero
    },
    headerTextStyle: {
        fontSize: Dimens.headingTextSize,
        flex: .8,
        color: colors.white,
        padding: Dimens.five,
        alignSelf: 'center',
    },
    drawerIconStyle: {
        flex: .1,
        margin: Dimens.five,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    saveTextContainer: {
        flex: .2,
        backgroundColor: colors.appGreen,
        borderRadius: Dimens.twentyFive,
        alignItems: 'center',
        padding: Dimens.ten,
        alignSelf: "center",
        justifyContent: 'center',
        marginRight: Dimens.fifteen,
    },
    saveTextStyle: {
        fontSize: Dimens.smallTextSize,
        color: colors.white,
    },

    //FlatList Styling
    flatListContainer: {
        flex: .9
    },
    profileImageStyle: {
        backgroundColor: colors.imageLightBackgroundColor,
        borderRadius: wp(25) / 2,
        width: wp(25),
        height: wp(25),
        position: 'absolute',
        marginTop: wp(37),
        marginLeft: Dimens.twenty,
        borderColor: colors.white,
        borderWidth: Dimens.two
    },
    nameStyle: {
        alignSelf: 'center',
        fontWeight: '200',
        color: colors.white,
        fontSize: Dimens.twentyFive
    },
    userNameStyle: {
        alignSelf: 'center',
        marginTop: Dimens.five,
        color: colors.white,
        fontSize: Dimens.extraLargerTextSize
    },
    divider: {
        ...Platform.select({
            ios: {
                height: Dimens.dividerHeight
            }
        }),
        backgroundColor: colors.appDividerColor,
        marginLeft: Dimens.fifteen,
        marginRight: Dimens.fifteen,
        marginTop: Dimens.five,
        marginBottom: Dimens.ten
    },
    topTextContainerContainer: {
        flexDirection: 'column',
        paddingLeft: Dimens.fifteen,
        paddingRight: Dimens.fifteen,
        ...Platform.select({
            ios: {
                paddingTop: Dimens.sixty,
            },
            android: {
                paddingTop: Dimens.fourty,
            }
        }),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    topInputTextStyling: {
        width: "100%",
        color: colors.textDarkColor,
        fontSize: Dimens.extraLargerTextSize,
        marginTop: Dimens.five
    },
    inputTextStyling: {
        width: "100%",
        color: colors.textDarkColor,
        fontSize: Dimens.extraLargerTextSize,
        marginTop: Dimens.five
    },
    dobInputTextStyling: {
        width: "100%",
        color: colors.textDarkColor,
        fontSize: Dimens.extraLargerTextSize,
        marginTop: Dimens.five
    },
    textContainerContainer: {
        flexDirection: 'column',
        paddingLeft: Dimens.fifteen,
        paddingRight: Dimens.fifteen,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        ...Platform.select({
            ios: {
                paddingTop: Dimens.five,
            },
        }),
    },
    labelTextStyling: {
        flex: .45,
        color: colors.textLightColor,
        fontSize: Dimens.smallTextSize,
        marginTop: Dimens.five,
    },
    mainContainerFlatList: {
        flex: .3,
        elevation: Dimens.five,
        flexDirection: 'column',
        paddingHorizontal: Dimens.ten,
        width: wp(100),
        height: Dimens.twoHundred
    },
    cardViewContainer: {
        padding: Dimens.ten,
        flex: 1,
        elevation: Dimens.ten,
        marginBottom: Dimens.ten,
        width: Dimens.twoTwentyTwo,
    },
    backgroundImageStyle: {
        position: 'absolute',
        width: wp(100),
        flexDirection: 'column',
        height: Dimens.twoHundred,
    },
    profilePicContainer: {
        height: Dimens.editProfileImageSize,
        width: Dimens.editProfileImageSize,
        borderRadius: Dimens.editProfileImageBorderSize,
        borderColor: colors.white,
        borderWidth: Dimens.two,
        overflow: 'hidden',
        marginTop: Dimens.twoHundred - Dimens.fourty,
        marginLeft: Dimens.five,
        backgroundColor: colors.imageLightBackgroundColor,
    },
    bannerCameraPickerStyle: {
        overflow: 'hidden',
        right: Dimens.fifteen,
        bottom: Dimens.fifteen,
        alignSelf: 'flex-end',
        position: 'absolute',
    },
    ProfileCameraPickerStyle: {
        overflow: 'hidden',
        left: Dimens.seventy,
        top: Dimens.twoHundredFive,
        alignSelf: 'flex-end',
        position: 'absolute',
    },
    profileImageStyle: {
        flex: 1,
        width: null,
        height: null
    },


    dialogRetweetContainer: {
        zIndex: Dimens.five,
        elevation: Dimens.five
    },
    dialogRetweetBodyContainer: {
        flex: 1,
        flexDirection: "column"
    },

    dialogRetweetTextStyle: {
        alignSelf: "center",
        justifyContent: 'center',
        fontSize: Dimens.extraLargerTextSize,
        color: colors.appGreen,
        fontSize: Dimens.twenty,
        marginVertical: Dimens.ten
    },
    dialogDivider: {
        height: Dimens.dividerHeight,
        backgroundColor: colors.appDividerColor
    },
    dialogTitle: {
        fontSize: Dimens.mediumTextSize,
        color: colors.white,
        paddingVertical: Dimens.five
    },
    dialogButtonStyle: {
        fontSize: Dimens.mediumTextSize,
        color: colors.appRed,
        paddingVertical: Dimens.five
    },
    selectInput: {
        flex: 1,
        width: "100%",
        ...Platform.select({
            android: {
                padding: Dimens.zero,
                borderBottomWidth: StyleSheet.hairlineWidth,
            }
        }),
        backgroundColor: '#fff',
    },
    selectInputLarge: {
        flex: 1
    },
    selectInputInner: {
        borderRadius: Dimens.four,
        marginVertical: Dimens.five
    }
});