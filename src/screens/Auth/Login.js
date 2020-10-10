import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Keyboard,
  Animated,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import RegisterButton from '../../components/RegisterButton';
import OutlinedInput from '../../components/OutlinedInput';
import {connect} from 'react-redux';
import {login} from '../../actions';

const {width, height} = Dimensions.get('window');

const Login = (props) => {
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

  const _keyboardWillHide = () => {
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
          <View style={styles.welcomeView}>
            <Text style={styles.welcome}>Welcome back!</Text>
          </View>

          <View style={styles.inputForm}>
            <OutlinedInput
              label={'Email'}
              value={email}
              keyboardType="email-address"
              // eslint-disable-next-line no-shadow
              onChangeText={(email) => setEmail(email)}
              style={styles.input}
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
              // eslint-disable-next-line no-shadow
              onChangeText={(password) => setPassword(password)}
              style={styles.input}
              theme={{
                colors: {
                  text: 'white',
                  primary: 'rgb(33, 151, 186)',
                  background: 'white',
                },
              }}
            />
          </View>

          <View style={styles.passView}>
            <Text style={styles.pass}>
              <TouchableOpacity>
                <Text style={styles.passT}>Forgot your password?</Text>
              </TouchableOpacity>
            </Text>
          </View>

          <View style={styles.register}>
            <RegisterButton
              text={'Login'}
              loading={props.loading}
              onPress={() => {
                const params = {email, password};
                props.login(params);
                props.navigation.navigate('Tab');
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
    alignItems: 'center',
  },
  welcomeView: {
    width: width * 0.55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
    marginBottom: height * 0.04,
    marginTop: height * 0.05,
  },
  inputForm: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 5,
    color: 'white',
    backgroundColor: 'rgb(35, 39, 42)',
    borderRadius: 5,
    width: width * 0.75,
    height: height * 0.05,
    marginBottom: height * 0.03,
  },
  passView: {
    width: width * 0.415,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  pass: {
    fontSize: 14,
    textAlign: 'left',
    color: 'white',
    flexDirection: 'column',
  },
  passT: {
    color: '#1989DA',
  },
  register: {
    width: width * 0.85,
    height: height * 0.25,
    alignItems: 'center',
    marginTop: height * 0.04,
  },
});

const mapStateToProps = ({authResponse}) => {
  const {loading, user} = authResponse;
  return {loading, user};
};

export default connect(mapStateToProps, {login})(Login);
