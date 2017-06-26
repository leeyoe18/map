/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

import React from 'react';

import {
    Image,
    StyleSheet,
    Text,
    AsyncStorage
} from 'react-native';

import All from '../all-projects';
import New from '../new';

const MyTab = TabNavigator({
    All: {
        screen: All,
        navigationOptions: ()=> TabOptions('所有项目','所有项目')
    },
    Test2: {
        screen: New,
        navigationOptions: ()=> TabOptions('新开工项目','新开工项目'),
    },
    Test3:{
        screen: New,
        navigationOptions: ()=> TabOptions('项目建设分析','项目建设分析'),
    },
},{
    tabBarPosition:'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
    swipeEnabled:false, // 是否允许在标签之间进行滑动。
    animationEnabled: false, // 是否在更改标签时显示动画。
    lazy:true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
    initialRouteName: 'All', // 设置默认的页面组件
    backBehavior:'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions:{
        showLabel:true, // 是否显示label，默认开启。
        showIcon:true, // 是否显示图标，默认关闭。
        upperCaseLabel:false, // 是否使标签大写，默认为true。
    }

});

// 初始化StackNavigator
const MyNav = StackNavigator({
    // 将TabNavigator包裹在StackNavigator里面可以保证跳转页面的时候隐藏tabbar
    Main:{
        screen: MyTab,
    },
});

const TabOptions = (tabBarTitle,navTitle) => {
    // console.log(navigation);
    const tabBarLabel = tabBarTitle;
    // const tabBarIcon = (({tintColor,focused})=> {
    //     return(
    //         <Image
    //             source={!focused ? normalImage : selectedImage}
    //             style={[{height:35,width:35 }, {tintColor: tintColor}]}
    //         />
    //     )
    // });
    const headerTitle = navTitle;
    const headerTitleStyle = {fontSize:14,color:'white',alignSelf:'center'};
    // header的style
    const headerStyle = {backgroundColor:'#4ECBFC'};
    const tabBarVisible = true;
    // const header = null;
    return {tabBarLabel,headerTitle,headerTitleStyle,headerStyle,tabBarVisible};
};

export default MyNav;