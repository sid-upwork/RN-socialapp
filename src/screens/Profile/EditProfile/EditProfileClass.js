import React, { Component } from 'react';
import {
    Text, View,
    TextInput, Platform,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    NetInfo
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import FastImage from 'react-native-fast-image';
import LineIcons from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import colors from '../../../utils/Colors';
import { Dimens } from '../../../utils/Dimens';

import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from "react-native-image-crop-picker";
import Dialog, {
    ScaleAnimation,
    DialogButton,
    DialogTitle
} from "react-native-popup-dialog";
import { POST, EDIT_PROFILE } from '../../../utils/URLs';
import { uploadData, setInitialStage } from "../../../redux/action/OnlySuccessAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { showProgressDialog } from '../../../utils/Utilities';
import Moment from "moment";
import s from './EditProfileStyle';

import SelectInput from 'react-native-select-input-ios'
let options = [{ value: "male", label: 'Male' },
{ value: "female", label: 'Female' },
{ value: "", label: 'Select' }]


class EditProfileClass extends Component {

    constructor(props) {
        super(props);

        this.state = {
            respo: '',
            userId: '',
            name: '',
            location: '',
            website: '',
            dob: 'Select',
            gender: '',
            bio: '',
            profile_image: '',
            banner_image: '',
            profile_source: '',
            banner_source: '',
            showPickerDialog: false,
            pickerType: '',
            isDateTimePickerVisible: false,
            firstname: "",
            lastname: "",
            address_2: "",
            city: '',
            state: "",
            zipcode: "",
            internetConnected: false
        }

        this.submitEditProfileData = this.submitEditProfileData.bind(this)

        this.selectPhotoOrLaunchCamera = this.selectPhotoOrLaunchCamera.bind(this)

        this.profileResponse()
    }

    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("/");
    }

    setDob = (date) => {
        let dateString = this.convert(date);
        console.log('A date has been picked: ', dateString);
        this.setState({ dob: dateString, isDateTimePickerVisible: false });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        const { uploaded_successfully } = nextProps.OnlySuccessReducer
        if (uploaded_successfully) {
            this.props.setInitialStage();
            this.props.navigation.goBack()
        }
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


    async profileResponse() {
        try {
            await AsyncStorage.getItem("loginResponse")
                .then((response) => {
                    this.setState({
                        userId: JSON.parse(response).loginResposneObj.id,
                        name: JSON.parse(response).loginResposneObj.name,
                        bio: JSON.parse(response).loginResposneObj.user_bio === null ? "" : JSON.parse(response).loginResposneObj.user_bio,
                        location: JSON.parse(response).loginResposneObj.address === null ? "" : JSON.parse(response).loginResposneObj.address,
                        website: JSON.parse(response).loginResposneObj.website_url === null ? "" : JSON.parse(response).loginResposneObj.website_url,
                        dob: JSON.parse(response).loginResposneObj.dob === null ? "" : JSON.parse(response).loginResposneObj.dob,
                        profile_source: JSON.parse(response).loginResposneObj.profile_image === null ? "" : JSON.parse(response).loginResposneObj.profile_image,
                        banner_source: JSON.parse(response).loginResposneObj.banner_image === null ? "" : JSON.parse(response).loginResposneObj.banner_image,
                        gender: JSON.parse(response).loginResposneObj.gender === null ? "Select" : JSON.parse(response).loginResposneObj.gender,
                        firstname: JSON.parse(response).loginResposneObj.firstName === null ? "" : JSON.parse(response).loginResposneObj.firstname,
                        lastname: JSON.parse(response).loginResposneObj.lastname === null ? "" : JSON.parse(response).loginResposneObj.lastname,
                        address_2: JSON.parse(response).loginResposneObj.address_2 === null ? "" : JSON.parse(response).loginResposneObj.address_2,
                        city: JSON.parse(response).loginResposneObj.city === null ? "" : JSON.parse(response).loginResposneObj.city,
                        state: JSON.parse(response).loginResposneObj.state === null ? "" : JSON.parse(response).loginResposneObj.state,
                        zipcode: JSON.parse(response).loginResposneObj.zipcode === null ? "" : JSON.parse(response).loginResposneObj.zipcode,
                    })

                    console.log(this.state);
                }, (error) => {
                    console.log(error)
                });
        }
        catch (e) { console.log(e) }
    }

    isValidValues() {
        const { firstname, lastname, location, city, state, gender, dob, zipcode } = this.state
        if (firstname === '') {
            Snackbar.show({
                title: 'You must enter a first name',
                duration: Snackbar.LENGTH_SHORT
            });
            return false;
        }
        if (lastname === '') {
            Snackbar.show({
                title: 'You must enter a last name',
                duration: Snackbar.LENGTH_SHORT
            });
            return false;
        }
        if (dob === '') {
            Snackbar.show({
                title: 'You must enter your date of birth',
                duration: Snackbar.LENGTH_SHORT
            });
            return false;
        }
        if (gender === '') {
            Snackbar.show({
                title: 'You must select your gender',
                duration: Snackbar.LENGTH_SHORT
            });
            return false;
        } if (location === '') {
            Snackbar.show({
                title: 'You must enter your address',
                duration: Snackbar.LENGTH_SHORT
            });
            return false;
        } if (city === '') {
            Snackbar.show({
                title: 'You must enter your city',
                duration: Snackbar.LENGTH_SHORT
            });
            return false;
        } if (state === '') {
            Snackbar.show({
                title: 'You must enter your state',
                duration: Snackbar.LENGTH_SHORT
            });
            return false;
        }
        if (zipcode === '') {
            Snackbar.show({
                title: 'You must enter your zipcode',
                duration: Snackbar.LENGTH_SHORT
            });
            return false;
        }

        return true;
    }

    submitEditProfileData() {

        if (!this.state.internetConnected) {
            Alert.alert("No internet connection!")
            return
        }

        if (!this.isValidValues()) {
            return;
        }

        const { userId, bio, firstname, lastname, location, city, state, gender, address_2, website, dob, profile_image, banner_image, zipcode } = this.state

        const data = new FormData();

        data.append('user_id', userId);
        data.append('fullname', firstname + " " + lastname);
        data.append('website_url', website);
        data.append('dob', dob);
        data.append('address', location);
        data.append('user_bio', bio);
        data.append('gender', gender);
        data.append('firstname', firstname);
        data.append('lastname', lastname);
        data.append('address_2', address_2);
        data.append('city', city);
        data.append('state', state);
        data.append('zipcode', zipcode);


        if (profile_image != null && profile_image != "") {
            var filename = profile_image.path.replace(/^.*[\\\/]/, '')
            data.append("profile_image", {
                uri: profile_image.path,
                type: profile_image.mime,
                name: filename
            });
        }

        if (banner_image != null && banner_image != "") {
            var filename = banner_image.path.replace(/^.*[\\\/]/, '')
            data.append("banner_image", {
                uri: banner_image.path,
                type: banner_image.mime,
                name: filename
            });
        }
        console.log(data)
        this.props.uploadData(EDIT_PROFILE, POST, data, true);
    }

    showImageChooserDailog() {
        const { showPickerDialog, pickerType } = this.state;

        return (
            <Dialog
                animationDuration={500}
                height={0.4}
                width={0.6}
                containerStyle={s.dialogRetweetContainer}
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
                        textStyle={s.dialogTitle}
                        title={"Please select image"}
                    />
                }
                actions={[
                    <DialogButton
                        key={0}
                        textStyle={s.dialogButtonStyle}
                        text="Cancel"
                        onPress={() => this.setState({ showPickerDialog: false })}
                    />
                ]}
            >
                {showPickerDialog && (
                    <View style={s.dialogRetweetBodyContainer}>
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => {
                                this.setState({ showPickerDialog: false })
                                this.selectPhotoOrLaunchCamera(pickerType, "gallery")
                            }}>
                            <Text style={s.dialogRetweetTextStyle} children={"Select from gallery"} />
                        </TouchableOpacity>

                        <View style={s.dialogDivider} />
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => {
                                this.setState({ showPickerDialog: false })
                                this.selectPhotoOrLaunchCamera(pickerType, "camera")
                            }}>
                            <Text style={s.dialogRetweetTextStyle} children={"Capture from camera"} />
                        </TouchableOpacity>

                        <View style={s.dialogDivider} />
                    </View>
                )}
            </Dialog>
        );
    }

    selectPhotoOrLaunchCamera(pickerType, isFrom) {
        const options = {
            title: "Select Avatar",
            customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
            storageOptions: {
                skipBackup: true,
                path: "images"
            }
        };
        // For Image Selection
        if (isFrom === "gallery") {
            ImagePicker.openPicker({ multiple: false, mediaType: "photo" })
                .then(images => {
                    console.log(images);
                    if (pickerType === 'profilePic') {
                        this.setState({
                            profile_source: images.path,
                            profile_image: images,
                        });
                    } else if (pickerType === 'bannerPic') {
                        this.setState({
                            banner_source: images.path,
                            banner_image: images,
                        });
                    } else {
                        this.setState({
                            profile_image: this.state.profile_image,
                            profile_source: this.state.profile_source,
                            banner_image: this.state.banner_image,
                            banner_source: this.state.banner_source,
                        });
                    }
                })
        } else {
            ImagePicker.openCamera({ cropping: false })
                .then(images => {
                    console.log(images);

                    if (pickerType === 'profilePic') {
                        this.setState({
                            profile_source: images.path,
                            profile_image: images,
                        });
                    } else if (pickerType === 'bannerPic') {
                        this.setState({
                            banner_source: images.path,
                            banner_image: images,
                        });
                    } else {
                        this.setState({
                            profile_image: this.state.profile_image,
                            profile_source: this.state.profile_source,
                            banner_image: this.state.banner_image,
                            banner_source: this.state.banner_source,
                        });
                    }
                })
        }
    }

    setFastImageView(image_source, isBanner) {
        if (isBanner) {
            return < FastImage style={s.backgroundImageStyle}
                source={{
                    uri: image_source,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
        }
        else {
            return < FastImage style={{
                flex: 1,
                width: null,
                height: null
            }}
                source={{
                    uri: image_source,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
        }
    }

    renderEditProfileView() {
        const { userId, firstname, lastname, address_2, city, state,
            bio, location, gender, website, dob, isDateTimePickerVisible,
            banner_source, profile_source, zipcode } = this.state

        return <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={(Platform.OS === 'ios') ? "padding" : null}>

            <View style={s.headerContainer} >
                <TouchableOpacity style={s.drawerIconStyle}
                    onPress={() => this.props.navigation.goBack()}>
                    <IconFeather name={'chevron-left'} size={Dimens.largeIconSize} color={colors.white} />
                </TouchableOpacity>

                <Text style={s.headerTextStyle} children={"Edit Profile"} />
                <TouchableOpacity style={s.saveTextContainer} onPress={() => this.submitEditProfileData()} >
                    <Text style={s.saveTextStyle} children={"SAVE"} />
                </TouchableOpacity>
            </View >

            <View style={s.mainContainer} >

                <ScrollView style={{ flex: 1 }} >
                    <View style={s.mainContainerFlatList}>

                        {this.setFastImageView(banner_source, true)}
                        {this.showImageChooserDailog()}

                        <TouchableOpacity style={s.profilePicContainer}
                            activeOpacity={.5}
                            onPress={() => this.setState({
                                showPickerDialog: true,
                                pickerType: "profilePic"
                            })}>
                            {this.setFastImageView(profile_source, false)}
                        </TouchableOpacity>

                        <TouchableOpacity style={s.bannerCameraPickerStyle}
                            activeOpacity={.5}
                            onPress={() => this.setState({
                                showPickerDialog: true,
                                pickerType: "bannerPic"
                            })}>
                            <LineIcons name='camera' size={Dimens.mediumIconSize} color={colors.white} />
                        </TouchableOpacity>

                        <TouchableOpacity style={s.ProfileCameraPickerStyle}
                            activeOpacity={.5}
                            onPress={() => this.setState({
                                showPickerDialog: true,
                                pickerType: "profilePic"
                            })}>
                            <LineIcons name='camera' size={Dimens.mediumIconSize} color={colors.textDarkColor} />
                        </TouchableOpacity>

                    </View>

                    <View style={{ flex: 1, flexDirection: 'column' }}>

                        <View style={s.topTextContainerContainer}>
                            <Text style={s.labelTextStyling} children={"First Name"} />

                            <TextInput
                                style={s.topInputTextStyling}
                                underlineColorAndroid='rgba(0,0,0,0.4)'
                                keyboardType='default'
                                value={firstname}
                                onChangeText={(firstname) => this.setState({ firstname })}
                                placeholderTextColor={colors.placeHolderColor} />

                        </View>
                        <View style={s.divider} />
                        <View style={s.textContainerContainer}>
                            <Text style={s.labelTextStyling} children={"Last Name"} />

                            <TextInput
                                style={s.topInputTextStyling}
                                underlineColorAndroid='rgba(0,0,0,0.4)'
                                keyboardType='default'
                                value={lastname}
                                onChangeText={(lastname) => this.setState({ lastname })}
                                placeholderTextColor={colors.placeHolderColor} />

                        </View>
                        <View style={s.divider} />


                        <View style={s.textContainerContainer}>
                            <Text style={s.labelTextStyling} children={"Date of Birth"} />

                            <Text onPress={() => this.setState({ isDateTimePickerVisible: true })}
                                style={s.dobInputTextStyling}
                                children={dob != "" && dob != null ? Moment(dob, "YYYY/MM/DD").format('DD-MMM-YYYY') : ""}
                            />
                            <DateTimePicker
                                maximumDate={new Date()}
                                titleStyle={{ fontSize: Dimens.headerSize, }}
                                datePickerModeAndroid={"calendar"}
                                titleIOS={"Pick a Date"}
                                isVisible={isDateTimePickerVisible}
                                onConfirm={this.setDob}
                                onCancel={() => this.setState({ isDateTimePickerVisible: false })}
                            />

                        </View>
                        <View style={s.divider} />

                        <View style={s.textContainerContainer}>
                            <Text style={s.labelTextStyling} children={"Gender"} />
                            <SelectInput
                                value={gender}
                                mode={'dropdown'}
                                options={options}
                                onCancelEditing={() => console.log('onCancel')}
                                onSubmitEditing={(value) => this.setState({ gender: value })}
                                style={[s.selectInput, s.selectInputLarge]}
                                labelStyle={s.selectInputInner}
                            />

                        </View>
                        <View style={s.divider} />

                        <View style={s.textContainerContainer}>
                            <Text style={s.labelTextStyling} children={"Bio"} />

                            <TextInput
                                style={s.inputTextStyling}
                                underlineColorAndroid='rgba(0,0,0,0.4)'
                                keyboardType='default'
                                value={bio}
                                onChangeText={(bio) => this.setState({ bio })}
                                placeholderTextColor={colors.placeHolderColor} />
                        </View>
                        <View style={s.divider} />

                        <View style={s.textContainerContainer}>
                            <Text style={s.labelTextStyling} children={"Website"} />

                            <TextInput
                                style={s.inputTextStyling}
                                underlineColorAndroid='rgba(0,0,0,0.4)'
                                keyboardType='default'
                                value={website}
                                onChangeText={(website) => this.setState({ website })}
                                placeholderTextColor={colors.placeHolderColor} />
                        </View>
                        <View style={s.divider} />



                        <View style={s.textContainerContainer}>
                            <Text style={s.labelTextStyling} children={"Address 1"} />

                            <TextInput
                                style={s.inputTextStyling}
                                underlineColorAndroid='rgba(0,0,0,0.4)'
                                keyboardType='default'
                                value={location}
                                onChangeText={(location) => this.setState({ location })}
                                placeholderTextColor={colors.placeHolderColor} />
                        </View>
                        <View style={s.divider} />

                        <View style={s.textContainerContainer}>
                            <Text style={s.labelTextStyling} children={"Address 2"} />

                            <TextInput
                                style={s.topInputTextStyling}
                                underlineColorAndroid='rgba(0,0,0,0.4)'
                                keyboardType='default'
                                value={address_2}
                                onChangeText={(address_2) => this.setState({ address_2 })}
                                placeholderTextColor={colors.placeHolderColor} />

                        </View>
                        <View style={s.divider} />
                        <View style={s.textContainerContainer}>
                            <Text style={s.labelTextStyling} children={"City"} />

                            <TextInput
                                style={s.topInputTextStyling}
                                underlineColorAndroid='rgba(0,0,0,0.4)'
                                keyboardType='default'
                                value={city}
                                editable={true}
                                onChangeText={(city) => this.setState({ city })}
                                placeholderTextColor={colors.placeHolderColor} />

                        </View>
                        <View style={s.divider} />

                        <View style={s.textContainerContainer}>
                            <Text style={s.labelTextStyling} children={"State"} />

                            <TextInput
                                style={s.topInputTextStyling}
                                underlineColorAndroid='rgba(0,0,0,0.4)'
                                keyboardType='default'
                                value={state}
                                onChangeText={(state) => this.setState({ state })}
                                placeholderTextColor={colors.placeHolderColor} />

                        </View>
                        <View style={s.divider} />

                        <View style={s.textContainerContainer}>
                            <Text style={s.labelTextStyling} children={"Zipcode"} />

                            <TextInput
                                style={s.topInputTextStyling}
                                underlineColorAndroid='rgba(0,0,0,0.4)'
                                keyboardType='default'
                                value={zipcode}
                                onChangeText={(zipcode) => this.setState({ zipcode })}
                                placeholderTextColor={colors.placeHolderColor} />

                        </View>
                        <View style={s.divider} />
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView >

    }

    render() {
        const { uploading } = this.props.OnlySuccessReducer;
        return (<View style={{ flex: 1 }}>
            {showProgressDialog(uploading)}
            {this.renderEditProfileView()}
        </View>);
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileClass);
