import React, { PureComponent } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';

import { NavigationActions, StackActions } from "react-navigation";

import { database } from "../../../services/firebase";
import Firebase from 'react-native-firebase'
import ImageCapInset from "react-native-image-capinsets";
import IconFeather from "react-native-vector-icons/Feather";

import chatStyle from "./ChatScreenStyle";
import images from "../../../utils/ImagesUtil";
import { Dimens } from "../../../utils/Dimens";
import Colors from "../../../utils/Colors";


export default class ChatScreen extends PureComponent {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const userIdd = navigation.getParam("userId", "");
    const dataa = navigation.getParam("data", "");
    const groupName = navigation.getParam("groupName", "");
    const isThisSingleChat = navigation.getParam("singleChat", true);

    database.ref('Messages/').off();

    this.state = {
      loading: "",
      userId: userIdd,
      messages: [],
      data: dataa,
      isThisSingleChat: isThisSingleChat,
      groupData: "",
      groupName: groupName,
      showInputText: true,
      profilePic: ""
    }
    this.getUserId()
  }

  async getUserId() {
    try {
      await AsyncStorage.getItem("loginResponse").then(
        response => {
          this.setState({
            profilePic: JSON.parse(response).loginResposneObj.profile_image,
          })
        },
        error => {
          console.log(error);
        }
      );
    } catch (e) {
      console.log(e);
    }
  }


  componentDidMount() {
    const { userId, data, isThisSingleChat } = this.state

    if (isThisSingleChat) {
      database.ref('Messages/' + userId + "-" + data.userId + '/data')
        .orderByKey()
        .limitToLast(12)
        .on('child_added',
          snapshot => {
            if (snapshot != null) {
              let messages = [];

              if (new Date() <= snapshot.val().timestamp) {
                messages.push({
                  _id: snapshot.key,
                  text: snapshot.val().messageText,
                  createdAt: new Date(parseInt(snapshot.val().timestamp)).toUTCString(),
                  user: {
                    _id: snapshot.val().userId,
                    name: snapshot.val().userId == userId ? "" : data.name,
                    avatar: snapshot.val().userId == userId ? "" : data.profile_image,
                  },
                  userId: snapshot.val().userId,
                  seen: snapshot.val().seen,
                  timestamp: snapshot.val().timestamp,
                  mediaUrl: snapshot.val().mediaUrl
                })

                this.setState(prevState => ({
                  messages: [...messages, ...prevState.messages]
                }))
              }

            }
          },
          errorObject => {
            console.log(errorObject)
          })

      database.ref("blockeduser")
        .child(userId)
        .child(data.userId)
        .on('value',
          snapshotBlock => {
            const blockdata = snapshotBlock.val();
            database.ref("blockeduser")
              .child(data.userId)
              .child(userId)
              .on('value', snapshotBlock1 => {
                const blockdata1 = snapshotBlock1.val();
                if (blockdata != null || blockdata1 != null) {
                  let showInputText = true;
                  if (blockdata == null && blockdata1 != null) {
                    showInputText = blockdata1.status == 1 ? false : true;
                  }
                  else if (blockdata != null && blockdata1 == null) {
                    showInputText = blockdata.status == 1 ? false : true;
                  }
                  else {
                    showInputText = (blockdata.status == 1 || blockdata1.status == 1) ? false : true
                  }

                  this.setState({ showInputText: showInputText, })
                }
                else {
                  this.setState({ showInputText: true, })
                }
              });
          });


    }
    else {

      database.ref('Groups')
        .child(data.userId)
        .once("value", snap => {
          console.log(snap.val().members)
          if (snap.val().members != null) {
            let user = snap.val().members.filter(member => {
              if (member != null && member.userId == userId) {
                return member.userId
              }
            })
            database.ref('Groups')
              .child(data.userId)
              .child("data")
              .orderByKey()
              .limitToLast(10)
              .on("child_added", snapshot => {
                if (snapshot != null) {
                  const data = snapshot.val();
                  let messages = [];

                  database.ref("Users/" + data.userId + "/")
                    .once('value', snapshotUser => {
                      const userData = snapshotUser.val()


                      if (user[0].groupLeftTimeStamp == undefined || user[0].groupLeftTimeStamp == null) {
                        messages.push({
                          _id: snapshot.key,
                          text: snapshot.val().messageText,
                          createdAt: new Date(parseInt(snapshot.val().timestamp)).toUTCString(),
                          user: {
                            _id: snapshot.val().userId,
                            name: userData.username,
                            avatar: userData.profile_image,
                          },
                          userId: snapshot.val().userId,
                          seen: snapshot.val().seen,
                          mediaUrl: snapshot.val().mediaUrl
                        })
                      }
                      else if (new Date(user[0].groupLeftTimeStamp) > new Date(snapshot.val().timestamp)) {
                        messages.push({
                          _id: snapshot.key,
                          text: snapshot.val().messageText,
                          createdAt: new Date(parseInt(snapshot.val().timestamp)).toUTCString(),
                          user: {
                            _id: snapshot.val().userId,
                            name: userData.username,
                            avatar: userData.profile_image,
                          },
                          userId: snapshot.val().userId,
                          seen: snapshot.val().seen,
                          mediaUrl: snapshot.val().mediaUrl
                        })
                      }


                      this.setState(prevState => ({
                        messages: [...messages, ...prevState.messages]
                      }))
                    })

                }
              })
          }
        })

      database.ref("Groups")
        .child(data.userId)
        .child("members")
        .child(userId)
        .child("status")
        .on("value",
          snapshot => {
            this.setState({ showInputText: snapshot.val() != null ? snapshot.val() : true })
          },
          error => console.log(error))
    }
  }

  showHideList(item) {
    const { userId } = this.state
    if (item.userId != userId) {
      return (
        <View style={{
          flexDirection: "row",
          alignSelf: "flex-start",
          marginLeft: Dimens.seven,
          marginTop: Dimens.seven
        }}>
          <ImageCapInset
            source={images.messageBackRed}
            style={{ alignSelf: "baseline", padding: Dimens.ten, paddingHorizontal: Dimens.fifteen }}
            capInsets={{
              top: Dimens.zero,
              right: Dimens.zero,
              bottom: Dimens.zero,
              left: Dimens.one
            }} >
            <Text style={chatStyle.flatListTextItemRed} children={item.messageText} />
          </ImageCapInset>
        </View>
      );
    } else {
      return (
        <View style={{
          flexDirection: "row",
          alignSelf: "flex-end",
          marginRight: Dimens.seven,
          marginTop: Dimens.seven
        }} >
          <ImageCapInset
            source={images.messageBackGrey}
            style={{ alignSelf: "baseline", padding: Dimens.ten, paddingHorizontal: Dimens.fifteen }}
            capInsets={{
              top: Dimens.zero,
              right: Dimens.zero,
              bottom: Dimens.zero,
              left: Dimens.zero
            }} >
            <Text style={chatStyle.flatListTextItemGrey}>{item.messageText}</Text>
          </ImageCapInset>
        </View>
      );
    }
  }

  sendMessage(t) {
    var text = t[0].text

    if (text == "") {
      return;
    }

    const { userId, data, messages, isThisSingleChat } = this.state;

    if (isThisSingleChat) {
      const newMessageInMyNode = database.ref('Messages').child(userId + "-" + data.userId);
      const newmessageInRecieversNode = database.ref('Messages').child(data.userId + "-" + userId);
      if (messages == "" || messages.length <= 0) {

        database.ref("/FriendList")
          .child(userId)
          .child(data.userId)
          .set({
            addDate: Firebase.database.ServerValue.TIMESTAMP,
            id: data.userId || "",
            deleteChat: false,
          }).then((data) => {
            console.log('data ', data)
          }).catch((error) => {
            console.log('error ', error)
          })

        database.ref("/FriendList")
          .child(data.userId)
          .child(userId)
          .set({
            addDate: Firebase.database.ServerValue.TIMESTAMP,
            id: userId || "",
            deleteChat: false,
          }).then((data) => {
            console.log('data ', data)
          }).catch((error) => {
            console.log('error ', error)
          })

      }

      newMessageInMyNode.child("data").push({
        messageText: text.trim(),
        userId: userId,
        seen: "false",
        timestamp: Firebase.database.ServerValue.TIMESTAMP,
        messageType: "text",
        mediaUrl: ""
      }).then(() => {
        return console.log("Success")
      });

      newmessageInRecieversNode.child("data").push({
        messageText: text.trim(),
        userId: userId,
        seen: "false",
        timestamp: Firebase.database.ServerValue.TIMESTAMP,
        messageType: "text",
        mediaUrl: ""
      }).then(() => {
        return console.log("Success")
      })

    } else {

      database.ref('Groups/' + data.userId + '/data/').push({
        messageText: text.trim(),
        userId: userId,
        seen: "false",
        timestamp: Firebase.database.ServerValue.TIMESTAMP,
        messageType: "text",
        mediaUrl: ""
      }).then(() => {
        console.log("Success")
      })

    }
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

  goBackToTabStack() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "MessageClass" })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const { loading, userId, messages, data, isThisSingleChat, groupName, showInputText, profilePic } = this.state;

    return (<View style={{ flex: 1, flexDirection: "column", backgroundColor: colors.white }}>

      <View style={chatStyle.headerContainer}>
        <TouchableOpacity
          onPress={() => this.goBackToTabStack()}
          style={chatStyle.headerImageStyleOpacity} >
          <IconFeather name={"chevron-left"} size={Dimens.largeIconSize} color={"white"} />
        </TouchableOpacity>

        {isThisSingleChat &&
          <View style={chatStyle.headerTextStyleContainer}>
            <Text numberOfLines={1} style={chatStyle.headerTextStyle} children={data.name} />
            <Text numberOfLines={1} style={chatStyle.headerTextStyleSmall} children={data.username} />
          </View>
        }
        {!isThisSingleChat &&
          <View style={chatStyle.headerTextStyleContainer}>
            <Text numberOfLines={1} style={chatStyle.headerTextStyle} children={groupName} />
          </View>
        }
        {showInputText &&
          <TouchableOpacity
            onPress={() => {
              isThisSingleChat ?
                this.props.navigation.navigate("ConversationInfoClass", { userId: userId, data: data })
                : this.props.navigation.navigate("GroupInfoClass", { userId: userId, data: data })
            }}
            style={chatStyle.settingIconStyle} >
            <IconFeather name={"info"} size={Dimens.largeIconSize} color={"white"} />
          </TouchableOpacity>}
      </View>


      <GiftedChat
        messages={messages}
        onSend={(message) => this.sendMessage(message)}
        user={{
          _id: userId,
          name: "",
          avatar: profilePic,
        }}
        inverted
        isAnimated
        scrollToBottom={true}
        showInputTextField={showInputText}
        renderLoading={() => <ActivityIndicator style={{ marginTop: Dimens.ten }} size="large" color={Colors.appRed} />}
        textInputStyle={{ color: Colors.appGreen }} />

    </View>
    );
  }

}