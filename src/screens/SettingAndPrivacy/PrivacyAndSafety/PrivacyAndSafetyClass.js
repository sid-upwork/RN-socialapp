import React, { PureComponent } from 'react';
import { Text, View, NetInfo } from 'react-native';
import Header from '../../Common/BackHeader/BackHeader';
import colors from '../../../utils/Colors';
import { CheckBox } from "react-native-elements";
import { showProgressDialog } from "../../../utils/Utilities";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { editPrivacy } from "../../../redux/action/SettingsActions";

import { Dimens } from '../../../utils/Dimens';
var s = require('./PrivacyAndSafetyStyle');

class PrivacyAndSafetyClass extends PureComponent {

    state = { internetConnected: false }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        NetInfo.isConnected.fetch().done((isConnected) => {
            this.setState({ internetConnected: isConnected })
        })
    }

    handleConnectivityChange = (connected) => {
        this.setState({ internetConnected: connected });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }


    showPrivacyData(error, privacyData, userId) {
        var protectedSpark = !error && privacyData != null ? privacyData.tweet : "0"
        var searchUser = !error && privacyData != null ? privacyData.search : "0"

        return (
            <View style={{ flex: 1, flexDirection: 'column', padding: Dimens.ten }} >

                <Text style={s.headerStyling} children={"Privacy"} />
                <View style={s.divider} />

                <View style={s.checkBoxContainer}>
                    <View style={s.checkBoxTextContainer1}>
                        <Text style={s.checkBoxTitleStyle} children={"Spark privacy : Protect your sparks"} />
                        <CheckBox
                            containerStyle={s.checkBoxStyle}
                            checked={protectedSpark == "1"}
                            checkedColor={colors.appGreen}
                            unCheckedColor={colors.appGreen}
                            onPress={() => {
                                if (!this.state.internetConnected) {
                                    Alert.alert("No internet connection!")
                                    return
                                }

                                this.props.editPrivacy(JSON.stringify({
                                    user_id: userId,
                                    search: searchUser,
                                    tweet: protectedSpark == "0" ? "1" : "0"
                                }))
                            }
                            } />

                    </View>
                    <Text style={s.checkBoxDesStyle} children={"Your Sparks are currently protected; only those you approve will receive your Sparks. Your future Sparks will not be available publicly. Sparks posted previously may still be publicly visible in some places."} />
                </View>

                <View style={s.divider} />
                <Text style={s.headerStyling} children={"Safety"} />
                <View style={s.divider} />

                <View style={s.checkBoxContainer}>

                    <View style={s.checkBoxTextContainer1}>
                        <Text style={s.checkBoxTitleStyle} children={"Discoverability : Let other didn’t find you "} />

                        <CheckBox
                            containerStyle={s.checkBoxStyle}
                            checked={searchUser == "1"}
                            checkedColor={colors.appGreen}
                            unCheckedColor={colors.appGreen}
                            onPress={() => {
                                if (!this.state.internetConnected) {
                                    Alert.alert("No internet connection!")
                                    return
                                }

                                this.props.editPrivacy(JSON.stringify({
                                    user_id: userId,
                                    search: searchUser == "0" ? "1" : "0",
                                    tweet: protectedSpark
                                }))
                            }
                            } />

                    </View>

                </View>

                <View style={s.divider} />
            </View>

        );
    }


    render() {
        const { settingData, updatingPrivacy, privacyError, userId } = this.props.SettingReducers;
        return (
            <View style={s.mainContainer} >
                <Header title="Privacy &amp; Safety"
                    backValue={true}
                    showDoneButton={false}
                    goBackProp={this.props.navigation} />

                {showProgressDialog(updatingPrivacy)}
                {this.showPrivacyData(privacyError, settingData.privacyData, userId)}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        SettingReducers: state.SettingReducers,
        SideBarReducer: state.SideBarReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ editPrivacy }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyAndSafetyClass);
