import React, { PureComponent } from "react";
import {
  Text,
  View,
  FlatList
} from "react-native";
import FastImage from "react-native-fast-image";

import { renderErrorNoDataFound } from "../../../../utils/Utilities";
import { connect } from "react-redux";
import s from "./ListSubscribeStyle";

class ListSubscribeClass extends PureComponent {
  state = {
    userId: ""
  }

  renderListView(listData) {
    return (
      <View style={{ flex: 1 }}>
        <View style={s.mainContainer}>
          <FlatList
            data={listData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.user_id}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "column", flex: 1 }}>
                <View style={s.bodyContainer}>
                  <View style={s.upperContainer}>
                    <Text style={s.nameStyle} children={item.name} />
                    <Text style={s.titleStyle} children={item.at_username} />
                    <Text style={s.descriptionStyle} children={item.user_bio} />

                    <View style={{ flex: 1, flexDirection: "row" }}>
                      {/* <Text style={s.memberStyle} children={item.totalMembers + " member"} /> */}
                      {item.isPrivate == "0" && <Text style={s.privateStyle} children={"Private"} />}
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
            )}
          />
        </View>
      </View>
    );
  }

  render() {
    const { listDetailData } = this.props.MyListReducer;
    return (
      <View style={{ flex: 1 }}>
        {listDetailData.allsubscriber != null &&
          listDetailData.allsubscriber != undefined &&
          listDetailData.allsubscriber.length > 0
          ? this.renderListView(listDetailData.allsubscriber)
          : renderErrorNoDataFound("No Subscribers in List yet!!")}
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    MyListReducer: state.MyListReducer
  };
}


export default connect(mapStateToProps)(ListSubscribeClass);
