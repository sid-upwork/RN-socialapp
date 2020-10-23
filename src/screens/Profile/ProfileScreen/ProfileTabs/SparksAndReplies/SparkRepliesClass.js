import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

var s = require('./SparkRepliesStyle');
import CommonView from "../../../../Common/CommonView";
import { connect } from "react-redux";

class SparksRepliesClass extends Component {

    render() {
        const { profileResponse, userId } = this.props.ProfileReducers;

        return (
            <View style={s.mainContainer} >

                <FlatList style={s.flatListContainer}
                    data={profileResponse.postLikes}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.post_id.toString()}
                    renderItem={({ item }) =>

                        <CommonView item={item}
                            userId={userId}
                            triggerEvents={this.props}
                            onPressEvent={() => this.showPost(item.post_id)} />}
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


export default connect(mapStateToProps)(SparksRepliesClass);
