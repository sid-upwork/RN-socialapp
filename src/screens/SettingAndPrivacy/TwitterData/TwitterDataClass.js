import React, { PureComponent } from 'react';
import { Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Header from '../../Common/BackHeader/BackHeader';
import { showProgressDialog } from "../../../utils/Utilities";
import Moment from "moment";
import { connect } from "react-redux";
import { Dimens } from '../../../utils/Dimens';
var s = require('./TwitterDataStyle');
import Dialog, {
    ScaleAnimation,
    DialogTitle
} from "react-native-popup-dialog";

class TwitterDataClass extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showIpDialog: false
        }
    }

    ipDialog(sparkData) {
        return (
            <Dialog
                animationDuration={500}
                height={0.5}
                width={0.8}
                onTouchOutside={() => { this.setState({ showIpDialog: false }) }}
                OnHardwareBackPress={() => { this.setState({ showIpDialog: false }) }}
                containerStyle={s.dialogContainer}
                rounded
                visible={this.state.showIpDialog}
                dialogTitle={
                    < DialogTitle
                        style={{ backgroundColor: colors.appRed }}
                        textStyle={s.dialogHeader}
                        title="Your previous login sessions"
                    />
                }
                dialogAnimation={
                    new ScaleAnimation({ toValue: 0, useNativeDriver: true })
                }>

                <View style={s.dialogHeaderTextConatiner}>
                    <Text style={s.ipAddressHeaderStyle} children={"IP Address"} />
                    <Text style={s.ipAddressHeaderStyle} children={"Time"} />
                </View>

                <View style={s.divider} />

                <FlatList
                    style={{ flex: 1 }}
                    data={sparkData.ip_history}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={100}
                    onEndReachedThreshold={1200}
                    ItemSeparatorComponent={this.renderDivider}
                    initialNumToRender={5}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={true}
                    renderItem={({ item, index }) => (

                        <View style={s.dialogHeaderTextConatiner}>
                            <Text style={s.ipAddressStyle} children={item.ip} />
                            <Text style={s.ipAddressStyle} children={item.updated} />
                        </View>

                    )} />

            </Dialog>
        );
    }

    renderDivider() {
        return <View style={s.divider} />
    }
    renderSparkData(sparkData) {
        return (<View style={s.bodyContainer} >

            {this.ipDialog(sparkData)}
            <ScrollView>

                <Text style={s.headerStyle} children={"Your 2Cents data"} />
                <Text style={s.headerDetailStyle} children={"Review your profile information and data associated with your account."} />

                <View style={s.divider} />

                <View style={s.filterContainer}>
                    <View style={s.textContainer}>
                        <Text style={s.textStyling} children={"UserName :"} />
                        <View style={{ flexDirection: 'column', alignItems: 'center', paddingEnd: Dimens.ten }} >
                            <Text style={s.innnerTextStyling} children={sparkData.username} />
                            <Text style={s.ipTextStyling} children={"USER ID: " + sparkData.id} />
                        </View>

                    </View>
                </View>
                <View style={s.divider} />

                <View style={s.filterContainer}>
                    <View style={s.textContainer}>
                        <Text style={s.textStyling} children={"Account creation :"} />
                        <View style={{ flexDirection: 'column', alignItems: 'center', paddingEnd: Dimens.ten }} >
                            <Text style={s.innnerTextStyling} children={Moment(sparkData.sign_ip.created).format('DD-MMM-YYYY hh:mm a')} />
                            <Text style={s.ipTextStyling} children={sparkData.sign_ip.ip} />
                        </View>
                    </View>
                </View>
                <View style={s.divider} />

                <View style={s.filterContainer}>
                    <View style={s.textContainer}>
                        <Text style={s.textStyling} children={"Phone :"} />
                        <View style={s.inLineContainer} >
                            <Text style={s.innnerTextStyling} children={sparkData.phone_number} />
                        </View>

                    </View>
                </View>
                <View style={s.divider} />

                <View style={s.filterContainer}>
                    <View style={s.textContainer}>
                        <Text style={s.textStyling} children={"Email :"} />
                        <View style={s.inLineContainer} >
                            <Text style={s.innnerTextStyling} children={sparkData.email} />
                        </View>

                    </View>
                </View>
                <View style={s.divider} />

                <View style={s.filterContainer}>
                    <View style={s.textContainer}>
                        <Text style={s.textStyling} children={"Gender :"} />
                        <View style={s.inLineContainer} >
                            <Text style={s.innnerTextStyling} children={sparkData.gender} />
                        </View>

                    </View>
                </View>
                <View style={s.divider} />

                <View style={s.filterContainer}>
                    <View style={s.textContainer}>
                        <Text style={s.textStyling} children={"Birth date :"} />
                        <View style={s.inLineContainer} >
                            <Text style={s.innnerTextStyling} children={Moment(sparkData.dob).format('DD-MMM-YYYY')} />
                        </View>

                    </View>
                </View>
                <View style={s.divider} />

                <View style={s.filterContainer}>
                    <View style={s.textContainer}>
                        <Text style={s.textStyling} children={"Protected Sparks"} />
                        <View style={s.inLineContainer} >
                            <Text style={s.innnerTextStyling} children={"Yes"} />
                        </View>

                    </View>
                </View>
                <View style={s.divider} />

                <Text style={s.headerStyle} children={"Account history"} />

                <View style={s.filterContainer}>
                    <TouchableOpacity style={s.textContainer}
                        onPress={() => {
                            this.setState({ showIpDialog: true })
                        }}
                    >
                        <Text style={s.textStyling} children={"Account access history"} />
                        <View style={s.inLineContainer} >
                            <Text style={s.innnerTextStyling} children={sparkData.ip_history.length} />
                        </View>

                    </TouchableOpacity>
                </View>
                <View style={s.divider} />

            </ScrollView>

        </View>
        );
    }

    render() {
        const { settingData, updatingSpark, sparkDataError } = this.props.SettingReducers;
        return (
            <View style={s.mainContainer} >
                <Header title="Your 2Cents data"
                    backValue={true}
                    showDoneButton={false}
                    goBackProp={this.props.navigation} />
                {showProgressDialog(updatingSpark)}
                {this.renderSparkData(settingData.sparkData)}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        SettingReducers: state.SettingReducers
    };
}

export default connect(mapStateToProps)(TwitterDataClass);
