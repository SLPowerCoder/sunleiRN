/**
 * created by sunlei on 16/12/26
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  Image,
} from 'react-native';

import Icon  from 'react-native-vector-icons/Ionicons';
import NetUtil from '../common/NetUtil'
import VideoListDetail from './VideoListDetail'

var SCREEN_W = Dimensions.get('window').width;
var SCREEN_H = Dimensions.get('window').height;
const urlStr = 'http://platform.sina.com.cn/sports_all/client_api?app_key=3571367214&_sport_t_=football&_sport_s_=opta&_sport_a_=teamOrder&type=213&season=2015&format=json'
//   const urlStr = 'http://facebook.github.io/react-native/movies.json'

export default class List extends Component{
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      //初始化一个空数据源，记得设置enableEmptySections=true，不然在这个版本中会有警告
      dataSource: ds.cloneWithRows([]),
      isRefreshing:true
    };
  }

  componentWillMount(){
      console.log('componentWillMount')
    //   this.rightAction();
  }

  componentDidMount(){
      console.log('componentDidMount')
      this.getNetData();
  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
  }
  
  getNetData(){
    //get请求,以百度为例,没有参数,没有header
    NetUtil.get(urlStr,'',(jasonData)=>{
        //下面是请求下来的数据
        console.log(jasonData);
        this.setState({
            // 一定要用dataSource的cloneWithRows来克隆数据源
            dataSource: this.state.dataSource.cloneWithRows(jasonData.result.data),
            isRefreshing:false
        });
    },(error)=>{
        console.error(error);
    })
}

  render() {
    return (
      <View style={styles.container}>
        <ListView 
            style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            //允许组头为空
            enableEmptySections = {true}
            automaticallyAdjustContentInsets = {true}
            // showsVerticalScrollIndicator = {false}
            pagingEnabled = {false}
            //多少个像素为一页
            pageSize = {10}
            renderHeader = {this._renderListHeader.bind(this)}
            // renderFooter = {this._renderListHeader.bind(this)}
            //描述还有多少个像素就要滑到底部的时候会触发onEndReached回调方法，这样我们可以在滑到底部之前提前加载网络数据
            onEndReachedThreshold = {100}   
            //滑动到“底部”的时候会被调用
            onEndReached = {this._onUpRrefresh.bind(this)}   
            refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        title="正在加载中…"
                        color="#ccc"
                    />
            }
        />
      </View>
    );
  }

//表头
 _renderListHeader(){
    return(
        this.state.isRefreshing ? null :
        <View style = {[styles.listHeader]}>
            <Text style = {{flex:1,textAlign:'center',backgroundColor:'yellow'}}>我是列表头</Text>
        </View>
        )
  }

  //cell
  _renderRow(rowData){

      let pic = {
          uri: rowData.logo,
          src:require('../../relay.png') //本地占位图
      };
      return(
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={this._cellPress.bind(this)}
          >
            <View style={styles.item}>
                 <Text style={styles.listHeaderTitle}>{rowData.team_cn}</Text>
                 {/**注意加载本地图片时要这样间接的写，不能直接用require */}
                 <Image source={rowData.logo ? pic : pic.src} style={styles.listHeaderImage}/>
            </View>
          </TouchableOpacity>
      )
  }

  //cell被点击了
  _cellPress(){
      console.log('cell被点击了');
      //一定要在组件卸载的时候在componentWillUnmount函数中清除定时器，不然就会crash
      this.timer = setTimeout(
      () => { 
        //   alert('cell被点击了！');
            this.props.navigator.push({
                title: '视频详情页',
                component: VideoListDetail,
            });
        },
        30 //单位是毫秒
      );
  }

  //下拉刷新
  _onRefresh(){
      console.log('下拉刷新中。。。。')
      this.getNetData();
  }

  //上拉刷新
  _onUpRrefresh(){
      console.log('上拉刷新中。。。。')
      this.getNetData();
  }
}

//样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeader:{
      height:180,
  },
  listHeaderTitle:{
      backgroundColor:'purple',
      textAlign:'center',
      paddingTop:15,
      paddingBottom:10,
  },
  listHeaderImage:{
      flex:1,
      backgroundColor:'purple',
  },
  listView:{
      backgroundColor:'white'
  },
  item:{
      height:180,
      marginBottom:8,
      backgroundColor:'#ee701a'
  },
});