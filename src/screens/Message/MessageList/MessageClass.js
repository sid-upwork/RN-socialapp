import React, { Component } from "react";
import { Text, View, TouchableWithoutFeedback, TouchableOpacity, Alert, FlatList, AsyncStorage } from "react-native";
import FastImage from 'react-native-fast-image';
import Header from '../../Common/Header/MainHeader';

import LineIcons from "react-native-vector-icons/SimpleLineIcons";
import { database } from "../../../services/firebase";

import Moment from 'moment';
import colors from "../../../utils/Colors";
import { Dimens } from "../../../utils/Dimens";
import s from "./MessageStyle.js";

export default class MessageClass extends Component {

  state = {
    userId: "",
    profilePic: "",
    chatList: [],
    groupChatList: [],
    groupChat: false,
  }

  constructor(props) {
    super(props)
    this.getUserId();
  }

  async getUserId() {
    try {
      await AsyncStorage.getItem("loginResponse").then(
        response => {
          this.setState({
            userId: JSON.parse(response).loginResposneObj.id,
            profilePic: JSON.parse(response).loginResposneObj.profile_image,
          })
          this.getChatListFromFirebase();
          this.getGroupChatList();
        },
        error => {
          console.log(error);
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  addNewMessage() {
    this.props.navigation.navigate("NewMessage", {
      "userId": this.state.userId,
      navigation: this.props.navigation
    });
  }

  actionOnRow(item, isSingleChat) {
    this.props.navigation.navigate("ChatScreen", {
      'userId': this.state.userId,
      'data': item,
      "singleChat": isSingleChat,
      "groupName": item.name
    });
  }

  getChatListFromFirebase() {
    const { userId } = this.state;

    database.ref("/FriendList")
      .child(userId)
      .on("child_added",
        snapshot => {
          database.ref("/Users")
            .child(snapshot.key)
            .once('value',
              snapshotUser => {
                let data = snapshotUser.val()

                if (data != null || data != undefined) {
                  const chatLista = [];

                  chatLista.push({
                    name: data.name || "",
                    email: data.email || "",
                    profile_image: data.profile_image || "",
                    username: data.username || "",
                    userId: data.id || "",
                    banner_image: data.banner_image || "",
                    lastMessage: "-",
                    timestamp: ""
                  })

                  this.setState(prevState => ({
                    chatList: [...prevState.chatList, ...chatLista],
                    loading: false
                  }))

                  database.ref("Messages")
                    .child(userId + "-" + data.id)
                    .child("data")
                    .limitToLast(1)
                    .on('child_added',
                      snapshot => {
                        if (snapshot.val() != null) {
                          let stateChatList = Array.from(this.state.chatList);
                          let index = stateChatList.findIndex(el => el.userId === data.id);

                          stateChatList[index] = {
                            ...stateChatList[index],
                            lastMessage: snapshot.val().messageText,
                            timestamp: snapshot.val().timestamp
                          }
                          stateChatList.sort((x, y) => {
                            return y.timestamp - x.timestamp;
                          })
                          this.setState({ chatList: stateChatList });
                        }
                      }, errorObject => {
                        console.log(errorObject)
                      })
                }

              }),
            errorObject => {
              console.log(errorObject)
            }
        },
        errorObject => {
          console.log(errorObject)
        })

    database.ref("/FriendList")
      .child(userId)
      .on("child_removed",
        snapshot => {
          console.log(snapshot.key)
          this.setState({
            chatList: this.state.chatList.filter(function (chatPerson) {
              return chatPerson.userId !== snapshot.key
            })
          });
        }, errorObject => {
          console.log(errorObject)
        })
  }

  reverseObject(object) {
    var newObject = {};
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    for (var i = keys.length - 1; i >= 0; i--) {
      var value = object[keys[i]];
      newObject[keys[i]] = value;
    }

    return newObject;
  }

  getGroupChatList() {
    const { userId } = this.state

    database.ref('Users')
      .child(userId)
      .child("group_list")
      .orderByKey()
      .on("child_added", snapshot => {
        if (snapshot.val() != null) {
          const key = snapshot.val();

          database.ref('Groups')
            .child(key)
            .on("value",
              snapshot => {
                let data = snapshot.val()
                const groupChatList = [];

                if (data != null) {

                  if (this.state.groupChatList != null &&
                    this.state.groupChatList != undefined &&
                    this.state.groupChatList.length > 0 &&
                    this.state.groupChatList.findIndex(el => el.userId === snapshot.key) != -1) {

                    let stateGroupChatList1 = Array.from(this.state.groupChatList);

                    let index = stateGroupChatList1.findIndex(el => el.userId === snapshot.key);

                    stateGroupChatList1[index] = {
                      ...stateGroupChatList1[index],
                      name: data.groupName,
                      profile_image: data.groupImage || ""
                    }

                    this.setState({ groupChatList: stateGroupChatList1 })
                    return;
                  }

                  groupChatList.push({
                    name: data.groupName || "",
                    email: "",
                    profile_image: data.groupImage || "",
                    username: "",
                    userId: snapshot.key,
                    banner_image: "",
                    lastMessage: "-",
                    timestamp: "",
                    groupKey: data.groupKey || ""
                  })

                  this.setState(prevState => ({
                    groupChatList: [...prevState.groupChatList, ...groupChatList],
                    loading: false
                  }))

                  if (data.data != undefined && data.data != null) {

                    let rev_obj = this.reverseObject(data.data);
                    let keys = Object.keys(rev_obj);
                    let last = keys[keys.length - 1];

                    for (var key in data.data) {
                      if (key == last) {
                        let stateGroupChatList = Array.from(this.state.groupChatList);
                        let index = stateGroupChatList.findIndex(el => el.userId === snapshot.key);
                        stateGroupChatList[index] = {
                          ...stateGroupChatList[index],
                          lastMessage: data.data[key].messageText,
                          timestamp: data.data[key].timestamp
                        }
                        stateGroupChatList.sort((x, y) => {
                          return y.timestamp - x.timestamp;
                        })
                        this.setState({ groupChatList: stateGroupChatList })
                      }
                    }
                  }

                }

              },
              error => console.log(error))
        }
      })
  }

  deleteChat(chatListData) {
    const { userId, chatList } = this.state;

    Alert.alert(
      'Alert!', 'Are you sure you want to delete this chat?',
      [{ text: 'No', onPress: () => { dismiss } },
      {
        text: 'Yes', onPress: () => {
          let msgId = userId + "-" + chatListData.userId;
          database.ref("/FriendList")
            .child(userId)
            .child(chatListData.userId)
            .remove()
            .then(() => {
              console.log(msgId);

              database.ref("/Messages")
                .child(msgId)
                .remove()

              this.setState({
                chatList: chatList.filter(chatPerson => {
                  return chatPerson.userId !== chatListData.userId
                })
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

  renderDividerComponent() {
    return <View style={s.divider} />
  }

  renderListEmpty = () => {
    return <View
      style={{
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: colors.white,
        margin: Dimens.ten
      }}>
      <Text
        style={{
          flex: 1,
          color: colors.appRed,
          fontSize: Dimens.mediumTextSize
        }}
        children={"No chat done yet..! start new converstation!"}
      />
    </View>
  }

  showSingleChat() {

    const { chatList } = this.state;
    return <FlatList
      style={s.flatListContainer}
      data={chatList}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.userId}
      ItemSeparatorComponent={this.renderDividerComponent}
      ListEmptyComponent={this.renderListEmpty}
      renderItem={({ item }) => (

        <TouchableWithoutFeedback
          onPress={() => this.actionOnRow(item, true)}
          onLongPress={() => this.deleteChat(item)}>
          <View style={s.bodyContainer}>
            <FastImage
              style={s.imageStyle}
              source={{
                uri: item.profile_image,
                priority: FastImage.priority.high
              }}
              resizeMode={FastImage.resizeMode.cover} />

            <View style={s.textContainer}>
              <View style={s.upperContainer}>
                <View style={s.nameContainer}>
                  <Text numberOfLines={1} style={s.nameStyle} children={item.name} />
                  <Text numberOfLines={1} style={s.usernameStyle} children={item.lastMessage} />
                </View>

                <Text style={s.dateStyle} children={Moment(item.timestamp).format("HH:mm")} />
              </View>

              <Text style={s.detailTextStyle} children={item.detail} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    />
  }

  showImage(profile_image) {

    return <FastImage
      style={s.imageStyle}
      source={{
        uri: profile_image,
        priority: FastImage.priority.high
      }}
      resizeMode={FastImage.resizeMode.cover} />
  }

  showGroupList() {
    return <FlatList
      style={s.flatListContainer}
      data={this.state.groupChatList}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.userId}
      ItemSeparatorComponent={this.renderDividerComponent}
      ListEmptyComponent={this.renderListEmpty}
      renderItem={({ item }) => (
        <TouchableWithoutFeedback
          onPress={() => this.actionOnRow(item, false)}
          onLongPress={() => this.deleteChat(item)}>
          <View style={s.bodyContainer}>
            {this.showImage(item.profile_image)}

            <View style={s.textContainer}>
              <View style={s.upperContainer}>
                <View style={s.nameContainer}>
                  <Text numberOfLines={1} style={s.nameStyle} children={item.name} />
                  <Text numberOfLines={1} style={s.usernameStyle} children={item.lastMessage} />
                </View>

                <Text style={s.dateStyle} children={Moment(item.timestamp).format("HH:mm")} />
              </View>

              <Text style={s.detailTextStyle} children={item.detail} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    />
  }

  render() {
    const { groupChat } = this.state
    return (
      <View style={s.mainContainer} >

        <Header
          profileImage={this.state.profilePic}
          headerTitleName="Messages"
          showSettingButton={false}
          screenProps={{ navigation: this.props.navigation }} />

        <View style={{ flex: 1 }}>
          <View style={s.container}>

            <TouchableOpacity activeOpacity={1} style={[s.unSelectedLeftButtonContainer, !groupChat ? s.selectedLeftButtonContainer : null]}
              onPress={() => this.setState({ groupChat: false })}>
              <Text style={[s.unSelectedButtonText, !groupChat ? s.selectedButtonText : null]} children={"Single Chat"} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} style={[s.unSelectedRightButtonContainer, groupChat ? s.selectedRightButtonContainer : null]}
              onPress={() => this.setState({ groupChat: true })}>
              <Text style={[s.unSelectedButtonText, groupChat ? s.selectedButtonText : null]} children={"Group Chat"} />
            </TouchableOpacity>

          </View>
          {!groupChat ? this.showSingleChat() : this.showGroupList()}

          <TouchableOpacity
            style={s.floatingButton}
            onPress={() => this.addNewMessage()}>
            <LineIcons name={"bubble"} color={colors.white} size={Dimens.largeIconSize} />
          </TouchableOpacity>
        </View>
      </View>
    );

  }
}
