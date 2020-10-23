var React = require('react-native');
import color from "../../../utils/Colors";
import { Dimens } from "../../../utils/Dimens";

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import colors from '../../../utils/Colors';
var { StyleSheet } = React;

module.exports = StyleSheet.create({
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
  checkBoxStyle: {
    justifyContent: 'flex-end',
    backgroundColor: colors.semiTransparent,
    flex: .07,
    borderWidth: Dimens.zero,
    padding: Dimens.zero,
  },
  checkBoxDesStyle: {
    fontSize: Dimens.smallTextSize,
    color: colors.textLightColor,
    alignSelf: "flex-start",
    paddingBottom: Dimens.ten
  },
  divider: {
    height: Dimens.dividerHeight,
    backgroundColor: colors.appDividerColor
  },
  mainContainer: {
    width: wp(100),
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.white
  },
  headerStyling: {
      color: color.textDarkColor,
      padding: Dimens.five,
      fontSize: Dimens.headingTextSize,
      marginTop: Dimens.eight
  },
})