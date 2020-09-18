import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';

import data from '../../data';
export default class FlatListComponent extends Component {
  state = {
    text: '',
    contacts: data,
  };

  renderContactsItem = ({item, index}) => {
    return (
      <TouchableOpacity style={[styles.itemContainer]}>
        <Image
          style={styles.avatar}
          source={{ uri: item.image }} />
        <View style={styles.textContainer}>
          <Text style={[styles.name], {color: '#fafafa'}}>{item.first_name}</Text>
          <Text style={{ color: '#fafafa' }}>{item.last_name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  searchFilter = text => {
    const newData = data.filter(item => {
      const listItems = `${item.first_name.toLowerCase()}`
      return listItems.indexOf(text.toLowerCase()) > -1;
    });

    this.setState({
      contacts: newData,
    });
  };
  
  renderHeader = () => {
    const {text} = this.state;
    return (
      <View style={styles.searchContainer}>
        <TextInput 
          onChangeText = {text => {
            this.setState ({
              text,
            });
            this.searchFilter(text);
          }}
          value={text}
          placeholder="Search..." 
          style={styles.searchInput} />
      </View>
    )
  }

  render() {
    return (
      <FlatList
        ListHeaderComponent={this.renderHeader()}
        renderItem={this.renderContactsItem}
        keyExtractor={item => item.id}
        data={this.state.contacts}
        />
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  textContainer: {
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 16,
  },
  searchContainer: {
    padding: 10

  },
  searchInput: {
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    padding: 10,
  }
});