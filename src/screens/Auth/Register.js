import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, Dimensions, ScrollView, Animated, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import RegisterButton from '../../components/RegisterButton';
import OutlinedInput from '../../components/OutlinedInput';

import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { register } from '../../actions'
import { StackActions } from '@react-navigation/native';
import { LOCAL_AUTH_ID, USER } from '../../actions/types';
import AsyncStorage from '@react-native-community/async-storage';

import * as RootNavigation from '../../RootNavigation';

const {width, height} = Dimensions.get('window');

const Register = (props) => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", _keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", _keyboardWillHide);

    return () => {
      Keyboard.removeListener("keyboardWillShow", _keyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
    };

  }, []);

  const _keyboardWillShow = (e) => {
    const height = e.endCoordinates.height
    Animated.timing(animation, {
        toValue: -height + 34,
        duration: 300
    }).start();
  };

  const _keyboardWillHide = (e) => {
    Animated.timing(animation, {
        toValue: 0,
        duration: 300
    }).start();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#23272A' }}>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ alignItems: 'flex-start', justifyContent: 'center'}}>
            <Text style={{
              fontSize: 16, 
              textAlign: 'left',
              paddingLeft: width * 0.05,
              color: 'rgb(206, 207, 208)',
              marginTop: height * 0.05,
              marginBottom: height * 0.005,
            }}>
              WHAT SHOULD EVERYONE CALL YOU?
            </Text>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <OutlinedInput
              label={'User Name'}
              value={userName}
              onChangeText={(userName) => setUserName(userName)}
              style={{ padding: 5, color: 'white', backgroundColor: 'rgb(35, 39, 42)',
                borderRadius: 5, /*borderWidth: 3,*/ width: width * 0.75, 
                height: height * 0.05, marginBottom: height * 0.03 }}
              theme={{ colors: { text: 'white', primary: 'rgb(33, 151, 186)', background: 'white' } }}
            />
          </View>

          <View style={{ alignItems: 'flex-start', paddingLeft: 5 }}>
            <Text style={{
              fontSize: 16,
              paddingLeft: width * 0.05,
              textAlign: 'left',
              color: 'rgb(206, 207, 208)',
              marginTop: height * 0.005,
            }}>
              ACCOUNT INFORMATION
            </Text>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <OutlinedInput
              label={'Email'}
              value={email}
              keyboardType='email-address'
              onChangeText={(email) => setEmail(email)}
              style={{ padding: 5, color: 'white', backgroundColor: 'rgb(35, 39, 42)',
                borderRadius: 5, /*borderWidth: 3,*/ width: width * 0.75, 
                height: height * 0.05 }}
              theme={{ colors: { text: 'white', primary: 'rgb(33, 151, 186)', background: 'white' } }}
            />
            <OutlinedInput
              label={'Password'}
              value={password}
              secureTextEntry
              onChangeText={(password) => setPassword(password)}
              style={{ padding: 5, color: 'white', backgroundColor: 'rgb(35, 39, 42)',
                borderRadius: 5, /*borderWidth: 3,*/ width: width * 0.75, 
                height: height * 0.05, marginBottom: height * 0.01 }}
              theme={{ colors: { text: 'white', primary: 'rgb(33, 151, 186)', background: 'white' } }}
            />
          </View>

          <View style={{ width: width * 0.8, alignItems: 'center', marginTop: height * 0.02 }}>
            <Text style={{fontSize: 13, textAlign: 'center',color: 'white', }}>
              By registering, you agree to Discord's
              <Text style={{ color: '#7289DA' }}> Terms of Service </Text>
              and <Text style={{ color: '#7289DA' }}> Privacy Policy</Text>.
            </Text>
          </View>

          <View style={{ width: width * 0.85, height: height * 0.25, marginTop: height * 0.04, alignItems: 'center' }}>
            <RegisterButton
              text={'Create an account'}
              onPress={() => {
                const params = { email, password, userName  }
                props.register(params)
                props.navigation.navigate('Login')
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  )
}

const mapStateToProps = ({ authResponse }) => {
  const { loading, user } = authResponse;
  return { loading, user };
};

export default connect(mapStateToProps, { register })(Register);