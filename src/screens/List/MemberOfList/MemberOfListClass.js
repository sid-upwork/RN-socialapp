import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { renderErrorNoDataFound } from "../../../utils/Utilities"
import { getList } from "../../../redux/action/MyListAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
var s = require("./MemberOfListStyle");

class MemberOfListClass extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: "" };
  }

  openListDetail(item) {
    this.props.screenProps.navigation.navigate("ListDetailClass", { list_data: item });
  }

  renderListView(listData) {

    return (
      <View style={{ flex: 1 }}>
        <View style={s.mainContainer}>
          <FlatList
            data={listData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.list_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ flexDirection: "column", flex: 1 }}
                onPress={() => this.openListDetail(item)} >

                <View style={{ flexDirection: "column", flex: 1 }} >
                  <View style={s.bodyContainer}>
                    <View style={s.upperContainer}>
                      <Text style={s.nameStyle} children={item.name} />
                      <Text style={s.titleStyle} children={item.title} />
                      <Text style={s.descriptionStyle} children={item.description} />

                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={s.memberStyle}>
                          {item.totalMembers} member
                        </Text>

                        {item.isPrivate == "1" && (
                          <Text style={s.privateStyle} children={"Private"} />
                        )}
                      </View>
                    </View>

                    <FastImage
                      style={s.imageStyle}
                      source={{
                        uri: item.profile_image,
                        priority: FastImage.priority.high
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                  <View style={s.divider} />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }

  render() {
    const { listData, isFetching, error } = this.props.MyListReducer;
    return (
      <View style={{ flex: 1 }}>
        {listData.member_oflists == null ||
          listData.member_oflists == undefined ||
          listData.member_oflists == "" ||
          listData.member_oflists.length <= 0 ?
          renderErrorNoDataFound("You are not a member of any list!") :
          this.renderListView(listData.member_oflists)
        }
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
    ...bindActionCreators({ getList }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberOfListClass);
