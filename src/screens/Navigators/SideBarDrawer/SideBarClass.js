import React from "react";
import { View, TouchableOpacity, Text, StatusBar, AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Dimens } from '../../../utils/Dimens'
import FastImage from "react-native-fast-image";

import PropTypes from 'prop-types';
import style from "./SideBarStyle";

export default class SideBar extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            userName: "",
            isPrivate: "",
            totalFollowers: "",
            totalFollowings: "",
            name: "",
            profile_image: ""
        }
        this.getLoginResponse()
    }


    async getLoginResponse() {
        try {
            const auth = await AsyncStorage.getItem("loginResponse");
            if (auth != "") {
                this.setState({
                    userId: JSON.parse(auth).loginResposneObj.id,
                    userName: JSON.parse(auth).loginResposneObj.at_username,
                    isPrivate: JSON.parse(auth).loginResposneObj.isPrivate,
                    totalFollowers: JSON.parse(auth).loginResposneObj.totalFollowers,
                    totalFollowings: JSON.parse(auth).loginResposneObj.totalFollowings,
                    name: JSON.parse(auth).loginResposneObj.name,
                    profile_image: JSON.parse(auth).loginResposneObj.profile_image,

                })
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    navigateToScreen = (route) => () => {
        const { userId, userName } = this.state;
        const navigateAction = NavigationActions.navigate({
            routeName: route,
            params: {
                'userID': userId,
                'userName': userName,
            }
        });
        this.props.navigation.dispatch(navigateAction);

        // this.props.navigation.navigate(route, {
        //     'userID': userId,
        //     'userName': userName,
        // });

    }


    drawerList(isPrivate) {
        return (
            <View style={style.bodyContainer}>

                <View style={style.bodyListContainer}>

                    <TouchableOpacity
                        onPress={this.navigateToScreen('ProfileClass')}
                        style={style.listDrawerStyle}>
                        <View style={style.iconContainer}>

                            <FontAwesomeIcon
                                style={style.styleUserNameIcon}
                                name={"user"}
                                size={Dimens.mediumIconSize} />
                        </View>
                        <Text style={style.listDrawerTextStyle} children={"Profile"} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.navigateToScreen('ListClass')}
                        style={style.listDrawerStyle}>
                        <View style={style.iconContainer}>
                            <FontAwesomeIcon
                                style={style.styleUserNameIcon}
                                name={"list-ul"}
                                size={Dimens.mediumIconSize} />
                        </View>
                        <Text style={style.listDrawerTextStyle} children={"List"} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.navigateToScreen('BookMarkClass')}
                        style={style.listDrawerStyle}>

                        <View style={style.iconContainer}>
                            <FeatherIcon
                                style={style.styleUserNameIcon}
                                name={"bookmark"}
                                size={Dimens.mediumIconSize} />
                        </View>

                        <Text style={style.listDrawerTextStyle} children={"Bookmarks"} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.navigateToScreen('MomentsClass')}
                        style={style.listDrawerStyle}>
                        <View style={style.iconContainer}>
                            <FontAwesomeIcon
                                style={style.styleUserNameIcon}
                                name={"flash"}
                                size={Dimens.mediumIconSize} />
                        </View>

                        <Text style={style.listDrawerTextStyle} children={"Instants"} />
                    </TouchableOpacity>
                    {
                        isPrivate == "1"
                        &&
                        <TouchableOpacity
                            onPress={this.navigateToScreen('FollowerRequests')}
                            style={style.listDrawerStyle}>
                            <View style={style.iconContainer}>

                                <FeatherIcon
                                    style={style.styleUserNameIcon}
                                    name={"chevron-down"} size={Dimens.smallIconSize} />
                            </View>
                            <Text style={style.listDrawerTextStyle} children={"Follower's Request"} />
                        </TouchableOpacity>
                    }
                    <View style={style.viewLine} />

                    {/* Bottom text */}

                    <TouchableOpacity style={style.listDrawerStyle}
                        onPress={this.navigateToScreen('SettingAndPrivacyStack')}>
                        <Text style={style.listDrawerTextStyle} children={"Setting and Privacy"} />
                    </TouchableOpacity>

                    <TouchableOpacity style={style.listDrawerStyle}
                        onPress={this.navigateToScreen('HelpClass')}>
                        <Text style={style.listDrawerTextStyle} children={"Help Center"} />
                    </TouchableOpacity>

                </View>

            </View >
        );

    }

    getWindowDimension(event) {
        this.setState({ device_height: event.nativeEvent.layout.height });
    }

    render() {

        const { profile_image, name, userName, totalFollowings, totalFollowers, isPrivate } = this.state;

        return (
            <View onLayout={(event) => this.getWindowDimension(event)}
                style={style.mainContainer}>
                <StatusBar backgroundColor={colors.drawerBack} barStyle="light-content" />
                <View style={style.HeaderContainer}>
                    <View style={style.HeaderContainerColumn1}>

                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={this.navigateToScreen('ProfileClass')}>
                            <FastImage
                                onPress={this.navigateToScreen('ProfileClass')}
                                style={style.headerImageStyle}
                                source={{
                                    uri: profile_image,
                                    priority: FastImage.priority.high
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </TouchableOpacity>

                        <View style={style.HeaderContainerColumn1_Row2}>
                            <TouchableOpacity style={style.nameContainerStyle} activeOpacity={.5}>
                                <Text style={style.styleUserName} children={name} />
                                <Text style={style.styleTwitterName} children={userName} />
                            </TouchableOpacity>
                        </View>

                    </View>

                    {/* coloumn2 */}
                    <View style={style.HeaderContainerColumn2}>

                        <TouchableOpacity>
                            <Text
                                onPress={this.navigateToScreen('FollowingClass')}
                                style={style.styleFollowerFollowingTExt}>{totalFollowings} {totalFollowings > 1 ? "Followings" : "Following"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text
                                onPress={this.navigateToScreen('FollowerClass')}
                                style={style.styleFollowerFollowingTExt}>{totalFollowers} {totalFollowers > 1 ? "Followers" : "Follower"}</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                {/* List */}
                {this.drawerList(isPrivate)}

            </View >
        );

    }
}

SideBar.propTypes = {
    navigation: PropTypes.object
};


