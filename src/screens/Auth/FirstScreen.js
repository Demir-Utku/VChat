import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ActivityIndicator
} from 'react-native';

import RegisterButton from '../../components/RegisterButton';
import LoginButton from '../../components/LoginButton';

import { Icon } from 'native-base'
import auth from '@react-native-firebase/auth';

import { connect } from 'react-redux';
import { isUser } from '../../actions'
import * as RootNavigation from '../../RootNavigation';

const FirstScreen = (props) => {
  useEffect(() => {
    props.isUser()
  }, [])

  if(props.loading) {
    return(
      <View style={{ flex:1 , alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

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

const mapStateToProps = ({ authResponse }) => {
  const { loading, user } = authResponse;
  return { loading, user };
};

export default connect(mapStateToProps, { isUser })(FirstScreen);