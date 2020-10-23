import React, { PureComponent } from 'react';
import { View, Alert, Text, AsyncStorage, FlatList, TouchableOpacity, StatusBar, NetInfo } from 'react-native';
import Header from '../Common/BackHeader/BackHeader';
import { showProgressDialog, renderErrorNoDataFound } from "../../utils/Utilities";

import FastImage from 'react-native-fast-image';
var s = require('./MomentsStyle');

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getMomentList, dispatchDeleteMoment } from "../../redux/action/MomentAction";
import { Dimens } from '../../utils/Dimens';
import ParsedText from 'react-native-parsed-text';

import parsedTextStyle from '../../utils/ParsedTextStyle';
import { dismiss } from 'react-native-snackbar';

class MomentsClass extends PureComponent {
    constructor(props) {
        super(props);

        let passedUserId = this.props.navigation.getParam("passedUserId", "");
        if (passedUserId == undefined || passedUserId == null)
            passedUserId = ""

        this.state = { userId: "", passedUserId: passedUserId, internetConnected: false }
        this.showDetailedMoment = this.showDetailedMoment.bind(this);
        this.deleteMoment = this.deleteMoment.bind(this);

        this.getUserId();
    }

    async getUserId() {
        try {
            await AsyncStorage.getItem("loginResponse").then(
                response => {
                    this.setState({
                        userId: JSON.parse(response).loginResposneObj.id
                    })
                },
                error => console.log(error)
            )
        } catch (e) {
            console.log(e);
        }
    }


    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (!isConnected) {
                Alert.alert("No internet connection..!")
                return;
            }
            this.setState({ internetConnected: isConnected },
                () => {
                    if (this.state.passedUserId == "") {
                        this.props.getMomentList(JSON.stringify({ user_id: this.state.userId }))
                        return
                    }
                    this.props.getMomentList(JSON.stringify({ user_id: this.state.passedUserId }))
                })
        })
    }

    handleConnectivityChange = (connected) => {
        this.setState({ internetConnected: connected });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    showDetailedMoment(item) {
        this.props.navigation.navigate('MomentDetailClass', { id: item.moment_id, userId: this.state.userId });
    }

    deleteMoment(item, index) {
        Alert.alert(
            'Alert!', 'Are you sure you want to delete this instant?',
            [{ text: 'No', onPress: () => { dismiss } },
            {
                text: 'Yes', onPress: () => {
                    if (!this.state.internetConnected) {
                        Alert.alert("No internet connection!")
                        return
                    }
                    this.props.dispatchDeleteMoment(JSON.stringify({ user_id: this.state.userId, moment_id: item.moment_id }), index)
                }
            }]
            , { cancelable: true }
        )
    }

    renderMainView(data) {
        return (<View style={{ flex: 1 }}>
            <Text style={s.suggestionText} children={"To make or edit a Instant, please use spark.com. Press and hold to delete Instant"} />

            <FlatList style={s.flatListContainer}
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.moment_id}
                renderItem={({ item, index }) =>

                    <TouchableOpacity style={s.bodyContainer}
                        activeOpacity={10}
                        onLongPress={() => this.deleteMoment(item, index)}
                        onPress={() => this.showDetailedMoment(item)}>
                        <FastImage
                            style={s.momentBannerStyle}
                            source={{
                                uri: item.file,
                                priority: FastImage.priority.high
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />

                        <View style={{ flex: 0.8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: Dimens.ten }}>
                                <FastImage
                                    style={s.userImageStyle}
                                    source={{
                                        uri: item.profile_image,
                                        priority: FastImage.priority.high
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                <Text style={s.nameStyle} children={item.name} />
                                <Text style={s.usernameStyle} children={item.username} />
                            </View>

                            <ParsedText
                                style={s.parsedTextContainer}
                                parse={[
                                    { type: 'url', style: parsedTextStyle.url, onPress: this.handleUrlPress },
                                    { type: 'phone', style: parsedTextStyle.phone, onPress: this.handlePhonePress },
                                    { type: 'email', style: parsedTextStyle.email, onPress: this.handleEmailPress },
                                    { pattern: /\[(@[^:]+):([^\]]+)\]/i, style: parsedTextStyle.username, onPress: this.handleNamePress, renderText: this.renderText },
                                    { pattern: /42/, style: parsedTextStyle.magicNumber },
                                    { pattern: /#(\w+)/, style: parsedTextStyle.hashTag, onPress: this.handleHashtagPress },
                                ]}
                                childrenProps={{ allowFontScaling: false }}>
                                {item.title}
                            </ParsedText>

                            {item.isPublished == "0" && <Text style={s.draftConatiner} children={"Draft"} />}
                        </View>
                    </TouchableOpacity >
                }
            />


        </View>
        );
    }

    render() {
        const { momentData, isFetching, error } = this.props.MomentReducers;
        return (
            <View style={s.mainContainer} >
                <Header title="Instants"
                    backValue={true}
                    showDoneButton={false}
                    goBackProp={this.props.navigation} />
                <StatusBar backgroundColor={colors.drawerBack} barStyle="light-content" />
                {showProgressDialog(isFetching)}
                {!error && momentData != "" ? this.renderMainView(momentData)
                    : renderErrorNoDataFound("No instants found")}
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        MomentReducers: state.MomentReducers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ getMomentList, dispatchDeleteMoment }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MomentsClass);


