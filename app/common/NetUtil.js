/**
 * Created by sunlei on 16/12/26.
 */
// let Util = {
//     /*
//      * fetch简单封装
//      * url: 请求的URL
//      * successCallback: 请求成功回调
//      * failCallback: 请求失败回调
//      * 
//      * */
//     get: (url, successCallback, failCallback) => {
//         fetch(url)
//             .then((response) => response.text())
//             .then((responseText) => {
//                 successCallback(JSON.parse(responseText));
//             })
//             .catch((err) => {
//                 failCallback(err);
//             });
//     },
//     gets: (url, successCallback, failCallback) => {
//         var request = new XMLHttpRequest();
//         request.onreadystatechange = (e) => {
//             if (request.readyState !== 4) {
//                 return;
//             }

//             if (request.status === 200) {
//                  successCallback(JSON.parse(request.responseText))

//             } else {
//                 // console.warn('error');
//             }
//         };

//         request.open('GET',url);
//         request.send();
//     },
    
//     getForPromise:(url) => {
//         return new Promise((resolve,reject) => {
//             fetch(url)
//             .then((response) => response.text())
//             .then((responseText) => {
//                 resolve(JSON.parse(responseText));
//             })
//              .catch((err) => {
//                 reject(new Error(err));
//                 console.warn(err);
//             }).done();
//         });
//     }
// }

// export default Util;


/**
 * NetUitl 网络请求的实现
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    Platform,
    AsyncStorage
} from 'react-native';
 
export default class NetUtil extends React.Component{
    /*
     *  get异步请求
     *  url:请求地址，字符串类型
     *  params:参数，数组类型，没有参数传nil
     *  sucessCallback:成功回调函数
     *  failCallback:失败回调参数
     * */
    static get(url,params,successCallback,failCallback){
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //fetch请求
        fetch(url,{
            method: 'GET',
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            successCallback(responseJSON);
            console.log(responseJSON);
        })
        .catch((error)=>{
            failCallback(error);
            console.error(error);
        })
    }
    /*
     *  post请求
     *  url:请求地址，字符串类型
     *  params:参数，对象类型
     *  callback:回调函数
     * */
    static post(url,params,successCallback,failCallback){
        //fetch请求
        fetch(url,{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(params)
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            callback(responseJSON);
            console.log(responseJSON);
        }) 
        .catch((error) => {
            failCallback(error);
            console.error(error);
        });
    }
}



