import React, { Component } from 'react';
import { Text, View, AsyncStorage, ScrollView, TouchableOpacity, StatusBar, NetInfo } from 'react-native';
import Header from '../Common/BackHeader/BackHeader';
import { showProgressDialog } from "../../utils/Utilities";

var s = require('./SettingAndPrivacyStyle');
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getAccountSettings } from "../../redux/action/SettingsActions";

class SettingAndPrivacyClass extends Component {

    constructor(props) {
        super(props)
        this.state = { username: '', userId: '', internetConnected: false }
        this.getUserId();
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (!isConnected) {
                Alert.alert("No internet connection..!")
                return;
            }
            this.setState({ internetConnected: isConnected },
                () => this.props.getAccountSettings(JSON.stringify({
                    user_id: this.state.userId
                }), this.state.userId)
            )
        })
    }

    handleConnectivityChange = (connected) => {
        this.setState({ internetConnected: connected });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    async getUserId() {
        try {
            await AsyncStorage.getItem("loginResponse")
                .then((response) => {
                    this.setState({
                        username: JSON.parse(response).loginResposneObj.at_username,
                        userId: JSON.parse(response).loginResposneObj.id,
                    })
                }, (error) => {
                    console.log(error)
                });
        }
        catch (e) { console.log(e) }
    }

    render() {
        const { isFetching } = this.props.SettingReducers;
        return (
            <View style={s.mainContainer} >
                <Header title="Setting And Privacy"
                    backValue={true}
                    showDoneButton={false}
                    goBackProp={this.props.navigation} />
                <StatusBar backgroundColor={colors.drawerBack} barStyle="light-content" />
                {showProgressDialog(isFetching)}

                <View style={{ flex: 1, flexDirection: 'column' }} >
                    <ScrollView>
                        <TouchableOpacity>
                            <Text style={s.headerStyling} children={this.state.username} />
                        </TouchableOpacity>
                        <View style={s.divider} />

                        <TouchableOpacity style={s.textContainer}
                            onPress={() => this.props.navigation.navigate("AccountClass")}>
                            <Text style={s.textStyling} children={"Account"} />
                        </TouchableOpacity>
                        <View style={s.divider} />

                        <TouchableOpacity style={s.textContainer}
                            onPress={() => this.props.navigation.navigate("PrivacyAndSafetyClass")}>
                            <Text style={s.textStyling} children={"Privacy and Safety"} />
                        </TouchableOpacity>
                        <View style={s.divider} />

                        <TouchableOpacity style={s.textContainer}
                            onPress={() => this.props.navigation.navigate("AssessibilityClass")} >
                            <Text style={s.textStyling} children={"Notifications"} />
                        </TouchableOpacity>
                        <View style={s.divider} />

                        <TouchableOpacity style={s.textContainer}
                            onPress={() => this.props.navigation.navigate("TwitterDataClass")}>
                            <Text style={s.textStyling} children={"Your 2Cents data"} />
                        </TouchableOpacity>
                        <View style={s.divider} />

                        <TouchableOpacity style={s.textContainer}
                            onPress={() => this.props.navigation.navigate("BlockedAccountClass")}>
                            <Text style={s.textStyling} children={"Blocked & Muted Accounts"} />
                        </TouchableOpacity>
                        <View style={s.divider} />

                    </ScrollView>
                </View>

            </View >
        );
    }
}

function mapStateToProps(state) {
    return {
        SettingReducers: state.SettingReducers,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ getAccountSettings }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingAndPrivacyClass);
