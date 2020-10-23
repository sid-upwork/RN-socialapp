import React from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput
} from "react-native";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import { database } from "../../../services/firebase";

import { ListItem } from "react-native-elements";
import Header from '../../Common/BackHeader/BackHeader';
import { Dimens } from '../../../utils/Dimens';
import s from "./MessageSettingStyle";
import colors from "../../../utils/Colors";

export default class NewMessage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const userIdd = navigation.getParam("userId");

    this.state = {
      user: null,
      loading: true,
      userList: "",
      userId: userIdd,
      arrayholder: ""
    };
  }

  createGroupChat() {
    this.props.navigation.navigate("GroupChatClass", {
      'userId': this.state.userId,
    })
  }

  componentDidMount() {
    const { userId } = this.state

    database.ref("/Users").once('value', snapshot => {
      var userList = [];
      snapshot.forEach((child) => {
        if (child.val().id != userId) {
          userList.push({
            name: child.val().name || "",
            email: child.val().email || "",
            profile_image: child.val().profile_image || "",
            username: child.val().username || "",
            userId: child.val().id || ""
          })
        }
      });

      this.setState({ userList: userList, arrayholder: userList, loading: false })
    },
      errorObject => {
        console.log(errorObject)
      })
  }

  addNewFriend(userDetail) {
    const { userId } = this.state
    this.props.navigation.navigate("ChatScreen",
      {
        'userId': userId,
        "data": userDetail,
        "singleChat": true
      })
  }

  renderSeparator = () => {
    return <View style={s.divider} />;
  };

  searchFilterFunction = text => {
    if (this.state.arrayholder <= 0) {
      return
    }
    const newData = this.state.arrayholder.filter(item => {
      const itemData = `${item.name} ${item.username.toUpperCase()} `;
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      userList: newData
    });
  };

  returnAppHeader() {
    return <Header title="New message"
      backValue={true}
      showDoneButton={true}
      rightText={"Create group"}
      onPress={() => this.createGroupChat()}
      goBackProp={this.props.navigation} />;
  }

  renderHeader = () => {
    return (
      <View style={{
        width: '100%',
        flexDirection: "row",
        backgroundColor: colors.silver,
        padding: Dimens.ten
      }}>
        <View style={{
          width: '100%',
          flexDirection: "row",
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.white,
          borderRadius: Dimens.fifty
        }} >

          <EvilIcons style={{
            flex: .1,
            marginLeft: Dimens.ten
          }}
            name={"search"}
            color={colors.appRed}
            size={Dimens.thirty} />

          <TextInput
            style={{
              flex: .9,
              color: colors.darkRed,
              paddingVertical: Dimens.five,
            }}
            autoCapitalize="none"
            onChangeText={(text) => this.searchFilterFunction(text)}
            autoCorrect={false}
            keyboardType='default'
            returnKeyType="next"
            ref={input => { this.textInput = input }}
            placeholder='Search here ...'
            placeholderTextColor='#cccccc'
            underlineColorAndroid="transparent" />

        </View>
      </View>);
  };


  listEmpty() {
    return <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.white, margin: Dimens.ten }}
    >
      <Text
        style={{
          color: colors.appRed,
          fontSize: Dimens.headingTextSize
        }}
        children={"No Users Found!"}
      />
    </View>
  }

  render() {
    const { userList, loading } = this.state

    if (loading) {
      return (
        <View style={s.container}>
          {this.returnAppHeader()}
          {this.renderHeader()}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", flexDirection: 'row' }}>
            <ActivityIndicator style={{ alignSelf: "center", color: colors.drawerBack, paddingEnd: Dimens.ten }} size='large' />
            <Text children='Please Wait ...' />
          </View>
        </View>
      );
    } else {

      return (
        <View style={s.container}>
          {this.returnAppHeader()}
          <FlatList
            style={{ flex: 1 }}
            data={userList}
            ListEmptyComponent={this.listEmpty}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                onPress={() => this.addNewFriend(item)}
                key={item.userId}
                title={`${item.name}`}
                subtitle={item.username}
                titleStyle={{ color: colors.appGreen, fontWeight: '500', fontSize: Dimens.extraLargerTextSize }}
                avatar={{ uri: item.profile_image }}
                containerStyle={{ borderBottomWidth: 0 }}
                subtitleStyle={{ color: colors.textLightColor, fontWeight: '400', fontSize: Dimens.mediumTextSize }}
              />
            )}
            keyExtractor={item => item.userId}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            stickyHeaderIndices={[0]}
          />

        </View>
      );
    }
  }
}

