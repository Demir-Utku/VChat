import React, {useContext} from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';

export default function Messages() {

  return (
    <SafeAreaView style={styles.container}>
      {/*<View style={styles.header}>
        <View style={styles.iconLeft}>
          <Icon name="left" style={styles.icon} />
        </View>
      </View>*/}
      <Text>Messages</Text>
    </SafeAreaView>
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