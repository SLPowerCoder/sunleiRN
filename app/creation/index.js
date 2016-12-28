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

import Swiper from 'react-native-swiper';

import Constant from '../common/const'
import Icon  from 'react-native-vector-icons/Ionicons';
import NetUtil from '../common/NetUtil'
import VideoListDetail from './VideoListDetail'

var SCREEN_W = Dimensions.get('window').width;
var SCREEN_H = Dimensions.get('window').height;
const urlStr = 'http://food.boohee.com/fb/v1/feeds?page=0&per=10'
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
    //food list data
    NetUtil.get(urlStr,'',(jasonData)=>{
        //下面是请求下来的数据
        console.log(jasonData);
        this.setState({
            // 一定要用dataSource的cloneWithRows来克隆数据源
            dataSource: this.state.dataSource.cloneWithRows(jasonData.feeds),
            isRefreshing:false
        });
    },(error)=>{
        console.error(error);
        alert('网络错误！')
    })
    //banner list data 
    NetUtil.get('http://food.boohee.com/fb/v1/home/banners','',(jasonData)=>{
        //下面是请求下来的数据
        console.log(jasonData);
        this.bannerList = jasonData.banners
        this.setState({
            // 一定要用dataSource的cloneWithRows来克隆数据源
            // dataSource: this.state.dataSource.cloneWithRows(jasonData.feeds),
            isRefreshing:false
        });
    },(error)=>{
        console.error(error);
        alert('网络错误！')
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
           <Swiper
                height={200}
                loop={true}
                autoplay={true}
                dot={<View style={styles.customDot} />}
                activeDot={<View style={styles.customActiveDot} />}
                paginationStyle={{
                    bottom: 10
                }}
                backgroundColor='cyan'
            >
                    {this.bannerList.map((banner) => {
                        console.log("遍历banner数组");
                        return (
                            <TouchableOpacity key={banner.name} activeOpacity={0.75} onPress = {this._onBannerPress.bind(this)}>
                                <Image
                                    style={styles.bannerImage}
                                    source={{uri:banner.image_key}}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </Swiper>
        </View>
        )
  }
  //广告条
  _onBannerPress(){
      console.log('广告条被点击了')
      alert('我是banner')
  }
  //cell
  _renderRow(rowData,sectionID,rowID){

      let placeHolderPic = {
          uri:require('../images/img_my_bg.png') //本地占位图
      };
      
      return(
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={this._cellPress.bind(this)}
          >
            <View style={styles.item}>
                 {/**注意加载本地图片时要这样间接的写，不能直接用require */}
                 <Image source={rowData.background ? {uri:rowData.background} : placeHolderPic.uri} style={styles.listHeaderImage}>
                    <Text  style={{marginLeft:30,marginTop:30,width:150,height:16,fontSize:14}}>
                        {rowData.title}
                    </Text>
                    <Text  style={{marginLeft:30,marginTop:30,width:Constant.window.width,height:20,fontSize:16,fontWeight:'bold'}}>
                        {rowData.content}
                    </Text>
                    <Text  style={{marginLeft:30,marginTop:50,width:150,height:16,fontSize:14,backgroundColor:'white'}}>
                        {rowData.tail}
                    </Text>
                 </Image>
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
      height:200,
  },
  bannerImage:{
      height: 200,
      width: Constant.window.width,
      backgroundColor:'yellow'
  },
  listHeaderImage:{
      flex:1,
    //   backgroundColor:'purple',
  },
  listView:{
      backgroundColor:'white'
  },
  item:{
      height:180,
      marginBottom:8,
    //   backgroundColor:'#ee701a'
  },
  customDot: {
        backgroundColor: '#ccc',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },
    customActiveDot: {
        backgroundColor: 'white',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },
});