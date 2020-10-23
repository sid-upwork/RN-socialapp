var React = require('react-native');
import colors from "../../../utils/Colors";
import { fontSize, Dimens } from "../../../utils/Dimens";

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    mainContainer: {
        width: wp(100),
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white
    },
    mainBodyContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    //ButtonContainer Styling
    buttonContainer: {
        backgroundColor: colors.appRed,
        flex: .1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    leftSelectedButtonContainer: {
        flex: .45,
        backgroundColor: colors.white,
        borderWidth: Dimens.one,
        borderColor: colors.white,
        padding: Dimens.five,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Dimens.fifty,
    },

    leftSelectedButtonText: {
        color: colors.appRed,
        fontSize: Dimens.mediumTextSize,
        fontWeight: '400',
    },

    //FlatList Styling
    flatListContainer: {
        flex: .7,
    },
    bodyDetailContainer: {
        flexDirection: 'row',
        padding: Dimens.fifteen
    },
    imageStyle: {
        borderRadius: Dimens.commentImageBorderRadius,
        backgroundColor: colors.imageLightBackgroundColor,
        alignSelf: 'flex-start',
        width: Dimens.commentImageSize,
        height: Dimens.commentImageSize,
    },
    rightContainer: {
        flex: 1,
        marginLeft: Dimens.fifteen,
        flexDirection: 'column'
    },
    nameStyle: {
        fontSize: Dimens.extraLargerTextSize,
        fontWeight: '400',
        color: colors.textDarkColor
    },
    usernameStyle: {
        fontSize: Dimens.smallTextSize,
        fontWeight: '200',
        color: colors.textDarkColor
    },
    detailTextStyle: {
        fontSize: Dimens.tinyTextSize,
        fontWeight: '200',
        color: colors.textDarkColor
    },
    divider: {
        height: Dimens.dividerHeight,
        backgroundColor: colors.appDividerColor
    },
    learnMoreContainer: {
        color: colors.appRed,
        fontSize: Dimens.mediumTextSize,
    },
    emptyAllListContainer: {
        flex: 1,
        backgroundColor: colors.imageLightBackgroundColor,
        alignItems: 'center',
        flexDirection: 'column',
    },
    emptyImportedListContainer: {
        flex: 1,
        backgroundColor: colors.imageLightBackgroundColor,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    emptyListStyle: {
        color: colors.black,
        marginVertical: Dimens.ten,
        fontSize: Dimens.mediumTextSize,
    },
    allTextList: {
        fontSize: Dimens.largeTextSize,
        fontWeight: "500",
        marginTop: Dimens.thirty
    },
    allTextDetailStyle: {
        fontSize: Dimens.mediumTextSize,
        textAlignVertical: 'center',
        paddingHorizontal: Dimens.fifteen,
        marginTop: Dimens.ten
    },

    container: {
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        margin: Dimens.ten,
    },
    selectedLeftButtonContainer: {
        width: "30%",
        padding: Dimens.ten,
        alignItems: 'center',
        alignSelf: "center",
        backgroundColor: colors.appRed,
        borderTopLeftRadius: Dimens.fifteen,
        borderBottomLeftRadius: Dimens.fifteen,
        borderColor: colors.appRed,
        borderWidth: Dimens.one
    }, 
    unSelectedLeftButtonContainer: {
        width: "30%",
        padding: Dimens.ten,
        alignItems: 'center',
        alignSelf: "center",
        backgroundColor: colors.white,
        borderTopLeftRadius: Dimens.fifteen,
        borderBottomLeftRadius: Dimens.fifteen,
        borderColor: colors.appRed,
        borderWidth: Dimens.one
    },
    selectedRightButtonContainer: {
        width: "30%",
        padding: Dimens.ten,
        alignItems: 'center',
        alignSelf: "center",
        backgroundColor: colors.appRed,
        borderTopRightRadius: Dimens.fifteen,
        borderBottomRightRadius: Dimens.fifteen,
        borderColor: colors.appRed,
        borderWidth: Dimens.one
    },
    unSelectedRightButtonContainer: {
        width: "30%",
        padding: Dimens.ten,
        alignItems: 'center',
        alignSelf: "center",
        backgroundColor: colors.white,
        borderTopRightRadius: Dimens.fifteen,
        borderBottomRightRadius: Dimens.fifteen,
        borderColor: colors.appRed,
        borderWidth: Dimens.one
    },
    selectedButtonText: {
        fontSize: Dimens.largeTextSize,
        color:colors.white
    },
    unSelectedButtonText: {
        fontSize: Dimens.largeTextSize,
        color:colors.appRed
    },
    blockButtonTextStyle:{ color: colors.white, fontSize: Dimens.largeTextSize, fontWeight: "500" },
    blockButtonTextContainer:{ backgroundColor: colors.appRed, alignSelf: 'center', alignItems: 'center', paddingVertical: Dimens.ten, paddingHorizontal: Dimens.fifteen, borderRadius: Dimens.twenty }
});