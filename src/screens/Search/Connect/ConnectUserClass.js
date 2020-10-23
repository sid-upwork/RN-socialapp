import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity, FlatList, NetInfo } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import s from "./ConnectUserStyle";

import FastImage from "react-native-fast-image";
import colors from "../../../utils/Colors";
import { Dimens } from "../../../utils/Dimens";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getFollowingFollowerList, followUser } from "../../../redux/action/FollowingFollowerAction";
import Header from '../../Common/BackHeader/BackHeader';
import { showProgressDialog, renderErrorNoDataFound } from "../../../utils/Utilities";

class ConnectUserClass extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      horizontalListIndex: 0,
      userId: this.props.navigation.getParam("userId", ""),
      internetConnected: false
    }


    this.openSearchScreen = this.openSearchScreen.bind(this);
    // int j = 0 ;
    //       int k = 1;       
    //      for(int i = 1 ; i<=20 ;i++){
    //         System.out.println("i "+i); 
    //         if(i % 7 == 0){
    //              for( j = k ; j <=15; j++){
    //              System.out.print(" k" +j );             
    //               if(j % 7 == 0){
    //                    k = 8;
    //                   System.out.println(" break");
    //                   break;
    //               }              
    //          }
    //         }        
    //      }
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    NetInfo.isConnected.fetch().done((isConnected) => {
      if (!isConnected) {
        Alert.alert("No internet connection..!")
        return;
      }
      this.setState({ internetConnected: isConnected },
        () => this.props.getFollowingFollowerList(JSON.stringify({ user_id: this.state.userId }))
      )
    })
  }

  handleConnectivityChange = (connected) => {
    this.setState({ internetConnected: connected });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }


  openSearchScreen() {
    this.props.navigation.navigate('SearchUserClass', { "userId": this.state.userId })
  }

  renderMainView(suggestion) {
    return (
      <FlatList
        style={s.flatListContainer}
        renderSeparator={this.ListViewItemSeparator}
        data={suggestion}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.user_id}
        renderItem={({ item, index }) => (

          <View style={s.bodyContainer}>
            <View style={{ flexDirection: 'row', padding: Dimens.ten }}>

              <FastImage
                style={s.imageStyle}
                source={{
                  uri: item.profile_image,
                  priority: FastImage.priority.high
                }}
                resizeMode={FastImage.resizeMode.cover} />

              <View style={s.rightContainer}>
                <View style={s.upperContainer}>
                  <View style={s.nameContainer}>
                    <Text style={s.nameStyle} children={item.name} />
                    <Text style={s.usernameStyle} children={item.username} />
                  </View>

                  <MaterialIcons
                    style={[s.hideVerifiedIconStyle, item.verified ? s.showVerifiedIconStyle : null]}
                    name={"verified-user"} size={Dimens.tinyIconSize} color={colors.red} />

                  <TouchableOpacity
                    style={[s.followContainer, item.status == "1" || item.status == "2" ? s.followingContainer : null]}
                    onPress={() => {
                      if (!this.state.internetConnected) {
                        Alert.alert("No internet connection!")
                        return
                      }
                      this.props.followUser(index, JSON.stringify({ 'user_id': this.state.userId, 'follower_id': item.user_id }), "SuggestionClass")
                    }}>
                    <Text style={[s.followTextStyle, item.status == "1" || item.status == "2" ? s.followingTextStyle : null]}>
                      {item.status == "1" ? "Following" : item.status == "0" ? "Follow" : "Pending"}
                    </Text>
                  </TouchableOpacity>

                </View>

                <Text style={s.detailTextStyle} children={item.details} />

              </View>
            </View>
            <View style={s.divider} />
          </View>
        )}
      />
    )
  }

  render() {
    const { followerFollowingData, isFetching, error } = this.props.FollowerFollowingReducer;
    return (
      <View style={s.mainContainer} >
        <Header title="Connect"
          backValue={true}
          iconName={"search"}
          rightIcon={"icon"}
          showDoneButton={false}
          onPress={this.openSearchScreen.bind(this)}
          goBackProp={this.props.navigation} />

        {showProgressDialog(isFetching)}
        {!error &&
          followerFollowingData.suggestion != null &&
          followerFollowingData.suggestion != undefined &&
          followerFollowingData.suggestion.length > 0 ?
          this.renderMainView(followerFollowingData.suggestion)
          : renderErrorNoDataFound("There are no suggestions!")
        }
      </View>

    );
  }
}

function mapStateToProps(state) {
  return {
    FollowerFollowingReducer: state.FollowerFollowingReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ getFollowingFollowerList, followUser }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectUserClass);
