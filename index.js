import { AppRegistry } from "react-native";
import React from "react";
import AppNavigator from "./src/screens/Navigators/AppNaviGators";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
import configureStore from "./src/redux/store/configureStore";
import { MenuProvider } from 'react-native-popup-menu';
import bgMessaging from './src/services/bgMessaging';

const store = configureStore();

const ReduxApp = () => (
  <Provider store={store}>
    <MenuProvider>
      <AppNavigator />
    </MenuProvider >
  </Provider >
);
AppRegistry.registerComponent(appName, () => ReduxApp);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); 