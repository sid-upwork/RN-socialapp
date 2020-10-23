import { StyleSheet, Dimensions, Platform } from "react-native";
import { Dimens } from "../../../utils/Dimens";
import color from "../../../utils/Colors";
import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

export function isIphoneXorAbove() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
  );
}

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: color.appRed,
  },
  HeaderContainer: {
    width: wp(90),
    flex: .25,
    height: 0,
    paddingLeft: Dimens.five,
    paddingTop: Dimens.ten,
    backgroundColor: color.drawerBack,
    flexDirection: "column",
    paddingTop: Platform.OS == "ios" ?
      (isIphoneXorAbove() ? Dimens.fifty : Dimens.thirty)
      : Dimens.twenty
  },
  HeaderContainerColumn1: {
    flex: .7,
    flexDirection: "row",
  },
  HeaderContainerColumn1_Row2: {
    flex: 1,
    flexDirection: "row",
    marginLeft: Dimens.ten,
    marginRight: Dimens.ten,
    justifyContent: 'space-between'
  },
  HeaderContainerColumn2: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: 'flex-start',
  },
  headerImageStyle: {
    marginTop: Dimens.five,
    marginLeft: Dimens.ten,
    marginRight: Dimens.ten,
    width: Dimens.editProfileImageSize,
    height: Dimens.editProfileImageSize,
    borderRadius: Dimens.editProfileImageBorderSize,
    backgroundColor: color.imageLightBackgroundColor,
  },
  showAccountIcon: {
    width: Dimens.twentyFive,
    marginTop: Dimens.two,
    height: Dimens.twentyFive,
    color: color.white,
  },
  bodyContainer: {
    width: wp(85),
    flex: .75,
    flexDirection: 'column',
    height: 0,
  },
  bodyListContainer: {
    width: wp(85),
    height: 0,
    flex: .9,
    flexDirection: 'column',
    paddingLeft: Dimens.five,
  },
  alternateContainer: {
    width: wp(85),
    height: 0,
    flex: .6,
    flexDirection: "column"
  },
  nameContainerStyle: {
    width: wp(50),
    flexDirection: "column",
    marginTop: Dimens.five
  },
  styleUserName: {
    width: wp(45),
    fontSize: Dimens.headingTextSize,
    color: color.white
  },
  styleUserNameIcon: {
    marginLeft: Dimens.ten,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: color.white
  },
  styleTwitterName: {
    fontSize: Dimens.largeTextSize,
    color: color.white
  },
  styleFollowerFollowingTExt: {
    fontSize: Dimens.largeTextSize,
    marginLeft: Dimens.ten,
    marginTop: Dimens.ten,
    color: color.white
  },
  scrollDrawerContainerStyle: {
    flex: 0.85
  },
  listDrawerContainerStyle: {
    marginLeft: Dimens.ten,
    flexDirection: "column"
  },
  listDrawerStyle: {
    flexDirection: "row",
    marginTop: Dimens.twentyFive,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  listDrawerTextStyle: {
    flex: 1,
    fontSize: Dimens.largeTextSize,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    marginLeft: Dimens.ten,
    color: color.white
  },
  listDrawerIconStyle: {
    flexDirection: "row",
    alignSelf: "center"
  },
  viewLine: {
    width: wp(88),
    height: Dimens.oneAndHalf,
    marginTop: Dimens.twentyFive,
    backgroundColor: color.appDividerColor
  },
  listBottomDrawerContainerStyle: {
    marginLeft: Dimens.ten,
    flexDirection: "column",
    width: wp(72),
    height: Dimens.twentyFive,
  },
  BottomDrawerContainerStyle: {
    backgroundColor: color.drawerBack,
    width: wp(85),
    height: 0,
    flex: .1,
    paddingLeft: Dimens.five,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  BottomIconStyleLeft: {
    alignSelf: 'center',
    color: color.white,
    marginLeft: Dimens.fifteen,
  },
  BottomIconRightRight: {
    alignSelf: 'center',
    marginRight: Dimens.twentyFive,
  },
  createAccountTextStyle: {
    fontSize: Dimens.largeTextSize,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    marginLeft: Dimens.fifteen,
    marginTop: Dimens.twenty,
    color: color.white
  },
  iconContainer: {
    width: "10%",
    marginHorizontal: Dimens.five,
    height: Dimens.thirty,
    alignSelf: "center",
    alignItems: "center",
  }
});
