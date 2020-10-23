var React = require('react-native');
import color from "../../../../utils/Colors";
import { Dimens } from "../../../../utils/Dimens";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    mainContainer: {
        width: wp(100),
        flex: 1,
        flexDirection: 'column',
        backgroundColor: color.white
    },

    //FlatList Styling
    bodyContainer: {
        flexDirection: 'row',
        marginTop: Dimens.five,
        padding: Dimens.fifteen
    },
    imageStyle: {
        marginLeft: Dimens.seven,
        borderRadius: Dimens.postImageBorderRadius,
        backgroundColor: color.imageLightBackgroundColor,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        width: Dimens.postImageSize,
        height: Dimens.postImageSize,
    },
    upperContainer: {
        alignSelf: 'flex-start',
        flex: 1,
        flexDirection: 'column'
    },
    nameStyle: {
        fontSize: Dimens.mediumTextSize,
        fontWeight: '400',
        color: color.textDarkColor
    },
    titleStyle: {
        fontSize: Dimens.largeTextSize,
        fontWeight: '400',
        color: color.textDarkColor
    },
    descriptionStyle: {
        fontSize: Dimens.mediumTextSize,
        fontWeight: '200',
        color: color.textLightColor
    },
    memberStyle: {
        fontSize: Dimens.smallTextSize,
        fontWeight: '200',
        color: color.textLightColor
    },
    privateStyle: {
        fontSize: Dimens.smallTextSize,
        fontWeight: '200',
        marginLeft:Dimens.five,
        color: color.textLightColor
    },

    usernameStyle: {
        fontSize: Dimens.mediumTextSize,
        fontWeight: '200',
        color: color.textLightColor
    },
    divider: {
        height: Dimens.dividerHeight,
        backgroundColor: color.appDividerColor
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
        backgroundColor: color.appRed,
        borderRadius: Dimens.floatingButtonRadius,
      },

      divider: {
        height: Dimens.dividerHeight,
        backgroundColor: color.appDividerColor
      },

});