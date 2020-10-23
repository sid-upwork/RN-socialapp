import React, { PureComponent } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import FeatherIcon from "react-native-vector-icons/MaterialIcons";

import s from "./BackHeaderStyle";
import colors from "../../../utils/Colors";
import { Dimens } from "../../../utils/Dimens";

export default class Header extends PureComponent {
  constructor(props) {
    super(props);
  }

  onbackPress() {
    this.props.backValue
      ? this.props.goBackProp.goBack(null)
      : this.props.goBackProp.goBack();
  }

  render() {
    const { title, backValue, showDoneButton, onPress, goBackProp, iconName, rightIcon, rightText } = this.props;
    var rightTextValue = rightText == null ? "Done" : rightText;

    return (
      <View style={s.headerContainer}>
        <TouchableOpacity
          style={s.drawerIconStyle}
          onPress={this.onbackPress.bind(this)}>
          <FeatherIcon name={"chevron-left"} size={Dimens.largeIconSize} color={colors.white} />
        </TouchableOpacity>

        <Text numberOfLines={1} style={s.headerTextStyle}>{title}</Text>

        {rightIcon === "icon" ?
          (
            <TouchableOpacity style={s.drawerIconStyle} onPress={onPress}>
              <FeatherIcon name={iconName} size={Dimens.largeIconSize} color={colors.white} />
            </TouchableOpacity>
          ) :
          (
            <TouchableOpacity
              style={[s.hiddenSaveTextContainer, showDoneButton ? s.visibleSaveTextContainer : s.hiddenSaveTextContainer]}
              onPress={onPress}>
              <Text style={[s.hiddenSaveTextStyle, showDoneButton ? s.visibleSaveTextStyle : s.hiddenSaveTextStyle]}
                children={rightTextValue}
              />
            </TouchableOpacity>
          )}
      </View>
    );
  }
}
