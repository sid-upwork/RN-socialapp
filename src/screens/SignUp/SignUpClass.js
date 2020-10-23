import React from 'react';
import { View, KeyboardAvoidingView, Keyboard, ScrollView, Text, Platform, TouchableOpacity, TextInput } from 'react-native';
import Snackbar from 'react-native-snackbar'
import { AppNavigator } from "../Navigators/AppNavigator";
import Logo from '../Logo/Logo';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import s from './SignUpStyle.js';
import { NetworkInfo } from 'react-native-network-info';

import { showProgressDialog } from '../../utils/Utilities';
import { getLoginResponse } from "../../redux/action/LoginAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RadialGradient from 'react-native-radial-gradient';

import colors from '../../utils/Colors'
import { Dimens } from '../../utils/Dimens'

import firebase from 'react-native-firebase';

class SignUpClass extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Davinder Singh',
            email: 'salentro.davinder11@gmail.com',
            phone: '9803428191',
            password: '123456789',
            conPassword: '123456789',
            deviceToken: '',
            current_ip: ''
        };

        NetworkInfo.getIPV4Address(ip => this.setState({ current_ip: ip }));
    }

    isValidSignUp() {
        const { name, email, password, conPassword, phone } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (name.length <= 0) {
            this.showSnackBar('You must enter a Name');
            return false;
        }
        if (email.length <= 0) {
            this.showSnackBar('You must enter a Email');
            return false;
        }
        if (reg.test(email) === false) {
            this.showSnackBar("You must enter a valid Email");
            return false;
        }
        if (password.length <= 0) {
            this.showSnackBar('You must enter a password');
            return false;
        }
        if (password.length < 7) {
            this.showSnackBar('You must enter a valid password');
            return false;
        }
        if (conPassword.length <= 0) {
            this.showSnackBar('You must enter a confirm password');
            return false;
        }
        if (!(password === conPassword)) {
            this.showSnackBar('Password and confirm password doesnot match');
            return false;
        }
        if (phone.length <= 0) {
            this.showSnackBar('You must enter a Phone Number');
            return false;
        }
        if (phone.length < 10 || phone.length > 13) {
            this.showSnackBar('You must enter a valid Phone Number');
            return false;
        }

        return true;
    }

    componentDidMount() {
        firebase.messaging().getToken().then((token) => {
            this.setState({ deviceToken: token || "" })
        });
    }

    showSnackBar(error_msg) {
        Snackbar.show({ title: error_msg, duration: Snackbar.LENGTH_SHORT, });
    };

    onSigningUp() {
        try {
            Keyboard.dismiss()
        } catch (error) {
            console.log(error)
        }

        if (!this.isValidSignUp()) {
            return;
        }
        const { name, email, deviceToken, password, phone, current_ip } = this.state;

        console.log(current_ip);
        this.props.getLoginResponse(false, JSON.stringify({
            "email": email,
            "password": password,
            "phone_number": phone,
            "fullname": name,
            "ios_device_token": Platform.OS === 'ios' ? deviceToken : "",
            "android_device_token": Platform.OS === 'ios' ? "" : deviceToken,
            "type": "app",
            "current_ip": current_ip
        }));
    }

    renderSignUp() {
        return (
            <KeyboardAvoidingView style={{ display: 'flex', flex: 1 }}>
                <RadialGradient
                    colors={['#F37E75', '#F04639']}
                    stops={[0, .75, 1]}
                    radius={300}
                    style={{ flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: colors.appRed }}>

                    <View style={s.container}>
                        <Logo />

                        <View style={s.inputTextContainer}>
                            <View style={s.firstInputConatiner}>
                                <TextInput style={s.inputBox}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    placeholder='Name'
                                    keyboardType='default'
                                    autoCapitalize="none"
                                    onChangeText={(name) => this.setState({ name })}
                                    placeholderTextColor={colors.placeHolderColor}
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    blurOnSubmit={true}
                                    secureTextEntry={false}
                                    value={this.state.name}
                                    autoCapitalize="none"
                                    keyboardAppearance="default"
                                    onSubmitEditing={() => this.refs.email.focus()} />

                                <Icon style={s.searchIcon} name="user" size={Dimens.smallIconSize} />
                            </View>

                            <View style={s.inputContainer}>
                                <TextInput style={s.inputBox}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    onChangeText={(email) => this.setState({ email })}
                                    placeholderTextColor={colors.placeHolderColor}
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    blurOnSubmit={true}
                                    value={this.state.email}
                                    keyboardType="email-address"
                                    keyboardAppearance="default"
                                    onSubmitEditing={() => this.refs.passwordd.focus()}
                                    ref={'email'}
                                    placeholder='Email Address'
                                    secureTextEntry={false}
                                    autoCapitalize="none"
                                    keyboardType='email-address'
                                />

                                <Icon style={s.searchIcon} name="envelope" size={Dimens.smallIconSize} />
                            </View>

                            <View style={s.inputContainer}>
                                <TextInput style={s.inputBox}
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    blurOnSubmit={true}
                                    value={this.state.password}
                                    keyboardAppearance="default"
                                    onSubmitEditing={() => this.refs.conPasswordd.focus()}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    placeholder='Password'
                                    keyboardType='default'
                                    secureTextEntry={true}
                                    ref={'passwordd'}
                                    autoCapitalize="none"
                                    onChangeText={(password) => this.setState({ password })}
                                    placeholderTextColor={colors.placeHolderColor} />

                                <Icon style={s.searchIcon} name="lock" size={Dimens.smallIconSize} />
                            </View>

                            <View style={s.inputContainer}>
                                <TextInput style={s.inputBox}
                                    ref={'conPasswordd'}
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    blurOnSubmit={true}
                                    value={this.state.conPassword}
                                    keyboardAppearance="default"
                                    onSubmitEditing={() => this.refs.phonee.focus()}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    placeholder='Re-enter Password'
                                    secureTextEntry={true}
                                    keyboardType='default'
                                    autoCapitalize="none"
                                    onChangeText={(conPassword) => this.setState({ conPassword })}
                                    placeholderTextColor={colors.placeHolderColor} />

                                <Icon style={s.searchIcon} name="lock" size={Dimens.smallIconSize} />
                            </View>

                            <View style={s.inputContainer}>
                                <TextInput style={s.inputBox}
                                    ref={'phonee'}
                                    returnKeyType="go"
                                    autoCorrect={false}
                                    blurOnSubmit={true}
                                    value={this.state.phone}
                                    keyboardAppearance="default"
                                    onSubmitEditing={() => this.onSigningUp.bind(this)}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    placeholder='Mobile Number'
                                    secureTextEntry={false}
                                    keyboardType='numeric'
                                    autoCapitalize="none"
                                    onChangeText={(phone) => this.setState({ phone })}
                                    placeholderTextColor={colors.placeHolderColor} />

                                <Icon style={s.searchIcon} name="phone" size={Dimens.smallIconSize} />
                            </View>

                            <TouchableOpacity style={s.submitButton} onPress={this.onSigningUp.bind(this)}>
                                <Text style={s.submitText}>REGISTER</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </RadialGradient>
            </KeyboardAvoidingView>

        );
    }

    _renderAppRoot() {
        const CreateRoot = AppNavigator(true)
        return <CreateRoot />
    }

    render() {
        const { loginResponse, error, isFetchingResponse } = this.props.LoginReducer;
        return (
            <View style={{ flex: 1 }}>
                {showProgressDialog(isFetchingResponse)}
                {(!error && loginResponse !== '') ? this._renderAppRoot() : this.renderSignUp()}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        LoginReducer: state.LoginReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ getLoginResponse }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpClass);

