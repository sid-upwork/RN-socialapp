import React, { PureComponent } from 'react';
import { Text, View, FlatList, TouchableOpacity, NetInfo } from 'react-native';
import { showProgressDialog } from "../../../utils/Utilities";
import Header from '../../Common/BackHeader/BackHeader';
import FastImage from 'react-native-fast-image';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { unblockUser, unMuteUser } from "../../../redux/action/SettingsActions";


var s = require('./BlockedAccountStyle');

class BlockedAccountClass extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isBlocked: true,
            internetConnected: false
        }
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


    showMutedList(error, mutedUserData, userId) {
        var showlist = !error && mutedUserData != ""
        return (
            <View style={s.mainBodyContainer} >
                {
                    showlist ?
                        < FlatList style={s.flatListContainer}
                            data={mutedUserData}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.muted_id}
                            renderItem={({ item, index }) =>

                                <View style={s.bodyContainer} >
                                    <View style={s.bodyDetailContainer} >
                                        <FastImage
                                            style={s.imageStyle}
                                            source={{
                                                uri: item.profile_image,
                                                priority: FastImage.priority.high
                                            }}
                                            resizeMode={FastImage.resizeMode.cover}
                                        />
                                        <View style={s.rightContainer}>
                                            <Text style={s.nameStyle} children={item.name} />
                                            <Text style={s.usernameStyle} children={item.username} />
                                        </View>

                                        <TouchableOpacity style={s.blockButtonTextContainer}
                                            onPress={() => {
                                                if (!this.state.internetConnected) {
                                                    Alert.alert("No internet connection!")
                                                    return
                                                }
                                                this.props.unMuteUser(JSON.stringify({ user_id: userId, receiver_id: item.muted_user_id }), index)
                                            }}>
                                            <Text style={s.blockButtonTextStyle} children={"Unmute"} />
                                        </TouchableOpacity>

                                    </View>
                                    <View style={s.divider} />
                                </View >
                            } />
                        :
                        <View style={s.emptyAllListContainer}>
                            <Text style={s.allTextList} children={"You aren't muted anyone"} />
                            <Text style={s.allTextDetailStyle} children={"When you mute someone, you won't be able to see notifications from them."} />
                        </View>
                }
            </View>
        )
    }

    showBlockedList(error, blockedUserData, userId) {
        var showlist = !error && blockedUserData != ""
        return (
            <View style={s.mainBodyContainer} >
                {
                    showlist ?
                        < FlatList style={s.flatListContainer}
                            data={blockedUserData}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.block_id}
                            renderItem={({ item, index }) =>

                                <View style={s.bodyContainer} >
                                    <View style={s.bodyDetailContainer} >
                                        <FastImage
                                            style={s.imageStyle}
                                            source={{
                                                uri: item.profile_image,
                                                priority: FastImage.priority.high
                                            }}
                                            resizeMode={FastImage.resizeMode.cover}
                                        />
                                        <View style={s.rightContainer}>
                                            <Text style={s.nameStyle} children={item.name} />
                                            <Text style={s.usernameStyle} children={item.username} />
                                        </View>

                                        <TouchableOpacity style={s.blockButtonTextContainer}
                                            onPress={() => {
                                                if (!this.state.internetConnected) {
                                                    Alert.alert("No internet connection!")
                                                    return
                                                }
                                                this.props.unblockUser(JSON.stringify({ user_id: userId, receiver_id: item.user_id }), index)
                                            }}>
                                            <Text style={s.blockButtonTextStyle} children={"Unblock"} />
                                        </TouchableOpacity>

                                    </View>
                                    <View style={s.divider} />
                                </View >
                            } />
                        :
                        <View style={s.emptyAllListContainer}>
                            <Text style={s.allTextList} children={"You aren't blocking anyone"} />
                            <Text style={s.allTextDetailStyle} children={"When you block someone, that person won't be able to follow or message you, and you won't see notifications from them."} />
                        </View>
                }
            </View>
        )
    }

    showList(error, list, userId) {
        const { isBlocked } = this.state;

        return <View style={s.mainBodyContainer} >
            <View style={s.container}>

                <TouchableOpacity activeOpacity={1} style={[s.unSelectedLeftButtonContainer, isBlocked ? s.selectedLeftButtonContainer : null]}
                    onPress={() => this.setState({ isBlocked: true })}>
                    <Text style={[s.unSelectedButtonText, isBlocked ? s.selectedButtonText : null]} children={"Blocked"} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} style={[s.unSelectedRightButtonContainer, !isBlocked ? s.selectedRightButtonContainer : null]}
                    onPress={() => this.setState({ isBlocked: false })}>
                    <Text style={[s.unSelectedButtonText, !isBlocked ? s.selectedButtonText : null]} children={"Muted"} />
                </TouchableOpacity>

            </View>


            {isBlocked ?
                this.showBlockedList(error, list.blockList, userId)
                : this.showMutedList(error, list.mutedList, userId)}
        </View>
    }

    render() {
        const { settingData, updatingBlockList, blockListError, userId } = this.props.SettingReducers;

        return (
            <View style={s.mainContainer} >

                <Header title="Blocked & Muted accounts"
                    backValue={false}
                    showDoneButton={false}
                    goBackProp={this.props.navigation} />

                {showProgressDialog(updatingBlockList)}
                {this.showList(blockListError, settingData.list, userId)}
            </View>
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
        ...bindActionCreators({ unblockUser, unMuteUser }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockedAccountClass);
