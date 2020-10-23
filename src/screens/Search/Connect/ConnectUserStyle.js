import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../../utils/Colors";
import {  Dimens } from "../../../utils/Dimens";

export default StyleSheet.create({
    mainContainer: {
        width: wp(100),
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.white,
    },
    //Header content style
    headerContainer: {
        width: wp(100),
        flex: .095,
        padding: Dimens.five,
        backgroundColor: colors.appRed,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        elevation: Dimens.one,
        alignItems: 'center'
    },
    headerImageStyleOpacity: {
        alignSelf: "center",
        flex: 0.1,
        margin: Dimens.five
    },
    headerTextStyle: {
        fontSize: Dimens.headerSize,
        flex: 0.8,
        fontWeight: "500",
        color: colors.white,
        padding: Dimens.five,
        alignSelf: "center"
    },
    settingIconStyle: {
        alignSelf: "center",
        justifyContent: "center",
        flex: 0.1,
        marginLeft: Dimens.five,
        marginRight: Dimens.five
    },
    drawerIconStyle: {
        flex: .1,
        margin: Dimens.five,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    saveTextContainer: {
        flex: .2,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
    },
    saveTextStyle: {
        fontSize: Dimens.headerSize,
        fontWeight: "200",
        color: colors.white,
    },
    //FlatList Styling
    flatListContainer: {
        flex: 0.9,
    },
    bodyContainer: {
        flexDirection: 'column',
    },
    imageStyle: {
        borderRadius: Dimens.postImageBorderRadius,
        backgroundColor: colors.imageLightBackgroundColor,
        alignSelf: 'flex-start',
        width: Dimens.postImageSize,
        height: Dimens.postImageSize,
    },
    rightContainer: {
        flex: 1,
        marginLeft: Dimens.fifteen,
        flexDirection: 'column'
    },
    upperContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    nameContainer: {
        flexDirection: 'column'
    },
    nameStyle: {
        fontSize: Dimens.largeTextSize,
        fontWeight: '400',
        color: colors.textDarkColor
    },
    usernameStyle: {
        fontSize: Dimens.smallTextSize,
        fontWeight: '200',
        color: colors.textDarkColor
    },
    detailTextStyle: {
        fontSize: Dimens.smallTextSize,
        fontWeight: '200',
        marginTop: Dimens.seven,
        color: colors.textDarkColor
    },
    divider: {
        height: Dimens.dividerHeight,
        backgroundColor: colors.appDividerColor
    },
    followContainer: {
        borderRadius: Dimens.hundred,
        width: wp(24),
        backgroundColor: colors.white,
        marginLeft: wp(50),
        position: 'absolute',
        alignSelf: 'flex-start',
        borderWidth: Dimens.two,
        borderColor: colors.appRed
    },
    followingContainer: {
        borderRadius: Dimens.hundred,
        width: wp(24),
        backgroundColor: colors.appRed,
        marginLeft: wp(50),
        position: 'absolute',
        borderColor: colors.appRed,
        alignSelf: 'flex-start',
        borderWidth: Dimens.two,
    },
    followTextStyle: {
        fontSize: Dimens.mediumTextSize,
        alignSelf: 'center',
        color: colors.appRed,
    },
    followingTextStyle: {
        fontSize: Dimens.mediumTextSize,
        alignSelf: 'center',
        color: colors.white,
    },
    hideVerifiedIconStyle: {
        flex: .1,
        margin: Dimens.five,
        alignSelf: 'flex-start',
        display: 'none'
    },
    showVerifiedIconStyle: {
        flex: .1,
        margin: Dimens.five,
        alignSelf: 'flex-start',
        display: 'flex'
    },

    //Header Styling

    mainContainerFlatList: {
        flexDirection: 'column',
        padding: Dimens.ten,
        borderColor: colors.white,
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
        width: Dimens.twoHundred,
        height: Dimens.ninety,
    },
    profilePicContainer: {
        height: Dimens.fifty,
        width: Dimens.fifty,
        borderRadius: Dimens.twentyFive,
        borderColor: colors.white,
        borderWidth: Dimens.two,
        overflow: 'hidden',
        marginTop: Dimens.eighty - Dimens.twentyFive,
        marginLeft: Dimens.five,
    },
    profileImageStyle: {
        flex: 1,
        width: null,
        height: null
    },
    nameStyleFlatHorizontal: {
        fontWeight: '200',
        color: colors.textDarkColor,
        fontSize: Dimens.mediumTextSize,
        marginTop: Dimens.ten,
        paddingLeft: Dimens.five
    },
    userNameStyleFlatHorizontal: {
        color: colors.textDarkColor,
        fontSize: Dimens.extraSmallTextSize,
        paddingLeft: Dimens.five
    },
    profileStyleFlatHorizontal: {
        color: colors.textDarkColor,
        fontSize: Dimens.extraSmallTextSize,
        marginTop: Dimens.five,
        paddingLeft: Dimens.five
    },
});
