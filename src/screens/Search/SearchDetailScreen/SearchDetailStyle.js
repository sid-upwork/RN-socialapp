var React = require('react-native');
import colors from "../../../utils/Colors";
import { Dimens } from "../../../utils/Dimens";

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    parentContainer:{
        flex: 1 , height:"100%" , marginTop:Dimens.one,backgroundColor:colors.white
    },
    tabView: {
        flex: 1,
        height:"100%",
        margin: Dimens.five,
        backgroundColor: 'rgba(0,0,0,0.01)'
    },
    card: {
        marginTop:Dimens.two,
        flexDirection: 'column',
        borderWidth: 1,
        backgroundColor: colors.white,
        borderColor: 'rgba(0,0,0,0.1)',
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    divider: {
        height: Dimens.dividerHeight,
        backgroundColor: colors.appDividerColor
    },
    mainContainerFlatList: {
        flexDirection: 'column',
        padding: Dimens.ten,
        borderColor: colors.white,
    },
    cardViewContainer: {
        padding: Dimens.five,
        flex: 1,
        elevation: Dimens.ten,
        marginBottom: Dimens.ten,
        width: "91%",
    },
    backgroundImageStyle: {
        position: 'absolute',
        flex: 1,
        width: "106%",
        height: Dimens.oneTen,
    },
    profilePicContainer: {
        height: Dimens.seventy,
        width: Dimens.seventy,
        borderRadius: Dimens.thirtyFive,
        borderColor: colors.white,
        borderWidth: Dimens.two,
        overflow: 'hidden',
        marginTop: Dimens.ninety - Dimens.twentyFive,
        marginLeft: Dimens.five,
    },
    profileImageStyle: {
        flex: 1,
        width: null,
        height: null
    },
    followContainer: {
        marginTop: Dimens.oneTwenty,
        right: Dimens.ten,
        position: "absolute",
        borderRadius: Dimens.hundred,
        width: wp(24),
        backgroundColor: colors.white,
        borderWidth: Dimens.two,
        borderColor: colors.appRed,
        alignSelf: 'flex-end'
    },
    followingContainer: {
        marginTop: Dimens.oneTwenty,
        right: Dimens.ten,
        position: "absolute",
        borderRadius: Dimens.hundred,
        width: wp(24),
        backgroundColor: colors.appRed,
        alignSelf: 'flex-start',
        borderWidth: Dimens.two,
        alignSelf: 'flex-end'
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
    noDataTextStyle: {
        fontSize: Dimens.extraLargerTextSize,
        color: colors.appRed,
        flex:1,
        height:"100%",
        alignSelf:'center',
        backgroundColor: colors.white,
        justifyContent:'center'

    }
});