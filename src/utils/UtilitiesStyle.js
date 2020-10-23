import { StyleSheet } from "react-native";
import { Dimens } from "./Dimens";

import colors from "./Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default StyleSheet.create({
  // Dialog Styling
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    padding: Dimens.zero
  },
  dialogBodyContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center"
  },
  dialogContainer: {
    zIndex: Dimens.five,
    elevation: Dimens.five,
    opacity: 0.8
  },
  dialogTextStyle: {
    alignSelf: "center",
    fontSize: Dimens.extraLargerTextSize,
    color: colors.appGreen,
    marginRight: Dimens.thirty
  },
  dialogRetweetContainer: {
    zIndex: Dimens.five,
    elevation: Dimens.five
  },

  dialogRetweetBodyContainer: {
    flex: 1,
    flexDirection: "column"
  },
  dialogRetweetTextStyle: {
    alignSelf: "center",
    fontSize: Dimens.extraLargerTextSize,
    color: colors.appGreen,
    fontSize: Dimens.twenty,
    marginVertical: Dimens.ten
  },
  dialogButtonStyle: {
    fontSize: Dimens.mediumTextSize,
    color: colors.appRed,
    paddingVertical: Dimens.five
  },
  dialogTitle: {
    fontSize: Dimens.mediumTextSize,
    color: colors.white,
    paddingVertical: Dimens.five
  },

  divider: {
    height: Dimens.dividerHeight,
    backgroundColor: colors.appDividerColor
  },
  titleInputView: {
    width: '95%',
    flexDirection: "row",
    marginRight: wp(1),
    marginLeft: wp(2),
    marginTop: wp(4),
    paddingHorizontal: Dimens.fifteen,
    paddingVertical: Dimens.ten,
    borderRadius: Dimens.fifteen,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    backgroundColor: colors.white,
    borderColor: colors.appGreen,
    marginVertical: Dimens.seven,
    borderWidth: Dimens.two
  },
  bodyContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: Dimens.ten
  },

  imageViewContainer: {
    width: Dimens.postImageSize,
    height: Dimens.postImageSize,
    borderRadius: Dimens.postImageSize,
    backgroundColor: colors.black
  },

  Row2Container: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: Dimens.ten
  },
  styleNameTimeContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  styleTweetTime: {
    flex: 0.3,
    color: colors.textDarkColor,
    textAlignVertical: "center",
    alignSelf: "flex-start",
    fontSize: Dimens.smallTextSize
  },

  Row2Container: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: Dimens.ten,
  },
  styleNameTimeContainer: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  styleTweetName: {
    flex: 0.5,
    color: colors.textDarkColor,
    textAlignVertical: "center",
    alignSelf: 'flex-start',
    fontSize: Dimens.mediumTextSize
  },
  styleTweetUserName: {
    color: colors.textDarkColor,
    textAlignVertical: "center",
    alignSelf: 'flex-start',
    marginVertical: Dimens.four,
    fontSize: Dimens.mediumTextSize
  },
  styleTweetTime: {
    flex: 0.3,
    color: colors.textDarkColor,
    textAlignVertical: "center",
    alignSelf: 'flex-start',
    fontSize: Dimens.smallTextSize
  },
  styleTextReplyTweet: {
    marginHorizontal: wp(4)
  },
  styleInputViewSpark: {
    width: '95%',
    flexDirection: "row",
    marginHorizontal: wp(4),
    marginTop: wp(3),
    bottom: 0,
    paddingHorizontal: Dimens.ten,
    paddingVertical: Dimens.five,
    borderRadius: Dimens.fifteen,
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "center",
    backgroundColor: colors.white,
    borderColor: colors.appGreen,
    marginVertical: Dimens.seven,
    borderWidth: Dimens.two
  },
  retweetDialogSparkHeaderContainer: {
    marginHorizontal: Dimens.ten,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  retweetDialogDivider: {
    height: Dimens.dividerHeight,
    backgroundColor: colors.appDividerColor
  },
  retweetDialogSparkStyle: {
    marginHorizontal: Dimens.ten,
    fontSize: Dimens.fifteen,
    color: colors.appGreen
  }, 
  loaderTextStyle: {
    color: colors.white,
    fontSize: Dimens.largeTextSize,
    padding: Dimens.ten
  },
  loaderStyle: {
    opacity: 1,
    margin: Dimens.ten
  },
  loaderContainerStyle: {
    elevation: Dimens.ten,
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: 'row',
    justifyContent: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  }
});
