var React = require("react-native");
import colors from "../../../utils/Colors.js";
import { Dimens } from '../../../utils/Dimens';

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
var { StyleSheet } = React;

module.exports = StyleSheet.create({
  mainContainer: {
    width: wp(100),
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.white
  },
  //FlatList Styling
  flatListContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  bodyContainer: {
    flex: 1,
    flexDirection: "row",
    padding: Dimens.ten,
  },
  imageStyle: {
    marginLeft: Dimens.five,
    borderRadius: Dimens.commentImageBorderRadius,
    backgroundColor: colors.imageLightBackgroundColor,
    alignSelf: "flex-start",
    width: Dimens.commentImageSize,
    height: Dimens.commentImageSize,
    marginTop: Dimens.two
  },
  textContainer: {
    marginLeft: Dimens.ten,
    flexDirection: "column",
    flex: 1,
  },
  upperContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  nameContainer: {
    flex: 1,
    flexDirection: "column",
  },
  nameStyle: {
    flex: .7,
    fontSize: Dimens.largeTextSize,
    fontWeight: "400",
    color: colors.textDarkColor
  },
  usernameStyle: {
    alignItems: 'flex-end',
    fontSize: Dimens.largeTextSize,
    color: colors.appRed,
    marginTop: Dimens.five,
    marginLeft: Dimens.five
  },
  dateStyle: {
    flex: .2,
    marginTop: Dimens.two,
    fontSize: Dimens.smallTextSize,
    justifyContent: 'flex-start',
    color: colors.textLightColor,
  },
  detailTextStyle: {
    fontSize: Dimens.mediumTextSize,
    color: colors.textLightColor,
    alignSelf: "flex-start"
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
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    margin: Dimens.ten,
  }, selectedLeftButtonContainer: {
    width: "40%",
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
    width: "40%",
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
    width: "40%",
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
    width: "40%",
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
    color: colors.white
  },
  unSelectedButtonText: {
    fontSize: Dimens.largeTextSize,
    color: colors.appRed
  },
});
