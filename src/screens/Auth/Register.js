/* eslint-disable no-shadow */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
} from 'react-native';
import RegisterButton from '../../components/RegisterButton';
import OutlinedInput from '../../components/OutlinedInput';

import {connect} from 'react-redux';
import {register} from '../../actions';

const {width, height} = Dimensions.get('window');

const Register = (props) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', _keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', _keyboardWillHide);

    return () => {
      Keyboard.removeListener('keyboardWillShow', _keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', _keyboardWillHide);
    };
  });

  const _keyboardWillShow = (e) => {
    const h = e.endCoordinates.height;
    Animated.timing(animation, {
      toValue: -h + 34,
      duration: 300,
    }).start();
  };

  const _keyboardWillHide = (e) => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
    }).start();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.subContainer}>
          <View style={styles.userName}>
            <Text style={styles.nameText}>Enter your username</Text>
          </View>

          <View style={styles.center}>
            <OutlinedInput
              label={'User Name'}
              value={userName}
              // eslint-disable-next-line no-shadow
              onChangeText={(userName) => setUserName(userName)}
              style={styles.nameInput}
              theme={{
                colors: {
                  text: 'white',
                  primary: 'rgb(33, 151, 186)',
                  background: 'white',
                },
              }}
            />
          </View>

          <View style={styles.emailView}>
            <Text style={styles.emailText}>Enter your email and password</Text>
          </View>

          <View style={styles.center}>
            <OutlinedInput
              label={'Email'}
              value={email}
              keyboardType="email-address"
              onChangeText={(email) => setEmail(email)}
              style={styles.nameInput}
              theme={{
                colors: {
                  text: 'white',
                  primary: 'rgb(33, 151, 186)',
                  background: 'white',
                },
              }}
            />
            <OutlinedInput
              label={'Password'}
              value={password}
              secureTextEntry
              onChangeText={(password) => setPassword(password)}
              style={styles.nameInput}
              theme={{
                colors: {
                  text: 'white',
                  primary: 'rgb(33, 151, 186)',
                  background: 'white',
                },
              }}
            />
          </View>

          <View style={styles.privacyView}>
            <Text style={styles.privacyPreText}>
              By registering, you agree to Discord's
              <Text style={styles.privacyText}> Terms of Service </Text>
              and <Text style={styles.privacyText}> Privacy Policy</Text>.
            </Text>
          </View>

          <View style={styles.register}>
            <RegisterButton
              text={'Create an account'}
              onPress={() => {
                const params = {email, password, userName};
                props.register(params);
                props.navigation.navigate('Login');
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#23272A',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 16,
    textAlign: 'left',
    paddingLeft: width * 0.05,
    color: 'rgb(206, 207, 208)',
    marginTop: height * 0.05,
    marginBottom: height * 0.005,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameInput: {
    padding: 5,
    color: 'white',
    backgroundColor: 'rgb(35, 39, 42)',
    borderRadius: 5,
    width: width * 0.75,
    height: height * 0.05,
    marginBottom: height * 0.03,
  },
  emailView: {
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  emailText: {
    fontSize: 16,
    paddingLeft: width * 0.05,
    textAlign: 'left',
    color: 'rgb(206, 207, 208)',
    marginTop: height * 0.005,
  },
  privacyView: {
    width: width * 0.8,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  privacyPreText: {
    fontSize: 13,
    textAlign: 'center',
    color: 'white',
  },
  privacyText: {
    color: '#7289DA',
  },
  register: {
    width: width * 0.85,
    height: height * 0.25,
    marginTop: height * 0.04,
    alignItems: 'center',
  },
});

const mapStateToProps = ({authResponse}) => {
  const {loading, user} = authResponse;
  return {loading, user};
};

export default connect(mapStateToProps, {register})(Register);
