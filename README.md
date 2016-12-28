# react native学习

## let、const、var
const常量
let和var的用法差不多，只是let的作用域是块级作用域，var是用来声明全局变量的
**有人建议变量的类型能用const类型就用const类型，能用let类型就用let类型**

## 解构
假如一个组件有一个属性name，那么我可以通过如下方式来获得name属性
```
let {name} = this.props
```
等价于
```
let name = this.props.name
```

## 扩展语法 ...
我们可以把一个可遍历的的对象的所有值使用扩展语法的方式添加到其他对象中</br>
比如我们可以将父组件的属性传到子组件

## 函数中的this到底指向谁
谁调用这个函数，这个函数中的this就指向谁

## 什么时候需要bind(this)
有时候我们会发现在使用一个类中的子组件的onPress的时候是这样使用的onPress={this.自定义的函数.bind(this)}，但有时候又没有bind(this)</br>
1.在使用class糖语法创建的类中，如果onPress的回调函数你用箭头函数来实现就不需要bind，否则需要绑定</br>
2.使用createClass函数创建的类，不需要bind</br>


## 常见的问题的解决方法
http://www.jianshu.com/p/582e3031aa0c


## 文章推荐
[react native](http://facebook.github.io/react-native/) </br>
[react native中文网](http://reactnative.cn/) </br>
[组件库](https://js.coach/react-native) </br>
[常用组件1](http://blog.csdn.net/chichengjunma/article/details/52920137) </br>
[常用组件2](http://www.jianshu.com/p/d9cd9a868764) </br>
[JavaScript MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) </br>

