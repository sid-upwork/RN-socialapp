import React, { PureComponent } from "react";
import {
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Text,
  Alert,
  AsyncStorage,
  Linking,
  StatusBar,
  NetInfo
} from "react-native";
import RadialGradient from 'react-native-radial-gradient';

import { CheckBox } from 'react-native-elements'
import Snackbar from "react-native-snackbar";

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Logo from '../Logo/Logo';
import Style from "./LoginStyle";
import colors from '../../utils/Colors';
import { PLANS_URL } from '../../utils/URLs';
import { Dimens } from '../../utils/Dimens';
import { NetworkInfo } from 'react-native-network-info';
import { getLoginResponse } from "../../redux/action/LoginAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import firebase from 'react-native-firebase';

class LoginClass extends PureComponent {

  constructor(props) {
    super(props);
    NetworkInfo.getIPV4Address(ip => this.setState({ current_ip: ip }));
    this.getUsernameAndPassword();
  }

  async getUsernameAndPassword() {
    const username = await AsyncStorage.getItem("Username");
    const password = await AsyncStorage.getItem("Password");
    const rememberMe = await AsyncStorage.getItem("RememberMe");

    this.setState({
      checked: rememberMe == "yes",
      password: password == undefined || password == null || password == "" ? "" : password,
      username: username == undefined || username == null || username == "" ? "" : username
    })
  }

  state = {
    username: "",
    password: "",
    isUsername: false,
    deviceToken: "",
    current_ip: "",
    checked: false,
    connected: false
  }

  isValidCredentials() {
    const { username, password } = this.state;
    if (username.length === 0) {
      this.showSnackBar("You must enter an email address");
      return false;
    }
    if (password.length === 0) {
      this.showSnackBar("You must enter a password");
      return false;
    }
    return true;
  }

