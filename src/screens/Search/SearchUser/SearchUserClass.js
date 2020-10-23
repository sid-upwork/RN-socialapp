import React, { PureComponent } from "react";
import { View, KeyboardAvoidingView, NetInfo, SectionList, Text, TextInput } from "react-native";
import s from "./SearchUserStyle";
import { ListItem } from "react-native-elements";
import Header from '../../Common/BackHeader/BackHeader';

import EvilIcons from "react-native-vector-icons/EvilIcons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { searchKeyword, setInitialiStage } from "../../../redux/action/SearchActions";
import { showProgressDialog } from "../../../utils/Utilities";
import colors from "../../../utils/Colors";
import { Dimens } from "../../../utils/Dimens";

class SearchUserClass extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      internetConnected: false,
      userId: this.props.navigation.getParam("userId", ""),
    };
    this.props.setInitialiStage();
    this.openSearchDetail = this.openSearchDetail.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    NetInfo.isConnected.fetch().done((isConnected) => {
      this.setState({ internetConnected: isConnected })
    })
  }

  handleConnectivityChange = (connected) => {
    this.setState({ internetConnected: connected });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  openSearchDetail(value) {
    this.props.navigation.navigate("SearchDetailClass", { key: value, userId: this.state.userId })
  }

  renderUserName = (item) => {
    return <ListItem
      onPress={() => this.openSearchDetail(item.username)}
      roundAvatar
      title={`${item.full_name}`}
      subtitle={item.username}
      containerStyle={{ borderBottomWidth: 0 }}
      avatar={{ uri: item.profile_image }}
    />
  }

  renderStrings = (item) => {
    return <ListItem
      onPress={() => this.openSearchDetail(item.string)}
      title={`${item.string}`}
      containerStyle={{ borderBottomWidth: 0 }}
    />
  }

  renderHashTag = (item) => {
    return <ListItem
      onPress={() => this.openSearchDetail(item.hashtag)}
      title={`${item.hashtag} `}
      containerStyle={{ borderBottomWidth: 0 }}
    />
  }

  searchedlist() {
    const { searchDataList } = this.props.SearchReducers;
    var dataArray = "";
    if (searchDataList === undefined || searchDataList === null || searchDataList == "") {
      dataArray = {
        "username": [{
          "username": "Nothing for related search.. try something else..!"
        }
        ],
        "hashtag": [],
        "string": []
      }
    }
    else {
      dataArray = searchDataList
    }
    return (
      <SectionList
        style={{ flex: 1 }}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        ListEmptyComponent={this.emptyComponent}
        keyExtractor={(item, index) => index}
        data={dataArray}
        sections={[{
          key: 'username',
          data: dataArray.username,
          renderItem: ({ item }) => this.renderUserName(item)
        },
        {
          key: 'hashtag',
          data: dataArray.hashtag,
          renderItem: ({ item }) => this.renderHashTag(item)
        },
        {
          key: 'string',
          data: dataArray.string,
          renderItem: ({ item }) => this.renderStrings(item)
        }]}
      />
    );
  }

  renderNoInternetView() {
    return <View style={s.emptyContainer}>
      <Text style={s.emptyText} children={"No Internet Connection!"} />
    </View>
  }

  emptyComponent = () => (
    <View style={s.emptyContainer}>
      <Text style={s.emptyText} children={"Nothing for related search.. try something else..!"} />
    </View>
  )

  render() {
    const { isFetching } = this.props.SearchReducers
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Header title="Search"
          backValue={true}
          showDoneButton={false}
          goBackProp={this.props.navigation} />
        {showProgressDialog(isFetching)}

        {!this.state.internetConnected && this.renderNoInternetView()}
        {this.state.internetConnected && this.searchedlist()}
      </KeyboardAvoidingView>
    );
  }

  renderSeparator = () => {
    return <View style={s.divider} />
  };

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


  searchFilterFunction = text => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(
      () => {

        // try { Keyboard.dismiss(); } catch (e) { console.log(e) }
        this.props.searchKeyword(JSON.stringify({ user_id: this.state.userId, "search": text }))
      }, 100);
  };


  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
}

function mapStateToProps(state) {
  return {
    SearchReducers: state.SearchReducers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ searchKeyword, setInitialiStage }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchUserClass);
