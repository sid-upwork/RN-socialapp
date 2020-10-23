import React, { Component } from "react";
import { View, FlatList, AsyncStorage, KeyboardAvoidingView, Platform, Text, TextInput } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import { searchMember, addDeleteMember } from "../../../../redux/action/MyListAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Header from "../../../Common/BackHeader/BackHeader";
import { Dimens } from "../../../../utils/Dimens";
import colors from "../../../../utils/Colors";
import s from "./AddDeleteMembersStyle";

class AddDeleteMemberClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      isSearching: false,
      searchText: "",
      listItem: this.props.navigation.getParam("listItem")
    };
  }

  componentDidMount() {
    this.getUserId();
  }

  async getUserId() {
    try {
      await AsyncStorage.getItem("loginResponse").then(
        response => {
          this.setState({ userId: JSON.parse(response).loginResposneObj.id })
        },
        error => { console.log(error); }
      );
    } catch (e) { console.log(e); }
  }

  addMember(item, action, index) {
    const { listItem } = this.state

    this.props.addDeleteMember(
      JSON.stringify({
        user_id: this.state.userId,
        member_id: item.user_id,
        list_id: listItem.list_id,
        action: action
      }), action, index, item)
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

  renderListEmpty = () => {
    return <View style={{ flex: 1, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: Dimens.extraLargerTextSize, color: colors.appRed }} children={"No members added yet!"} />
    </View>
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const { isAdded } = nextProps.MyListReducer;
    if (isAdded) {
      this.setState({ isSearching: false, searchText: "" });
    }
  }

  render() {
    const { listDetailData, searchData, isFetching, error, isAdded } = this.props.MyListReducer;
    let showResult = (!this.state.isSearching ? listDetailData.allmembers.length <= 0 : searchData.length <= 0)
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="Members"
          backValue={true}
          showDoneButton={false}
          goBackProp={this.props.navigation}
        />
        <KeyboardAvoidingView behavior={"padding"} enabled style={{ flex: 1 }}>
          {this.renderHeader()}
          {showResult
            ?
            this.renderListEmpty()
            :
            <FlatList
              style={{ flex: 1 }}
              data={!this.state.isSearching ? listDetailData.allmembers : searchData}
              keyExtractor={item => item.name}
              ListEmptyComponent={this.renderListEmpty}
              ItemSeparatorComponent={this.renderSeparator}
              stickyHeaderIndices={[0]}
              renderItem={({ item, index }) => (
                <ListItem
                  roundAvatar
                  rightIcon={{ name: this.state.isSearching ? "add-circle-outline" : "close" }}
                  onPress={() => this.state.isSearching ? this.addMember(item, "add", index) : this.addMember(item, "delete", index)}
                  title={item.name}
                  subtitle={item.username}
                  containerStyle={{ borderBottomWidth: 0 }}
                  avatar={{ uri: item.image }}
                />
              )}
            />}
        </KeyboardAvoidingView>
      </View>
    );
  }

  renderSeparator = () => {
    return <View style={s.divider} />;
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }


  searchFilterFunction = text => {

    clearTimeout(this.timeout); // clears the old timer
    this.timeout = setTimeout(() => {
      if (text != "") {
        this.setState({ searchText: text, isSearching: true }, () => {
          this.props.searchMember(
            JSON.stringify({ user_id: this.state.userId, keyword: text })
          )
        })
      } else {
        this.setState({ isSearching: false });
      }
    }, 0);
  };
}

function mapStateToProps(state) {
  return {
    MyListReducer: state.MyListReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ searchMember, addDeleteMember }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeleteMemberClass);
