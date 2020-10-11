import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import {getAllUsers, startRoom} from '../../../actions';

const GetUsers = (props) => {
  useEffect(() => {
    props.getAllUsers();
  });

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        data={props.allUsers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          console.log('Coming user: ', item);
          return (
            <TouchableOpacity
              onPress={() => {
                console.log('User: ', props.user);
                const second_user = item;
                const path = props.user.userName + '+' + second_user.userName;
                const params = {
                  createdDate: new Date(),
                  first_user: props.user,
                  second_user,
                  path,
                };
                props.startRoom(path, params);
                props.navigation.navigate('MessageDetail', {path});
              }}
              style={styles.touchable}>
              <View style={styles.touchableView}>
                <Text style={styles.touchableText}>
                  {!item.userName ? '' : '@'}
                  {item.userName}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
  },
  touchable: {
    flexDirection: 'row',
    margin: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray',
  },
  touchableView: {
    padding: 10,
  },
  touchableText: {
    fontSize: 16,
    color: 'white',
  },
});

const mapStateToProps = ({messageResponse, authResponse}) => {
  const {loadingUsers, allUsers} = messageResponse;
  return {loadingUsers, allUsers, user: authResponse.user};
};

export default connect(mapStateToProps, {getAllUsers, startRoom})(GetUsers);
