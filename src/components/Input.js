import React from 'react';
import { TextInput } from 'react-native';

const Input = (props) => {
  return (
    <TextInput
        placeholder={props.placeholder}
        placeholderTextColor = "white"
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        multiline={props.multiline}
        value={props.value}
        autoFocus={props.autoFocus}
        maxLength={props.maxLength}
        onChangeText={(value) => props.onChangeText(value)}
        style={[{
            padding: 5,
            color: 'white',
            backgroundColor: 'black',
            borderRadius: 5,
            borderWidth: 3,
        }, props.style]}
    />
  );
}

export default Input;