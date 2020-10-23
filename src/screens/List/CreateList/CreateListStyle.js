var React = require("react-native");
import colors from "../../../utils/Colors";
import { Dimens } from "../../../utils/Dimens";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
var { StyleSheet } = React;

module.exports = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.white
  },
  inputTextContainer: {
    flex: 1,
    marginTop: Dimens.twentyFive,
    flexDirection: "column",
    alignItems: "center"
  },
  titleInputContainer: {
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
  titleDescriptionInputContainer: {
    width: wp(90),
    height: wp(30),
    marginTop: Dimens.ten,
    flexDirection: "row",
    fontFamily: "Baskerville",
    borderRadius: Dimens.twentyFive,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: colors.inputContainerBackground,
    borderColor: colors.white,
    borderWidth: Dimens.oneAndHalf
  },

  inputBox: {
    flex: 1,
    paddingVertical: Dimens.ten,
    paddingHorizontal: Dimens.fifteen,
    fontSize: Dimens.mediumTextSize,
    color: colors.appGreen
  },
  inputBoxDescription: {
    flex: 1,
    paddingVertical: Dimens.ten,
    paddingHorizontal: Dimens.fifteen,
    fontSize: Dimens.mediumTextSize,
    color: colors.appGreen
  },

  isPrivateContainer: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
    marginTop: Dimens.twenty,
    justifyContent: "space-between",
    alignItems: "center"
  },
  isPrivateText: {
    fontFamily: "Baskerville",
    fontSize: Dimens.twenty,
    paddingHorizontal: Dimens.twenty,
  },
  rightIconStyle: {
    marginRight: Dimens.twenty
  },
  styleInputViewSpark: {
    width: wp(90),
    flexDirection: "row",
    marginTop: wp(4),
    paddingVertical: Dimens.five,
    borderRadius: Dimens.fifteen,
    alignItems: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: colors.white,
    borderColor: colors.appGreen,
    borderWidth: Dimens.two
  },

  textContainer: {
    flex: 1,
    marginTop: Dimens.ten,
    backgroundColor: colors.imageLightBackgroundColor,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Dimens.ten,
    justifyContent: "space-between",
  },
  textStyling: {
    color: colors.black,
    paddingVertical: Dimens.tweleve,
    fontSize: Dimens.mediumTextSize
  },

  filterContainer: {
    backgroundColor: colors.white,
    paddingLeft: Dimens.fifteen
  },
  deleteStyling: {
    marginTop: Dimens.twentyFive,
    fontWeight: "500",
    padding: Dimens.ten,
    textAlign: 'center',
    borderRadius: Dimens.twenty,
    fontSize: Dimens.headerSize,
    backgroundColor: colors.appRed,
    color: colors.white
  }
});
