var React = require("react-native");
var { StyleSheet, Dimensions, Platform } = React;
import colors from "../../../utils/Colors";
import { Dimens } from "../../../utils/Dimens";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export function isIphoneXorAbove() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
  );
}

module.exports = StyleSheet.create({
  mainContainer: {
    width: wp(100),
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.white
  },

  //Header content style
  headerContainer: {
    width: wp(100),
    flex: 0.1,
    padding: Dimens.five,
    backgroundColor: colors.appRed,
    flexDirection: "row",
    justifyContent: "flex-start",
    elevation: Dimens.five,
    paddingTop: Platform.OS == "ios" ?
      (isIphoneXorAbove() ? Dimens.thirty : Dimens.twenty)
      : Dimens.zero
  },
  headerImageStyleOpacity: {
    alignSelf: "center",
    flex: 0.1
  },
  headerTextStyleContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: Dimens.fifteen,
    fontSize: Dimens.largeTextSize,
    color: colors.white,
    justifyContent: "center"
  },
  headerTextStyle: {
    fontSize: Dimens.headingTextSize,
    color: colors.white,
    alignSelf: "flex-start"
  },
  headerTextStyleSmall: {
    fontSize: Dimens.smallTextSize,
    color: colors.white,
    alignSelf: "flex-start"
  },
  settingIconStyle: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 0.15,
    marginLeft: Dimens.five,
    marginRight: Dimens.five
  },

  //FlatList Styling
  flatListContainer: {
    flex: 1,
    marginBottom: Dimens.seven,
    backgroundColor: colors.white
  },
  flatListTextItemRed: {
    flexDirection: "row",
    fontSize: Dimens.largeTextSize,
    color: colors.white,
    marginLeft: Dimens.ten,
    marginRight: Dimens.five,
    justifyContent: "center"
  },
  flatListTextItemGrey: {
    flexDirection: "row",
    fontSize: Dimens.largeTextSize,
    color: colors.black,
    marginRight: Dimens.ten,
    marginLeft: Dimens.five,
    justifyContent: "center"
  },
  bottomHeader: {
    flex: 0.12,
    flexDirection: "row"
  },
  bottomHeaderImageLeft: {
    flex: 0.15,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center"
  },
  bottomHeaderImageRight: {
    flex: 0.15,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center"
  },
  BottomtextInputView: {
    flexDirection: "row",
    fontFamily: "Baskerville",
    flex: 0.7,
    padding: Dimens.eight,
    alignItems: "center",
    justifyContent: "center"
  },
  commentTypeContainer: {
    flex: .125,
    alignItems: "center",
    justifyContent: 'center',
    width: wp(100),
    bottom: Dimens.zero,
    elevation: Dimens.five,
    backgroundColor: colors.appGreen,
    flexDirection: 'row',
    borderColor: colors.white,
    padding: Dimens.one
  },
  styleInputViewSpark: {
    width: wp(80),
    marginRight: wp(1),
    marginLeft: wp(1),
    padding: Dimens.fifteen,
    alignItems: 'center',
    borderRadius: Dimens.fifteen,
    backgroundColor: colors.white,
    borderColor: colors.appGreen,
    marginVertical: Dimens.two,
    borderWidth: Dimens.two
  },
});
