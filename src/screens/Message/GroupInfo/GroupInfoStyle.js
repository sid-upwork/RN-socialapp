import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../../utils/Colors";
import { Dimens } from "../../../utils/Dimens";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: wp(100),
    backgroundColor: colors.white,
    flexDirection: 'column',
  },
  headerContainer: {
    width: wp(100),
    flex: .1,
    padding: Dimens.five,
    backgroundColor: colors.appRed,
    flexDirection: "row",
    justifyContent: "flex-start",
    elevation: Dimens.five
  },
  headerImageStyleOpacity: {
    alignSelf: "center",
    flex: 0.1
  },
  headerTextStyleContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: Dimens.fifteen,
    color: colors.white,
    justifyContent: "center"
  },
  headerTextStyle: {
    fontSize: Dimens.headingTextSize,
    color: colors.white,
    alignSelf: "flex-start"
  },
  headerTextStyleSmall: {
    fontSize: Dimens.largeTextSize,
    color: colors.white,
    alignSelf: "flex-start"
  },
  textDirectMessageStyleContainer: {
    backgroundColor: colors.imageLightBackgroundColor,
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: Dimens.fifteen,
    paddingLeft: Dimens.fifteen,
    fontSize: Dimens.extraLargerTextSize
  },
  checkBoxContainer: {
    alignItems: "center",
    flexDirection: "column"
  },
  checkBoxTextContainer1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between'
  },
  checkBoxTitleStyle: {
    fontSize: Dimens.largeTextSize,
    flex: 0.93,
    marginVertical: Dimens.ten
  },
  checkBoxDesStyle: {
    fontSize: Dimens.smallTextSize,
    color: colors.textLightColor,
    alignSelf: "flex-start",
    paddingBottom: Dimens.ten
  },
  checkBoxStyle: {
    justifyContent: 'flex-end',
    backgroundColor: colors.semiTransparent,
    flex: .07,
    borderWidth: Dimens.zero,
    padding: Dimens.zero,
  },
  divider: {
    height: Dimens.dividerHeight,
    backgroundColor: colors.appDividerColor
  },
  listBackgroundStyle: {
    borderBottomWidth: 0,
    backgroundColor: colors.white
  },
  selectedRightTickIconStyle: {
    marginRight: Dimens.ten,
    fontSize: Dimens.mediumTextSize,
    color: colors.appRed
  },
  unselectedRightTickIconStyle: {
    marginRight: Dimens.ten,
    fontSize: Dimens.mediumTextSize,
    color: colors.imageLightBackgroundColor
  },
  inputTextContainer: {
    marginHorizontal: Dimens.ten,
    backgroundColor: colors.white,
  },
  profilePicContainer: {
    height: Dimens.oneTwenty,
    width: Dimens.oneTwenty,
    borderRadius: Dimens.sixty,
    borderColor: colors.white,
    borderWidth: Dimens.two,
    overflow: 'hidden',
    marginVertical: Dimens.ten,
    alignSelf: 'center',
    backgroundColor: colors.imageLightBackgroundColor,
  },
  styleInputViewSpark: {
    flex: .7,
    alignSelf: "center",
    padding: Dimens.ten,
    fontSize: Dimens.extraLargerTextSize,
    textAlign: "left",
    color: colors.appRed
  },
  dialogRetweetContainer: {
    zIndex: Dimens.five,
    elevation: Dimens.five
  },
  dialogTitle: {
    fontSize: Dimens.mediumTextSize,
    color: colors.white,
    paddingVertical: Dimens.five
  },
  dialogButtonStyle: {
    fontSize: Dimens.mediumTextSize,
    color: colors.appRed,
    paddingVertical: Dimens.five
  },
  dialogRetweetBodyContainer: {
    flex: 1,
    flexDirection: "column"
  },

  dialogDivider: {
    height: Dimens.dividerHeight,
    backgroundColor: colors.appDividerColor
  },
  dialogRetweetTextStyle: {
    alignSelf: "center",
    fontSize: Dimens.extraLargerTextSize,
    color: colors.appGreen,
    fontSize: Dimens.twenty,
    marginVertical: Dimens.ten
  },
});
