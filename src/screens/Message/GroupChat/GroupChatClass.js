import React from "react";
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    TextInput,
    BackHandler,
    Alert,
    KeyboardAvoidingView
} from "react-native";
import Firebase from 'react-native-firebase'
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { database } from "../../../services/firebase";
import ConfirmationModal from "./ConfirmationDialog";

import { ListItem, SearchBar } from "react-native-elements";
import Header from '../../Common/BackHeader/BackHeader';
import { Dimens } from '../../../utils/Dimens';
import { showProgressDialog } from '../../../utils/Utilities';
import s from "./GroupChatStyle";
import colors from "../../../utils/Colors";

export default class GroupChatMessage extends React.PureComponent {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const userIdd = navigation.getParam("userId");

        this.state = {
            user: null,
            loading: true,
            userList: "",
            userId: userIdd,
            arrayholder: "",
            display: false,
            groupKey: "",
            creating: false
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        const { userId } = this.state

        database.ref("/Users").once('value', snapshot => {
            var userList = [];
            snapshot.forEach((child) => {
                if (child.val().id != userId) {
                    userList.push({
                        name: child.val().name || "",
                        email: child.val().email || "",
                        profile_image: child.val().profile_image || "",
                        username: child.val().username || "",
                        userId: child.val().id || "",
                        status: false
                    })
                }
            });
            this.setState({ userList: userList, arrayholder: userList, loading: false })
        },
            errorObject => {
                console.log(errorObject)
            })

        setTimeout(() => this.setState({ loading: false }), 3000)
    }

    addUserToGroup(item) {
        let userList = [...this.state.userList];
        let index = userList.findIndex(el => el.username === item.username);
        userList[index] = { ...userList[index], status: !userList[index].status };

        let arrayholder = [...this.state.arrayholder];
        let index1 = arrayholder.findIndex(el => el.username === item.username);
        arrayholder[index1] = { ...arrayholder[index1], status: !arrayholder[index1].status };
        this.setState({ userList, arrayholder });
    }

    openConfirmationDialog() {
        const { userId, userList } = this.state

        const array1 = userList.filter(val => {
            if (val.status)
                return val.userId;
        })
        if (array1.length <= 0) {
            Alert.alert("Please select user to create group !")
            return;
        }
        this.setState({
            display: true
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (this.state.display === true) {
            this.setState({ display: false })

            return true;
        }
        return false;
    }

    renderSeparator = () => {
        return <View style={s.divider} />;
    };

    searchFilterFunction = text => {
        if (this.state.arrayholder <= 0) {
            return
        }
        const newData = this.state.arrayholder.filter(item => {
            const itemData = `${item.name.toUpperCase()} ${item.username.toUpperCase()} `;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            userList: newData
        });
    };

    returnAppHeader() {
        return <Header title="Create a group"
            backValue={true}
            showDoneButton={true}
            iconName={"add"}
            rightIcon={"icon"}
            onPress={() => this.openConfirmationDialog()}
            goBackProp={this.props.navigation} />;
    }

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

    listEmpty() {
        return <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.white, margin: Dimens.ten }} >
            <Text
                style={{
                    color: colors.appRed,
                    fontSize: Dimens.headingTextSize
                }}
                children={"No Users Found!"}
            />
        </View>
    }

    onGroupCreate(groupName, groupDesc) {
        if (groupName == "" || groupDesc == "") {
            Alert.alert("Error : either name or description is empty!");
            return;
        }
        const { userId, arrayholder, groupKey, creating } = this.state;
        const memberArray = []
        const members = []



        arrayholder.filter(el => {
            if (el.status) return memberArray.push(el.userId)
            else null;
        });

        memberArray.map((id, index) => {
            members[id] = {
                userId: id,
                status: true,
                groupLeftTime: ""
            };
        });

        this.setState({ display: false, creating: true })

        let mGroupIdKey = database.ref('Groups').push().key;
        let groupDetail = {
            groupName: groupName.trim(),
            groupDescription: groupDesc.trim(),
            groupImage: "",
            createdBy: userId,
            createdAt: Firebase.database.ServerValue.TIMESTAMP,
            members: members,
            groupKey: mGroupIdKey
        }

        database.ref('Groups').child(mGroupIdKey).set(groupDetail)
            .then(() => {
                database.ref('Users/' + userId).child("group_list").push(mGroupIdKey)
                memberArray.forEach(element => {
                    database.ref('Users/' + element).child("group_list").push(mGroupIdKey)
                })
            })
            .then(() => {
                this.setState(
                    { creating: false },
                    () => this.props.navigation.navigate(
                        "ChatScreen", {
                            'userId': userId,
                            "data": {
                                name: groupDetail.groupName || "",
                                description: groupDetail.groupDescription || "",
                                email: "",
                                profile_image: groupDetail.groupImage || "",
                                username: "",
                                userId: mGroupIdKey,
                                banner_image: "",
                                lastMessage: "",
                                timestamp: groupDetail.createdAt || ""
                            },
                            "singleChat": false,
                            "groupName": groupName,

                        })
                )
            }
            )

    }


    render() {
        const { userList, display, loading, creating } = this.state

        if (loading) {
            return (
                <View style={s.container}>
                    {this.returnAppHeader()}
                    {this.renderHeader()}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", flexDirection: 'row' }}>
                        <ActivityIndicator style={{ alignSelf: "center", color: colors.drawerBack, paddingEnd: Dimens.ten }} size='large' />
                        <Text children='Please Wait ...' />
                    </View>
                </View>
            );
        } else {

            return (
                <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior={"padding"}>
                    <View style={s.container} >
                        {this.returnAppHeader()}
                        {showProgressDialog(creating)}

                        <ConfirmationModal
                            onGroupCreate={(a, b) => this.onGroupCreate(a, b)}
                            dismissDialog={() => this.handleBackPress()}
                            showDialog={display} />

                        <FlatList
                            style={{ flex: 1 }}
                            data={userList}
                            ListEmptyComponent={this.listEmpty}
                            renderItem={({ item, index }) => (
                                <ListItem
                                    roundAvatar
                                    onPress={() => this.addUserToGroup(item, index)}
                                    key={item.userId}
                                    title={`${item.name}`}
                                    subtitle={item.username}
                                    titleStyle={{ color: colors.appGreen, fontWeight: '400', fontSize: Dimens.extraLargerTextSize }}
                                    avatar={{ uri: item.profile_image }}
                                    containerStyle={s.listBackgroundStyle}
                                    subtitleStyle={{ color: colors.textLightColor, fontWeight: '400', fontSize: Dimens.mediumTextSize }}
                                    rightIcon={{
                                        name: 'check',
                                        type: 'font-awesome',
                                        color: item.status ? colors.appRed : colors.imageLightBackgroundColor,
                                        size: Dimens.mediumIconSize
                                    }}
                                />
                            )}
                            keyExtractor={item => item.userId}
                            ItemSeparatorComponent={this.renderSeparator}
                            ListHeaderComponent={this.renderHeader}
                            stickyHeaderIndices={[0]}
                        />

                    </View >
                </KeyboardAvoidingView>
            );
        }
    }
}
