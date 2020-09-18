import 'react-native-gesture-handler';
import React from 'react'
import { View, Text, Dimensions, ActivityIndicator, Animated } from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {createStackNavigator} from  '@react-navigation/stack';

import Messages from './screens/Home/Messages/Messages';
import MessageDetail from './screens/Home/Messages/MessageDetail';
import GetUsers from './screens/Home/Messages/GetUsers';

import ContactScreen from './screens/Home/Contacts/Contacts';
import Favorites from './screens/Home/Contacts/Favorites';
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
            title: "Message Details",
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
  )
}

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
            headerLeft: () => (
              <FontAwesomeIcon icon={ faAngleLeft } size={ 24 } style={{ color: 'white', marginLeft: 2 }} />
            ),
          }}
      />
    </ContactStack.Navigator>
  )
}

const FavoriteStack = createStackNavigator();
const FavoriteStackScreen = () => {
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen
          name="Favorites"
          component={Favorites}
          options={{
            title: 'Favorites',
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
    </FavoriteStack.Navigator>
  )
  
}

// tab navigation burda yatıyor
const TabStack = createBottomTabNavigator();

const TabStackScreen = () => {
  return (
    <TabStack.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if(route.name === 'Messages') {
                  iconName = 'home'
                }
                else if (route.name === 'ContactScreen') {
                    iconName = 'address-book'
                } else if (route.name === 'Favorites') {
                    iconName = 'heart';
                } 

                return <Icon type='FontAwesome' name={iconName} 
                style={{ color: focused ? '#1da1f2' : color, fontSize: size }} />;
            },
        })}
        tabBarOptions={{
            inactiveTintColor: 'gray',
            showLabel: false,
        }}
    >
        <TabStack.Screen name="Messages" component={MessagesStackScreen} />
        <TabStack.Screen name="ContactScreen" component={ContactStackScreen} />
        <TabStack.Screen name="Favorites" component={FavoriteStackScreen} />

        {/*<Button
          vertical
          active={props.navigationState.index === 0}
          onPress={() => props.navigation.navigate('ContactScreen')}
          >
            <Icon name="home" />
            <Text>Contacts</Text>
        </Button>

        <Button
          vertical
          active={props.navigationState.index === 1}
          onPress={() => props.navigation.navigate('Favorites')}
          >
          <Icon name="heart" />
          <Text>Favorites</Text>
        </Button>*/}

    </TabStack.Navigator>
  )
}

const Drawer = createDrawerNavigator();
const DrawerStackScreen = (props) => {
  return (
      <Drawer.Navigator drawerContent={(props) => <Menu {...props} />}
        //drawerType='back'
        drawerStyle={{
            width: '75%',
        }}
      >
        <Drawer.Screen name="Drawer" component={TabStackScreen} />
      </Drawer.Navigator>
  );
}

const RootStack = createStackNavigator();

function Router(props) {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator headerMode='none' mode="modal">
        {
          props.user ?
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

            (<RootStack.Screen
              name="Auth"
              component={Root}
              options={{
                  animationEnabled: false
              }}
          />)
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