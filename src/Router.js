import 'react-native-gesture-handler';
import React from 'react'
import { View, Text } from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {createStackNavigator} from  '@react-navigation/stack';
import Messages from './screens/Home/Messages';

import FirstScreen from './screens/Auth/FirstScreen';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';

const Stack = createStackNavigator();
  
function Root() {
  return (
    <Stack.Navigator initialRouteName="FirstScreen">
      <Stack.Screen name="FirstScreen" component={FirstScreen}/>
      <Stack.Screen name="Login" component={Login}/>    
      <Stack.Screen name="Register" component={Register}/>
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();
function Common() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Root">
        <Drawer.Screen name="Messages" component={Messages} />
        <Drawer.Screen name="Root" component={Root} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


export default Common;