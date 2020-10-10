import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {Right, Icon} from 'native-base';
import data from '../../data';

export default class FlatListComponent extends Component {
  state = {
    text: '',
    contacts: data,
    like: false,
    color: 'white',
  };

  toggleLike = () => {
    this.setState({
      like: !this.state.like,
    });

    if (this.state.like) {
      this.setState({
        color: 'red',
      });
    } else {
      this.setState({
        color: 'white',
      });
    }
  };

  renderContactsItem = ({item, index, props}) => {
    return (
      <View style={[styles.itemContainer]}>
        <Image style={styles.avatar} source={{uri: item.image}} />
        <View style={styles.textContainer}>
          <Text style={([styles.name], {color: '#fafafa'})}>
            {item.first_name}
          </Text>
          <Text style={styles.lastName}>{item.last_name}</Text>
        </View>
        <Right style={styles.rightStyle}>
          <TouchableWithoutFeedback onPress={this.toggleLike}>
            <Icon
              name="heart"
              type="FontAwesome"
              size={32}
              style={styles.likeIcon}
            />
          </TouchableWithoutFeedback>
        </Right>
      </View>
    );
  };

  searchFilter = (text) => {
    const newData = data.filter((item) => {
      const listItems = `${item.first_name.toLowerCase()}`;
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
          onChangeText={(text) => {
            this.setState({
              text,
            });
            this.searchFilter(text);
          }}
          value={text}
          placeholder="Search..."
          style={styles.searchInput}
        />
      </View>
    );
  };

  render() {
    return (
      <FlatList
        ListHeaderComponent={this.renderHeader()}
        renderItem={this.renderContactsItem}
        keyExtractor={(item) => item.id}
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
    borderBottomColor: '#eee',
  },
  lastName: {
    color: '#fafafa',
  },
  rightStyle: {
    justifyContent: 'center',
  },
  likeIcon: {
    color: this.state.color === 'white' ? 'white' : 'red',
    paddingRight: 10,
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
    padding: 10,
  },
  searchInput: {
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
});
