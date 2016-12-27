/**
 * created by sunlei on 16/12/26
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class VideoListDetail extends Component{

  render(){
    return(
      <View style={styles.container}>
        <Text>视频详情页</Text>
      </View>
    )
  }
}

//样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});