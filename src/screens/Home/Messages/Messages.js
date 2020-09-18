import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, Alert, StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import { Fab, Icon } from 'native-base';

import { getRooms } from '../../../actions'

import MessageItems from './MessageItems';
import { USER } from '../../../actions/types';

const Messages = (props) => {
    useEffect(() => {
        props.getRooms()
        console.log('Gelen props.', USER.notif);

        USER.notif ? props.navigation.navigate('MessageDetail', { data: { path: USER.notif.path } } ) : null
    }, [])

    return (
      <View style={{ flex: 1, backgroundColor: '#23272A' }}>
        <FlatList
          style={{ flex: 1, backgroundColor: '#23272A', }}
          data={props.rooms}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => {
              return (
                  <View style={{ alignItems: 'center', padding: 20}}>
                          <Text>Herhangi bir mesaj bulunamadı</Text>
                  </View>
              )
          }}
          renderItem={({ item, index }) =>
              <MessageItems
                  data={item}
                  index={index}
                  props={props}
              />
          }
        />


        <Fab
          containerStyle={{}}
          style={{ backgroundColor:'#23272A' }}
          position="bottomRight"
          onPress={() => { props.navigation.navigate('GetUsers') }}>
          <Icon name="plus" type='FontAwesome' style={{ color: 'white' }} />
        </Fab>

      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23272A',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    alignItems: 'flex-start',
  },
  iconLeft: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 22,
    margin: 7
  }
});

const mapStateToProps = ({ messageResponse }) => {
  const { loadingGetRoom, rooms } = messageResponse;
  return { loadingGetRoom, rooms };
};

export default connect(mapStateToProps, { getRooms })(Messages);

