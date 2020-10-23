import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";

import React from 'react';

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { widthPercentageToDP } from "react-native-responsive-screen";

import App from "../../../App";
import SideBarClass from "./SideBarDrawer/SideBarClass";

//Auth Navigator
import Login from "../Login/LoginClass";
import SignUpClass from "../SignUp/SignUpClass";
import ForgotPasswordClass from "../ForgotPassword/ForgotPasswordClass";
import VerficationClass from "../Verification/VerificationClass";

//Profile Stack
import ProfileClass from "../Profile/ProfileScreen/ParallexView";
import EditProfileClass from "../Profile/EditProfile/EditProfileClass";

import ProfileFollowerFollowingClass from "../Profile/ProfileScreen/ProfileFollowerFollowingClass";

import FollowerClass from "../FollowerAndFollowing/FollowerClass";
import FollowingClass from "../FollowerAndFollowing/FollowingClass";

import FollowerRequests from "../FollowerAndFollowing/FollowerRequests";

//Instant Stack
import MomentsClass from "../Moments/MomentsClass";
import MomentDetailClass from "../Moments/MomentDetail/MomentDetailClass";

//List
import ListClass from "../List/ListClass";
import CreateListClass from "../List/CreateList/CreateListClass";
import ListDetailClass from "../List/ListDetail/ListDetailClass";
import AddDeleteMemberClass from "../List/ListDetail/AddDeleteMembers/AddDeleteMemberClass";

import BookMarkClass from "../BookMark/BookMarkClass";

import ViewPostClass from "../ViewPost/ViewPostClass";
import ChatScreen from "../Message/ChatScreen/ChatScreen";
import NewMessage from "../Message/MessageSetting/NewMessage";
import GroupChatClass from "../Message/GroupChat/GroupChatClass";
import GroupInfoClass from "../Message/GroupInfo/GroupInfoClass";
import ConversationInfoClass from "../Message/ConversationInfo/ConversationInfoClass";

//new Tweet
import NewTweetScreen from "../NewTweet/TweetScreen";
import SelectLocationScreen from "../NewTweet/SelectLocation/SelectLocationScreen";

//Search
import SearchUserClass from "../Search/SearchUser/SearchUserClass";
import ConnectUserClass from "../Search/Connect/ConnectUserClass";
import SearchDetailClass from "../Search/SearchDetailScreen/SearchDetailClass";

//SettingAndPrivacy
import SettingAndPrivacyClass from "../SettingAndPrivacy/SettingAndPrivacyClass";
import AssessibilityClass from "../SettingAndPrivacy/Assessibility/AssessibilityClass";
import AccountClass from "../SettingAndPrivacy/Account/AccountClass";
import PrivacyAndSafetyClass from "../SettingAndPrivacy/PrivacyAndSafety/PrivacyAndSafetyClass";
import TwitterDataClass from "../SettingAndPrivacy/TwitterData/TwitterDataClass";
import BlockedAccountClass from "../SettingAndPrivacy/BlockedAccounts/BlockedAccountClass";

import HelpClass from "../Help/HelpClass";
import { Dimens } from "../../utils/Dimens";
import colors from "../../utils/Colors";

import HomeTab from "../Home/HomeTab";
import NotificationClass from "../Notification/NotificationClass";
import SearchClass from "../Search/SearchScreen/SearchClass";
import MessageClass from "../Message/MessageList/MessageClass";

const ProfileStack = createStackNavigator({
  ProfileClass: {
    screen: ProfileClass,
    navigationOptions: {
      header: null
    }
  },
  EditProfileClass: {
    screen: EditProfileClass,
    navigationOptions: {
      header: null
    }
  },
  ProfileFollowerFollowingClass: {
    screen: ProfileFollowerFollowingClass,
    navigationOptions: {
      header: null
    }
  },
},
  {
    initialRouteKey: ProfileClass
  })

