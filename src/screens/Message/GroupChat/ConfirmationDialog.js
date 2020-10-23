
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Dimens } from '../../../utils/Dimens';
import colors from '../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import Dialog, {
    ScaleAnimation,
    DialogButton,
    DialogTitle
} from "react-native-popup-dialog";
import { Overlay } from "react-native-elements"

// const ConfirmationModal = (props) => (
//     <Overlay
//         windowBackgroundColor="rgba(0, 0, 0, .5)"
//         overlayBackgroundColor="white"
//         width="80%"
//         height="70%"
//         overlayStyle={{ padding: 0 }}
//         onBackdropPress={() => { props.dismissDialog() }}
//         isVisible={props.showDialog} >

//         <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior={"padding"}>
//             <View style={styles.container} >

//                 <Text style={styles.headerContainer} children={"Create Group"} />


//                

//                 <View style={styles.buttonContainer} >
//                     <TouchableOpacity
//                         style={{ flex: .5, marginRight: Dimens.one }}
//                         onPress={() => { props.dismissDialog() }}
//                         activeOpacity={.5}>

//                         <Text style={{
//                             color: '#fff',
//                             textAlign: 'center',
//                             padding: Dimens.ten,
//                             fontSize: Dimens.largeTextSize,
//                         }}
//                             children="Cancel"
//                         />
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={{ flex: .5 }}
//                         onPress={() => {
//                             props.onGroupCreate(groupName, groupDesc)
//                         }}
//                         activeOpacity={.5}>

//                         <Text style={{
//                             color: '#fff',
//                             textAlign: 'center',
//                             padding: Dimens.ten,
//                             fontSize: Dimens.largeTextSize,
//                         }}
//                             children="Create"
//                         />
//                     </TouchableOpacity>
//                 </View>


//             </View>
//         </KeyboardAvoidingView>
//     </Overlay>
// )

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    headerContainer: {
        flex: .1,
        width: "100%",
        color: colors.white,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        fontSize: Dimens.headingTextSize,
        fontWeight: "500",
        flexDirection: 'row',
        padding: Dimens.ten,
        backgroundColor: colors.appRed
    },
    bodyContainer: {
        flex: 1,
        marginHorizontal: Dimens.ten
    },
    buttonContainer: {
        flex: .1,
        bottom: 0,
        flexDirection: 'row',
        backgroundColor: colors.appRed
    },
    labelStyle: {
        color: colors.appRed,
        padding: Dimens.ten,
        fontSize: Dimens.largeTextSize,
    },
    styleInputViewSpark: {
        width: '95%',
        flexDirection: "row",
        marginHorizontal: wp(4),
        marginTop: wp(3),
        bottom: 0,
        paddingHorizontal: Dimens.ten,
        paddingVertical: Dimens.ten,
        borderRadius: Dimens.fifteen,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: colors.white,
        borderColor: colors.appGreen,
        marginVertical: Dimens.seven,
        borderWidth: Dimens.two
    }, dialogRetweetContainer: {
        zIndex: Dimens.five,
        elevation: Dimens.five
    },
    dialogTitle: {
        fontSize: Dimens.mediumTextSize,
        color: colors.white,
        paddingVertical: Dimens.five
    },
    dialogButtonStyle: {
        fontSize: Dimens.mediumTextSize,
        color: colors.appRed,
        paddingVertical: Dimens.ten,
    },
})


var groupName = "";
var groupDesc = "";

const ConfirmationModal = (props) => {

    return (<Dialog
        animationDuration={500}
        height={.63}
        width={.9}
        containerStyle={styles.dialogRetweetContainer}
        rounded visible={props.showDialog}
        onTouchOutside={() => { props.dismissDialog() }}
        dialogAnimation={new ScaleAnimation({ toValue: 0, useNativeDriver: true })}
        dialogTitle={
            <DialogTitle style={{ backgroundColor: colors.appRed }}
                textStyle={styles.dialogTitle}
                title="Create Group" />}
        actions={[
            <DialogButton
                key={1}
                textStyle={styles.dialogButtonStyle}
                text="Cancel"
                onPress={() => { props.dismissDialog() }} />,
            <DialogButton
                key={0}
                textStyle={styles.dialogButtonStyle}
                text="Create"
                onPress={() => {
                    props.onGroupCreate(groupName, groupDesc)
                }} />
        ]}    >

        <View style={styles.bodyContainer} >
            <Text style={styles.labelStyle} children={"Group Name:"} />

            <TextInput
                keyboardAppearance="default"
                autoCorrect={false}
                numberOfLines={1}
                placeholder="Enter name..."
                multiline={false}
                placeholderTextColor={colors.placeHolderColor}
                textAlign={"auto"}
                style={styles.styleInputViewSpark}
                onChangeText={(changedText) => { groupName = changedText }}
            />

            <Text style={styles.labelStyle} children={"Group Description:"} />

            <TextInput
                keyboardAppearance="default"
                autoCorrect={false}
                numberOfLines={3}
                placeholder="Enter description..."
                multiline={true}
                returnKeyType="go"
                onSubmitEditing={() => props.onGroupCreate(groupName, groupDesc)}
                placeholderTextColor={colors.placeHolderColor}
                textAlign={"auto"}
                style={styles.styleInputViewSpark}
                onChangeText={(changedText) => { groupDesc = changedText }}
            />


        </View>
    </Dialog>
    );
}

export default ConfirmationModal;