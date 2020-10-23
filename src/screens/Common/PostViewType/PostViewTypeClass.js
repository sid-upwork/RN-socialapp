import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import LineIcon from "react-native-vector-icons/SimpleLineIcons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import FastImage from "react-native-fast-image";
import StyleTab from "../../Home/HomeTabStyle";
import colors from "../../../utils/Colors";
import images from "../../../utils/ImagesUtil";
import { Dimens } from "../../../utils/Dimens";
import AvView from "../../../utils/AvView";
import { showRetweet } from "../../../utils/Utilities";

export default class PostViewTypeClass extends React.Component {
  constructor(props) {
    super(props);
    const { homeResponse } = this.props;
    this.state = {
      stateHomeResponse: homeResponse,
      showRetweetDialog: false
    };
  }

  GetItem(name) {
    this.props.navigations.navigate(name, {
      postType: this.state.stateHomeResponse.type,
      jsonArray: this.props.jsonArray
    });
  }

  static closeRetweetDialog() {
    this.setState({ showRetweetDialog: false });
  }

  getPostTypeData(type, source) {
    if (type === "image") {
      return source.postImgData;
    }
    if (type === "video") {
      return source.postImgData;
    }
    if (type === "text") {
      return source.post_title;
    }
    if (type === "poll") {
      return source.pollData;
    }
  }

  render() {
    const { stateHomeResponse, showRetweetDialog } = this.state;
    return (
      <TouchableOpacity
        style={StyleTab.bodyContainer}
        activeOpacity={50}
        onPress={() => this.GetItem.bind(this, this.props.navigationScreenName)}
      >
        {showRetweet(showRetweetDialog)}
        <FastImage
          style={StyleTab.imageViewContainer}
          source={{
            uri: stateHomeResponse.profile_image,
            priority: FastImage.priority.high
          }}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View style={StyleTab.Row2Container}>
          <View style={StyleTab.styleNameTimeContainer}>
            <Text style={StyleTab.styleTweetUserName}>{stateHomeResponse.name === "" ? "cat" : stateHomeResponse.name}</Text>
            <Text style={StyleTab.styleTweetTime}>{stateHomeResponse.created}</Text>
          </View>

          <Text style={StyleTab.styleTweetDescription}>{stateHomeResponse.post_title === "" ? "cat" : stateHomeResponse.post_title}</Text>

          <AvView
            AVDimen={{ width: wp(75), height: wp(60) }}
            type={stateHomeResponse.posttype}
            source={this.getPostTypeData(
              stateHomeResponse.posttype,
              stateHomeResponse
            )}
          />

          <View style={StyleTab.styleCommentReSparkLikeContainer}>
            <LineIcon name={"bubble"} size={Dimens.extraSmallIconSize} color={stateHomeResponse.totalComment === "0" ? colors.textLightColor : colors.appRed} />
            <Text style={StyleTab.styleCommentReSparkLikeText}>{stateHomeResponse.totalComment}</Text>

            <TouchableOpacity style={StyleTab.rwTweetClick} onPress={() => this.setState({ showRetweetDialog: true })}            >
              <LineIcon name={"refresh"} size={Dimens.extraSmallIconSize} color={stateHomeResponse.totalRetweet === "0" ? colors.textLightColor : colors.appRed} />
              <Text style={StyleTab.styleCommentReSparkLikeText}>{stateHomeResponse.totalRetweet}</Text>
            </TouchableOpacity>

            <LineIcon name={"heart"} size={Dimens.extraSmallIconSize} color={stateHomeResponse.totallike === "0" ? colors.textLightColor : colors.appRed} />
            <Text style={StyleTab.styleCommentReSparkLikeText}>{stateHomeResponse.totallike}</Text>

            <LineIcon name={"share"} size={Dimens.extraSmallIconSize} color={colors.textLightColor} />

          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
