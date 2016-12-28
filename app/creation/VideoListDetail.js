/**
 * created by sunlei on 16/12/26
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

var DEFAULT_URL = 'http://www.lcode.org';

export default class VideoListDetail extends Component{
  render() {
    return (
      <View style={{flex:1}}>
        <WebView  
          url={DEFAULT_URL}
          startInLoadingState={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          >
        </WebView>
      </View>
    );
  }
}