  validateEmail(username) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(username) === false) {
      this.setState({
        username: username,
        isUsername: true
      });
    } else {
      this.setState({
        username: username,
        isUsername: false
      });
    }
  }

  showSnackBar(error_msg) {
    Snackbar.show({ title: error_msg, duration: Snackbar.LENGTH_SHORT, });
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange)
    NetInfo.isConnected.fetch().done((isConnected) => {
      this.setState({ connected: isConnected },
        () => {
          if (isConnected) {
            firebase.messaging().getToken()
              .then(fcmToken => {
                if (fcmToken) {
                  this.setState({ deviceToken: fcmToken || "" })
                } else {
                  Alert.alert("Token can't be fetched !")
                }
              })
          }
        })
    })

    if (this.state.connected) {
      firebase.messaging().getToken()
        .then(fcmToken => {
          if (fcmToken) {
            console.log("117 " + fcmToken)
            this.setState({ deviceToken: fcmToken || "" })
          } else {
            Alert.alert("Token can't be fetched !")
          }
        })
    }
  }

  handleConnectivityChange = (connected) => {
    this.setState({ connected: connected });
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  onSignIn() {
    const { username, password, deviceToken, isUsername, current_ip } = this.state;
    try {
      Keyboard.dismiss()
    } catch (error) {
      console.log(error)
    }

    NetInfo.isConnected.fetch().done((isConnected) => {
      if (isConnected) {
        if (deviceToken == "") {
          this.showSnackBar("Device token is missing ... Please try again!");
          return;
        }

        if (!this.isValidCredentials()) {
          return;
        }

        this.props.getLoginResponse(true, JSON.stringify({
          "email": isUsername ? "" : username,
          "username": isUsername ? username : "",
          "password": password,
          "ios_device_token": Platform.OS === 'ios' ? deviceToken : "",
          "android_device_token": Platform.OS === 'ios' ? "" : deviceToken,
          'current_ip': current_ip
        }));
      }
      else {
        Alert.alert("No internet connection..!")
      }
    })
  }

  onSignuScreenClicked() {
    this.props.navigation.navigate('SignUpClass');
  }

  rememberMe = () => {
    const { checked, username, password } = this.state
    if ((username == null || username == undefined || username == "") && !checked) {
      this.showSnackBar("Please fill email or username")
      return;
    }
    if ((password == null || password == undefined || password == "") && !checked) {
      this.showSnackBar("Please fill password")
      return;
    }

    this.setState((prevState) => ({ checked: !prevState.checked }),
      () => {
        try {
          AsyncStorage.setItem("Username", this.state.checked ? username : "");
          AsyncStorage.setItem("Password", this.state.checked ? password : "");
          AsyncStorage.setItem("RememberMe", this.state.checked ? "yes" : "no");
        } catch (error) {
          console.log(error.message);
        }
      }
    )

  }

  returnLoginView() {
    return (
      <KeyboardAvoidingView style={{ display: 'flex', flex: 1, }} enabled behavior={"padding"} >
        <TouchableWithoutFeedback style={Style.container} onPress={Keyboard.dismiss}>

          <RadialGradient
            colors={['#F37E75', '#F04639']}
            stops={[0, .75, 1]}
            radius={300}
            style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: "center" }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: "center", }} showsVerticalScrollIndicator={false}>

              <StatusBar hidden={true} />

              <View style={{
                flex: 1,
                flexDirection: 'column', alignSelf: 'center',
                alignItems: 'center', justifyContent: "center",
                paddingTop: Platform.OS == "ios" ? Dimens.fourty : Dimens.zero
              }}>
                <Logo />
                <View style={Style.inputTextContainer}>

                  <View style={Style.inputView}>
                    <TextInput
                      onChangeText={(username) => this.validateEmail(username)}
                      placeholder="Email or Username"
                      placeholderTextColor={colors.placeHolderColor}
                      returnKeyType="next"
                      autoCorrect={false}
                      blurOnSubmit={true}
                      keyboardType="email-address"
                      keyboardAppearance="default"
                      value={this.state.username}
                      onSubmitEditing={() => this.refs.inputPassword.focus()}
                      style={Style.input} />

                    <Icon style={Style.searchIcon} color={colors.appGreen} name="user" size={Dimens.smallIconSize} />
                  </View>

                  <View style={Style.inputView}>
                    <TextInput
                      keyboardAppearance="default"
                      secureTextEntry
                      ref={'inputPassword'}
                      autoCorrect={false}
                      onChangeText={(pass) => this.setState({ password: pass })}
                      placeholder="Password"
                      returnKeyType="go"
                      placeholderTextColor={colors.placeHolderColor}
                      onSubmitEditing={this.onSignIn.bind(this)}
                      value={this.state.password}
                      style={Style.input} />
                    <Icon style={Style.searchIcon} color={colors.appGreen} name="lock" size={Dimens.smallIconSize} />
                  </View>

                  <View style={Style.checkboxView}>

                    <CheckBox
                      containerStyle={Style.checkbox}
                      checked={this.state.checked}
                      checkedColor={colors.appGreen}
                      unCheckedColor={colors.appGreen}
                      // checkedIcon={<Image source={require('../checked.png') />}
                      // uncheckedIcon={<Image source={require('../unchecked.png') />}
                      onPress={() => this.rememberMe()} />
                    <Text style={Style.checkboxText} children={"Remember me"} />
                  </View>
                  <TouchableOpacity
                    style={Style.submitButton}
                    onPress={this.onSignIn.bind(this)}>
                    <Text style={Style.submitText} children={"LOGIN NOW"} />

                  </TouchableOpacity>

                  <Text style={Style.forgotPassword}
                    onPress={() => this.props.navigation.navigate('ForgotPasswordClass')}
                    children={"Forgot Username or Password ?"} />

                  <View style={Style.signupView} >

                    <Text style={Style.signupText} children={"Don't have an account?"} />
                    <Text style={Style.signupTextUnderline}
                      onPress={() =>
                        Linking.canOpenURL(PLANS_URL).then(supported => {
                          if (supported) {
                            Linking.openURL(PLANS_URL);
                          } else {
                            console.log("Don't know how to open URI: " + url);
                          }
                        })
                      }

                      title="SignUpClass"
                      children={"SIGNUP NOW"} />

                  </View>

                </View>

              </View>
            </View>
          </RadialGradient>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView >
    );
  }

  componentWillReceiveProps(nextProps) {
    const { loginResposneObj, error } = nextProps.LoginReducer
    if (!error && loginResposneObj != '') {
      if (loginResposneObj.expire_plan_sts == "0") {
        Alert.alert("Your subscription has expired. Please subscribe to continue ..!")
        return
      }

      if (loginResposneObj.phone_verify == "0" || loginResposneObj.email_verify == "0") {
        this.props.navigation.navigate('VerficationClass',
          { loginResposneObj: loginResposneObj }
        );
        return;
      }
      try {
        AsyncStorage.setItem("authenticated", "Yes");
        AsyncStorage.setItem("loginResponse", JSON.stringify({ loginResposneObj }));
      } catch (error) {
        console.log(error.message);
      }

      this.props.navigation.navigate('DrawerNavigator');
    }
  }

  render() {
    const { isFetchingResponse } = this.props.LoginReducer

    return (<View style={{ flex: 1 }}>
      {/* {showProgressDialog(isFetchingResponse)} */}
      {this.returnLoginView()}
    </View>);
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginClass);
