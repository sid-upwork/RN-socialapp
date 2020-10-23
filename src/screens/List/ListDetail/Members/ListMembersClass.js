import React from "react";
import { Text, View, FlatList } from "react-native";
import FastImage from "react-native-fast-image";
import { renderErrorNoDataFound } from "../../../../utils/Utilities";

import { connect } from "react-redux";

import Moment from "moment";
import s from "./ListMembersStyle";

class ListMembersClass extends React.PureComponent {

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
                    <Text style={s.titleStyle} children={item.username} />
                    <Text style={s.descriptionStyle} children={Moment(item.created).format('DD-MMM-YYYY  hh:mm a')} />

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
        {listDetailData.allmembers != null &&
          listDetailData.allmembers != undefined &&
          listDetailData.allmembers.length > 0
          ? this.renderListView(listDetailData.allmembers)
          : renderErrorNoDataFound("No Members in List yet!!")}
      </View>

    );
  }
}


function mapStateToProps(state) {
  return {
    MyListReducer: state.MyListReducer
  }
}
export default connect(mapStateToProps)(ListMembersClass);
