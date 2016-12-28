# sunleiRN

## 常见的问题的解决方法
http://www.jianshu.com/p/582e3031aa0c

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
我们可以把一个可遍历的的对象的所有值使用扩展语法的方式添加到其他对象中
比如我们可以将父组件的属性传到子组件

## 函数中的this到底指向谁
谁调用这个函数，这个函数中的this就指向谁

## 什么时候需要bind(this)
有时候我们会发现在使用一个类中的子组件的onPress的时候是这样使用的onPress={this.自定义的函数.bind(this)}，但有时候又没有bind(this)，
1.在使用class糖语法创建的类中，如果onPress的回调函数你用箭头函数来实现就不需要bind，否则需要绑定
2.使用createClass函数创建的类，不需要bind


## NavigatorIOS导航控制器（注意传值）
```
 <NavigatorIOS
        style={styles.container}
        tintColor='#FF6600'
        //1.初始化一个路由栈route，并设置第一个默认场景
        initialRoute={{
            title: '视频',
            component: TabBarView,
        }}
        //2.配置转场动画
        configureScene={()=>{
            return  Navigator.SceneConfigs.PushFromRight;
        }}
        //3.渲染场景
        renderScene={(route, navigator) => {
            let Component = route.component;
            return (
                //注意：这几个属性一定要写上，便于以后push的时候父组件向子组件传值，passProps可以是任意值，是自己确定的
                <Component navigator = {navigator} route = {route} {...route.passProps} />
            )
        }}
 />
```

