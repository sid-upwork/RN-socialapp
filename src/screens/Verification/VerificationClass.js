
import React, { Component } from "react";

import { StyleSheet, Text, View, TouchableOpacity, NetInfo } from "react-native";
import RadialGradient from 'react-native-radial-gradient';
import RNAccountKit, { Color, StatusBarStyle } from "react-native-facebook-account-kit";
import Octicons from "react-native-vector-icons/Octicons";

import { afterVerificationKit, kitState } from "../../redux/action/VerifyAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Logo from "../Logo/Logo";
import { Dimens } from "../../utils/Dimens";
import color from "../../utils/Colors";

class VerificationClass extends Component {

    constructor(props) {
        super(props)
        this.state = {
            internetConnected: false,
            loginResposneObj: this.props.navigation.getParam("loginResposneObj", "")
        }
        this.props.kitState(this.state.loginResposneObj.email_verify, this.state.loginResposneObj.phone_verify)
    }

    componentDidMount() {
        const { loginResposneObj } = this.state;

        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (!isConnected) {
                Alert.alert("No internet connection..!")
                return;
            }
            this.setState({ internetConnected: isConnected })
        })

        RNAccountKit.configure({
            responseType: 'code',// 'token' by default,
            titleType: 'login',
            initialAuthState: '',
            initialEmail: loginResposneObj.email,
            initialPhoneCountryPrefix: '+91', // autodetected if none is provided
            initialPhoneNumber: loginResposneObj.phone_number,
            facebookNotificationsEnabled: true, // true by default
            readPhoneStateEnabled: true, // true by default,
            receiveSMS: true, // true by default,
            countryWhitelist: [], // [] by default
            countryBlacklist: [], // [] by default
            defaultCountry: 'IN',
            viewControllerMode: 'show' | 'present', // for iOS only, 'present' by default
            getACallEnabled: true,

        })
    }

    verifyNumber() {
        const { loginResposneObj } = this.state;
        RNAccountKit.loginWithPhone()
            .then((token) => {
                if (!token) {
                    console.log('Login cancelled')
                } else {
                    this.props.afterVerificationKit(JSON.stringify({ mobile: loginResposneObj.phone_number, code: token.code }), "phone")
                }
            })
    }

    verifyEmail() {
        const { loginResposneObj } = this.state;
        RNAccountKit.loginWithEmail()
            .then((token) => {
                if (!token) {
                    console.log('Login cancelled')
                } else {
                    this.props.afterVerificationKit(JSON.stringify({ email: loginResposneObj.email, code: token.code }), "email")
                }
            })
    }

    componentWillReceiveProps(nextState) {
        const { emailVerfied, mobileVerified, loginResposneObj } = nextState.VerifyReducer
        if (emailVerfied == "1" && mobileVerified == "1") {

            // if (loginResposneObj == "") {
            //     Alert.alert("Something went wrong ..!")
            //     return
            // }

            // try {
            //     AsyncStorage.setItem("authenticated", "Yes");
            //     AsyncStorage.setItem("loginResponse", JSON.stringify({ loginResposneObj }));
            // } catch (error) {
            //     console.log(error.message);
            // }

            setTimeout(() => { this.props.navigation.navigate('AuthNavigator') }, 0)

        }
    }

    handleConnectivityChange = (connected) => {
        this.setState({ internetConnected: connected });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    render() {
        const { emailVerfied, mobileVerified } = this.props.VerifyReducer;

        return (
            <RadialGradient
                colors={['#F37E75', '#F04639']}
                stops={[0, .75, 1]}
                radius={300}
                style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.appRed }}>
                <Logo />
                <View style={{ marginTop: Dimens.hundred }}>


                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: 'space-between',
                        marginHorizontal: Dimens.fifteen
                    }}>
                        {mobileVerified == "0" &&
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() => {
                                    if (!this.state.internetConnected) {
                                        Alert.alert("No internet connection!")
                                        return
                                    }
                                    this.verifyNumber()
                                }}>
                                <Text style={styles.buttonTextWithoutItalic} children={"Verify Phone Number"} />
                            </TouchableOpacity>
                        }
                        {mobileVerified == "1" &&
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText} children={"Phone Number Verified"} />
                                <Octicons style={{ position: 'absolute', right: Dimens.seven }}
                                    name={"verified"}
                                    size={Dimens.thirtyFive}
                                    color={color.white} />
                            </View>
                        }
                    </View>



                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: 'space-between',
                        marginHorizontal: Dimens.fifteen
                    }}>

                        {emailVerfied == "0" &&
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() => {
                                    if (!this.state.internetConnected) {
                                        Alert.alert("No internet connection!")
                                        return
                                    }
                                    this.verifyEmail()
                                }}>
                                <Text style={styles.buttonTextWithoutItalic} children={"Verify Email Address"} />
                            </TouchableOpacity>
                        }

                        {emailVerfied == "1" &&
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText} children={"Email Address Verified"} />
                                <Octicons style={{ position: 'absolute', right: Dimens.seven }}
                                    name={"verified"}
                                    size={Dimens.thirtyFive}
                                    color={color.white} />
                            </View>
                        }
                    </View>
                </View>
            </RadialGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    buttonContainer: {
        backgroundColor: color.appGreen,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Dimens.ten,
        marginHorizontal: Dimens.twenty,
        borderRadius: Dimens.fourty,
        justifyContent: 'space-between',
    },
    buttonTextWithoutItalic: {
        flex: 1, color: color.white,
        fontSize: Dimens.headingTextSize,
        textAlign: "center",
        alignSelf: 'center',
        padding: Dimens.fifteen
    },
    buttonText: {
        fontStyle: 'italic',
        flex: 1, color: color.white,
        fontSize: Dimens.headingTextSize,
        textAlign: "center",
        alignSelf: 'center',
        padding: Dimens.fifteen
    },
    label: {
        fontSize: Dimens.twenty,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: Dimens.twenty,
        color: color.white
    },
    text: {
        fontSize: Dimens.twenty,
        textAlign: "center",
        margin: Dimens.ten,
        color: color.white
    }
});


function mapStateToProps(state) {
    return {
        VerifyReducer: state.VerifyReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ afterVerificationKit, kitState }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerificationClass);

