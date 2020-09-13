/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   Image
// } from 'react-native';

// import RegisterButton from './src/components/RegisterButton';
// import LoginButton from './src/components/LoginButton';

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' }}>
//           <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-end' }}>
//             <Image style={styles.logo}
//               source={require('./src/images/discord.png')} />
//           </View>

//           <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-end' }}>
//             <Text style={{ 
//                 fontWeight: 'bold', 
//                 fontSize: 25, 
//                 textAlign: 'center',
//                 color: 'white',
//                 marginBottom: 15,
//                 }}>Welcome to Discord
//             </Text>

//             <Text style={{
//                 fontSize: 16, 
//                 textAlign: 'center',
//                 color: 'white',
//                 lineHeight: 25,
//                 marginBottom: 30,
//                 width: '85%',
//                 }}>Join over 100 million people who use Discord to talk with communities and friends.
//             </Text>
//           </View>

//           <View style={{ flex: 0.4, width: '100%', alignItems: 'center', justifyContent: 'flex-end' }}>
//             <RegisterButton
//                 text={'Register'}
//                 style={{ marginBottom: 12 }}
//                 /*onPress={() => {
//                     props.navigation.navigate('Register')
//                 }}*/
//             />
            
//             <LoginButton
//                 text={'Login'}
//                 style={{ marginBottom: 20 }}
//                 /*onPress={() => {
//                     props.navigation.navigate('Login')
//                 }}*/
//             />
//           </View>
          
//         </SafeAreaView>

//     </>
//   );
// };

// const styles = StyleSheet.create({
//   logo: {
//     width: 250,
//     height: 50,
//   },
// });

// export default App;


import React, { useEffect } from 'react';
import {View} from 'react-native';
import Router from './src/Router';
//import SplashScreen from 'react-native-splash-screen'
//import { createStore, applyMiddleware } from 'redux';
//import { Provider } from 'react-redux';
//import ReduxThunk from 'redux-thunk';

//import reducers from './src/reducers'


const App = () => {
  // const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  // useEffect(() => {
  //   SplashScreen.hide();
  // })

  return (
    //<Provider store={store}>
        <Router />
    //</Provider>
  )
}

export default App;