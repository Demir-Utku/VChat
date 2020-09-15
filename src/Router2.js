import 'react-native-gesture-handler';
import React from 'react'
import { View, Text, Dimensions, ActivityIndicator, Animated, TouchableOpacity } from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {createStackNavigator} from  '@react-navigation/stack';
import Messages from './screens/Home/Messages/Messages';
import Contacts from './screens/Home/Contacts';
import Menu from './screens/Menu/Menu';
import FirstScreen from './screens/Auth/FirstScreen';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';

import auth from '@react-native-firebase/auth';
import { AuthContext } from './context'
import { Icon } from 'native-base';

import { navigationRef } from './RootNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import { LOCAL_AUTH_ID, USER } from './actions/types';
import { connect } from 'react-redux';

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName='FirstScreen'>
      <AuthStack.Screen
          name="FirstScreen"
          component={FirstScreen}
          options={({ navigation, route }) => ({
            title: 'Welcome',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />

        <AuthStack.Screen
          name="Login"
          component={Login}
          options={({ navigation, route }) => ({
            title: 'Login',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />


        <AuthStack.Screen
          name="Register"
          component={Register}
          options={{
            title: 'Register',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

    </AuthStack.Navigator>
  )
}

const MessagesStack = createStackNavigator();
const MessagesStackScreen = () => {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        name="Messages"
        component={Messages}
        options={({ navigation, route }) => ({
            title: 'Messages',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
      />
    </MessagesStack.Navigator>
  )
}

const ContactsStack = createStackNavigator();
const ContactsStackScreen = () => {
  return (
    <ContactsStack.Navigator>
      <ContactsStack.Screen
        name="Contacts"
        component={Contacts}
        options={({ navigation, route }) => ({
            title: 'Contacts',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
      />
    </ContactsStack.Navigator>
  )
}

const TabStack = createBottomTabNavigator();

const TabStackScreen = () => {
  return (
    <TabStack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Messages') {
            iconName = 'envelope-open'
          } else if (route.name === 'Contacts') {
            iconName = 'search';
          }
        },
      })}
      tabBarOptions={{
        inactiveTintColor: 'gray',
        showLabel: false,
      }}
    >

      <TabStack.Screen name="Messages" component={MessagesStackScreen} />
      <TabStack.Screen name="Contacts" component={ContactsStackScreen} />

    </TabStack.Navigator>
  )
}

const DrawerStack = createDrawerNavigator();
const DrawerStackScreen = () => {
  return (
    <DrawerStack.Navigator
      drawerContent={Menu}
      drawerType='back'
      drawerStyle={{
          width: '85%',
      }}
    >
      <Drawer.Screen name="Messages" component={MessagesStackScreen} />
      <Drawer.Screen name="Contacts" component={ContactsStackScreen} />
    </DrawerStack.Navigator>
  )
}

const RootStack = createStackNavigator();

function Router(props) {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator headerMode='none' mode="modal">
        {
          /*props.user ?
            (
              <>
                  <RootStack.Screen
                    name="Main"
                    component={DrawerStackScreen}
                    options={{
                        animationEnabled: false
                    }}
                  />
              </>

            ) :
            (*/<RootStack.Screen
              name="Auth"
              component={AuthStackScreen}
              options={{
                  animationEnabled: false
              }}
            />/*)*/
        }
      </RootStack.Navigator>
    </NavigationContainer>
  );
}


const mapStateToProps = ({ authResponse }) => {
    const { loading, user } = authResponse;
    return { loading, user };
};

export default connect(mapStateToProps, {})(Router);