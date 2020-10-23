import React, { PureComponent } from 'react';
import { View, Text, Linking, StatusBar, NetInfo } from 'react-native';
import Header from '../Common/BackHeader/BackHeader';

import { showProgressDialog } from '../../utils/Utilities';
import { getHelpCenterUrls } from "../../redux/action/HelpClassActions";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { colors } from 'react-native-elements';
import InternetConnection from '../../utils/InternetConnection';

var s = require('./HelpStyle');

class HelpClass extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            internetConnected: false
        }
        this.props.getHelpCenterUrls();
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        NetInfo.isConnected.fetch().done((isConnected) => {
            this.setState({ internetConnected: isConnected }, () => { if (!this.state.internetConnected) Alert.alert("No internet connection..!") });
        })
    }

    handleConnectivityChange = (connected) => {
        this.setState({ internetConnected: connected });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }


    handleClick = (url) => {
        if (!this.state.internetConnected) {
            Alert.alert("No internet connection..!")
            return;
        }

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    };

    renderHelpView(helpResponse) {

        return (
            <View style={s.container}>

                <Text style={s.textStyle}
                    onPress={() => this.handleClick(helpResponse.help_center)}
                    children={"Help Center"} />
                <View style={s.divider} />

                <Text style={s.textStyle}
                    onPress={() => this.handleClick(helpResponse.about_url)}
                    children={"About Us"} />
                <View style={s.divider} />

                <Text style={s.textStyle}
                    onPress={() => this.handleClick(helpResponse.privacy_url)}
                    children={"Privacy "} />
                <View style={s.divider} />

                <Text style={s.textStyle}
                    onPress={() => this.handleClick(helpResponse.term_url)}
                    children={"Team"} />
                <View style={s.divider} />

                <Text style={s.textStyle}
                    onPress={() => this.handleClick(helpResponse.cookies_url)}
                    children={"Cookies"} />
                <View style={s.divider} />

            </View >
        )
    }



    render() {
        const { isFetchingResponse, helpResponse, error } = this.props.HelpClassReducer;

        return (<View style={{ flex: 1, backgroundColor: colors.white }}>
            <StatusBar backgroundColor={colors.drawerBack} barStyle="light-content" />
            <Header title="Help"
                backValue={true}
                showDoneButton={false}
                goBackProp={this.props.navigation} />
            <InternetConnection />
            {showProgressDialog(isFetchingResponse)}
            {!error
                && helpResponse != null
                && helpResponse != undefined
                && this.renderHelpView(helpResponse)}
        </View>);
    }

}


function mapStateToProps(state) {
    return {
        HelpClassReducer: state.HelpClassReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ getHelpCenterUrls }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpClass);