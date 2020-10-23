import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../../utils/Colors';
import { Dimens } from '../../../utils/Dimens';
class FacebookTabBar extends React.Component {
  icons = [];

  constructor(props) {
    super(props);
    this.icons = [];
  }

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this));
  }

  setAnimationValue({ value, }) {
    this.icons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  }

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  render() {
    return <View style={[styles.tabs, this.props.style,]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity
          key={tab}
          onPress={() => this.props.goToPage(i)}
          style={styles.tab}>
          <Text style={[styles.tabTextUnSelected, this.props.activeTab === i ? styles.tabTextSelected : styles.tabTextUnSelected]} children={tab} />
          <View style={[styles.tabLinesSelected, this.props.activeTab === i ? styles.tabLinesSelected : styles.tabLinesUnSelected]} />


          {/* <Icon
            name={tab}
            size={30}
            color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
            ref={(icon) => { this.icons[i] = icon; }}
          /> */}

        </TouchableOpacity>;
      })}
    </View>;
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: Dimens.ten,
  },

  tabTextSelected: {
    color: colors.appRed
  },
  tabTextUnSelected: {
    fontSize: Dimens.mediumTextSize,
    color: colors.appGreen
  },
  tabLinesSelected: {
    width: '100%',
    alignSelf: 'flex-end',
    marginTop: Dimens.seven,
    height: Dimens.three,
    backgroundColor: colors.appRed
  },
  tabLinesUnSelected: {
    width: '100%',
    alignSelf: 'flex-end',
    marginTop: Dimens.seven,
    height: Dimens.three,
    backgroundColor: colors.white
  },
  tabs: {
    height: Dimens.fourtyFive,
    color: colors.appGreen,
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingTop: Dimens.five,
    borderWidth: Dimens.one,
    borderTopWidth: Dimens.zero,
    borderLeftWidth: Dimens.zero,
    borderRightWidth: Dimens.zero,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});

export default FacebookTabBar;