var React = require('react-native');
import color from "../../../../../utils/Colors";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    mainContainer: {
        width: wp(100),
        flex: 1,
        flexDirection: 'column',
        backgroundColor:color.white
    },
    //Header Styling
    headerContainer: {
        width: wp(100),
        flex: .075,
        padding: 5,
        backgroundColor: color.appRed,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        elevation: 5
    },
    headerTextStyle: {
        fontSize: 20,
        flex: .8,
        fontWeight: '500',
        color: color.white,
        flex: .8,
        padding: 5,
        alignSelf: 'center',
    },
    drawerIconStyle: {
        flex: .1,
        margin: 5,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    settingIconStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        flex: .1,
        marginLeft: 5,
        marginRight: 5,
    },
    hideVerifiedIconStyle: {
        flex: .1,
        margin: 5,
        alignSelf: 'flex-start',
        display:'none'
    },
    showVerifiedIconStyle: {
        flex: .1,
        margin: 5,
        alignSelf: 'flex-start',
        display:'flex'
    }
});