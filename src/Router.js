/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Icon} from 'native-base';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Messages from './screens/Home/Messages/Messages';
import MessageDetail from './screens/Home/Messages/MessageDetail';
import GetUsers from './screens/Home/Messages/GetUsers';

import ContactScreen from './screens/Home/Contacts/Contacts';
import Menu from './screens/Menu/Menu';

import FirstScreen from './screens/Auth/FirstScreen';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';

import {navigationRef} from './RootNavigation';

import {connect} from 'react-redux';

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="FirstScreen">
      <AuthStack.Screen
        name="FirstScreen"
        component={FirstScreen}
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
      <AuthStack.Screen
        name="Login"
        component={Login}
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
  );
};

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
        }}
      />
      <MessagesStack.Screen
        name="MessageDetail"
        component={MessageDetail}
        options={{
          title: 'Message Details',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <MessagesStack.Screen
        name="GetUsers"
        component={GetUsers}
        options={{
          title: 'Get Users',
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
  );
};

const ContactStack = createStackNavigator();
const ContactStackScreen = () => {
  return (
    <ContactStack.Navigator>
      <ContactStack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{
          title: 'Contacts',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </ContactStack.Navigator>
  );
};

// tab navigation
const TabStack = createBottomTabNavigator();

const TabStackScreen = () => {
  return (
    <TabStack.Navigator
      initialRouteName="Messages"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Messages') {
            iconName = 'home';
          } else if (route.name === 'ContactScreen') {
            iconName = 'address-book';
          }

          return (
            <Icon
              type="FontAwesome"
              name={iconName}
              style={{color: focused ? '#1da1f2' : color, fontSize: size}}
            />
          );
        },
      })}
      tabBarOptions={{
        inactiveTintColor: 'gray',
        showLabel: false,
      }}>
      <TabStack.Screen name="Messages" component={MessagesStackScreen} />
      <TabStack.Screen name="ContactScreen" component={ContactStackScreen} />
    </TabStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const DrawerStackScreen = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Menu {...props} />}
      drawerType="back"
      drawerStyle={{width: '75%'}}>
      <Drawer.Screen name="Auth" component={AuthStackScreen} />
      <Drawer.Screen name="Tab" component={TabStackScreen} />
    </Drawer.Navigator>
  );
};

const RootStack = createStackNavigator();
function Router() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator headerMode="none" mode="modal">
        <RootStack.Screen
          name="Main"
          component={DrawerStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = ({authResponse}) => {
  const {loading, user} = authResponse;
  return {loading, user};
};

export default connect(mapStateToProps, {})(Router);
