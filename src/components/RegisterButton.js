/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const RegisterButton = (props) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={props.onPress}
    style={[
      {
        backgroundColor: 'rgb(79, 155, 226)',
        width: width * 0.9,
        height: height * 0.06,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
      },
      props.style,
    ]}>
    {props.loading ? (
      <ActivityIndicator size="small" color="white" />
    ) : (
      <Text
        style={[
          {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
          },
          props.textStyle,
        ]}>
        {props.text}
      </Text>
    )}
  </TouchableOpacity>
);

export default RegisterButton;
