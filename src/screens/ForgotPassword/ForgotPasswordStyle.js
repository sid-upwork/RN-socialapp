var React = require('react-native');
var { StyleSheet, Platform } = React;

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import colors from '../../utils/Colors';
import { Dimens } from '../../utils/Dimens'

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        paddingTop: Platform.OS == "ios" ? Dimens.fourty : Dimens.zero
    },
    inputTextContainer: {
        marginTop: Dimens.seventy,
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputBox: {
        flex: 1,
        paddingVertical: Dimens.ten,
        paddingHorizontal: Dimens.fifteen,
        fontSize: Dimens.mediumTextSize,
        color: colors.appGreen,
    },
    submitButton: {
        backgroundColor: colors.appGreen,
        borderRadius: Dimens.twentyFive,
        paddingVertical: Dimens.tweleve,
        width: wp(90),
        marginVertical: Dimens.twenty,
        justifyContent: "center",
        alignItems: "center",

        //Its for IOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: Dimens.five },
        shadowOpacity: 0.2,

        // its for android
        elevation: Dimens.ten,
        position: "relative"
    },

    submitText: {
        fontSize: Dimens.mediumTextSize,
        color: colors.white,
        fontWeight: '400',
        textAlign: 'center'
    },
    firstInputConatiner: {
        width: wp(90),
        flexDirection: "row",
        fontFamily: "Baskerville",
        borderRadius: Dimens.twentyFive,
        alignItems: "center",
        backgroundColor: colors.inputContainerBackground,
        borderColor: colors.white,
        borderWidth: Dimens.oneAndHalf,
        justifyContent: 'space-between'
    },
    inputContainer: {
        marginTop: Dimens.ten,
        width: wp(90),
        flexDirection: "row",
        fontFamily: "Baskerville",
        borderRadius: Dimens.twentyFive,
        alignItems: "center",
        backgroundColor: colors.inputContainerBackground,
        borderColor: colors.white,
        borderWidth: Dimens.oneAndHalf,
        justifyContent: 'space-between'
    },
    searchIcon: {
        paddingRight: Dimens.twenty,
        paddingLeft: 0,
    },
    firstInputConatinerError: {
        width: wp(90),
        flexDirection: "row",
        fontFamily: "Baskerville",
        borderRadius: Dimens.twentyFive,
        alignItems: "center",
        backgroundColor: colors.inputContainerBackground,
        borderColor: colors.red,
        borderWidth: Dimens.oneAndHalf,
        justifyContent: 'space-between'
    },
    inputContainerError: {
        width: wp(90),
        flexDirection: "row",
        fontFamily: "Baskerville",
        borderRadius: Dimens.twentyFive,
        alignItems: "center",
        backgroundColor: colors.inputContainerBackground,
        borderColor: colors.red,
        borderWidth: Dimens.oneAndHalf,
        justifyContent: 'space-between'
    }

});