import { StyleSheet } from "react-native";
import colors from "../../utils/Colors";
import { Dimens } from "../../utils/Dimens";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  MainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.white
  },
  Row2Container: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: Dimens.ten,
  },
  imageViewContainer: {
    width: Dimens.postImageSize,
    height: Dimens.postImageSize,
    borderRadius: Dimens.postImageSize,
    backgroundColor: colors.black
  },
  upperContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: "center",
    flexDirection: 'row',
  },
  styleNameTimeContainer: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  styleTweetName: {
    color: colors.textDarkColor,
    flex: 0.7,
    fontSize: Dimens.extraLargerTextSize,
    alignSelf: 'flex-start',
  },
  styleTweetUserName: {
    marginVertical: Dimens.two,
    color: colors.textDarkColor,
    flex: 0.8,
    fontSize: Dimens.largeTextSize,
    alignSelf: 'flex-start',
  },

  styleTweetReplying: {
    fontSize: Dimens.mediumTextSize,
    color: colors.textLightColor
  },
  styleTweetDescription: {
    textAlignVertical: "top",
    fontSize: Dimens.mediumTextSize,
    marginVertical: Dimens.seven,
    color: colors.textLightColor
  },
  styleCommentReSparkLikeContainer: {
    marginTop: Dimens.ten,
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  styleCommentReSparkLike: {
    height: Dimens.twentyFive,
    width: Dimens.twentyFive,
  },
  styleCommentReSparkLikeText: {
    fontSize: Dimens.extraSmallTextSize,
    marginHorizontal: Dimens.five,
    color: colors.textDarkColor,
  },
  divider: {
    height: Dimens.dividerHeight,
    backgroundColor: colors.appDividerColor
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: "center",
    width: Dimens.thirty,
    height: Dimens.thirty,
    alignSelf: "center",
  },
  bodyContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: Dimens.ten
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
  rwTweetClick: {
    flex: 1,
    flexDirection: 'row'
  },



  pollContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: Dimens.twenty,
    borderColor: colors.appGreen,
    borderWidth: Dimens.two,
    marginTop: Dimens.seven,
    overflow: 'hidden'
  },
  pollView: {
    flexDirection: "row",
    alignItems: "center",
  },
  touchableContainer: {
    flex: .85,
    borderRadius: Dimens.fifteen,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    backgroundColor: colors.white,
    borderColor: colors.appGreen,
    marginVertical: Dimens.seven,
    marginHorizontal: Dimens.seven,
    padding: Dimens.ten,
    borderWidth: Dimens.two
  },
  percentageContainer: {
    flex: .15,
    marginRight: wp(1),
    justifyContent: "center",
    alignSelf: 'center',
    alignContent: 'center',
    backgroundColor: colors.white,
    marginVertical: Dimens.seven,
  },
  divider: {
    height: Dimens.dividerHeight,
    backgroundColor: colors.appDividerColor
  },
  pollTextSubContainer: {
    alignSelf: 'flex-start',
    color: colors.appGreen,
    marginHorizontal: Dimens.thirty,
    marginVertical: Dimens.two
  },
  bodyContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: Dimens.ten,
    overflow: 'hidden'
  },
  retweetImageViewContainer: {
    width: Dimens.fifty,
    height: Dimens.fifty,
    borderRadius: Dimens.twentyFive,
  },
  retweetStyleNameTimeContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  retweetStyleTweetUserName: {
    color: colors.textDarkColor,
    flex: 0.8,
    fontSize: Dimens.smallTextSize,
    alignSelf: 'flex-start',
  },
  styleTweetReplying: {
    fontSize: Dimens.mediumTextSize,
    color: colors.textLightColor
  },
  styleTweetDescription: {
    textAlignVertical: "top",
    fontSize: Dimens.mediumTextSize,
    marginVertical: Dimens.seven,
    color: colors.textLightColor
  },

  afterNonVotePollContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white
  },
  afterVotePollContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.appGreen
  },
  afterNonVotePollTextContainer: {
    flex: .9,
    flexDirection: 'row',
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    marginVertical: Dimens.seven,
    marginHorizontal: Dimens.seven,
    padding: Dimens.ten,
  },
  afterVotePollTextContainer: {
    flex: .9,
    flexDirection: 'row',
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    marginVertical: Dimens.seven,
    marginHorizontal: Dimens.seven,
    padding: Dimens.ten,
  },
  afterVotePercentageContainer: {
    flex: .1,
    marginRight: wp(1),
    justifyContent: "center",
    color: colors.white,
    marginVertical: Dimens.seven,
  },
  afterNonVotePercentageContainer: {
    flex: .1,
    marginRight: wp(1),
    color: colors.appGreen,
    marginVertical: Dimens.seven,
  },
  styleTouchableOpacity: {
    flex: 0.3,
    color: colors.textDarkColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  retweetStyleTweetName: {
    color: colors.textDarkColor,
    flex: 0.7,
    fontSize: Dimens.largeTextSize,
    alignSelf: 'flex-start',
  },
  retweetStyleTweetTime: {
    flex: 0.35,
    color: colors.textDarkColor,
    textAlignVertical: "center",
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    fontSize: Dimens.smallTextSize
  },

  nameContainer: {
    flex: 0.7,
    marginTop: Dimens.two,
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
  dropDownIconStyle: {
    alignSelf: 'flex-start',
    flex: .1,
    marginTop: Dimens.two,
  },
  styleTweetTime: {
    marginTop: Dimens.five,
    flex: 0.35,
    color: colors.textDarkColor,
    textAlignVertical: "center",
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    fontSize: Dimens.smallTextSize
  },
});
