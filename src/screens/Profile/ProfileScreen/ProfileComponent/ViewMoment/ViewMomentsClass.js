import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../../../../Common/BackHeader/BackHeader';

var s = require('../Share/ShareStyle');
export default class ViewMomentsClass extends Component {
    render() {
        return (
            <View style={s.mainContainer} >

                <Header title='View Instants'
                    backValue={true}
                    showDoneButton={false}
                    goBackProp={this.props.navigation} />

            </View>
        );
    }
}

