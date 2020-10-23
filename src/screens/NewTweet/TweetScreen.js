import React, { PureComponent } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  AsyncStorage,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  NetInfo
} from "react-native";
import SearchStyle from "./TweetScreenStyle";
import Geocoder from 'react-native-geocoder';
import IconFeather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";

import SelectInput from 'react-native-select-input-ios'
import Swiper from "react-native-swiper";
import FastImage from "react-native-fast-image";
import Video from "react-native-video";

import Images from "../../utils/ImagesUtil";
import colors from "../../utils/Colors";
import { Dimens } from "../../utils/Dimens";
import MediaPicker from "react-native-image-picker";

import { POST, CREATE_A_SPARK } from "../../utils/URLs";
import { uploadData, setInitialStage } from "../../redux/action/OnlySuccessAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { showProgressDialog } from "../../utils/Utilities";
import ImagePicker from "react-native-image-crop-picker";
import Dialog, {
  ScaleAnimation,
  DialogButton,
  DialogTitle
} from "react-native-popup-dialog";

import style from "../../utils/UtilitiesStyle";
let options = [{ value: "Select", label: 'Select' },
{ value: 1, label: '1 day' },
{ value: 2, label: '2 days' },
{ value: 3, label: '3 days' },
{ value: 4, label: '4 days' },
{ value: 5, label: '5 days' },
{ value: 6, label: '6 days' },
{ value: 7, label: '7 days' }]

