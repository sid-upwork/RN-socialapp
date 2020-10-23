import { StyleSheet, Dimensions, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import color from "../../utils/Colors";
import { Dimens } from "../../utils/Dimens";
import colors from "../../utils/Colors";
import Colors from "../../utils/Colors";

const SCREEN_WIDTH = Dimensions.get('window').width
const MARGIN_LARGE = 16
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
  container: {
    flex: 1,
    backgroundColor: color.white
  },
  headerContainer: {
    width: wp(100),
    flex: 0.1,
    backgroundColor: color.appRed,
    flexDirection: "row",
    elevation: Dimens.five,
    paddingTop: Platform.OS == "ios" ?
      (isIphoneXorAbove() ? Dimens.thirty : Dimens.twenty)
      : Dimens.zero
  },
  headerImageStyleOpacity: {
    flex: 0.1,
    marginLeft: Dimens.ten,
    alignItems: "center",
    justifyContent: "center"
  },
  twitterButton: {
    fontSize: Dimens.mediumTextSize,
    color: colors.appGreen,
    fontWeight: '400'
  },
  divider: {
    marginTop: Dimens.eight,
    height: Dimens.dividerHeight,
    backgroundColor: color.appDividerColor
  },
  TweetHeaderButtonContainer: {
    flex: 0.9,
    justifyContent: "center"
  },
  SparkHeaderButton: {
    backgroundColor: color.white,
    borderRadius: Dimens.twentyFive,
    width: wp(25),
    height: hp(6),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: Dimens.ten,
    //Its for IOS
    shadowColor: "#FFFF",
    shadowOffset: { width: Dimens.zero, height: Dimens.two },
    shadowOpacity: 0.2,

    // its for android
    elevation: Dimens.five,
    position: "relative"
  },
  SparkContainer: {
    flex: 0.27,
    backgroundColor: color.white,
    flexDirection: "row",
  },
  SparkImageStyle: {
    alignSelf: "flex-start",
    width: Dimens.drawerImageSize,
    height: Dimens.drawerImageSize,
    margin: Dimens.five,
    borderRadius: Dimens.drawerImageBorderRadius,
    marginVertical: Dimens.fifteen,
    marginHorizontal: Dimens.ten,
    backgroundColor: color.imageLightBackgroundColor
  },
  bottomHeaderStyle: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    padding: Dimens.ten
  },
  pollMainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
  },
  pollSubContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
  },
  PollBox: {
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: Dimens.twenty,
    borderColor: color.appGreen,
    borderWidth: Dimens.two,
    marginVertical: Dimens.ten,
    marginHorizontal: Dimens.twenty,
  },

  PollInputItem: {
    flexDirection: "row",
    backgroundColor: color.white,
    alignItems: "center",
    marginTop: Dimens.ten,
    marginHorizontal: Dimens.ten
  },
  pollInputView: {
    width: wp(75),
    flexDirection: "row",
    marginRight: wp(1),
    paddingHorizontal: Dimens.ten,
    ...Platform.select({
      ios: {
        paddingVertical: Dimens.seven
      },
      android: {
        paddingVertical: Dimens.seven,
      }
    }),
    borderRadius: Dimens.fifteen,
    backgroundColor: color.white,
    borderColor: color.appGreen,
    borderWidth: Dimens.two,
    color: colors.appGreen
  },
  IconStyles: {
    marginHorizontal: Platform.OS == "ios" ? Dimens.five : Dimens.ten,
    alignSelf: 'center'
  },
  pollTextSubContainer: {
    color: color.appGreen,
    marginHorizontal: Dimens.fifteen,
  },
  TweetMainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
  },
  bottomHeaderSubStyle: {
    backgroundColor: colors.appRed,
    flex: .15,
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  bottomButtonStyle: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center'
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    paddingVertical: Dimens.five
  },
  SparkTextInput: {
    flex: 1,
    width: "100%",
    fontSize: Dimens.largeTextSize,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    ...Platform.select({
      ios: {
        marginVertical: Dimens.ten
      }
    }),
    color: colors.appGreen,
  },
  locationTextStyle: {
    marginHorizontal: Dimens.three,
    color: colors.appRed
  },
  characterCountStyle: {
    marginHorizontal: Dimens.five,
    color: colors.appGreen,
    alignSelf: 'center'
  },

  editTextContainer: {
    flex: 1,
    marginRight: Dimens.ten,
    flexDirection: "column"
  },
  selectInputLarge: {
    flex: .6,
    ...Platform.select({
      ios: {
        padding: Dimens.twenty
      }
    }),
    backgroundColor: "#FFF",
    marginHorizontal: Dimens.fifteen,
  },
  selectInputInner: {
    borderRadius: Dimens.four,
    marginVertical: Dimens.five,
  }
});
