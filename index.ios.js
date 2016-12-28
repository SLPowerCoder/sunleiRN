/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  StatusBarIOS,
  NavigatorIOS,
} from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';

import App from './app/base/App'

//根视图
export default class sunleiRN extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
          <App />
        </View>
    );
  }
}

AppRegistry.registerComponent('sunleiRN', () => sunleiRN);
