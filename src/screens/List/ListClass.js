import React from "react";
import {
  View,
  TouchableOpacity,
  StatusBar,
  NetInfo
} from "react-native";
import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";
import Header from "../Common/BackHeader/BackHeader";
import {
  showProgressDialog,
  renderErrorNoDataFound
} from "../../utils/Utilities";

import { getList } from "../../redux/action/MyListAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IconFeather from "react-native-vector-icons/Feather";
import { Dimens } from "../../utils/Dimens";
import colors from "../../utils/Colors";
import s from "./ListStyle";
import MemberOfListClass from './MemberOfList/MemberOfListClass';
import SubscribedClass from "./SubscribedToList/SubscribedToListClass";

class ListClass extends React.PureComponent {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    let userID = navigation.getParam("userID", "");
    let passedUserId = navigation.getParam("passedUserId", "");
    if (passedUserId == undefined || passedUserId == null)
      passedUserId = ""

    this.state = {
      userId: userID,
      statedata: passedUserId,
      internetConnected: false,
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    NetInfo.isConnected.fetch().done((isConnected) => {
      if (!isConnected) {
        Alert.alert("No internet connection..!")
        return;
      }
      this.setState({ internetConnected: isConnected },
        () => {
          if (this.state.statedata == "") {
            this.props.getList(JSON.stringify({ user_id: this.state.userId }))
            return
          }
          this.props.getList(JSON.stringify({ user_id: this.state.statedata }))
        })
    })
  }

  handleConnectivityChange = (connected) => {
    this.setState({ internetConnected: connected });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  createNewList() {
    this.props.navigation.navigate("CreateListClass", { "action_status": "1", "user_id": this.state.userId });
  }

  render() {
    const { statedata } = this.state;
    const { isFetching, error } = this.props.MyListReducer;
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="List"
          backValue={false}
          showDoneButton={false}
          goBackProp={this.props.navigation}
        />
        <StatusBar backgroundColor={colors.drawerBack} barStyle="light-content" />
        {/* {showProgressDialog(isFetching)} */}
        {!error ?
          <MyListTab screenProps={this.props} />
          : renderErrorNoDataFound("No List Found!")
        }

        {statedata == "" &&
          <TouchableOpacity style={s.floatingButton} onPress={this.createNewList.bind(this)}>
            <IconFeather name={"plus"} color={colors.white} size={Dimens.largeIconSize} />
          </TouchableOpacity>
        }
      </View>
    );
  }


}

const MyListTab = createAppContainer(createMaterialTopTabNavigator(
  {
    "Member of": { screen: MemberOfListClass },
    "Subscribed to": { screen: SubscribedClass }
  },
  {
    initialRouteName: "Subscribed to",
    tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: true,
    order: ["Subscribed to", "Member of"],
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ getList }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListClass);