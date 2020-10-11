import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';

import RegisterButton from '../../components/RegisterButton';
import LoginButton from '../../components/LoginButton';

import {connect} from 'react-redux';
import {isUser} from '../../actions';

const FirstScreen = (props) => {
  useEffect(() => {
    props.isUser();
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../images/logo.png')}
          />
        </View>

        <View style={styles.imageContainer}>
          <Text style={styles.vchatPreText}>
            Welcome to
            <Text style={styles.vchat}> VCHAT</Text>
          </Text>

          <Text style={styles.vchatAfterText}>Connect to the World!</Text>
        </View>

        <View style={styles.form}>
          <RegisterButton
            text={'Register'}
            style={styles.register}
            onPress={() => {
              props.navigation.navigate('Register');
            }}
          />

          <LoginButton
            text={'Login'}
            style={styles.login}
            onPress={() => {
              props.navigation.navigate('Login');
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  activity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#23272A',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: 28,
  },
  vchatPreText: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
    marginBottom: 15,
  },
  vchat: {
    color: 'rgb(89, 175, 226)',
    fontWeight: 'bold',
  },
  vchatAfterText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    lineHeight: 25,
    marginBottom: 30,
    width: '85%',
  },
  form: {
    flex: 0.4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  register: {
    marginBottom: 12,
  },
  login: {
    marginBottom: 20,
  },
});

const mapStateToProps = ({authResponse}) => {
  const {loading, user} = authResponse;
  return {loading, user};
};

export default connect(mapStateToProps, {isUser})(FirstScreen);
