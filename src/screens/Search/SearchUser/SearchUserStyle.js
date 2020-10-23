import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import colors from "../../../utils/Colors";
import { Dimens } from "../../../utils/Dimens";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  emptyContainer: {
    flex: 1,
    margin: Dimens.fifteen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    margin: Dimens.fifteen,
    color: colors.appRed,
    fontSize: Dimens.thirty,
  },
  headerContainer: {
    width: wp(100),
    flex: .095,
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
    marginLeft: Dimens.five,
    fontSize: Dimens.largeTextSize,
    color: colors.white,
    justifyContent: "center"
  },
  headerTextStyle: {
    fontSize: Dimens.headerSize,
    color: colors.white,
    alignSelf: "flex-start"
  },
  searchContainer: {
    flex: 1,
    width: wp(100),
    alignSelf: 'center'
  },
  searchInputContainer: {
    marginHorizontal: Dimens.ten,
    backgroundColor: colors.white,
  },
  headerTextStyleSmall: {
    fontSize: Dimens.smallTextSize,
    color: colors.white,
    alignSelf: "flex-start"
  },

  divider: {
    height: Dimens.dividerHeight,
    backgroundColor: colors.appDividerColor
  },


});