const ListStack = createAppContainer(createStackNavigator(
  {
    ListClass: {
      screen: ListClass,
      navigationOptions: {
        header: null
      }
    },
    CreateListClass: {
      screen: CreateListClass,
      navigationOptions: {
        header: null
      }
    },
    ListDetailClass: {
      screen: ListDetailClass,
      navigationOptions: {
        header: null
      }
    },
    AddDeleteMemberClass: {
      screen: AddDeleteMemberClass,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    initialRouteKey: ListClass
  }))

const MomentStackClass = createStackNavigator({
  MomentsClass: {
    screen: MomentsClass,
    navigationOptions: {
      header: null
    }
  },
  MomentDetailClass: {
    screen: MomentDetailClass,
    navigationOptions: {
      header: null
    }
  }
},
  {
    initialRouteKey: "MomentsClass"
  })

const SettingAndPrivacyStack = createStackNavigator({
  SettingAndPrivacyClass: {
    screen: SettingAndPrivacyClass,
    navigationOptions: {
      header: null
    }
  },
  AssessibilityClass: {
    screen: AssessibilityClass,
    navigationOptions: {
      header: null
    }
  },
  AccountClass: {
    screen: AccountClass,
    navigationOptions: {
      header: null
    }
  },
  PrivacyAndSafetyClass: {
    screen: PrivacyAndSafetyClass,
    navigationOptions: {
      header: null
    }
  },
  TwitterDataClass: {
    screen: TwitterDataClass,
    navigationOptions: {
      header: null
    }
  },
  BlockedAccountClass: {
    screen: BlockedAccountClass,
    navigationOptions: {
      header: null
    }
  }
},
  {
    initialRouteKey: SettingAndPrivacyClass
  })

const NewSparkStack = createStackNavigator({
  NewTweetScreen: {
    screen: NewTweetScreen,
    navigationOptions: {
      header: null
    }
  },
  SelectLocationScreen: {
    screen: SelectLocationScreen,
    navigationOptions: {
      header: null
    }
  }
},
  {
    initialRouteKey: NewTweetScreen
  })

const HomeTabStack = createStackNavigator({
  HomeScreen: {
    screen: HomeTab,
    navigationOptions: {
      header: null
    }
  }
}, {
    initialRouteName: 'HomeScreen'
  })

const SearchStack = createStackNavigator({
  SearchClass: {
    screen: SearchClass,
    navigationOptions: {
      header: null
    }
  },
  ConnectUserClass: {
    screen: ConnectUserClass,
    navigationOptions: {
      header: null
    }
  },
  SearchUserClass: {
    screen: SearchUserClass,
    navigationOptions: {
      header: null
    }
  }
}, {
    initialRouteKey: "SearchClass"
  })

const MessageTabStack = createStackNavigator({
  MessageClass: {
    screen: MessageClass,
    navigationOptions: {
      header: null
    }
  },
  NewMessage: {
    screen: NewMessage,
    navigationOptions: {
      header: null
    }
  },
  ConversationInfoClass: {
    screen: ConversationInfoClass,
    navigationOptions: {
      header: null
    }
  },
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: {
      header: null
    }
  },
  GroupChatClass: {
    screen: GroupChatClass,
    navigationOptions: {
      header: null
    }
  },
  GroupInfoClass: {
    screen: GroupInfoClass,
    navigationOptions: {
      header: null
    }
  }
}, {
    initialRouteName: 'MessageClass',
  })

