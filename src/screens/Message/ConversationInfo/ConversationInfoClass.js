import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationActions, StackActions } from "react-navigation";

import { database } from "../../../services/firebase";
import Header from '../../Common/BackHeader/BackHeader';
var s = require('./ConversationInfoStyle');

export default class ConversationInfoClass extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const userIdd = navigation.getParam("userId");
        const data = navigation.getParam("data");
        console.log(data)
        this.state = {
            userId: userIdd,
            stateData: data
        }
    }

    deleteConversation() {
        const { userId, stateData } = this.state

        Alert.alert(
            'Alert!', 'Are you sure you want to delete this chat?',
            [{ text: 'No', onPress: () => { null } },
            {
                text: 'Yes', onPress: () => {

                    let msgId = userId + "-" + stateData.userId;

                    database.ref("/FriendList")
                        .child(userId)
                        .child(stateData.userId)
                        .remove()
                        .then(() => {

                            database.ref("/Messages")
                                .child(msgId)
                                .remove()
                                .then(() => {
                                    const resetAction = StackActions.reset({
                                        index: 0,
                                        actions: [NavigationActions.navigate({ routeName: "MessageClass" })]
                                    });
                                    this.props.navigation.dispatch(resetAction);

                                })

                        })
                        .catch(error => {
                            console.log("Remove failed: " + error.message)
                        });
                }
            }]
            , { cancelable: true }
        )
    }

    render() {
        const { stateData } = this.state;
        return (
            <View style={s.mainContainer} >

                <Header title="Conversation Info"
                    backValue={true}
                    showDoneButton={false}
                    goBackProp={this.props.navigation} />
                    
                <ImageBackground
                    source={{ uri: stateData.banner_image }}
                    style={s.profileImageContainer} >
                    <FastImage
                        style={s.profileImageStyle}
                        source={{
                            uri: stateData.profile_image,
                            priority: FastImage.priority.high
                        }}
                        resizeMode={FastImage.resizeMode.cover} />


                    <Text style={s.nameStyle} children={stateData.name} />
                    <Text style={s.userNameStyle} children={stateData.username} />
                </ImageBackground >

                <View style={{ flex: .5, flexDirection: 'column' }} >
                    <ScrollView>
                        {/* 
                        <TouchableOpacity>
                            <Text style={s.textStyling} children={"Block @" + stateData.username} />
                        </TouchableOpacity>
                        <View style={s.divider} />

                        <TouchableOpacity>
                            <Text style={s.textStyling} children={"Report @" + stateData.username} />
                        </TouchableOpacity>
                        <View style={s.divider} /> */}

                        <TouchableOpacity style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }} onPress={() => this.deleteConversation()}>
                            <Text style={s.deleteTextStyling} children={"Delete Conversation"} />
                        </TouchableOpacity>
                        <View style={s.divider} />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

