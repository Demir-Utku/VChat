/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Keyboard,
  Animated,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Input from '../../../components/Input';
import {getMessages, addMessages} from '../../../actions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'native-base';

const {width, height} = Dimensions.get('window');

const MessageDetail = (props) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('props value: ', props.route.params.data.path);
    props.getMessages(props.route.params.data.path);

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

  const selectImage = () => {
    const options = {
      title: 'Select the Image You Want to Send',
      quality: 0.2,
      takePhotoButtonTitle: 'Take Photo',
      chooseFromLibraryButtonTitle: 'Pick From Gallery',
      cancelButtonTitle: 'Exit',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, async (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const uri = response.uri;
        setImage(uri);
      }
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#23272A',
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={MessageStyle.container}>
          <View style={MessageStyle.messageListContainer}>
            <FlatList
              data={props.all_messages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                console.log('Coming list: ', item);
                let isMe = props.user.userName === item.sender_user.userName;

                const user_first_letter = !isMe
                  ? item.sender_user.userName.charAt(0)
                  : '';

                return (
                  <View>
                    <View
                      style={[
                        MessageStyle.messageItemContainer,
                        {justifyContent: isMe ? 'flex-end' : 'flex-start'},
                      ]}>
                      {isMe ? null : (
                        <View style={{flexDirection: 'column'}}>
                          <View style={MessageStyle.profileCircle}>
                            <Text style={{color: 'white'}}>
                              {user_first_letter}
                            </Text>
                          </View>
                        </View>
                      )}

                      <View style={{flexDirection: 'column-reverse'}}>
                        {item.image && (
                          <View
                            style={{
                              alignItems: 'center',
                              width: '50%',
                              height: '30%',
                              marginTop: 10,
                              marginBottom: 100,
                            }}>
                            <Image
                              source={{uri: item.image}}
                              style={{width: width * 0.4, height: height * 0.2}}
                              resizeMode="cover"
                            />
                          </View>
                        )}

                        <View
                          style={[
                            {
                              backgroundColor: isMe
                                ? '#1da1f2'
                                : '#f4511e' /*width: item.text.length > 40 ? width - 100 : null*/,
                            },
                            MessageStyle.bubleStyle,
                          ]}>
                          <Text style={{color: 'white'}}>{item.text}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
              inverted
            />
          </View>

          <View style={MessageStyle.inputContainerStyle}>
            <Icon
              onPress={() => selectImage()}
              style={{marginRight: 5}}
              name="image"
              type="FontAwesome"
            />

            <Input
              placeholder="Write a message..."
              placeholderStyle={{marginTop: 5}}
              style={{flex: 1, height: 40, padding: 5, borderBottomWidth: 0}}
              value={message}
              maxLength={100}
              onChangeText={(message) => setMessage(message)}
              multiline
            />

            <TouchableOpacity
              onPress={async () => {
                const params = {
                  text: message,
                  image,
                  profile_url: props.user.profile_image,
                  createdDate: new Date(),
                  receiver_user: props.route.params.data.second_user,
                  sender_user: props.user,
                };
                await props.addMessages(props.route.params.data.path, params);
                setMessage('');
              }}
              style={{marginBottom: 10}}>
              <Icon
                style={{marginTop: 7, marginLeft: 5}}
                name="send"
                type="FontAwesome"
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const MessageStyle = {
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  inputContainerStyle: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: height * 0.01,
    backgroundColor: '#23272A',
  },
  messageListContainer: {flex: 15, backgroundColor: '#23272A'},
  inputStyle: {width: width - 110, height: 50},
  sendButtonStyle: {
    width: width / 7,
    height: width / 7,
    backgroundColor: '#23272A',
  },
  messageItemContainer: {padding: 10, flexDirection: 'row'},
  profileCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  bubleStyle: {marginLeft: 20, padding: 10, borderRadius: 10},
};

const mapStateToProps = ({authResponse, messageResponse}) => {
  const {user} = authResponse;
  return {user, all_messages: messageResponse.getMessages};
};

export default connect(mapStateToProps, {getMessages, addMessages})(
  MessageDetail,
);