const Tabs = createAppContainer(createBottomTabNavigator(
  {
    "Home Screen": {
      screen: HomeTabStack,
      navigationOptions: {
        header: null
      }
    },
    "Notification": {
      screen: NotificationClass,
      navigationOptions: {
        header: null
      }
    },
    "Search": {
      screen: SearchStack,
      navigationOptions: {
        header: null
      }
    },
    "Message": {
      screen: MessageTabStack,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ scene, jumpToIndex }) => {
        const { route, focused, index } = scene;
        if (focused) {
          if (route.index > 0) {
            const { routeName, key } = route.routes[1]
            navigation.dispatch(NavigationActions.back({ key }))
          }
        } else {
          jumpToIndex(index);
        }
      },
    }),
    defaultNavigationOptions: ({ navigation }) => ({

      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        if (routeName === 'Home Screen') {
          iconName = 'home';
        } else if (routeName === 'Notification') {
          iconName = `bell`;
        } else if (routeName === 'Search') {
          iconName = `magnifier`;
        } else if (routeName === 'Message') {
          iconName = `envelope`;
        }

        return <SimpleLineIcons name={iconName} size={Dimens.smallIconSize} color={tintColor} />;
      }
    }),
    tabBarPosition: "bottom",
    swipeEnabled: true,
    animationEnabled: true,
    header: null,
    order: ["Home Screen", "Search", "Notification", "Message"],
    tabBarOptions: {
      activeBackgroundColor: colors.activeTabColor,
      inactiveBackgroundColor: colors.inactiveTavColor,
      activeTintColor: colors.activeColor,
      inactiveTintColor: colors.inactiveColor,
      scrollEnabled: false,
      showLabel: false,
      tabStyle: {
        padding: Dimens.five,
        marginRight: Dimens.one,
      },
      style: {
        backgroundColor: colors.textLightColor,
      },
    },
  }
));

const DrawerNavigation = createAppContainer(createDrawerNavigator({
  TabScreenClass: {
    screen: Tabs
  },
  ViewPostClass: {
    screen: ViewPostClass,
    navigationOptions: {
      drawerLockMode: "locked-closed"
    }
  },
  SearchDetailClass: {
    screen: SearchDetailClass,
    navigationOptions: {
      header: null
    }
  },
  NewSparkStack: {
    screen: NewSparkStack,
    navigationOptions: {
      drawerLockMode: "locked-closed"
    }
  },
  ProfileStack: {
    screen: ProfileStack,
    navigationOptions: {
      drawerLockMode: "locked-closed"
    }
  },
  ListStack: {
    screen: ListStack,
    navigationOptions: {
      drawerLockMode: "locked-closed"
    }
  },
  BookMarkClass: {
    screen: BookMarkClass,
    navigationOptions: {
      drawerLockMode: "locked-closed"
    }
  },
  FollowerClass: {
    screen: FollowerClass,
    navigationOptions: {
      drawerLockMode: "locked-closed"
    }
  },
  FollowingClass: {
    screen: FollowingClass,
    navigationOptions: {
      drawerLockMode: "locked-closed"
    }
  },
  MomentStack: {
    screen: MomentStackClass,
    navigationOptions: {
      drawerLockMode: "locked-closed"
    }
  },
  FollowerRequests: {
    screen: FollowerRequests,
    navigationOptions: {
      drawerLockMode: "locked-closed"
    }
  },
  HelpClass: {
    screen: HelpClass,
    navigationOptions: {
      drawerLockMode: "locked-closed"
    }
  },
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: {
      header: null
    }
  },
  SettingAndPrivacyStack: {
    screen: SettingAndPrivacyStack,
    navigationOptions: {
      drawerLockMode: "locked-closed"
    }
  }
},
  {
    drawerWidth: widthPercentageToDP(90),
    contentComponent: SideBarClass,
    initialRouteName: 'TabScreenClass',
    unmountInactiveRoutes: true
  }
));

const AuthNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  ForgotPasswordClass: {
    screen: ForgotPasswordClass,
    navigationOptions: {
      header: null
    }
  }
}, {
    initialRouteName: "Login"
  })

export default AppNavigator = createAppContainer(createSwitchNavigator({
  App: {
    screen: App,
    navigationOptions: {
      header: null
    }
  },
  AuthNavigator: {
    screen: AuthNavigator,
    navigationOptions: {
      header: null
    }
  },
  VerficationClass: {
    screen: VerficationClass,
    navigationOptions: {
      header: null
    }
  },
  DrawerNavigator: {
    screen: DrawerNavigation,
    navigationOptions: {
      header: null
    }
  },
}, { initialRouteName: "App" }
))

