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
  NavigatorIOS,
} from 'react-native';

import TabBarView from '../base/TabBarView'

//根视图
export default class App extends Component {

  render() {
    return (
          <NavigatorIOS
            style={styles.container}
            tintColor='#FF6600'
            //初始化一个路由栈，并设置第一个默认场景
            initialRoute={{
              title: '视频',
              component: TabBarView,
            }}
            //配置转场动画
            configureScene={()=>{
                return  Navigator.SceneConfigs.PushFromRight;
            }}
            //渲染场景
            renderScene={(route, navigator) => {
                let Component = route.component;
                return (
                    <Component navigator = {navigator} route = {route} {...route.passProps} />
                )
            }}
          />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  },
});