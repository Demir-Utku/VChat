import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';

import RegisterButton from '../../components/RegisterButton';
import LoginButton from '../../components/LoginButton';

const FirstScreen = (props) => {
  return (
    <>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#23272A' }}>
        <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Image style={styles.logo}
            source={require('../../images/discord.png')} />
        </View>

        <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ 
            fontWeight: 'bold', 
            fontSize: 25, 
            textAlign: 'center',
            color: 'white',
            marginBottom: 15,
          }}>
            Welcome to Discord
          </Text>

          <Text style={{
            fontSize: 16, 
            textAlign: 'center',
            color: 'white',
            lineHeight: 25,
            marginBottom: 30,
            width: '85%',
          }}>
            Join over 100 million people who use Discord to talk with communities and friends.
          </Text>
        </View>

        <View style={{ flex: 0.4, width: '100%', alignItems: 'center', justifyContent: 'flex-end' }}>
          <RegisterButton
            text={'Register'}
            style={{ marginBottom: 12 }}
            onPress={() => {
                props.navigation.navigate('Register')
            }}
          />
          
          <LoginButton
            text={'Login'}
            style={{ marginBottom: 20 }}
            onPress={() => {
                props.navigation.navigate('Login')
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 50,
  },
});

export default FirstScreen;