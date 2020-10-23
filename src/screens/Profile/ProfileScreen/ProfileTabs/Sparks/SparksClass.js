import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import CommonView from "../../../../Common/CommonView";

import { connect } from "react-redux";

var s = require('./SparksStyle');

class SparkClass extends Component {
   
    showPost(post_id) {
        this.props.screenProps.navigation.navigate('ViewPostClass', { postId: post_id });
    }

    render() {
        const { profileResponse, userId } = this.props.ProfileReducers;

        return (<View style={s.mainContainer} >

            <FlatList style={s.flatListContainer}
                data={profileResponse.myTweets}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.post_id.toString()}
                renderItem={({ item }) =>

                    <CommonView item={item}
                        userId={userId}
                        triggerEvents={this.props}
                        onPressEvent={() => this.showPost(item.post_id)} />

                } />
        </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        ProfileReducers: state.ProfileReducers
    };
}


export default connect(mapStateToProps)(SparkClass);
