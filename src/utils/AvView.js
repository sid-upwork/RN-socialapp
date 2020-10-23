import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video'
import Ionicons from 'react-native-vector-icons/FontAwesome'
import Octicons from 'react-native-vector-icons/Octicons';

import { Dimens } from './Dimens';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import colors from './Colors';
import { VOTE_FOR_POLL } from './URLs';


export default class AvView extends PureComponent {

  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    controls: true,
    paused: false,
    skin: 'custom',
    ignoreSilentSwitch: null,
    isBuffering: false,
    imageHeight: 0,
  }

  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);

    this.state = {
      showLoader: true
    }
  }

  onLoad(data) {
    this.setState({ duration: data.duration });
  }

  onProgress(data) {
    this.setState({ currentTime: data.currentTime });
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  renderVideoView(source) {
    return (source.length > 0 &&
      <TouchableOpacity
        onPress={() => { this.setState({ paused: !this.state.paused }) }}
        activeOpacity={0.8}
        style={{ width: this.props.AVDimen.width, height: this.props.AVDimen.height, borderRadius: Dimens.ten, }}>

        <Video
          source={{ uri: source[0].file, cache: { size: 50, expiresIn: 300 } }}
          style={{ width: this.props.AVDimen.width, height: this.props.AVDimen.height, borderRadius: Dimens.ten, }}
          rate={this.state.rate}
          paused={this.state.paused}
          volume={this.state.volume}
          muted={this.state.muted}
          ignoreSilentSwitch={this.state.ignoreSilentSwitch}
          resizeMode={'cover'}
          onLoad={this.onLoad}
          onBuffer={this.onBuffer}
          onProgress={this.onProgress}
          // onError={console.log("error")}
          onEnd={() => null}
          repeat={true} />

        <View style={{
          position: 'absolute',
          right: Dimens.ten,
          top: Dimens.ten,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          height: Dimens.fourty,
          width: Dimens.fourty,
          borderRadius: Dimens.twenty,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Ionicons name="video-camera" size={Dimens.tinyIconSize} color="white" style={{ backgroundColor: 'transparent', lineHeight: Dimens.fourty }} />
        </View>
      </TouchableOpacity>
    );
  }

  renderImageView(source) {
    if (source == undefined || source.length <= 0) {
      return <View style={{ width: this.props.AVDimen.width, height: this.props.AVDimen.height, borderRadius: Dimens.ten, padding: Dimens.zero, overflow: 'hidden' }} />
    }
    if (source.length > 1) {
      return this.renderMultipleImages(source)
    }
    return (
      <View style={{ width: this.props.AVDimen.width, height: this.props.AVDimen.height, borderRadius: Dimens.ten, padding: Dimens.zero, overflow: 'hidden' }}>
        <FastImage
          style={{ alignItems: 'center', justifyContent: 'center', width: this.props.AVDimen.width, height: this.props.AVDimen.height, backgroundColor: colors.white }}
          source={{
            uri: source[0].filetumb,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.stretch}
          onLoadStart={() => this.setState({ showLoader: true })}
          onLoadEnd={() => this.setState({ showLoader: false })}        >
          <ActivityIndicator size='large' animating={this.state.showLoader} />
        </FastImage>
      </View >);
  }

  rendertwoImages(source) {
    return <View style={{ width: this.props.AVDimen.width, height: this.props.AVDimen.height, borderRadius: Dimens.ten, flexDirection: 'row', padding: Dimens.zero, overflow: 'hidden' }}>

      <FastImage
        style={{ width: this.props.AVDimen.width / 2, height: this.props.AVDimen.height, backgroundColor: colors.white }}
        source={{
          uri: source[0].filetumb,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <FastImage
        style={{ width: this.props.AVDimen.width / 2, height: this.props.AVDimen.height, marginLeft: Dimens.one, backgroundColor: colors.white }}
        source={{
          uri: source[1].filetumb,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />

    </View>
  }

  renderThreeImages(source) {
    return (<View style={{ width: this.props.AVDimen.width, height: this.props.AVDimen.height, borderRadius: Dimens.ten, flexDirection: 'column', padding: Dimens.zero, overflow: 'hidden' }}>
      <View style={{ width: this.props.AVDimen.width, height: this.props.AVDimen.height / 2, flexDirection: 'row', overflow: 'hidden' }}>
        <FastImage
          style={{ width: this.props.AVDimen.width / 2, height: this.props.AVDimen.height / 2, backgroundColor: colors.white }}
          source={{
            uri: source[0].filetumb,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <FastImage
          style={{ width: this.props.AVDimen.width / 2, height: this.props.AVDimen.height / 2, marginLeft: Dimens.one, backgroundColor: colors.white }}
          source={{
            uri: source[1].filetumb,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>

      <View style={{ width: this.props.AVDimen.width, height: this.props.AVDimen.height / 2, flexDirection: 'row', overflow: 'hidden', marginTop: Dimens.one }} >
        {source.length > 2 &&
          <FastImage
            style={{ width: this.props.AVDimen.width, height: this.props.AVDimen.height / 2, backgroundColor: colors.white }}
            source={{
              uri: source[2].filetumb,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />}

      </View >
    </View >
    );
  }

  renderMultipleImages(source) {

    if (source.length == 2) {
      return this.rendertwoImages(source)
    }
    else if (source.length == 3) {
      return this.renderThreeImages(source)
    }
    else {
      return (<View style={{ width: this.props.AVDimen.width, height: this.props.AVDimen.height, borderRadius: Dimens.ten, flexDirection: 'column', padding: Dimens.zero, overflow: 'hidden' }}>
        <View style={{ width: this.props.AVDimen.width, height: this.props.AVDimen.height / 2, flexDirection: 'row', overflow: 'hidden' }}>
          <FastImage
            style={{ width: this.props.AVDimen.width / 2, height: this.props.AVDimen.height / 2, backgroundColor: colors.white }}
            source={{
              uri: source[0].filetumb,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <FastImage
            style={{ width: this.props.AVDimen.width / 2, height: this.props.AVDimen.height / 2, marginLeft: Dimens.one, backgroundColor: colors.white }}
            source={{
              uri: source[1].filetumb,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <View style={{ width: this.props.AVDimen.width, height: this.props.AVDimen.height / 2, flexDirection: 'row', overflow: 'hidden', marginTop: Dimens.one }} >
          {source.length > 2 &&
            <FastImage
              style={{ width: this.props.AVDimen.width / 2, height: this.props.AVDimen.height / 2, backgroundColor: colors.white }}
              source={{
                uri: source[2].filetumb,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />}

          {source.length > 3 &&
            < FastImage
              style={{ width: this.props.AVDimen.width / 2, height: this.props.AVDimen.height / 2, marginLeft: Dimens.one, backgroundColor: colors.white }}
              source={{
                uri: source[3].filetumb,
                priority: FastImage.priority.normal,
              }}
              resizeMode="cover"
            />
          }
        </View >
      </View >
      );
    }
  }

  beforeVotingPollView(source, poll_expiry, expiry_days_left) {
    if (source == null || source == undefined) {
      return;
    }

    var pollView = [];

    for (let i = 0; i < source.length; i++) {
      if (source[i].choice_option != "") {
        pollView.push(
          <View key={i} style={avStyle.pollView}>
            <TouchableOpacity style={avStyle.touchableContainer}
              onPress={() => this.postPollUpdateAnswer(i)}>
              <Text style={{ color: colors.white, fontSize: Dimens.largeTextSize }} children={source[i].choice_option} />
            </TouchableOpacity>

            <Text style={avStyle.percentageContainer} children={source[i].count} />
          </View >
        )
      }
    }

    return <View style={avStyle.pollContainer}>
      {pollView}
      <View style={avStyle.divider} />
      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', padding: Dimens.five }} >
        <Text style={avStyle.pollTextSubContainer}>Poll length</Text>
        <Text style={avStyle.pollTextSubContainer} children={
          poll_expiry == "0" ? "Poll ended" :
            expiry_days_left == "1" ? expiry_days_left + " day" :
              expiry_days_left == "0" ? "Last day" : expiry_days_left + " days"} />
      </View>

    </View >;

  }

  postPollUpdateAnswer(i) {
    const { post_id, user_id, source, dispatch } = this.props;

    var jsonObject = JSON.stringify({
      user_id: user_id,
      post_id: post_id,
      poll_id: source[i].poll_id
    })

    if (dispatch.triggerEvents != null || dispatch.triggerEvents != undefined) {
      dispatch.triggerEvents.postVotePoll(VOTE_FOR_POLL, jsonObject);
      return;
    }
    dispatch.postVotePoll(VOTE_FOR_POLL, jsonObject);
  }

  afterVotingPollView(source, poll_expiry, expiry_days_left) {
    var pollView = [];

    for (let i = 0; i < source.length; i++) {
      if (source[i].choice_option != "") {
        pollView.push(
          <View key={i} style={{ flexDirection: "column", overflow: 'hidden' }}>

            <View style={[avStyle.afterNonVotePollContainer, source[i].vote_status == "1" ? avStyle.afterVotePollContainer : null]}>

              <View style={[avStyle.afterNonVotePollTextContainer, source[i].vote_status == "1" ? avStyle.afterVotePollTextContainer : null]}>
                <Text style={[{ color: colors.appGreen, fontSize: Dimens.largeTextSize, flex: .9 }, source[i].vote_status == "1" ? { color: colors.white } : null]} children={source[i].choice_option} />
                {source[i].vote_status == "1"
                  &&
                  <Octicons style={{ marginLeft: Dimens.five }} name={'verified'} size={20} color={colors.white} />}
              </View>

              <Text style={[avStyle.afterNonVotePercentageContainer, source[i].vote_status == "1" || expiry_days_left == "0" ? avStyle.afterVotePercentageContainer : null]} children={source[i].count} />
            </View>
            <View style={avStyle.divider} />
          </View >

        )
      }
    }

    return <View style={avStyle.pollContainer}>
      {pollView}
      <View style={avStyle.divider} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: Dimens.five }} >
        <Text style={avStyle.pollTextSubContainer}>Poll length</Text>
        <Text style={avStyle.pollTextSubContainer} children={
          poll_expiry == "0" ? "Poll ended" :
            expiry_days_left == "1" ? expiry_days_left + " day" :
              expiry_days_left == "0" ? "Last day" : expiry_days_left + " days"} />
      </View>

    </View >;
  }

  renderMomentView(source) {
    if (source == undefined || source == "" || source == null) {
      return (<View style={{ flex: 1, overflow: 'hidden', padding: Dimens.ten, flexDirection: "column", flex: 1, marginTop: Dimens.five, borderColor: colors.appGreen, borderWidth: Dimens.two, borderRadius: Dimens.fifteen, overflow: 'hidden' }}            >
        <Text style={avStyle.styleTweetUserName} children={"This Instant has been deleted"} />
      </View>)
    } else {
      return (<View style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: Dimens.twenty,
        borderColor: colors.appGreen,
        borderWidth: Dimens.two,
        marginTop: Dimens.seven,
        overflow: 'hidden'
      }}>
        <FastImage
          style={{ width: this.props.AVDimen.width / 2.5, height: this.props.AVDimen.height, backgroundColor: colors.white }}
          source={{
            uri: source.file,
            priority: FastImage.priority.high
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "white",
          marginTop: Dimens.seven,
          marginHorizontal: Dimens.ten,
          justifyContent: 'space-between',
          overflow: 'hidden'
        }}>
          <View style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "white",
          }}>

            <View style={{ flexDirection: 'row' }}>
              <FastImage
                style={{
                  marginTop: Dimens.four,
                  width: Dimens.twentyFive,
                  height: Dimens.twentyFive,
                  borderRadius: Dimens.tweleve
                }}
                source={{
                  uri: source.profile_image,
                  priority: FastImage.priority.high
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={{ flexDirection: 'column', marginLeft: Dimens.ten, flex: 1 }}>

                <Text style={{ fontSize: Dimens.smallTextSize }} numberOfLines={1} children={source.name} />
                <Text style={{ fontSize: Dimens.extraSmallTextSize }} numberOfLines={1} children={source.at_username} />
              </View>
            </View>

            <Text numberOfLines={3}
              style={{
                alignSelf: 'flex-start',
                color: colors.appGreen,
                marginTop: Dimens.four,
                fontSize: Dimens.smallTextSize
              }} children={source.title} />

            <Text numberOfLines={3} style={{
              alignSelf: 'flex-start',
              color: colors.appGreen,
              marginVertical: Dimens.five
            }} children={source.description} />
          </View>

          <Text style={{
            alignSelf: 'flex-start',
            color: colors.appGreen,
            marginVertical: Dimens.five
          }} children={'Instants'} />
        </View>
      </View>

      );
    }
  }

  render() {
    const { type, source, pollVoteStatus, poll_expiry, expiry_days_left } = this.props;
    if (type == 'image') { return this.renderImageView(source) }
    else if (type == 'video') { return this.renderVideoView(source) }
    else if (type == 'moment') { return this.renderMomentView(source) }
    else if (type == 'poll') { return (pollVoteStatus == "1" || poll_expiry == "0") ? this.afterVotingPollView(source, poll_expiry, expiry_days_left) : this.beforeVotingPollView(source, poll_expiry, expiry_days_left) }
    else { return <View /> }
  }

}

const avStyle = StyleSheet.create({
  pollContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: Dimens.twenty,
    borderColor: colors.appGreen,
    borderWidth: Dimens.two,
    marginTop: Dimens.seven,
    overflow: 'hidden'
  },
  pollView: {
    flexDirection: "row",
    alignItems: "center",
  },
  touchableContainer: {
    flex: .85,
    borderRadius: Dimens.fifteen,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    backgroundColor: colors.appGreen,
    borderColor: colors.appGreen,
    marginVertical: Dimens.seven,
    marginHorizontal: Dimens.seven,
    padding: Dimens.ten,
    borderWidth: Dimens.two
  },
  percentageContainer: {
    flex: .15,
    marginRight: wp(2),
    justifyContent: "center",
    alignItems: 'flex-end',
    textAlign: 'center',
    backgroundColor: colors.white,
    marginVertical: Dimens.seven,
  },
  divider: {
    height: Dimens.dividerHeight,
    backgroundColor: colors.appDividerColor
  },
  pollTextSubContainer: {
    alignSelf: 'flex-start',
    color: colors.appGreen,
    marginHorizontal: Dimens.ten,
    marginVertical: Dimens.two
  },
  bodyContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: Dimens.ten,
    overflow: 'hidden'
  },
  Row2Container: {
    flex: 1,
    backgroundColor: colors.appGreen,
    flexDirection: "column",
    marginHorizontal: Dimens.ten,
  },
  imageViewContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.black
  },
  styleNameTimeContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  styleTweetUserName: {
    color: colors.textDarkColor,
    flex: 0.8,
    fontSize: Dimens.extraLargerTextSize,
    alignSelf: 'flex-start',
  },
  styleTweetTime: {
    flex: 0.2,
    color: colors.textDarkColor,
    textAlignVertical: "center",
    alignSelf: 'flex-start',
    fontSize: Dimens.smallTextSize
  },
  styleTweetReplying: {
    fontSize: Dimens.mediumTextSize,
    color: colors.textLightColor
  },
  styleTweetDescription: {
    textAlignVertical: "top",
    fontSize: Dimens.mediumTextSize,
    marginVertical: Dimens.seven,
    color: colors.textLightColor
  },

  afterNonVotePollContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white
  },
  afterVotePollContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.appGreen
  },
  afterNonVotePollTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    marginVertical: Dimens.seven,
    marginHorizontal: Dimens.seven,
    padding: Dimens.ten,
  },
  afterVotePollTextContainer: {
    flex: .9,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    marginVertical: Dimens.seven,
    marginHorizontal: Dimens.seven,
    padding: Dimens.ten,
  },
  afterVotePercentageContainer: {
    flex: .1,
    marginRight: wp(1),
    justifyContent: "center",
    color: colors.white,
    marginVertical: Dimens.seven,
  },
  afterNonVotePercentageContainer: {
    flex: .1,
    marginRight: wp(1),
    color: colors.appGreen,
    marginVertical: Dimens.seven,
  },
})