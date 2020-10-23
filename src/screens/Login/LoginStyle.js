import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import colors from "../../utils/Colors.js";
import { Dimens } from "../../utils/Dimens";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.appGreen
  },
  buttonText: {
    fontFamily: "Baskerville",
    fontSize: Dimens.extraLargerTextSize,
    alignItems: "center",
    justifyContent: "center"
  },
  inputimage: {
    height: Dimens.twenty,
    width: Dimens.twenty,
    marginRight: Dimens.five
  },
  checkboxView: {
    width: wp(90),
    justifyContent: 'center',
    alignItems: "center",
    marginTop: Dimens.fifteen,
    flexDirection: "row"
  },
  checkbox: {
    backgroundColor: colors.semiTransparent,
    borderWidth: Dimens.zero,
    padding: Dimens.zero,
    flex: .1
  },
  checkboxText: {
    fontSize: Dimens.mediumTextSize,
    color: colors.appGreen,
    flex: .93
  },
  inputView: {
    width: wp(90),
    flexDirection: "row",
    fontFamily: "Baskerville",
    borderRadius: Dimens.twentyFive,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.inputContainerBackground,
    borderColor: colors.white,
    marginVertical: Dimens.seven,
    borderWidth: Dimens.oneAndHalf
  },
  input: {
    flex: 1,
    fontSize: Dimens.mediumTextSize,
    paddingHorizontal: Dimens.fifteen,
    paddingVertical: Dimens.ten,
    color: colors.appGreen,
  },
  searchIcon: {
    paddingRight: Dimens.twenty,
    paddingLeft: Dimens.zero,
  },
  stretch: {
    width: wp(50),
    marginTop: Dimens.seventy,
    marginBottom: Dimens.fifty,
    height: Dimens.ten
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
    shadowOffset: { width: Dimens.zero, height: Dimens.two },
    shadowOpacity: 0.2,

    // its for android
    elevation: Dimens.five,
    position: "relative"
  },
  submitText: {
    color: colors.white,
    fontSize: Dimens.mediumTextSize
  },
  forgotPassword: {
    color: colors.appGreen,
    fontSize: Dimens.smallTextSize,
    marginTop: Dimens.ten,
    textDecorationLine: "underline",
    alignSelf: 'center',
  },
  signupView: {
    alignSelf: 'center',
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: "row",
    marginBottom: Dimens.twenty,
    marginTop: Dimens.fifty
  },
  signupText: {
    color: colors.appGreen,
    fontSize: Dimens.mediumTextSize,
    alignSelf: 'center',
  },
  signupTextUnderline: {
    color: colors.appGreen,
    fontSize: Dimens.largeTextSize,
    textDecorationLine: "underline",
    alignSelf: 'center',
  },
  inputTextContainer: {
    marginTop: Dimens.seventy,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});
