import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch
} from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import React, { Component } from "react";
import { NavigationActions, StackActions } from "react-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import IconFeather from "react-native-vector-icons/Feather"
import createListStyle from "../../List/CreateList/CreateListStyle";

import Header from "../../Common/BackHeader/BackHeader";
import { showProgressDialog, renderErrorNoDataFound } from "../../../utils/Utilities";
import colors from "../../../utils/Colors";
import { Dimens } from "../../../utils/Dimens";

import { getList, addEditList, setCreatedFalse, deleteList } from "../../../redux/action/MyListAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


class CreateListClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListName: "",
      ListDescription: "",
      IsPrivate: "1",
      actionStatus: this.props.navigation.getParam("action_status", "1"),
      userId: this.props.navigation.getParam("user_id"),
      itemDetail: this.props.navigation.getParam("listItem"),
    };
  }

  componentDidMount() {
    const { actionStatus, userId, itemDetail } = this.state;

    if (actionStatus == "2") {
      this.setState({
        ListName: itemDetail.title,
        ListDescription: itemDetail.description,
        IsPrivate: itemDetail.isPrivate
      });
    }
  }

  componentWillUnmount() {
    const { listData } = this.props.MyListReducer;
    console.log(listData);
  }

  createListApi() {
    const { actionStatus, userId, itemDetail } = this.state;

    if (actionStatus == "1") {
      // Add List
      this.props.addEditList(
        JSON.stringify({
          user_id: userId,
          listname: this.state.ListName,
          description: this.state.ListDescription,
          isPrivate: this.state.IsPrivate,
          action_status: actionStatus
        }),
        actionStatus
      );
    } else {
      // Update List
      this.props.addEditList(
        JSON.stringify({
          user_id: userId,
          listname: this.state.ListName,
          description: this.state.ListDescription,
          isPrivate: this.state.IsPrivate,
          action_status: actionStatus,
          list_id: itemDetail.list_id
        }),
        actionStatus
      );
    }
  }

  openAddMember() {
    this.props.navigation.navigate("AddDeleteMemberClass", {
      listItem: this.props.navigation.getParam("listItem")
    });
  }

  deleteList() {
    //Delete List API
    const { userId, itemDetail } = this.state;

    this.props.deleteList(
      JSON.stringify({
        user_id: userId,
        list_id: itemDetail.list_id
      }), itemDetail.list_id
    );
  }

  showEditListView() {
    return (
      <View style={{ width: widthPercentageToDP(90) }}>
        <TouchableOpacity
          style={createListStyle.textContainer}
          onPress={this.openAddMember.bind(this)} >
          <Text style={createListStyle.textStyling} children={"Manage members"} />

          <IconFeather
            name={"chevron-right"}
            size={Dimens.mediumIconSize}
            color={colors.textLightColor} />
        </TouchableOpacity>

        <Text onPress={this.deleteList.bind(this)} style={createListStyle.deleteStyling} children={"Delete List"} />
      </View>
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const { isCreated, deleteListSuccess, deleteListFailure } = nextProps.MyListReducer;
    if (isCreated) {
      this.props.setCreatedFalse();
      this.props.navigation.goBack();
    }

    if (deleteListSuccess) {

      this.props.navigation.pop(2)
      // const resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate(
      //     {
      //       routeName: "ListClass",
      //       params: {
      //         userID: this.state.userId
      //       }
      //     })]
      // });
      // this.props.navigation.dispatch(resetAction);
    }

  }

  render() {
    const { actionStatus, userId, itemDetail } = this.state;

    const { isFetching } = this.props.MyListReducer;

    return (
      <View style={createListStyle.mainContainer}>
        <Header
          title={actionStatus == "2" ? "Edit List" : " Create List"}
          backValue={false}
          showDoneButton={true}
          onPress={this.createListApi.bind(this)}
          goBackProp={this.props.navigation}
        />
        {showProgressDialog(isFetching)}

        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View style={createListStyle.inputTextContainer}>
            <View style={createListStyle.styleInputViewSpark}>

              <TextInput
                style={createListStyle.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Enter a List Name"
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={ListName => this.setState({ ListName })}
                placeholderTextColor={colors.placeHolderColor}
                returnKeyType="next"
                autoCorrect={false}
                blurOnSubmit={true}
                secureTextEntry={false}
                value={this.state.ListName}
                autoCapitalize="none"
                keyboardAppearance="default"
                onSubmitEditing={() => this.refs.descr.focus()}
              />
            </View>

            <View style={createListStyle.styleInputViewSpark}>
              <TextInput
                style={createListStyle.inputBoxDescription}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Enter a description of the List"
                keyboardType="default"
                autoCapitalize="none"
                numberOfLines={5}
                onChangeText={ListDescription => this.setState({ ListDescription })}
                multiline={true}
                placeholderTextColor={colors.placeHolderColor}
                returnKeyType="go"
                ref={"descr"}
                autoCorrect={false}
                blurOnSubmit={true}
                secureTextEntry={false}
                value={this.state.ListDescription}
                autoCapitalize="none"
                keyboardAppearance="default"
                onSubmitEditing={() => this.createListApi()}
              />
            </View>

            <View style={createListStyle.isPrivateContainer}>
              <Text style={createListStyle.isPrivateText} children={"Private"} />
              <Switch
                style={createListStyle.rightIconStyle}
                onValueChange={changedValue => {
                  !changedValue ? this.setState({ IsPrivate: "0" }) : this.setState({ IsPrivate: "1" })
                }}
                value={this.state.IsPrivate == "1" ? true : false}
              />
            </View>

            {actionStatus == "2" && this.showEditListView()}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    MyListReducer: state.MyListReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      { getList, addEditList, setCreatedFalse, deleteList },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateListClass);
