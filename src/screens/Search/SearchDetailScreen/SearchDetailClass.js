import React, { PureComponent } from "react";
import { Text, View, ScrollView, Alert, FlatList, TouchableOpacity, StatusBar, NetInfo } from "react-native";
import FastImage from 'react-native-fast-image';
import {
    showProgressDialog,
    renderErrorNoDataFound,
    retweetDialog,
    retweetWithCommentDialog,
    commentDialog
} from "../../../utils/Utilities";
import CommonView from "../../Common/CommonView";
import FacebookTabBar from './FacebookTabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Header from '../../Common/BackHeader/BackHeader';
import { Card } from 'react-native-elements';

import { Dimens } from "../../../utils/Dimens";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    getSearchedResult,
    postForHomePost,
    postVotePoll,
    deletePost,
    blockUser,
    showActionDialogs,
    muteUser,
    reportSpark,
    followUnfollowUser
} from "../../../redux/action/SearchDetailAction";

import s from "./SearchDetailStyle";

class SearchDetailClass extends PureComponent {
    constructor(props) {
        super(props);

        const { navigation } = this.props;
        const key = navigation.getParam("key");
        const userId = navigation.getParam("userId");
        this.state = {
            userId: userId,
            title: key,
            internetConnected: false
        };
    }

    componentDidMount() {

        const { userId, title } = this.state;

        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (!isConnected) {
                Alert.alert("No internet connection..!")
                return;
            }
            this.setState({ internetConnected: isConnected },
                () => this.props.getSearchedResult(JSON.stringify({ user_id: userId, search: title }))
            )
        })
    }

    handleConnectivityChange = (connected) => {
        this.setState({ internetConnected: connected });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleHashtagPress(hashtag) {
        Alert.alert(`${hashtag} has been pressed!`);
    }

    renderSearchDetail(search) {

        return (<ScrollableTabView
            style={s.parentContainer}
            initialPage={0}
            renderTabBar={() => <FacebookTabBar />}>

            <ScrollView tabLabel="Top" style={s.tabView}>
                {search.topData.length > 0 ?
                    <FlatList
                        style={s.flatListContainer}
                        renderSeparator={this.ListViewItemSeparator}
                        data={search.topData}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.post_id}
                        renderItem={({ item, index }) =>
                            <TopPost
                                navigationProp={this.props.navigation}
                                data={item}
                                index={index}
                                userId={this.state.userId}
                                actions={this.props} />
                        }
                    /> :
                    <Text style={s.noDataTextStyle}
                        children={"No data available for this search"} />
                }
            </ScrollView>

            <ScrollView tabLabel="Latest" style={s.tabView}>
                {search.latestData.length > 0 ?
                    <FlatList
                        style={s.flatListContainer}
                        renderSeparator={this.ListViewItemSeparator}
                        data={search.latestData}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.post_id}
                        renderItem={({ item, index }) =>
                            <LatestPost
                                navigationProp={this.props.navigation}
                                data={item}
                                index={index}
                                userId={this.state.userId}
                                actions={this.props} />}
                    /> :
                    <Text style={s.noDataTextStyle}
                        children={"No data available for this search"} />
                }

            </ScrollView>

            <ScrollView tabLabel="People" style={s.tabView}>

                {search.peopleData.length > 0 ?
                    <FlatList
                        style={s.flatListContainer}
                        renderSeparator={this.ListViewItemSeparator}
                        data={search.peopleData}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) =>
                            <PeoplePost
                                navigationProp={this.props.navigation}
                                index={index}
                                actions={this.props}
                                data={item}
                                userId={this.state.userId} />}
                    />
                    :
                    <Text style={s.noDataTextStyle}
                        children={"No data available for this search"} />
                }

            </ScrollView>

            <ScrollView tabLabel="Images" style={s.tabView}>
                {search.photosData.length > 0 ?
                    <FlatList
                        style={s.flatListContainer}
                        renderSeparator={this.ListViewItemSeparator}
                        data={search.photosData}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) =>
                            <ImagePost
                                navigationProp={this.props.navigation}
                                data={item}
                                userId={this.state.userId} />}
                    /> :

                    <Text style={s.noDataTextStyle} children={"No data available for this search"} />
                }
            </ScrollView>

            <ScrollView tabLabel="Video" style={s.tabView}>
                {search.videosData.length > 0 ?
                    <FlatList
                        style={s.flatListContainer}
                        renderSeparator={this.ListViewItemSeparator}
                        data={search.videosData}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.post_id}
                        renderItem={({ item, index }) =>
                            <VideoPost data={item}
                                navigationProp={this.props.navigation}
                                index={index}
                                actions={this.props}
                                userId={this.state.userId} />}
                    /> :
                    <Text style={s.noDataTextStyle}
                        children={"No data available for this search"} />
                }
            </ScrollView>

        </ScrollableTabView>
        );
    }

    ListViewItemSeparator = () => {
        return <View style={s.divider} />
    }

    render() {
        const { title, userId } = this.state;
        const { isFetching, searchResult, searchResultError, post_id, showDialog, dialogType, classname } = this.props.SearchDetailReducers;

        return <View style={{ flex: 1 }}>

            <Header title={title}
                backValue={false}
                showDoneButton={false}
                goBackProp={this.props.navigation} />
            <StatusBar backgroundColor={colors.drawerBack} barStyle="light-content" />
            {dialogType === 'retweet' ?
                (retweetDialog(showDialog, this.props, userId, post_id, classname))
                : dialogType === 'retweetWithComment' ?
                    (retweetWithCommentDialog(showDialog, this.props, userId, post_id, classname))
                    : dialogType === 'comment' ?
                        (commentDialog(showDialog, this.props, userId, post_id, classname))
                        : null}


            {showProgressDialog(isFetching)}
            {!searchResultError
                && searchResult != ""
                && searchResult != undefined
                && searchResult != null
                ? this.renderSearchDetail(searchResult) :
                renderErrorNoDataFound("No Sparks found regarding this search")
            }

        </View>

    }
}

function mapStateToProps(state) {
    return {
        SearchDetailReducers: state.SearchDetailReducers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            getSearchedResult,
            postForHomePost,
            postVotePoll,
            deletePost,
            blockUser,
            showActionDialogs,
            muteUser,
            reportSpark,
            followUnfollowUser
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchDetailClass);

// class ListComponent extends PureComponent {

//     render() {

//         const { type, data } = this.props;
//         console.log(data)
//         return (

//             <FlatList
//                 style={s.flatListContainer}
//                 renderSeparator={this.ListViewItemSeparator}
//                 data={data}
//                 showsVerticalScrollIndicator={false}
//                 keyExtractor={item => item.name}
//                 renderItem={({ item }) => (
//                     type == "Top" ? <TopPost data={item} /> :
//                         type == "Latest" ? <LatestPost data={item} /> :
//                             type == "People" ? <PeoplePost data={item} /> :
//                                 type == "Images" ? <ImagePost data={item} /> :
//                                     type == "Video" ? <VideoPost data={item} /> : null
//                 )
//                 }
//             />
//         )
//     }
// }

class TopPost extends PureComponent {
    showPost(item) {
        const { userId, navigationProp } = this.props
        navigationProp.navigate('ViewPostClass', {
            id: item.post_id,
            userId: userId
        });
    }

    showProfile(item) {
        const { userId, navigationProp } = this.props
        navigationProp.navigate('ProfileClass', {
            'userID': userId,
            'userName': item.at_username,
        });
    }

    render() {
        const { data, userId, actions, index } = this.props
        return (
            <CommonView
                index={index}
                triggerEvents={actions}
                onNamePress={() => this.showProfile(data)}
                onPressEvent={() => this.showPost(data)}
                item={data}
                userId={userId}
                className={"top"}
            />
        )
    }
}

class LatestPost extends PureComponent {

    showPost(item) {
        const { userId, navigationProp } = this.props
        navigationProp.navigate('ViewPostClass', {
            id: item.post_id,
            userId: userId
        });
    }

    showProfile(item) {
        const { userId, navigationProp } = this.props
        navigationProp.navigate('ProfileClass', {
            'userID': userId,
            'userName': item.at_username,
        });
    }

    render() {
        const { data, userId, actions, index, navigationProp } = this.props
        return (
            <CommonView
                index={index}
                triggerEvents={actions}
                onNamePress={() => this.showProfile(data)}
                onPressEvent={() => this.showPost(data)}
                item={data}
                userId={userId}
                className={"latest"}
            />
        )
    }
}

class PeoplePost extends PureComponent {

    render() {
        const { data, userId, actions, index } = this.props
        return (<View style={s.card}>
            < Card containerStyle={s.cardViewContainer}>
                <View style={s.mainContainerFlatList}>
                    <FastImage
                        style={s.backgroundImageStyle}
                        source={{
                            uri: data.banner_image,
                            priority: FastImage.priority.high
                        }}
                        resizeMode={FastImage.resizeMode.cover} />

                    <View style={s.profilePicContainer}>
                        <FastImage
                            style={s.profileImageStyle}
                            source={{
                                uri: data.profile_image,
                                priority: FastImage.priority.high
                            }}
                            resizeMode={FastImage.resizeMode.cover} />

                    </View>

                    {userId != data.id &&
                        <TouchableOpacity
                            style={[s.followContainer, data.followStatus == "1" ? s.followingContainer : null]}
                            onPress={() => actions.followUnfollowUser(JSON.stringify({ 'user_id': userId, 'follower_id': data.id }), index)}>
                            <Text style={[s.followTextStyle, data.followStatus == "1" ? s.followingTextStyle : null]}>
                                {data.followStatus == "1" ? "Following" : data.followStatus == "0" ? "Follow" : "Pending"}
                            </Text>
                        </TouchableOpacity>
                    }

                    <Text style={s.nameStyleFlatHorizontal}>{data.name}</Text>
                    <Text style={s.userNameStyleFlatHorizontal}>{data.username}</Text>
                    <Text style={s.profileStyleFlatHorizontal}>{data.user_bio}</Text>
                </View>
            </Card>
        </View>

        )
    }
}

class ImagePost extends PureComponent {
    render() {
        const { data } = this.props;
        return <FastImage
            style={{
                margin: Dimens.three,
                flex: 1,
                width: "100%",
                height: Dimens.twoHundred,
            }}
            source={{
                uri: data.filetumb,
                priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.cover} />

    }
}

class VideoPost extends PureComponent {
    showPost(item) {
        const { userId, navigationProp } = this.props
        navigationProp.navigate('ViewPostClass', {
            id: item.post_id,
            userId: userId
        });
    }

    showProfile(item) {
        const { userId, navigationProp } = this.props
        navigationProp.navigate('ProfileClass', {
            'userID': userId,
            'userName': item.at_username,
        });
    }


    render() {
        const { data, userId, actions, index } = this.props
        return (
            <CommonView
                index={index}
                triggerEvents={actions}
                onNamePress={() => this.showProfile(data)}
                onPressEvent={() => this.showPost(data)}
                item={data}
                userId={userId}
                className={"video"}
            />
        )
    }
}
