import React, { PureComponent } from "react";
import { View, StatusBar, AsyncStorage, PermissionsAndroid, Platform } from "react-native"
import SplashScreen from "react-native-splash-screen";

import colors from "./src/utils/Colors";

export default class App extends PureComponent {

  constructor(props) {
    super(props)
    this.checkLogin();
  }

  async  requestCameraPermission() {

    try {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      ])
        .then(result => {
        })

    } catch (err) {
      console.warn(err);
    }
  }

  checkLogin = async () => {

    if (Platform.OS == "android")
      this.requestCameraPermission();

    let auth = "";
    try {
      auth = await AsyncStorage.getItem("authenticated");
    } catch (error) {
      console.log(error.message);
    }
    SplashScreen.hide();
    this.props.navigation.navigate(auth === 'Yes' ? "DrawerNavigator" : "AuthNavigator")

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} backgroundColor={colors.drawerBack} barStyle="light-content" />
      </View>
    )
  }

}
