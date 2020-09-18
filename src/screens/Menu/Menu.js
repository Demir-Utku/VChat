import React, { useContext } from 'react';
import { Text, View, SafeAreaView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
const { width, height } = Dimensions.get('window');

const Menu = (props) => {

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray' }}>
      {/* Profile image */}
      <View style={{ flex: 1, marginTop: height * 0.05 }}>
        <Image style={styles.profile}
          source={require('../../images/profile.png')} />
          <Text>Utku Demir</Text>
      </View>

      <View>
        <TouchableOpacity onPress={() => {
            props.navigation.navigate('Messages')
        }}>
          <Text style={styles.messages}>Messages</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => {
            props.navigation.navigate('ContactScreen')
        }}>
          <Text style={styles.contacts}>Contacts</Text>
        </TouchableOpacity>
      </View>

      {/* Signout */}
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <TouchableOpacity
          onPress={() => {
            auth().signOut()
            props.navigation.pop()
          }}
        >
          <Image
            style={styles.logout}
            source={require('../../images/exit.png')} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 50,
  },
  profile: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginBottom: height * 0.02
  },
  logout: {
    width: 35,
    height: 35,
  },
  messages: {
    fontSize: 16,
  },
  contacts: {
    fontSize: 16,
  }
})

export default Menu;