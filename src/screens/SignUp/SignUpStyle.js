var React = require('react-native');
var { StyleSheet, Platform } = React;

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import colors from '../../utils/Colors'
import { Dimens } from '../../utils/Dimens'

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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
        borderRadius: Dimens.twentyFive,
        paddingVertical: Dimens.tweleve,
        marginBottom: Dimens.fifteen,
        backgroundColor: colors.appGreen,
        width: wp(90),
        marginVertical: Dimens.twenty,
        justifyContent: "center",
        alignItems: "center",

        //Its for IOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: Dimens.two },
        shadowOpacity: 0.2,

        // its for android
        elevation: Dimens.five,
        position: "relative"
    },
    submitText: {
        fontSize: Dimens.extraSmallTextSize,
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
        justifyContent: "center",
        backgroundColor: colors.inputContainerBackground,
        borderColor: colors.white,
        borderWidth: Dimens.oneAndHalf
    },
    inputContainer: {
        marginTop: Dimens.ten,
        width: wp(90),
        flexDirection: "row",
        fontFamily: "Baskerville",
        borderRadius: Dimens.twentyFive,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.inputContainerBackground,
        borderColor: colors.white,
        borderWidth: Dimens.oneAndHalf
    },
    inputContainerError: {
        marginTop: Dimens.ten,
        width: wp(90),
        flexDirection: "row",
        fontFamily: "Baskerville",
        borderRadius: Dimens.twentyFive,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.inputContainerBackground,
        borderColor: colors.red,
        borderWidth: Dimens.oneAndHalf
    },
    searchIcon: {
        paddingRight: Dimens.twenty,
    },

});