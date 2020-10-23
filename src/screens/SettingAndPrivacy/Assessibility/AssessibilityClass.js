import React, { PureComponent } from 'react';
import { Text, View, ScrollView, Switch, NetInfo } from 'react-native';

import { CheckBox } from 'react-native-elements'

var s = require('./AssessibilityStyle');
import { showProgressDialog } from '../../../utils/Utilities';
import Header from '../../Common/BackHeader/BackHeader';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { changeNotificationValue } from "../../../redux/action/SettingsActions";

class AssessibilityClass extends PureComponent {
    constructor(props) {
        super(props)
        this.changeStatus = this.changeStatus.bind(this);
    }

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

    changeStatus(key, value, type) {
        const { userId } = this.props.SettingReducers;
        var statusValue = value == "1" ? "0" : "1";

        if (!this.state.internetConnected) {
            Alert.alert("No internet connection!")
            return
        }

        this.props.changeNotificationValue(
            JSON.stringify({
                'user_id': userId,
                [key]: statusValue,
                type: type
            }), type == "email"
        );

    }

    renderNotificationSettingView(notificationData) {
        return <View style={{ flex: 1, flexDirection: 'column' }} >

            <ScrollView>
                <Text style={s.upperHeader}>Push Notifications</Text>
                <View style={s.filterConatainer}>
                    <View style={s.switchConatiner}>
                        <Text style={s.textStyling} children={"Re-Spark"} />
                        <Switch
                            style={s.rightIconStyle}
                            onValueChange={() => { this.changeStatus("retweet", notificationData.pushData.retweet, "notify") }}
                            value={notificationData.pushData.retweet == "1"} />
                    </View>
                    <View style={s.divider} />
                    <View style={s.switchConatiner}>
                        <Text style={s.textStyling} children={"Like"} />
                        <Switch
                            style={s.rightIconStyle}
                            onValueChange={() => { this.changeStatus("post_like", notificationData.pushData.post_like, "notify") }}
                            value={notificationData.pushData.post_like == "1"} />
                    </View>
                    <View style={s.divider} />
                    <View style={s.switchConatiner}>
                        <Text style={s.textStyling} children={"Comment"} />
                        <Switch
                            style={s.rightIconStyle}
                            onValueChange={() => { this.changeStatus("post_comment", notificationData.pushData.post_comment, "notify") }}
                            value={notificationData.pushData.post_comment == "1"} />
                    </View>

                    <View style={s.divider} />
                    <View style={s.switchConatiner}>
                        <Text style={s.textStyling} children={"New Follower"} />
                        <Switch
                            style={s.rightIconStyle}
                            onValueChange={() => { this.changeStatus("send_request", notificationData.pushData.send_request, "notify") }}
                            value={notificationData.pushData.send_request == "1"} />
                    </View>
                    <View style={s.divider} />

                    <View style={s.switchConatiner}>
                        <Text style={s.textStyling} children={"Accept Follower Requests"} />
                        <Switch
                            style={s.rightIconStyle}
                            onValueChange={() => { this.changeStatus("accept_request", notificationData.pushData.accept_request, "notify") }}
                            value={notificationData.pushData.accept_request == "1"} />
                    </View>
                    <View style={s.divider} />

                    <View style={s.switchConatiner}>
                        <Text style={s.textStyling} children={"Message"} />
                        <Switch
                            style={s.rightIconStyle}
                            onValueChange={() => { this.changeStatus("send_message", notificationData.pushData.send_message, "notify") }}
                            value={notificationData.pushData.send_message == "1"} />
                    </View>
                    <View style={s.divider} />

                    <View style={s.switchConatiner}>
                        <Text style={s.textStyling} children={"Someone add you in list"} />
                        <Switch
                            style={s.rightIconStyle}
                            onValueChange={() => { this.changeStatus("add_to_list", notificationData.pushData.add_to_list, "notify") }}
                            value={notificationData.pushData.add_to_list == "1"} />
                    </View>
                    <View style={s.divider} />

                    <View style={s.switchConatiner}>
                        <Text style={s.textStyling} children={"Someone added your post in an Instant"} />
                        <Switch
                            style={s.rightIconStyle}
                            onValueChange={() => { this.changeStatus("tweet_in_moment", notificationData.pushData.tweet_in_moment, "notify") }}
                            value={notificationData.pushData.tweet_in_moment == "1"} />
                    </View>
                </View>


                <View style={s.switchConatiner}>
                    <Text style={s.upperHeader}>Email Notifications</Text>
                    {/* <CheckBox
                        containerStyle={s.checkbox}
                        checked={notificationData.emailData.email_enabled == "1"}
                        checkedColor={colors.appGreen}
                        unCheckedColor={colors.appGreen}
                        onPress={() => { this.changeStatus("email_enabled", notificationData.emailData.email_enabled, "email") }
                        } /> */}
                </View>

                <View style={s.viewComponentContainer}>
                    <View style={s.switchConatiner}>
                        <Text style={s.textStyling} children={"Retweet"} />
                        <Switch
                            style={s.rightIconStyle}
                            onValueChange={() => { this.changeStatus("retweet", notificationData.emailData.retweet, "email") }}
                            value={notificationData.emailData.retweet == "1"} />
                    </View>
                    <View style={s.divider} />

                    <View style={s.switchConatiner}>
                        <Text style={s.textStyling} children={"Like"} />
                        <Switch
                            style={s.rightIconStyle}
                            onValueChange={() => { this.changeStatus("post_like", notificationData.emailData.post_like, "email") }}
                            value={notificationData.emailData.post_like == "1"} />
                    </View>
                    <View style={s.divider} />

                    <View style={s.switchConatiner}>
                        <Text style={s.textStyling} children={"Comment"} />
                        <Switch
                            style={s.rightIconStyle}
                            onValueChange={() => { this.changeStatus("post_comment", notificationData.emailData.post_comment, "email") }}
                            value={notificationData.emailData.post_comment == "1"} />
                    </View>
                    <View style={s.divider} />

                    <View style={s.switchConatiner}>
                        <Text style={s.textStyling} children={"New Follower"} />
                        <Switch
                            style={s.rightIconStyle}
                            onValueChange={() => { this.changeStatus("send_request", notificationData.emailData.send_request, "email") }}
                            value={notificationData.emailData.send_request == "1"} />
                    </View>
                    <View style={s.divider} />

                    <View style={s.switchConatiner}>
                        <Text style={s.textStyling} children={"Accept Follower Requests"} />
                        <Switch
                            style={s.rightIconStyle}
                            onValueChange={() => { this.changeStatus("accept_request", notificationData.emailData.accept_request, "email") }}
                            value={notificationData.emailData.accept_request == "1"} />
                    </View>
                    <View style={s.divider} />

                    {/* <View style={s.switchConatiner}>
                        <Text style={s.textStyling} children={"Message"} />
                        <Switch
                            style={s.rightIconStyle}
                            onValueChange={() => { this.changeStatus("send_message", notificationData.emailData.send_message, "email") }}
                            value={notificationData.emailData.send_message == "1"} />
                    </View>
                    <View style={s.divider} /> */}

                    <View style={s.switchConatiner}>
                        <Text style={s.textStyling} children={"Someone add you in list"} />
                        <Switch
                            style={s.rightIconStyle}
                            onValueChange={() => { this.changeStatus("add_to_list", notificationData.emailData.add_to_list, "email") }}
                            value={notificationData.emailData.add_to_list == "1"} />
                    </View>
                    <View style={s.divider} />

                    <View style={s.switchConatiner}>
                        <Text style={s.textStyling} children={"Someone added your post in an Instant"} />
                        <Switch
                            style={s.rightIconStyle}
                            onValueChange={() => { this.changeStatus("tweet_in_moment", notificationData.emailData.tweet_in_moment, "email") }}
                            value={notificationData.emailData.tweet_in_moment == "1"} />
                    </View>
                </View>


            </ScrollView>
        </View>
    }


    render() {
        const { settingData, updatingnotification } = this.props.SettingReducers;

        return (
            <View style={s.mainContainer} >

                <Header title="Notifications Setting"
                    backValue={true}
                    showDoneButton={false}
                    goBackProp={this.props.navigation} />

                {showProgressDialog(updatingnotification)}
                {this.renderNotificationSettingView(settingData.notificationData)}

            </View >
        );
    }
}

function mapStateToProps(state) {
    return {
        SettingReducers: state.SettingReducers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ changeNotificationValue }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssessibilityClass);