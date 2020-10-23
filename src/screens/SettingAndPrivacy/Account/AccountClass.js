import React, { PureComponent } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, AsyncStorage, Platform, NetInfo } from 'react-native';
import Dialog, { ScaleAnimation, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import IconFeather from 'react-native-vector-icons/Feather';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    changeUserVariable,
    showDialogThroughReducer,
    hideDialogThroughReducer,
    logout,
    deactivateAccount,
    initializeReducer
} from "../../../redux/action/SettingsActions";
import Snackbar from "react-native-snackbar";

import s from './AccountStyle';
import Header from '../../Common/BackHeader/BackHeader';
import colors from '../../../utils/Colors';
import { Dimens } from "../../../utils/Dimens";

class AccountClass extends PureComponent {
    constructor(props) {
        super(props)

        this.props.initializeReducer()
        this.state = {
            userId: '',
            username: '',
            stateUserName: '',
            stateAtUserName: '',
            statePhone: '',
            stateEmail: '',
            type: '',
            dialogHeaderTitle: '',
            dialogStateValue: '',
            newValue: '',
            oldPass: '',
            newpassword: '',
            confirmpassword: '',
            internetConnected: '',
            token: ""
        }
        this.hitApi = this.hitApi.bind(this);
        this.getUserId()
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


    async componentWillReceiveProps(nextProps) {
        const { dataUpdated, authenticatedLogin } = nextProps.SettingReducers;

        if (dataUpdated)
            this.getUserId()

        if (!authenticatedLogin) {
            await AsyncStorage.multiRemove(['authenticated', 'loginResponse']);
            this.props.navigation.navigate("AuthNavigator")
        }
    }

    async getUserId() {
        try {
            await AsyncStorage.getItem("loginResponse")
                .then((response) => {
                    this.setState({
                        userId: JSON.parse(response).loginResposneObj.id,
                        stateUserName: JSON.parse(response).loginResposneObj.username,
                        stateAtUserName: JSON.parse(response).loginResposneObj.at_username,
                        statePhone: JSON.parse(response).loginResposneObj.phone_number,
                        stateEmail: JSON.parse(response).loginResposneObj.email,
                        token: JSON.parse(response).loginResposneObj.token,
                    })
                }, (error) => {
                    console.log(error)
                });
        }
        catch (e) { console.log(e) }
    }

    isValid(type) {
        const { newValue, oldPass, newpassword, confirmpassword } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (type === 'email' || type === 'phone' || type === 'username') {
            if (type === 'username') {
                if (newValue.length <= 0) {
                    this.showSnackBar('You must enter a Username');
                    return false;
                }

                if (!newValue.match(/^([a-zA-Z0-9]{6,})+$/)) {
                    this.showSnackBar('No special characters are allowed');
                    return false;
                }
                return true;
            }


            if (type === 'email') {
                if (newValue.length <= 0) {
                    this.showSnackBar('You must enter a Email');
                    return false;
                }
                if (reg.test(newValue) === false) {
                    this.showSnackBar("You must enter a valid Email");
                    return false;
                }
                return true
            }

            if (type === 'phone') {
                if (newValue.length <= 0) {
                    this.showSnackBar('You must enter a Phone Number');
                    return false;
                }
                if (newValue.length < 10 || newValue.length > 13) {
                    this.showSnackBar('You must enter a valid Phone Number');
                    return false;
                }
                return true;
            }

            return false;
        }

        //Password
        if (oldPass.length <= 0) {
            this.showSnackBar('You must enter a password');
            return false;
        }
        if (newpassword.length <= 0) {
            this.showSnackBar('You must enter a password');
            return false;
        }
        if (newpassword.length < 7) {
            this.showSnackBar('You must enter a valid password');
            return false;
        }
        if (confirmpassword.length <= 0) {
            this.showSnackBar('You must enter a confirm password');
            return false;
        }
        if (!(newpassword === confirmpassword)) {
            this.showSnackBar('Password and confirm password doesnot match');
            return false;
        }

        return true;
    }

    showSnackBar(error_msg) {
        Snackbar.show({ title: error_msg, duration: Snackbar.LENGTH_SHORT });
    };

    hitApi(type) {
        if (!this.isValid(type)) {
            return;
        }
        const { userId, oldPass, newpassword, confirmpassword, newValue, } = this.state;

        var jsonData = "";
        if (type === 'password') {
            jsonData = JSON.stringify({
                'user_id': userId,
                'action': "change-password",
                'oldpassword': oldPass,
                'newpassword': newpassword,
                'confirmpassword': confirmpassword
            })
        }
        // if (type === 'email') {
        //     jsonData = JSON.stringify({
        //         'user_id': userId,
        //         'action': "account",
        //         'email': newValue,
        //     })
        // }
        if (type === 'phone') {
            jsonData = JSON.stringify({
                'user_id': userId,
                'action': "account",
                'phone_number': newValue,
            })
        }
        if (type === 'username') {
            jsonData = JSON.stringify({
                'user_id': userId,
                'action': "account",
                'username': newValue,
            })
        }
        this.setState({ newValue: "" })
        this.props.changeUserVariable(jsonData);
    }

    showDialogComponent(visibilityValue) {
        return (
            <Dialog
                animationDuration={500}
                height={.5}
                width={.7}
                containerStyle={s.DialogContainer}
                rounded
                visible={visibilityValue}
                dialogAnimation={
                    new ScaleAnimation({
                        toValue: 0,
                        useNativeDriver: true,
                    })}
                dialogTitle={<DialogTitle
                    style={{ backgroundColor: colors.appRed }}
                    textStyle={s.dialogTitle}
                    title={this.state.dialogHeaderTitle} />}

                actions={[
                    <DialogButton
                        key={0}
                        textStyle={s.dialogButtonStyle}
                        text="Cancel" onPress={() => {
                            this.setState({
                                newValue: ""
                            })
                            this.props.hideDialogThroughReducer(false);
                        }} />,
                    <DialogButton
                        key={1}
                        textStyle={s.dialogButtonStyle}
                        text="Done" onPress={() => {
                            if (!this.state.internetConnected) {
                                Alert.alert("No internet connection!")
                                return
                            }
                            this.hitApi(this.state.type);
                        }} />,
                ]}>

                <View style={s.dialogBodyContainer}>
                    <Text style={s.dialogHeaderTextStyle} children={"Current :"} />
                    <Text style={{ fontSize: Dimens.mediumTextSize, color: colors.appGreen, paddingBottom: Dimens.ten }} children={this.state.dialogStateValue} />

                    <View style={s.divider} />
                    <View style={s.headerMargin} />
                    <Text style={s.dialogHeaderTextStyle} children={"New :"} />
                    <TextInput
                        onChangeText={(text) => this.setState({ newValue: text })}
                        placeholderTextColor={colors.placeHolderColor}
                        returnKeyType="next"
                        autoCorrect={false}
                        blurOnSubmit={true}
                        autoFocus={true}
                        keyboardType="email-address"
                        keyboardAppearance="default"
                        value={this.state.newValue}
                        onSubmitEditing={() => { }}
                        style={s.input} />

                    <View style={s.divider} />
                </View>
            </Dialog>
        )
    }

    showPasswordDialogComponent(visibilityValue) {
        return (
            <Dialog
                animationDuration={500}
                height={.6}
                width={.7}
                containerStyle={s.DialogContainer}
                rounded
                visible={visibilityValue}
                dialogAnimation={
                    new ScaleAnimation({
                        toValue: 0,
                        useNativeDriver: true,
                    })}
                dialogTitle={<DialogTitle
                    style={{ backgroundColor: colors.appRed }}
                    textStyle={s.dialogTitle}
                    title="Change Password" />}

                actions={[
                    <DialogButton
                        key={0}
                        textStyle={s.dialogButtonStyle}
                        text="Cancel" onPress={() => {
                            this.setState({
                                oldPass: '',
                                newpassword: '',
                                confirmpassword: ''
                            })
                            this.props.hideDialogThroughReducer();
                        }} />,
                    <DialogButton
                        key={1}
                        textStyle={s.dialogButtonStyle}
                        text="Done" onPress={() => {
                            this.hitApi('password');
                        }} />,
                ]}>

                <View style={s.dialogBodyContainer}>
                    <Text style={s.dialogHeaderTextStyle}>Old Password :</Text>
                    <TextInput
                        onChangeText={(text) => this.setState({ oldPass: text })}
                        placeholderTextColor={colors.placeHolderColor}
                        returnKeyType="next"
                        autoCorrect={false}
                        blurOnSubmit={true}
                        autoFocus={true}
                        keyboardType="visible-password"
                        keyboardAppearance="default"
                        value={this.state.oldPass}
                        style={s.input} />
                    <View style={s.divider} />

                    <Text style={s.dialogHeaderTextStyle}>New Password :</Text>

                    <TextInput
                        onChangeText={(text) => this.setState({ newpassword: text })}
                        placeholderTextColor={colors.placeHolderColor}
                        returnKeyType="next"
                        autoCorrect={false}
                        blurOnSubmit={true}
                        autoFocus={true}
                        keyboardType="visible-password"
                        keyboardAppearance="default"
                        value={this.state.newpassword}
                        style={s.input} />

                    <View style={s.divider} />

                    <Text style={s.dialogHeaderTextStyle}>Confirm Password :</Text>

                    <TextInput
                        onChangeText={(text) => this.setState({ confirmpassword: text })}
                        placeholderTextColor={colors.placeHolderColor}
                        returnKeyType="next"
                        autoCorrect={false}
                        blurOnSubmit={true}
                        autoFocus={true}
                        keyboardType="visible-password"
                        keyboardAppearance="default"
                        value={this.state.confirmpassword}
                        style={s.input} />

                    <View style={s.divider} />
                </View>
            </Dialog>
        );
    }

    render() {
        const { stateUserName, statePhone, stateEmail, token } = this.state;
        const { isFromPassword, showDialog } = this.props.SettingReducers;

        return (
            <View style={{ flex: 1 }}>
                {isFromPassword ? this.showPasswordDialogComponent(showDialog) : this.showDialogComponent(showDialog)}

                <View style={s.mainContainer} >

                    <Header title="Account"
                        backValue={false}
                        goBackProp={this.props.navigation} />

                    <View style={s.bodyContainer} >
                        <ScrollView>

                            <Text style={s.headerStyle}>Login and Security</Text>
                            <View style={s.filterContainer}>

                                <TouchableOpacity style={s.textContainer}
                                    onPress={() => {
                                        this.props.showDialogThroughReducer(false)
                                        this.setState({ dialogHeaderTitle: 'Update username', dialogStateValue: this.state.stateAtUserName, type: 'username' })
                                    }}>
                                    <Text style={s.textStyling} children={"Username"} />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingEnd: Dimens.ten }} >

                                        <Text style={s.innnerTextStyling} children={stateUserName} />
                                        <IconFeather name={'chevron-right'} size={Dimens.mediumIconSize} color={colors.textLightColor} />
                                    </View>

                                </TouchableOpacity>
                                <View style={s.divider} />

                                <TouchableOpacity style={s.textContainer}
                                    onPress={() => {
                                        this.showSnackBar("You can't edit your phone number")
                                    }}>
                                    <Text style={s.textStyling} children={"Phone Number"} />

                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingEnd: Dimens.ten }} >
                                        <Text style={s.innnerTextStyling} children={statePhone} />
                                    </View>
                                </TouchableOpacity>
                                <View style={s.divider} />

                                <TouchableOpacity style={s.textContainer}
                                    onPress={() => {
                                        this.showSnackBar("You can't edit your mail")
                                    }}>
                                    <Text style={s.textStyling} children={"Email"} />

                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingEnd: Dimens.ten }} >
                                        <Text style={s.innnerTextStyling} children={stateEmail} />
                                    </View>
                                </TouchableOpacity>
                                <View style={s.divider} />

                                <TouchableOpacity style={s.textContainer}
                                    onPress={() => { this.props.showDialogThroughReducer(true) }}>

                                    <Text style={s.textStyling} children={"Password"} />

                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingEnd: Dimens.ten }} >
                                        <IconFeather name={'chevron-right'} size={Dimens.mediumIconSize} color={colors.textLightColor} />
                                    </View>
                                </TouchableOpacity>
                                <View style={s.divider} />

                            </View>

                            <View style={s.filterContainer}>

                                <TouchableOpacity style={s.textContainer}
                                    onPress={() => this.props.deactivateAccount(JSON.stringify({ 'user_id': this.state.userId, "token": token, 'action': Platform.OS == "ios" ? "ios" : "android" }))}>
                                    <Text style={s.textStyling} children={"Deactivate your account"} />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingEnd: Dimens.ten }} >
                                        <IconFeather name={'chevron-right'} size={Dimens.mediumIconSize} color={colors.textLightColor} />
                                    </View>

                                </TouchableOpacity>

                            </View>

                            <View style={s.headerMargin} />

                            <TouchableOpacity style={s.deleteContainer}
                                onPress={() => this.props.logout(JSON.stringify({ 'user_id': this.state.userId, "token": token, 'action': Platform.OS == "ios" ? "ios" : "android" }))}>
                                <Text style={s.deleteStyle} children={"Log out"} />
                            </TouchableOpacity>
                            <View style={s.headerMargin} />

                        </ScrollView>

                    </View>
                </View >
            </View >
        );
    }
}

function mapStateToProps(state) {
    return {
        SettingReducers: state.SettingReducers,
        CheckLoginReducer: state.CheckLoginReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ changeUserVariable, initializeReducer, showDialogThroughReducer, hideDialogThroughReducer, logout, deactivateAccount }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountClass);
