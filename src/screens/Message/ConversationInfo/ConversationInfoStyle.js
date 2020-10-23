var React = require('react-native');
var { StyleSheet } = React;
import color from "../../../utils/Colors";
import { Dimens } from "../../../utils/Dimens";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


module.exports = StyleSheet.create({
    mainContainer: {
        width: wp(100),
        backgroundColor: color.white,
        flex: 1,
        flexDirection: 'column',
    },
    //FlatList Styling
    flatListContainer: {
        flex: 1
    },
    profileImageContainer: {
        width: wp(100),
        flex: .425,
        backgroundColor: color.appGreen,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'

    },
    profileImageStyle: {
        backgroundColor: color.imageLightBackgroundColor,
        borderRadius: wp(35) / 2,
        borderWidth: Dimens.one,
        width: wp(35),
        height: wp(35),
        elevation: Dimens.five
    },
    nameStyle: {
        fontWeight: '200',
        marginTop: Dimens.twenty,
        color: color.white,
        fontSize: Dimens.extraLargerTextSize
    },
    userNameStyle: {
        marginTop: Dimens.five,
        color: color.white,
        fontSize: Dimens.smallTextSize
    },
    scrollViewContainer: {
        width: wp(100),
        backgroundColor: color.black,
    },
    muteNotification: {
        padding: Dimens.twenty,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textStyling: {
        padding: Dimens.twenty,
        fontSize: Dimens.largeTextSize,
    },
    muteTextStyling: {
        fontSize: Dimens.largeTextSize,
    },
    deleteTextStyling: {
        padding: Dimens.twenty,
        fontSize: Dimens.largeTextSize,
        color: "red"
    },
    divider: {
        height: Dimens.dividerHeight,
        backgroundColor: '#E3E7EA'
    },
    switchStyle: {
        marginLeft: wp(47)
    }
});