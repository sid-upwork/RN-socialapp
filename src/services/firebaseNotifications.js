
import { notifications, messaging } from './firebase';
import firebase from 'react-native-firebase';
import { Platform } from "react-native";

import type { Notification, NotificationOpen } from 'react-native-firebase';


export function firebaseListeners() {

  notifications.onNotification((notification) => {
    displayNotificationFromCustomData(notification)
  }, error => {
    console.log(error)
  });

  // notifications.onNotificationDisplayed((notification) => {
  //   console.log(notification)
  //   // notifications.getBadge()
  //   //   .then(count => {
  //   //     count++
  //   //     notifications.setBadge(count)
  //   //   })
  //   //   .then(() => {
  //   //     console.log('Doing great')
  //   //   })
  //   //   .catch(error => {
  //   //     console.log('fail to count')
  //   //   })
  //   displayNotificationFromCustomData(notification)
  // });

  notifications.onNotificationOpened((notificationOpen) => {
    displayNotificationFromCustomData(notificationOpen.notification)
  }, error => {
    console.log(error)
  });

  notifications.getInitialNotification()
    .then(
      notificationOpen => {
        if (notificationOpen) displayNotificationFromCustomData(notificationOpen.notification)
      }
    ).catch(
      error => console.log(error)
    )

  messaging.onMessage((message) => {
    displayNotificationFromCustomData(message)

  },
    error => console.log(error));

  // messaging.setBackgroundMessageHandler((message) => {
  //   console.log((JSON.stringify(message) + "     56"));
  //   displayNotificationFromCustomData(message)

  // },
  //   error => console.log(error))
}

function displayNotificationFromCustomData(notificationData) {

  console.log((notificationData))
  switch (Platform.OS) {
    case "ios":

      const localNotification = new firebase.notifications.Notification()
        .setTitle(JSON.parse(notificationData._data.message).data.sendername)
        .setBody(JSON.parse(notificationData._data.message).data.msg)
        .setNotificationId(new Date().valueOf().toString())
        .setSound('default');


      console.log((localNotification + "     70"));
      notifications
        .displayNotification(localNotification)
        .catch(err => console.log(err + " 73"));

      break;

    case "android":

      const channel = new firebase.notifications.Android.Channel(
        'channelId',
        'Channel Name',
        firebase.notifications.Android.Importance.Max
      ).setDescription('A natural description of the channel');
      firebase.notifications().android.createChannel(channel);

      const notiff = new firebase.notifications.Notification()
        .setTitle(JSON.parse(notificationData._data.message).data.sendername)
        .setBody(JSON.parse(notificationData._data.message).data.msg)
        .setNotificationId(new Date().valueOf().toString())
        .setSound('default')
        .android.setChannelId('channelId')
        .android.setSmallIcon('app_icon')
        .android.setLargeIcon('app_icon')
        .android.setColor('#000000') // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);

      notifications
        .displayNotification(notiff)
        .catch(err => console.log(err + " 89"));

      break;

    default:
  }
}