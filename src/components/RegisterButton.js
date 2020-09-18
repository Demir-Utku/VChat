import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';

const RegisterButton = (props) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={props.onPress}
    style={[{
      backgroundColor: 'rgb(79, 155, 226)',
      width: 380,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5
    }, props.style]}>
    {props.loading ?
      <ActivityIndicator size='small' color='white' /> :
      <Text style={[{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
      }, props.textStyle]}>{props.text}</Text>
    }
  </TouchableOpacity>
);

export default RegisterButton;