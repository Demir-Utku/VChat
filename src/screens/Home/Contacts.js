import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import FlatListComponent from '../../components/FlatListComponent';
export default class Contacts extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatListComponent />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
  },
});