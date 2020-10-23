import React, { PureComponent } from 'react';
import { View, Text, KeyboardAvoidingView, Keyboard, TouchableOpacity, TextInput, NetInfo } from 'react-native';
import Logo from '../Logo/Logo';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import RadialGradient from 'react-native-radial-gradient';

import Snackbar from 'react-native-snackbar';
import { Dimens } from '../../utils/Dimens'
import colors from '../../utils/Colors';

import { POST, FORGOT_PASSWORD } from '../../utils/URLs';
import { showProgressDialog } from '../../utils/Utilities';
import { uploadData, setInitialStage } from "../../redux/action/OnlySuccessAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import InternetConnection from '../../utils/InternetConnection';

var s = require('./ForgotPasswordStyle');

class ForgotPasswordClass extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
        this.props.setInitialStage();

    }

    isValidEmail() {
        try {
            Keyboard.dismiss()
        } catch (error) {
            console.log(error)
        }


        const { email } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (reg.test(email) === false) {
            Snackbar.show({
                title: "Please enter a valid email address",
                duration: Snackbar.LENGTH_SHORT,
            });
            return false;
        }

        return true;
    }


    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }


    handleConnectivityChange = (connected) => {
        this.setState({ connected: connected });
    };

    onChangingPassword() {
        if (!this.isValidEmail()) {
            return;
        }
        const { email } = this.state;
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected) {
                this.props.uploadData(FORGOT_PASSWORD, POST, JSON.stringify({ "email": email }), false)
            }
            else {
                Alert.alert("No internet connection..!")
            }
        });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillReceiveProps(nextProps) {

        const { uploading, uploaded_successfully } = nextProps.OnlySuccessReducer;

        if (!uploading && uploaded_successfully) {
            this.props.navigation.goBack();
        }
    }

    render() {
        const { uploading } = this.props.OnlySuccessReducer;

        return (<View style={{ flex: 1 }}>
            {showProgressDialog(uploading)}

            <InternetConnection />
            {this.renderForgotPasswordView()}
        </View>);
    }

    renderForgotPasswordView() {
        return (
            <KeyboardAvoidingView style={{ display: 'flex', flex: 1, backgroundColor: colors.appRed }}>
                <RadialGradient
                    colors={['#F37E75', '#F04639']}
                    stops={[0, .75, 1]}
                    radius={300}
                    style={{ flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: colors.appRed }}>
                    <View style={s.container}>

                        <Logo />

                        <View style={s.inputTextContainer}>
                            <View style={[s.inputContainer, this.state.conPassError ? s.inputConatinerError : null]}>
                                <TextInput style={s.inputBox}
                                    keyboardAppearance="default"
                                    autoCorrect={false}
                                    returnKeyType="go"
                                    placeholderTextColor={colors.placeHolderColor}
                                    onSubmitEditing={this.onChangingPassword.bind(this)}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    placeholder='Email'
                                    onChangeText={(text) => this.setState({ email: text })} />

                                <Icon style={s.searchIcon} color={colors.appGreen} name="user" size={Dimens.smallIconSize} />
                            </View>

                            <TouchableOpacity style={s.submitButton}
                                onPress={this.onChangingPassword.bind(this)}>
                                <Text style={s.submitText}>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>


                    </View >
                </RadialGradient>
            </KeyboardAvoidingView>
        );
    }

}


function mapStateToProps(state) {
    return {
        OnlySuccessReducer: state.OnlySuccessReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ uploadData, setInitialStage }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordClass);