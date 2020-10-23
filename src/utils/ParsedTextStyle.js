var React = require('react-native');
var { StyleSheet } = React;

import colors from './Colors';
import { Dimens } from './Dimens';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  url: {
    color: 'red',
    textDecorationLine: 'underline',
  },

  email: {
    textDecorationLine: 'underline',
  },

  text: {
    color: colors.textColorDark,
    fontSize: Dimens.fifteen,
  },

  phone: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

  name: {
    color: 'red',
  },

  username: {
    color: colors.appGreen,
    fontWeight: 'bold'
  },

  magicNumber: {
    fontSize: Dimens.twentyFive,
    color: colors.appGreen,
  },

  hashTag: {
    fontStyle: 'italic',
    color: colors.appGreen,
  },

});