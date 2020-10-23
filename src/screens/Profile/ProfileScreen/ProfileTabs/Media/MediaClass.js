import React, { Component } from 'react';
import { FlatList, View } from 'react-native';

var s = require('./MediaStyle');
import CommonView from "../../../../Common/CommonView";
import { connect } from "react-redux";

class MediaClass extends Component {

    constructor(props) {
        super(props)
        const { profileResponse, userId } = this.props.ProfileReducers;
        const dta = profileResponse
        this.state = {
            data: dta
        }
    }

    render() {
        const { data } = this.state;

        return (
            <View style={s.mainContainer} >

                <FlatList style={s.flatListContainer}
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.post_id.toString()}
                    renderItem={({ item }) =>

                        <CommonView item={item}
                            userId={userId}
                            triggerEvents={this.props}
                            onPressEvent={() => this.showPost(item.post_id)} />
                    }
                />
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        ProfileReducers: state.ProfileReducers
    };
}


export default connect(mapStateToProps)(MediaClass);
