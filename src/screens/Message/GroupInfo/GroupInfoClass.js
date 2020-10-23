import React from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    BackHandler,
    Alert,
    KeyboardAvoidingView
} from "react-native";
import { database } from "../../../services/firebase";
import FastImage from "react-native-fast-image"

import MediaPicker from "react-native-image-picker";
import Header from '../../Common/BackHeader/BackHeader';
import { Dimens } from '../../../utils/Dimens';

import s from "./GroupInfoStyle";
import colors from "../../../utils/Colors";
import { FlatList } from "react-native-gesture-handler";
import firebase from "react-native-firebase";

export default class GroupInfoClass extends React.PureComponent {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const userIdd = navigation.getParam("userId");
        const data = navigation.getParam("data");
        this.state = {
            userId: userIdd,
            stateData: data,
            users: [],
            groupName: data.name,
            group_image: data.profile_image,
            showPickerDialog: false,
            uploadGroupImage: ""
        }
    }

    selectPhotoOrLaunchCamera() {
        const options = {
            title: 'Select Group Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }

        MediaPicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log('data:image/jpeg;base64,' + response.data);
                console.log('data:image/jpeg;uri   , ' + response.uri);
                this.setState({
                    group_image: response.uri,
                    uploadGroupImage: ('data:image/jpeg;base64,' + response.data)
                });
            }
        })

    }



    componentDidMount() {
        database.ref('Groups').child(this.state.stateData.userId).once("value",
            snapshot => {
                snapshot.val().members.map(userid => {
                    if (userid != null) {
                        database.ref("Users")
                            .child(userid.userId)
                            .once("value", snap => {
                                let userArray = []
                                userArray.push({
                                    id: snap.val().id || "",
                                    name: snap.val().name || "",
                                    profile_image: snap.val().profile_image || "",
                                    username: snap.val().username || "",
                                })
                                this.setState(prevState => ({ users: [...prevState.users, ...userArray] }))

                            },
                                error => console.log(error))
                    }
                })
            }, error => { console.log(error) });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.goBack();
        return false;
    }

    renderListEmpty = () => {
        return <View style={{
            flex: 1,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            backgroundColor: colors.white,
            margin: Dimens.ten
        }}>
            <Text
                style={{
                    flex: 1,
                    color: colors.appRed,
                    fontSize: Dimens.mediumTextSize
                }}
                children={"No members in this group!"} />
        </View>
    }

    deleteConversation() {
        database.ref("Groups")
            .child(this.state.stateData.userId)
            .child("members")
            .child(this.state.userId)
            .set({
                "status": false,
                "userId": this.state.userId,
                "groupLeftTimeStamp": firebase.database.ServerValue.TIMESTAMP
            }).then(() => this.props.navigation.goBack())
    }

    changeGroupName() {
        const { groupName, uploadGroupImage } = this.state;

        if (groupName == "") {
            Alert.alert("Group Name empty")
            return;
        }


        if (uploadGroupImage != "") {
            database.ref("Groups")
                .child(this.state.stateData.userId)
                .child("groupImage")
                .set(uploadGroupImage)
                .then(() => this.setState({ uploadGroupImage: "" }))
        }

        database.ref("Groups")
            .child(this.state.stateData.userId)
            .child("groupName")
            .set(groupName)
    }

    render() {
        const { userId, stateData, groupName, group_image, users, showPickerDialog } = this.state
        return (

            <View style={s.container} >

                <Header
                    showDoneButton={true}
                    onPress={() => this.changeGroupName()}
                    goBackProp={this.props.navigation}
                    rightText={"Save"}
                    title="Group Info"
                    backValue={true}
                />


                <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior={"padding"}>
                    <TouchableOpacity style={s.profilePicContainer}
                        activeOpacity={.5}
                        onPress={() => this.selectPhotoOrLaunchCamera()}>
                        < FastImage style={{
                            flex: 1,
                            width: null,
                            height: null
                        }}
                            source={{
                                uri: group_image,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: Dimens.ten }}>
                        <Text style={{ fontWeight: "bold", flex: .4, color: colors.appRed, fontSize: Dimens.extraLargerTextSize }} children="Group Name : " />
                        <TextInput
                            keyboardAppearance="default"
                            autoCorrect={false}
                            maxLength={20}
                            placeholder={groupName}
                            multiline={false}
                            value={groupName}
                            placeholderTextColor={colors.appRed}
                            textAlign={"auto"}
                            style={s.styleInputViewSpark}
                            onChangeText={(comment) => this.setState({ groupName: comment })}
                        />
                    </View>

                    <Text style={{
                        color: colors.appRed,
                        fontStyle: "normal",
                        fontWeight: 'bold',
                        fontSize: Dimens.headerSize,
                        padding: Dimens.ten,
                        backgroundColor: colors.appDividerColor
                    }} children={"Group Members (" + users.length + ")"} />

                    <FlatList style={{ flex: 1, marginBottom: Dimens.fourty }}
                        data={users}
                        extraData={users}
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={100}
                        onEndReachedThreshold={1200}
                        initialNumToRender={10}
                        ListEmptyComponent={this.renderListEmpty}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={true}
                        renderItem={({ item, index }) => (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginVertical: Dimens.ten,
                                    marginHorizontal: Dimens.ten
                                }} >

                                <FastImage
                                    style={{
                                        alignSelf: 'center',
                                        marginLeft: Dimens.five,
                                        width: Dimens.postImageSize,
                                        height: Dimens.postImageSize,
                                        borderRadius: Dimens.postImageBorderRadius,
                                        backgroundColor: colors.imageLightBackgroundColor,
                                    }}
                                    source={{
                                        uri: item.profile_image,
                                        priority: FastImage.priority.high
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                <Text style={{
                                    fontSize: Dimens.extraLargerTextSize,
                                    marginHorizontal: Dimens.ten,
                                    color: colors.appRed
                                }} children={item.name} />

                                <Text onPress={() => this.props.navigation.navigate('ProfileClass', {
                                    'userID': userId,
                                    'userName': "@" + item.username,
                                })}
                                    style={{
                                        backgroundColor: colors.appRed,
                                        color: colors.white,
                                        padding: Dimens.seven,
                                        position: 'absolute',
                                        right: Dimens.five,
                                        borderRadius: Dimens.ten,
                                        fontSize: Dimens.smallTextSize,
                                        marginHorizontal: Dimens.ten
                                    }} children={"View Profile"} />
                            </View>
                        )} />

                    <TouchableOpacity style={{
                        position: "absolute",
                        alignItems: 'center',
                        justifyContent: 'center',
                        bottom: Dimens.zero,
                        width: "100%",
                        backgroundColor: colors.appRed
                    }} onPress={() => this.deleteConversation()}>
                        <Text style={{
                            color: colors.white,
                            fontStyle: "normal",
                            fontWeight: 'bold',
                            fontSize: Dimens.headerSize,
                            padding: Dimens.ten
                        }} children={"Leave Group"} />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View >

        );

    }
}
