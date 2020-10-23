import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../../../../Common/BackHeader/BackHeader';
var s = require('./ShareStyle');

export default class ShareClass extends Component {

    render() {
        return (
            <View style={s.mainContainer} >
                <Header title='Share'
                    backValue={true}
                    showDoneButton={false}
                    goBackProp={this.props.navigation} />

            </View>
        );
    }
}

