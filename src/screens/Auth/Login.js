import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native';
import RegisterButton from '../../components/RegisterButton';
import Input from '../../components/Input';

const {width, height} = Dimensions.get('window');

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
    
  return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#23272A' }}>
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
          <Input placeholder={'Email'}
            value={email}
            style={{ width: width * 0.75, height: height * 0.05, marginBottom: height * 0.03 }}
            onChangeText={(email) => setEmail(email)} 
          />
          <Input
            placeholder={'Password'}
            value={password}
            style={{ width: width * 0.75, height: height * 0.05 }}
            secureTextEntry
            onChangeText={(password) => setPassword(password)} 
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
              //const params = { email, password }
              //props.login(params)
              props.navigation.navigate('Messages')
            }}
          />
        </View>
        
      </SafeAreaView>
  )
}

export default Login;