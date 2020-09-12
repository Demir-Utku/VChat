import 'react-native-gesture-handler';
import React from 'react'
import { View, Text } from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import {createStackNavigator} from  '@react-navigation/stack';
import Messages from './screens/Home/Messages';
import FirstScreen from './screens/Auth/FirstScreen';
import Login from './screens/Auth/Login';
// //import Logout from './screens/Logout';
// //import messagesHome from './screens/messagesHome';
import Register from './screens/Auth/Register';
// //import GroupMessages from './screens/GroupMessages';

const Drawer = createDrawerNavigator();
const DrawerScreen = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Messages" component={Messages} />
    </Drawer.Navigator>
  )
}

const Stack = createStackNavigator();
  
const Router = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="FirstScreen" component={FirstScreen}/>
          <Stack.Screen name="Login" component={Login}/>    
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="Drawer Screen" component={DrawerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default Router;