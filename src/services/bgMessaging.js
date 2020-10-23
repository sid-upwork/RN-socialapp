// @flow
import firebase from 'react-native-firebase';
// Optional flow type
import type { RemoteMessage } from 'react-native-firebase';

export default async (message: RemoteMessage) => {
    // handle your message

    console.log(message)
    const notiff = new firebase.notifications.Notification()
        .setTitle(JSON.parse(message.data.message).data.sendername)
        .setBody(JSON.parse(message.data.message).data.msg)
        .setNotificationId(new Date().valueOf().toString())
        .setSound('default')
        .android.setChannelId('channelId')
        .android.setSmallIcon('app_logo')
    //     .android.setLargeIcon('app_logo');

    firebase.notifications()
        .displayNotification(notiff)
        .catch(err => console.log(err + " 98"));

    return Promise.resolve();
}