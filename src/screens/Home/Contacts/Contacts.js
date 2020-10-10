import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import FlatListComponent from '../../../components/FlatListComponent';

const Contacts = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatListComponent navigation={props.navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
  },
});

export default Contacts;
