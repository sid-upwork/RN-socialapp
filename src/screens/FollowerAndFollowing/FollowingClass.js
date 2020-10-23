import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, Alert, NetInfo } from 'react-native';
import Header from '../Common/BackHeader/BackHeader';
import FastImage from "react-native-fast-image";
import { showProgressDialog, renderErrorNoDataFound } from "../../utils/Utilities";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getFollowingFollowerList, followUser } from "../../redux/action/FollowingFollowerAction";

import s from './FollowingFollowerStyle';

class FollowingClass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.navigation.getParam("userID"),
            internetConnected: false
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
                () => this.props.getFollowingFollowerList(JSON.stringify({ user_id: this.state.userId })))

        })
    }

    handleConnectivityChange = (connected) => {
        this.setState({ internetConnected: connected });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    renderMainView(followings) {

        return (
            <FlatList style={s.flatListContainer}
                data={followings}
                showsVerticalScrollIndicator={true}
                keyExtractor={item => item.user_id}
                renderItem={({ item, index }) =>

                    <View style={s.bodyContainer} key={index}>
                        <View style={s.bodyDetailContainer} >
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
                                        <Text style={s.usernameStyle} children={item.username} />
                                    </View>

                                    <TouchableOpacity style={[s.followContainer, item.status == "1" ? s.followingContainer : null]}
                                        onPress={() => {
                                            if (!this.state.internetConnected) {
                                                Alert.alert("No internet connection!")
                                                return
                                            }
                                            this.props.followUser(
                                                index,
                                                JSON.stringify({ 'user_id': this.state.userId, 'follower_id': item.user_id }),
                                                "FollowingClass")
                                        }}>
                                        <Text
                                            style={[s.followTextStyle, item.status == "1" ? s.followingTextStyle : null]}
                                            children={item.status == "1" ? "Following" : "Follow"}
                                        />
                                    </TouchableOpacity>

                                </View>
                                <Text style={s.detailTextStyle} children={item.details} />
                            </View>
                        </View>
                        <View style={s.divider} />
                    </ View >} />
        )
    }

    render() {
        const { followerFollowingData, isFetching, error } = this.props.FollowerFollowingReducer;
        return (
            <View style={s.mainContainer} >
                <Header title="Following"
                    backValue={false}
                    showDoneButton={false}
                    goBackProp={this.props.navigation} />

                {showProgressDialog(isFetching)}
                {!error &&
                    followerFollowingData.followings != null &&
                    followerFollowingData.followings != undefined &&
                    followerFollowingData.followings.length > 0 ?
                    this.renderMainView(followerFollowingData.followings)
                    : renderErrorNoDataFound("You are not following anyone yet!")
                }
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        FollowerFollowingReducer: state.FollowerFollowingReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ getFollowingFollowerList, followUser }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowingClass);
