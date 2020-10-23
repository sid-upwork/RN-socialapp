import React, { PureComponent } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";

import { renderErrorNoDataFound } from "../../../utils/Utilities";
import s from "./SubscribedToListStyle";

class SubscribedToListClass extends PureComponent {
  constructor(props) {
    super(props);
  }

  openListDetail(item) {
    this.props.screenProps.navigation.navigate("ListDetailClass", { list_data: item })
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
                onPress={this.openListDetail.bind(this, item)}>

                <View style={s.bodyContainer}>
                  <View style={s.upperContainer}>
                    <Text style={s.nameStyle}>{item.name}</Text>
                    <Text style={s.titleStyle}>{item.title}</Text>
                    <Text style={s.descriptionStyle}>{item.description}</Text>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Text style={s.memberStyle} children={item.totalMembers + " member"} />
                      {item.isPrivate == "1" && <Text style={s.privateStyle} children={"Private"} />}
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
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }

  render() {
    const { listData } = this.props.MyListReducer;

    return <View style={{ flex: 1 }}>
      {
        listData.subscribeTo == null ||
          listData.subscribeTo == undefined ||
          listData.subscribeTo == "" ||
          listData.subscribeTo.length <= 0 ?
          renderErrorNoDataFound("No Subscribed list!") :
          this.renderListView(listData.subscribeTo)
      }
    </View>
  }
}

function mapStateToProps(state) {
  return {
    MyListReducer: state.MyListReducer
  };
}

export default connect(mapStateToProps)(SubscribedToListClass);
