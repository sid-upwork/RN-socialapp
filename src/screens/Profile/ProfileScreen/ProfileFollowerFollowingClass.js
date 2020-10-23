import React from 'react';
import { Text, View, TouchableOpacity, FlatList, NetInfo } from 'react-native';
import Header from '../../Common/BackHeader/BackHeader';
import FastImage from "react-native-fast-image";
import { showProgressDialog, renderErrorNoDataFound } from "../../../utils/Utilities";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { followUser } from "../../../redux/action/ProfileActions";
import Colors from '../../../utils/Colors';
import { Dimens } from '../../../utils/Dimens';

var s = require('../../FollowerAndFollowing/FollowingFollowerStyle');

class ProfileFollowerFollowingClass extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            stateClassType: this.props.navigation.getParam("classType"),
            stateUserName: this.props.navigation.getParam("username"),
            stateUserId: this.props.navigation.getParam("userId"),
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

    listEmptyComponent() {
        return <View style={{ flex: 1, MarginTop: Dimens.hundred }}>
            <Text style={{ flex: 1, color: Colors.appRed, textAlign: 'center', fontSize: Dimens.headerSize }} children={"No users"} />
        </View>
    }

    renderMainView(profileResponse) {
        const { stateClassType, stateUserId } = this.state;
        var response = stateClassType == "FollowingClass" ? profileResponse.followings : profileResponse.followers

        return <FlatList style={s.flatListContainer}
            data={response}
            extraData={response}
            ListEmptyComponent={this.listEmptyComponent}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.user_id}
            renderItem={({ item, index }) =>

                <View style={s.bodyContainer} >
                    <TouchableOpacity style={s.bodyDetailContainer}
                        onPress={() => {
                            this.props.navigation.push("ProfileClass", {
                                'userID': stateUserId,
                                'userName': item.at_username,
                            });
                        }}>
                        <FastImage
                            style={s.imageStyle}
                            source={{
                                uri: item.profile_image,
                                priority: FastImage.priority.high
                            }}
                            resizeMode={FastImage.resizeMode.cover} />

                        <View style={s.rightContainer}>
                            <View style={s.upperContainer}>

                                <View style={s.nameContainer}>
                                    <Text style={s.nameStyle} children={item.name} />
                                    <Text style={s.usernameStyle} children={item.at_username} />
                                </View>
                                {stateUserId != item.user_id &&
                                    <TouchableOpacity
                                        style={[s.followContainer, item.status == "1" || item.status == "2" ? s.followingContainer : null]}
                                        onPress={() => {
                                            if (!this.state.internetConnected) {
                                                Alert.alert("No internet connection!")
                                                return
                                            }
                                            this.props.followUser(index, JSON.stringify({ 'user_id': stateUserId, 'follower_id': item.user_id }), stateClassType)
                                        }}>
                                        <Text style={[s.followTextStyle, item.status == "1" || item.status == "2" ? s.followingTextStyle : null]}>
                                            {item.status == "1" ? "Following" : item.status == "0" ? "Follow" : "Pending"}
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            <Text style={s.detailTextStyle}>{item.location}</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={s.divider} />
                </View >
            }
        />
    }

    render() {
        // const { profileResponse, isFetching, error } = this.props.ProfileReducers;
        const { key, error, isFetching } = this.props.ProfileReducers;
        let index = key.findIndex(key => key.keyValue === this.state.stateUserName);
        if (index == -1) {
            index = 0
        }

        return (
            <View style={s.mainContainer} >
                <Header title={key[index].data.profileResponse.name}
                    backValue={false}
                    showDoneButton={false}
                    goBackProp={this.props.navigation} />

                {showProgressDialog(isFetching)}
                {error ? renderErrorNoDataFound() : this.renderMainView(key[index].data.profileResponse)}
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        ProfileReducers: state.ProfileReducers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ followUser }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFollowerFollowingClass);
