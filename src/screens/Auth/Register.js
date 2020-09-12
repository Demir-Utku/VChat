import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native';
import RegisterButton from '../../components/RegisterButton';
import Input from '../../components/Input';

const {width, height} = Dimensions.get('window');

const Register = (props) => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#23272A' }}>
      <View style={{ alignItems: 'flex-start', justifyContent: 'center'}}>
        <Text style={{
          fontSize: 16, 
          textAlign: 'left',
          color: 'rgb(206, 207, 208)',
          marginTop: height * 0.15,
          marginBottom: height * 0.01,
        }}>
          WHAT SHOULD EVERYONE CALL YOU?
        </Text>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Input placeholder={'Username'}
          style={{ width: width * 0.75, height: height * 0.05 }}
          value={userName}
          onChangeText={(userName) => setUserName(userName)} 
        />
      </View>

      <View style={{ alignItems: 'flex-start', paddingLeft: 5 }}>
        <Text style={{
          fontSize: 16, 
          textAlign: 'left',
          color: 'rgb(206, 207, 208)',
          marginTop: height * 0.05,
          marginBottom: height * 0.01,
        }}>
          ACCOUNT INFORMATION
        </Text>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Input placeholder={'Email'}
          style={{ width: width * 0.75, height: height * 0.05 }}
          value={email}
          onChangeText={(email) => setEmail(email)} 
        />
        <Input style={{ marginTop: height * 0.03, width: width * 0.75, height: height * 0.05 }}
          placeholder={'Password'}
          value={password}
          secureTextEntry
          onChangeText={(password) => setPassword(password)} 
        />
      </View>

      <View style={{ width: width * 0.8, alignItems: 'center', marginTop: height * 0.04 }}>
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
              props.navigation.navigate('Login')
          }}
        />
      </View> 
    </SafeAreaView>
  )
}

export default Register;