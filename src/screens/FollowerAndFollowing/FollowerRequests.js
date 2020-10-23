import React from 'react';
import { Text, View, FlatList, Alert,NetInfo } from 'react-native';

import Header from '../Common/BackHeader/BackHeader';
import FastImage from "react-native-fast-image";
import { showProgressDialog, renderErrorNoDataFound } from "../../utils/Utilities";
import LineIcons from 'react-native-vector-icons/EvilIcons'
import { Dimens } from '../../utils/Dimens';
import colors from '../../utils/Colors';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getFollowingFollowerList, acceptUserRequest } from "../../redux/action/FollowingFollowerAction";

import s from './FollowingFollowerStyle';

class FollowerRequestClass extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = { userId: this.props.navigation.getParam("userID"), internetConnected: false }
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (!isConnected) {
                Alert.alert("No internet connection..!")
                return;
            }
            this.setState({ internetConnected: isConnected },
                () => this.props.getFollowingFollowerList(JSON.stringify({ user_id: this.state.userId }))
            )
        });
    }

    handleConnectivityChange = (connected) => {
        this.setState({ internetConnected: connected });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    renderMainView(follow_request) {
        return <FlatList style={s.flatListContainer}
            data={follow_request}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.user_id.toString()}
            renderItem={({ item, index }) =>

                <View style={s.bodyContainer} >
                    <View style={s.bodyDetailContainer} >

                        <FastImage
                            style={s.imageStyle}
                            source={{
                                uri: item.profile_image,
                                priority: FastImage.priority.high
                            }}
                            resizeMode={FastImage.resizeMode.cover} />

                        <View style={s.rightContainer}>
                            <View style={s.followerRequestContainer}>

                                <View style={s.nameContainer}>
                                    <Text style={s.nameStyle} >{item.name}</Text>
                                    <Text style={s.usernameStyle}>{item.username}</Text>
                                </View>
                                <View style={s.actionButtonStyle}>
                                    <LineIcons onPress={() => {
                                        if (!this.state.internetConnected) {
                                            Alert.alert("No internet connection!")
                                            return
                                        }
                                        this.props.acceptUserRequest(index, JSON.stringify({
                                            'user_id': this.state.userId,
                                            'other_id': item.user_id,
                                            'action': "accept"
                                        }))
                                    }}
                                        name={"close-o"}
                                        size={Dimens.fourty}
                                        color={colors.appRed} />

                                    <LineIcons onPress={() => {
                                        if (!this.state.internetConnected) {
                                            Alert.alert("No internet connection!")
                                            return
                                        }
                                        this.props.acceptUserRequest(index, JSON.stringify({
                                            'user_id': this.state.userId,
                                            'other_id': item.user_id,
                                            'action': "decline"
                                        }))
                                    }}
                                        name={"check"}
                                        size={Dimens.fourty}
                                        color={colors.appGreen} />
                                </View>
                            </View>
                            <Text style={s.detailTextStyle}>{item.location}</Text>
                        </View>
                    </View>
                    <View style={s.divider} />
                </ View >
            }
        />
    }

    render() {
        const { followerFollowingData, isFetching, error } = this.props.FollowerFollowingReducer;
        return (
            <View style={s.mainContainer} >
                <Header title="Follower's request"
                    backValue={false}
                    showDoneButton={false}
                    goBackProp={this.props.navigation} />

                {showProgressDialog(isFetching)}
                {!error && followerFollowingData.follow_request != null &&
                    followerFollowingData.follow_request != undefined &&
                    followerFollowingData.follow_request.length > 0 ?
                    this.renderMainView(followerFollowingData.follow_request) :
                    renderErrorNoDataFound("No request received !")}

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
        ...bindActionCreators({ getFollowingFollowerList, acceptUserRequest }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowerRequestClass);
