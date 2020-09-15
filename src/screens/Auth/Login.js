import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, ActivityIndicator, Dimensions, Keyboard, Animated, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import RegisterButton from '../../components/RegisterButton';
import OutlinedInput from '../../components/OutlinedInput';
import { connect } from 'react-redux';
import { login } from '../../actions'
import { StackActions } from '@react-navigation/native';
import { LOCAL_AUTH_ID, USER } from '../../actions/types';
import AsyncStorage from '@react-native-community/async-storage';

import * as RootNavigation from '../../RootNavigation';

const {width, height} = Dimensions.get('window');

const Login = (props) => {
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
        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
          <View style={{ width: width * 0.55, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 25,
              textAlign: 'center',
              color: 'white',
              marginBottom: height * 0.04,
              marginTop: height * 0.05,
            }}>
              Welcome back!
            </Text>
          </View>

          <View style={{ width: width * 0.75, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{
              fontSize: 18,
              textAlign: 'center',
              color: 'white',
              marginBottom: height * 0.04,
            }}>
              Log in with your email to start talking.
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
                  height: height * 0.05, marginBottom: height * 0.03 }}
                theme={{ colors: { text: 'white', primary: 'rgb(33, 151, 186)', background: 'white' } }}
              />
            <OutlinedInput
                label={'Password'}
                value={password}
                secureTextEntry
                onChangeText={(password) => setPassword(password)}
                style={{ padding: 5, color: 'white', backgroundColor: 'rgb(35, 39, 42)',
                  borderRadius: 5, /*borderWidth: 3,*/ width: width * 0.75, 
                  height: height * 0.05, marginBottom: height * 0.03 }}
                theme={{ colors: { text: 'white', primary: 'rgb(33, 151, 186)', background: 'white' } }}
              />
          </View>

          <View style={{ width: width * 0.415, alignItems: 'center', marginTop: height * 0.02 }}>
            <Text style={{fontSize: 14, textAlign: 'left',color: 'white', flexDirection: 'column'}}>
              <Text style={{ color: '#7289DA' }}>Forgot your password?</Text>
              <Text style={{ color: '#7289DA' }}>Use a password manager?</Text>
            </Text>
          </View>

          <View style={{ width: width * 0.85, height: height * 0.25, alignItems: 'center', marginTop: height * 0.04 }}>
            <RegisterButton
              text={'Login'}
              loading={props.loading}
              onPress={() => {
                const params = { email, password }
                props.login(params)
                props.navigation.navigate('Messages')
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

export default connect(mapStateToProps, { login })(Login);