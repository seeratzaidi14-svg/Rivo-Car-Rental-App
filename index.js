/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-url-polyfill/auto';

// Notifee background event handler
import notifee, { EventType } from '@notifee/react-native';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  if (type === EventType.ACTION_PRESS && pressAction.id === 'default') {
    console.log('User pressed the notification in the background:', notification);
    // You can handle deep linking here if needed
  }
});

AppRegistry.registerComponent(appName, () => App);
