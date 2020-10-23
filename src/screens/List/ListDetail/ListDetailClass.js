import React from "react";
import { View, AsyncStorage, NetInfo, Alert } from "react-native";
import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";
import Header from "../../Common/BackHeader/BackHeader";
import { showProgressDialog, renderErrorNoDataFound } from "../../../utils/Utilities";

import { getListDetail, subscribelist } from "../../../redux/action/MyListAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import colors from "../../../utils/Colors";

import s from "./ListDetailStyle";

import ListMembersClass from "../ListDetail/Members/ListMembersClass";
import ListSubscribeClass from "../ListDetail/Subscribes/ListSubscribeClass";
import ListTweetClass from "../ListDetail/Tweets/ListTweetClass";

class ListDetailClass extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      subscribed: "",
      internetConnected: "",
      listData: this.props.navigation.getParam("list_data"),
    }
    this.getUserId();
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    NetInfo.isConnected.fetch().done((isConnected) => {
      if (!isConnected) {
        Alert.alert("No internet connection..!")
        return;
      }
      this.setState({ internetConnected: isConnected },
        () => this.props.getListDetail(
          JSON.stringify({
            user_id: this.state.userId,
            list_id: this.state.listData.list_id
          }))
      )
    })
  }

  handleConnectivityChange = (connected) => {
    this.setState({ internetConnected: connected });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  async getUserId() {
    try {
      await AsyncStorage.getItem("loginResponse").then(
        response => {
          this.setState({ userId: JSON.parse(response).loginResposneObj.id })
        },
        error => {
          console.log(error);
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  editListClick() {
    this.props.navigation.navigate("CreateListClass", {
      action_status: "2",
      listItem: this.state.listData,
      "user_id": this.state.userId
    });
  }

  subscribeList() {
    if (!this.state.internetConnected) {
      Alert.alert("No internet connection..!")
      return;
    }
    this.props.subscribelist(JSON.stringify({
      user_id: this.state.userId,
      list_id: this.state.listData.list_id
    }),
      this.state.listData.list_id)
  }

  render() {
    const { isFetching, detailListError } = this.props.MyListReducer;
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={this.state.listData.title}
          backValue={true}
          showDoneButton={true}
          onPress={() => this.state.userId == this.state.listData.user_id ? this.editListClick() : this.subscribeList()}
          goBackProp={this.props.navigation}
          rightText={this.state.userId == this.state.listData.user_id ? "Edit" :
            this.state.listData.subscribeStatus == "0" ? "Subscribe" : "Un-Subscribe"}
        />

        {showProgressDialog(isFetching)}
        {detailListError ? renderErrorNoDataFound("No members added yet!") : <MyListTab />}

      </View>
    );
  }
}

const MyListTab = createAppContainer(createMaterialTopTabNavigator({
  "Sparks": { screen: ListTweetClass },
  "Members": { screen: ListMembersClass },
  "Subscribers": { screen: ListSubscribeClass }
},
  {
    initialRouteName: "Sparks",
    tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: true,
    order: ["Sparks", "Members", "Subscribers"],
    tabBarOptions: {
      activeTintColor: colors.appRed,
      inactiveTintColor: colors.inactiveNotificationTextColor,
      scrollEnabled: false,
      showLabel: true,
      allowFontScaling: true,
      tabStyle: s.tab,
      upperCaseLabel: false,
      indicatorStyle: s.indicator,
      labelStyle: s.label,
      iconStyle: s.icon,
      style: s.tabBar
    }
  }
));

function mapStateToProps(state) {
  return {
    MyListReducer: state.MyListReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ getListDetail, subscribelist }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDetailClass);
