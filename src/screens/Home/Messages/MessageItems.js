import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import * as RootNavigation from '../../../RootNavigation';
import {connect} from 'react-redux';

const MessageItems = (props) => {
  console.log('Coming data: ', props.data);

  const isSecond = props.data.second_user.userName === props.user.userName;

  return (
    <TouchableOpacity
      onPress={() => {
        RootNavigation.navigate('MessageDetail', {data: props.data});
      }}
      style={styles.container}>
      <Image
        source={{
          uri: isSecond
            ? props.data.first_user.profile_url
            : props.data.second_user.profile_url,
        }}
        style={styles.image}
      />

      <View style={styles.textView}>
        <Text style={styles.text}>
          @
          {isSecond
            ? props.data.first_user.userName
            : props.data.second_user.userName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textView: {
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
})

const mapStateToProps = ({authResponse}) => {
  const {user} = authResponse;
  return {user};
};

export default connect(mapStateToProps, {})(MessageItems);
