import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from './types';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export const login = (params) => {
  return (dispatch) => {
    if (params.email != '' && params.password != '') {
      if (validateEmail(params.email)) {
        dispatch({type: LOGIN_START});
        auth()
          .signInWithEmailAndPassword(params.email, params.password)
          .then((data) => {
            console.log('signed in!', data);
            const uid = data.user._user.uid;

            // read user from db
            firestore()
              .collection('Users')
              .doc(uid)
              .get()
              .then((user) => {
                console.log('Coming Data: ', user._data);

                const userParams = {
                  ...user._data,
                  uid,
                };
                dispatch({type: LOGIN_SUCCESS, payload: userParams});
              })
              .catch((err) => {
                console.log('Read Data error: ', err);
                dispatch({type: LOGIN_FAILED});
              });
          })
          .catch((error) => {
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
              Alert.alert('Warning', 'Invalid email address');
            } else if (error.code === 'auth/user-not-found') {
              console.log('This user cannot be found!');
              Alert.alert('Warning', 'User not found');
            }
            console.log(error.code);
            dispatch({type: LOGIN_FAILED});
          });
      } else {
        Alert.alert('Warning', 'Please, write valid email address!');
      }
    } else {
      Alert.alert('Warning', 'Please, fill all parts!');
    }
  };
};

export const register = (params) => {
  return (dispatch) => {
    if (params.email != '' && params.password != '' && params.userName != '') {
      if (validateEmail(params.email)) {
        dispatch({type: REGISTER_START});
        auth()
          .createUserWithEmailAndPassword(params.email, params.password)
          .then((data) => {
            const uid = data.user._user.uid;
            // write user from db
            const setData = {
              userName: params.userName,
              email: params.email,
            };
            firestore()
              .collection('Users')
              .doc(uid)
              .set(setData)
              .then(() => {
                console.log('User added!');
                dispatch({type: REGISTER_SUCCESS});
              })
              .catch(() => {
                dispatch({type: REGISTER_FAILED});
                console.log('User not Add!');
              });
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
              Alert.alert('That email address is already in use!');
            }
            console.log(error);
            dispatch({type: REGISTER_FAILED});
          });
      } else {
        Alert.alert('Warning', 'Please, write valid email address!');
      }
    } else {
      Alert.alert('Warning', 'Please, fill all parts!');
    }
  };
};

export const isUser = () => {
  return (dispatch) => {
    dispatch({type: LOGIN_START});
    auth().onAuthStateChanged((data) => {
      if (data) {
        console.log('Coming Value:', data);
        const uid = data._user.uid;
        getUser(uid, dispatch);
      } else {
        dispatch({type: LOGIN_FAILED});
      }
    });
  };
};

export const signOut = () => {
  return () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
      });
  };
};

const getUser = (uid, dispatch) => {
  // read user from db
  firestore()
    .collection('Users')
    .doc(uid)
    .get()
    .then((user) => {
      console.log('Gelen Data: ', user._data);
      const userParams = {
        ...user._data,
        uid,
      };

      dispatch({type: LOGIN_SUCCESS, payload: userParams});
    })
    .catch((err) => {
      console.log('Read Data error: ', err);
      dispatch({type: LOGIN_FAILED});
    });
};

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
