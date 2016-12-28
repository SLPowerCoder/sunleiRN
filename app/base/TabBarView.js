/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';

import List from '../creation/index'
import Edit from '../edit/index'
import Account from '../account/index'


export default class TabBarView extends Component{

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'List'
    }
  }

  render(){

    return(
      <TabBarIOS  tintColor="#ee735c" >
        <Icon.TabBarItem
          title='列表'
          iconName='ios-videocam-outline'
          selectedIconName='ios-videocam'
          selected={this.state.selectedTab === 'List'}
          onPress={() => {
            this.setState({
              selectedTab: 'List',
            });
          }}>
          <List {...this.props}/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title='编辑'
          iconName='ios-recording-outline'
          selectedIconName='ios-recording'
          selected={this.state.selectedTab === 'Edit'}
          onPress={() => {
            this.setState({
              selectedTab: 'Edit',
            });
          }}>
          <Edit {...this.props}/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title='账户'
          iconName='ios-more-outline'
          selectedIconName='ios-more'
          selected={this.state.selectedTab === 'Account'}
          onPress={() => {
            this.setState({
              selectedTab: 'Account',
            });
          }}>
          <Account {...this.props}/>
        </Icon.TabBarItem>

      </TabBarIOS>
    );
    
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