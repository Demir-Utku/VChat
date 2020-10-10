import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Fab, Icon} from 'native-base';

import {getRooms} from '../../../actions';

import MessageItems from './MessageItems';
import {USER} from '../../../actions/types';

const Messages = (props) => {
  useEffect(() => {
    props.getRooms();
    console.log('Comings props.', USER.notif);

    USER.notif
      ? props.navigation.navigate('MessageDetail', {
          data: {path: USER.notif.path},
        })
      : null;
  });

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        data={props.rooms}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => {
          return (
            <View style={styles.textView}>
              <Text style={styles.text}>No Message Found</Text>
            </View>
          );
        }}
        renderItem={({item, index}) => (
          <MessageItems data={item} index={index} props={props} />
        )}
      />

      <Fab
        containerStyle={{}}
        style={styles.fab}
        position="bottomRight"
        onPress={() => {
          props.navigation.navigate('GetUsers');
        }}>
        <Icon name="plus" type="FontAwesome" style={styles.text} />
      </Fab>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
  },
  textView: {
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: 'white',
  },
  fab: {
    backgroundColor: '#23272A',
  },
});

const mapStateToProps = ({messageResponse}) => {
  const {loadingGetRoom, rooms} = messageResponse;
  return {loadingGetRoom, rooms};
};

export default connect(mapStateToProps, {getRooms})(Messages);