class TweetScreen extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      spark: "",
      sparkTypePoll: "",
      location: "",
      PollAnswer1: "",
      PollAnswer2: "",
      PollAnswer3: "",
      PollAnswer4: "",
      showView: "",
      thirdPoll: false,
      fourthPoll: false,
      sparkVideo: "",
      videoData: "",
      imageData: [],
      latitude: "",
      longitude: "",
      address: "",
      charLeft: 280,
      durationa: "Select",
      internetConnected: false,

      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: "contain",
      duration: 0.0,
      currentTime: 0.0,
      controls: true,
      paused: false,
      skin: "custom",
      ignoreSilentSwitch: null,
      isBuffering: false,
      imageHeight: 0,

      locationResult: null,
      showPickerDialog: false,
      pickerType: ""
    };

    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
  }

  async getUserId() {
    try {
      await AsyncStorage.getItem("loginResponse").then(
        response => {
          this.setState({
            userId: JSON.parse(response).loginResposneObj.id,
            profilePic: JSON.parse(response).loginResposneObj.profile_image
          });
        },
        error => {
          console.log(error);
        }
      );
    } catch (e) {
      console.log(e);
    }
  }


  handleConnectivityChange = (connected) => {
    this.setState({ internetConnected: connected });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentDidMount() {
    this.getUserId()

    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    NetInfo.isConnected.fetch().done((isConnected) => {
      this.setState({ internetConnected: isConnected })
    })

    navigator.geolocation.getCurrentPosition(
      position => {
        var lat = position.coords.latitude
        var longe = position.coords.longitude
        this.setState({
          latitude: lat,
          longitude: longe
        })

        Geocoder.geocodePosition({ lat: lat, lng: longe }).then(res => {
          res.forEach(element => {
            if (element.locality != null
              && element.locality != undefined
              && element.locality != "") {
              this.setState({
                location: element.locality
              })
            }
          });
        }).catch(err => console.log(err))
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000 }
    )

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

  hidePoll() {
    this.setState({ isPollSelected: false });
  }

  visibleThirdPoll(state) {
    this.setState({ thirdPoll: state });
  }

  visibleFourthPoll() {
    this.setState({ fourthPoll: true });
  }

  selectImageAndVideo(typeIsImage, isFrom) {
    const options = {
      title: "Video Picker",
      takePhotoButtonTitle: "Take Video...",
      mediaType: "video",
      videoQuality: "medium"
    };

    if (typeIsImage) {
      // For Image Selection
      if (isFrom === "gallery") {
        ImagePicker.openPicker({ multiple: true, mediaType: "photo", maxFiles: 4 })
          .then(images => {
            console.log(images);
            this.setState({
              showView: "image",
              sparkTypePoll: "image",
              imageData: images
            });
          });
      } else {
        ImagePicker.openCamera({ cropping: false })
          .then(image => {
            console.log(image);
            this.setState({
              showView: "image",
              sparkTypePoll: "image",
              imageData: [image]
            });
          });
      }
    } else {
      // For Video Selection

      if (isFrom === "gallery") {
        // Open Image Library:
        MediaPicker.launchImageLibrary(options, response => {
          console.log("Response = ", response);
          this.videoResponse(response)
        });
      } else {
        MediaPicker.launchCamera(options, response => {
          console.log("Response = ", response);
          this.videoResponse(response)
        });
      }
    }
  }

  videoResponse(response) {
    if (response.didCancel) {
      console.log("User cancelled video picker");
    } else if (response.error) {
      console.log("ImagePicker Error: ", response.error);
    } else if (response.customButton) {
      console.log("User tapped custom button: ", response.customButton);
    } else {
      this.setState({
        showView: "video",
        sparkTypePoll: "video",
        sparkVideo: response.uri,
        videoData: response
      });
    }
  }

  returnData(detail) {
    var lat = detail.geometry.location.lat
    var longe = detail.geometry.location.lng
    this.setState({
      latitude: lat,
      longitude: longe
    })
    Geocoder.geocodePosition({ 'lat': lat, 'lng': longe }).then(res => {
      res.forEach(element => {
        if (element.locality != null
          && element.locality != undefined
          && element.locality != "") {
          this.setState({
            location: element.locality
          })
        }
      });
    })
      .catch(err => console.log(err))
  }

  selectLocation() {
    this.props.navigation.navigate("SelectLocationScreen",
      { returnData: this.returnData.bind(this) }
    );
  }

  showImageVideoDailog() {
    const { showPickerDialog, pickerType } = this.state;

    return (
      <Dialog
        animationDuration={500}
        height={0.4}
        width={0.6}
        containerStyle={style.dialogRetweetContainer}
        rounded
        visible={showPickerDialog}
        dialogAnimation={
          new ScaleAnimation({
            toValue: 0,
            useNativeDriver: true
          })
        }
        dialogTitle={
          <DialogTitle
            style={{ backgroundColor: colors.appRed }}
            textStyle={style.dialogTitle}
            title={pickerType === "image" ? "Please select image" : "Please select video"}
          />
        }
        actions={[
          <DialogButton
            key={0}
            textStyle={style.dialogButtonStyle}
            text="Cancel"
            onPress={() => this.setState({ showPickerDialog: false })}
          />
        ]}
      >
        {showPickerDialog && (
          <View style={style.dialogRetweetBodyContainer}>
            <TouchableOpacity
              style={{ flex: 1, justifyContent: 'center', }}
              onPress={() => {
                this.setState({ showPickerDialog: false })
                this.selectImageAndVideo(pickerType === "image", "gallery")
              }}>
              <Text style={style.dialogRetweetTextStyle}>
                Select from gallery
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1, justifyContent: 'center', }}
              onPress={() => {
                this.setState({ showPickerDialog: false })
                this.selectImageAndVideo(pickerType === "image", "camera")
              }}>
              <Text style={style.dialogRetweetTextStyle}>
                Capture from camera
              </Text>
            </TouchableOpacity>

            <View style={style.divider} />
          </View>
        )}
      </Dialog>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { uploaded_successfully } = nextProps.OnlySuccessReducer;

    if (uploaded_successfully) {
      this.props.setInitialStage();
      setTimeout(() => this.props.navigation.goBack(null), 0)
    }
  }

  uploadPostData() {
    try { Keyboard.dismiss(); } catch (e) { e => console.log(e) }
    const { userId, spark, sparkTypePoll,
      PollAnswer1, PollAnswer2, PollAnswer3, PollAnswer4,
      imageData, videoData, latitude, longitude, location, durationa
    } = this.state;

    if (!this.state.internetConnected) {
      Alert.alert("No internet connection!")
      return
    }

    if (spark === "") {
      Alert.alert("Empty spark");
      return;
    }
    let formData = new FormData();
    formData.append("user_id", userId);
    formData.append("sparktext", spark);
    formData.append("location", location);
    formData.append("lat", latitude);
    formData.append("long", longitude);
    formData.append("posttype", sparkTypePoll == "" ? "text" : sparkTypePoll);

    if (sparkTypePoll === "poll") {
      if (PollAnswer1 === "") {
        Alert.alert("Please fill Choices 1");
        return;
      }
      if (PollAnswer2 === "") {
        Alert.alert("Please fill Choices 2");
        return;
      }

      if (durationa == "" || durationa == "Select") {
        Alert.alert("Please select duration for poll!");
        return;
      }
      formData.append("validPoll", durationa);
      formData.append(
        "choice_option",
        JSON.stringify({
          choice1: PollAnswer1,
          choice2: PollAnswer2,
          choice3: PollAnswer3,
          choice4: PollAnswer4
        })
      );
    }

    if (sparkTypePoll === "image") {
      if (imageData.length === 0) {
        Alert.alert("Please select images first!");
        return;
      }
      if (imageData.length > 1) {
        imageData.forEach((element, i) => {
          formData.append("image[]", {
            uri: element.path,
            type: element.mime,
            name: element.modificationDate
          });
        });
      } else {
        formData.append("image", {
          uri: imageData[0].path,
          type: imageData[0].mime,
          name: element.modificationDate
        });

      }
    }
    if (sparkTypePoll === "video") {
      if (videoData === "") {
        Alert.alert("Please select a video first!");
        return;
      }

      formData.append("video", {
        uri: videoData.uri,
        type: "video/mp4",
        name: "Abc.mp4"
      });
    }

    console.log(formData);
    this.props.uploadData(CREATE_A_SPARK, POST, formData, true);
  }

  render() {
    const { uploading } = this.props.OnlySuccessReducer;

    return (
      <View style={{ flex: 1 }}>
        {showProgressDialog(uploading)}
        {this.renderPostSparkView()}
      </View>
    );
  }

  renderPostSparkView() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={SearchStyle.container}>
          {this.showImageVideoDailog()}

          <View style={SearchStyle.headerContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={SearchStyle.headerImageStyleOpacity}>
              <IconFeather name={"x"} size={Dimens.largeIconSize} color={colors.white} />
            </TouchableOpacity>

            <View style={SearchStyle.TweetHeaderButtonContainer}>
              <TouchableOpacity style={SearchStyle.SparkHeaderButton} onPress={() => this.uploadPostData()} >
                <Text style={SearchStyle.twitterButton} children={"Spark"} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={SearchStyle.pollMainContainer}>
            {this.renderWhatsHappening()}
            <View style={{ flex: 0.85, backgroundColor: colors.offWhite }}>
              {this.state.showView === "image" ?
                (this.renderImageView())
                : this.state.showView === "video" ?
                  (this.renderVideoView())
                  : this.state.showView === "poll" ?
                    (this.renderPollView()) :
                    <View />}
            </View>
            {this.renderBottomTabs()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderBottomTabs() {
    return (
      <View style={SearchStyle.bottomHeaderSubStyle}>
        <TouchableOpacity onPress={() => this.setState({ showPickerDialog: true, pickerType: "image" })}
          style={SearchStyle.bottomButtonStyle}>
          <FontAwesome name={"camera"} size={Dimens.mediumIconSize} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.setState({ showPickerDialog: true, pickerType: "video" })}
          style={SearchStyle.bottomButtonStyle}>
          <FontAwesome name={"video-camera"} size={Dimens.mediumIconSize} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.setState({ showView: "poll", sparkTypePoll: "poll" })}
          style={SearchStyle.bottomButtonStyle}>
          <FontAwesome name={"align-left"} size={Dimens.mediumIconSize} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity onPress={this.selectLocation.bind(this)} style={SearchStyle.bottomButtonStyle}>
          <IconFeather name={"map-pin"} size={Dimens.mediumIconSize} color={colors.white} />
        </TouchableOpacity>
      </View>
    );
  }

  renderImageView() {
    return this.state.imageData.length > 1 ? (
      this.renderMultipleImages(this.state.imageData)) : (
        <FastImage
          style={{ width: "95%", height: "95%", margin: Dimens.ten }}
          source={{
            uri: this.state.imageData[0].path
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      );
  }

  renderVideoView() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ paused: !this.state.paused });
        }}
        activeOpacity={0.8}
        style={{ width: "95%", height: "95%", margin: Dimens.ten }}
      >
        <Video
          source={{ uri: this.state.sparkVideo }}
          style={{ width: "100%", height: "100%" }}
          rate={this.state.rate}
          paused={this.state.paused}
          volume={this.state.volume}
          muted={this.state.muted}
          ignoreSilentSwitch={this.state.ignoreSilentSwitch}
          resizeMode={"cover"}
          onLoad={this.onLoad}
          onBuffer={this.onBuffer}
          onProgress={this.onProgress}
          onEnd={() => null}
          repeat={true}
        />

        <View
          style={{
            position: "absolute",
            right: Dimens.twenty,
            top: Dimens.ten,
            backgrounshowImagePickerdColor: "rgba(0, 0, 0, 0.7)",
            height: Dimens.fourty,
            width: Dimens.fourty,
            borderRadius: Dimens.twenty,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <FontAwesome
            name="video-camera"
            size={Dimens.tinyIconSize}
            color="white"
            style={{
              backgroundColor: "transparent",
              lineHeight: Dimens.fourty
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  renderMultipleImages(imageData) {
    var imagesView = [];

    for (let i = 0; i < imageData.length; i++) {
      console.log(imageData[i]);
      imagesView.push(<FastImage
        key={imageData[i].path}
        style={{ flex: 1 }}
        source={{
          uri: imageData[i].path,
          priority: FastImage.priority.normal
        }}
        resizeMode={FastImage.resizeMode.contain} />
      );
    }

    return <Swiper showsButtons={true} horizontal style={{ width: "95%", height: "95%", margin: Dimens.ten }}>{imagesView}</Swiper>;
  }

  handleWordCount(text) {
    var Value = text.length.toString();
    const charLeft = 280 - Value;
    this.setState({
      charLeft: charLeft,
      spark: text
    });

  }

  renderWhatsHappening() {
    return (
      <View style={SearchStyle.SparkContainer}>
        <FastImage
          style={SearchStyle.SparkImageStyle}
          source={{
            uri: this.state.profilePic,
            priority: FastImage.priority.high
          }}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View style={SearchStyle.editTextContainer}>

          <TextInput
            keyboardAppearance="default"
            autoCorrect={false}
            multiline={true}
            numberOfLines={4}
            maxLength={280}
            placeholder="What’s going on?"
            placeholderTextColor={colors.placeHolderColor}
            value={this.state.spark}
            onChangeText={(text) => this.handleWordCount(text)}
            style={SearchStyle.SparkTextInput}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
            <Text style={SearchStyle.characterCountStyle} children={this.state.charLeft + " character left"} />
            <View style={SearchStyle.locationContainer} >
              <IconFeather name="map-pin" size={Dimens.extraSmallIconSize} color={colors.appRed} />
              <Text style={SearchStyle.locationTextStyle} children={this.state.location} />
            </View>
          </View>
        </View>
      </View >
    );
  }

  renderPollView() {
    const { durationa } = this.state;
    return (
      <KeyboardAvoidingView style={SearchStyle.pollSubContainer} behavior="padding" enabled>
        <View style={SearchStyle.PollBox}>
          <View style={SearchStyle.PollInputItem}>
            <TextInput
              autoCorrect={false}
              blurOnSubmit={true}
              keyboardAppearance="default"
              onChangeText={poll => this.setState({ PollAnswer1: poll })}
              value={this.state.PollAnswer1}
              onSubmitEditing={() => this.refs.choice2.focus()}
              multiline={true}
              style={SearchStyle.pollInputView}
              keyboardType="email-address"
              placeholder="Choice 1"
              placeholderTextColor={colors.placeHolderColor}
              textAlign={"auto"}
            />

            <TouchableOpacity onPress={() => this.setState({ showView: "", sparkTypePoll: "image", thirdPoll: false, fourthPoll: false })}            >
              <Entypo style={SearchStyle.IconStyles} name={"cross"} size={Dimens.smallIconSize} color={colors.black} />
            </TouchableOpacity>

          </View>

          <View style={SearchStyle.PollInputItem}>
            <TextInput
              autoCorrect={false}
              blurOnSubmit={true}
              keyboardAppearance="default"
              onChangeText={poll2 => this.setState({ PollAnswer2: poll2 })}
              value={this.state.PollAnswer2}
              onSubmitEditing={this.uploadPostData.bind(this)}
              multiline={true}
              ref={'choice2'}
              style={SearchStyle.pollInputView}
              keyboardType="email-address"
              placeholder="Choice 2"
              placeholderTextColor={colors.placeHolderColor}
              textAlign={"auto"} />

            {!this.state.thirdPoll && (
              <TouchableOpacity onPress={() => this.visibleThirdPoll(true)}>
                <IconFeather style={SearchStyle.IconStyles}
                  name={"plus"}
                  size={Dimens.smallIconSize}
                  color={"black"}
                />
              </TouchableOpacity>)}

          </View>

          {this.state.thirdPoll && (
            <View style={SearchStyle.PollInputItem}>
              <TextInput
                autoCorrect={false}
                blurOnSubmit={true}
                keyboardAppearance="default"
                value={this.state.PollAnswer3}
                onChangeText={poll3 => this.setState({ PollAnswer3: poll3 })}
                onSubmitEditing={this.uploadPostData.bind(this)}
                multiline={true}
                style={SearchStyle.pollInputView}
                keyboardType="email-address"
                placeholder="Choice 3 (optional)"
                placeholderTextColor={colors.placeHolderColor}
                textAlign={"auto"}
              />

              {!this.state.fourthPoll && (
                <TouchableOpacity onPress={() => this.visibleFourthPoll(true)} >
                  <IconFeather style={SearchStyle.IconStyles} name={"plus"} size={Dimens.smallIconSize} color={"black"} />
                </TouchableOpacity>
              )}

            </View>
          )}

          {this.state.fourthPoll && (
            <View style={SearchStyle.PollInputItem}>
              <TextInput
                autoCorrect={false}
                blurOnSubmit={true}
                keyboardAppearance="default"
                value={this.state.PollAnswer4}
                onChangeText={poll4 => this.setState({ PollAnswer4: poll4 })}
                onSubmitEditing={this.uploadPostData.bind(this)}
                multiline={true}
                style={SearchStyle.pollInputView}
                keyboardType="email-address"
                placeholder="Choice 4 (optional)"
                placeholderTextColor={colors.placeHolderColor}
              />

            </View>
          )}
          <View style={SearchStyle.divider} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
            <Text style={SearchStyle.pollTextSubContainer} children={"Poll length"} />

            <SelectInput
              value={durationa}
              mode={'dropdown'}
              options={options}
              onCancelEditing={() => console.log('onCancel')}
              onSubmitEditing={(value) => this.setState({ durationa: value })}
              style={SearchStyle.selectInputLarge}
              labelStyle={SearchStyle.selectInputInner}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    OnlySuccessReducer: state.OnlySuccessReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ uploadData, setInitialStage }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetScreen);
