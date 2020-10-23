import React, { PureComponent } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { DrawerActions } from "react-navigation";
import LineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FastImage from 'react-native-fast-image';

import s from "./HeaderStyle";
import colors from "../../../utils/Colors";
import { Dimens } from "../../../utils/Dimens";

export default class Header extends PureComponent {
    constructor(props) {
        super(props);
    }

    openDrawers() {
        this.props.screenProps.navigation.dispatch(DrawerActions.openDrawer());
    }

    render() {
        return (
            <View style={s.headerContainer}>
                <TouchableOpacity style={s.headerImageBackgroundStyle} onPress={this.openDrawers.bind(this)} >
                    <FastImage style={s.headerImageStyle}
                        source={{
                            uri: this.props.profileImage,
                            priority: FastImage.priority.high
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </TouchableOpacity>

                <Text style={s.headerTextStyle}>{this.props.headerTitleName}</Text>

                <TouchableOpacity style={[s.visibleSettingIconStyle, this.props.showSettingButton ? s.visibleSettingIconStyle : s.hiddenSettingIconStyle]}
                    onPress={() => this.props.screenProps.navigation.navigate(this.props.triggeredScreenName)}>
                    <LineIcons name={"settings"} size={Dimens.mediumIconSize} color={colors.white} />
                </TouchableOpacity>
            </View>

        );
    }
}


