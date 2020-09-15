import 'react-native-gesture-handler';
import React from 'react'
import { View, Text, Dimensions, ActivityIndicator, Animated } from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {createStackNavigator} from  '@react-navigation/stack';

import Messages from './screens/Home/Messages/Messages';
import MessageDetail from './screens/Home/Messages/MessageDetail';
import GetUsers from './screens/Home/Messages/GetUsers';

import Contacts from './screens/Home/Contacts';
import Menu from './screens/Menu/Menu';
import FirstScreen from './screens/Auth/FirstScreen';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import auth from '@react-native-firebase/auth';
import { navigationRef } from './RootNavigation';
import { LOCAL_AUTH_ID, USER } from './actions/types';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');

const Stack = createStackNavigator();

function Root() {
  return (
    <Stack.Navigator initialRouteName="FirstScreen">
      <Stack.Screen name="FirstScreen" component={FirstScreen} 
        options={{
          title: 'Welcome',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen name="Login" component={Login}
        options={{
          title: 'Login',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />    
      <Stack.Screen name="Register" component={Register}
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
    </Stack.Navigator>
  );
}

const MessagesStack = createStackNavigator();
const MessagesStackScreen = () => {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        name="Messages"
        component={Messages}
        options={{
            title: 'Messages',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => (
              <FontAwesomeIcon icon={ faAngleLeft } size={ 24 } style={{ color: 'white', marginLeft: 2 }} />
            ),
          }}
      />
      <MessagesStack.Screen name="MessageDetail" component={MessageDetail}
        options={{
            title: 'Messages',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}   
        />
      <MessagesStack.Screen name="GetUsers" component={GetUsers}
        options={{
          title: 'Messages',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </MessagesStack.Navigator>
  )
}

const ContactStack = createStackNavigator();
const ContactStackScreen = () => {
  return (
    <ContactStack.Navigator>
      <ContactStack.Screen
        name="Contacts"
        component={Contacts}
        options={{
            title: 'Contacts',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => (
              <FontAwesomeIcon icon={ faAngleLeft } size={ 24 } style={{ color: 'white', marginLeft: 2 }} />
            ),
          }}
      />
    </ContactStack.Navigator>
  )
}

const Drawer = createDrawerNavigator();
function Router(props) {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator drawerContent={(props) => <Menu {...props} />}
        //drawerType='back'
        drawerStyle={{
            width: '75%',
        }}
      >
        <Drawer.Screen name="Root" component={Root} 
          options={{
          title: 'Root',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Drawer.Screen name="Messages" component={MessagesStackScreen} />
        <Drawer.Screen name="Contacts" component={ContactStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


const mapStateToProps = ({ authResponse }) => {
  const { loading, user } = authResponse;
  return { loading, user };
};

export default connect(mapStateToProps, {})(Router);