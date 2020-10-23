var React = require('react-native');
var { StyleSheet } = React;
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Dimens } from "../../utils/Dimens";
import colors from '../../utils/Colors';


module.exports = StyleSheet.create({
    mainContainer: {
        width: wp(100),
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white,
    },
    //FlatList Styling
    imageStyle: {
        margin: Dimens.ten,
        alignSelf: 'flex-start',
        width: Dimens.postImageSize,
        height: Dimens.postImageSize,
        borderRadius: Dimens.postImageBorderRadius,
        backgroundColor: colors.imageLightBackgroundColor,
    },
    bodyContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: Dimens.five,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: Dimens.five,
    },
    upperContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: 'row',
    },
    upperTimeStyle: {
        fontSize: Dimens.fifteen,
        color: colors.textDarkColor,
        alignSelf: 'flex-start',
        marginTop: Dimens.five,
    },
    dropDownIconStyle: {
        alignSelf: 'flex-start',
        flex: .2,
        marginTop: Dimens.two,
    },
    userNameStyle: {
        marginTop: Dimens.four,
        fontSize: Dimens.mediumTextSize,
        color: colors.textLightColor,
        alignSelf: 'flex-start',
        justifyContent: 'center'
    },
    middleContainerText: {
        fontSize: Dimens.mediumTextSize,
        color: colors.textLightColor,
        marginTop: Dimens.five,
        justifyContent: 'center'
    },
    lowerContainer: {
        flexDirection: 'row',
        marginTop: Dimens.eight,
        alignItems: "center",
    },
    commentContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
    },
    bottomTextStyle: {
        alignSelf: 'center',
        marginLeft: Dimens.five,
        fontSize: Dimens.tinyTextSize,
    },
    bottomIconStyle: {
        marginLeft: Dimens.twentyFive
    },
    divider: {
        height: Dimens.dividerHeight,
        backgroundColor: colors.appDividerColor
    },
    nameContainer: {
        marginTop: Dimens.five,
        flexDirection: 'column'
    },
    namenameStyle: {
        fontSize: Dimens.extraLargerTextSize,
        fontWeight: '400',
        color: colors.textDarkColor
    },
    nameusernameStyle: {
        fontSize: Dimens.smallTextSize,
        fontWeight: '200',
        color: colors.textLightColor,
    },
});