import React from 'react'
import { Text, View, SafeAreaView } from 'react-native'

const Messages = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#23272A' }}>
      <Text>Messages</Text>
      <View style={{ borderRadius: 20, borderColor: 'red'}}>

      </View>
    </SafeAreaView>
  );
}

export default Messages;