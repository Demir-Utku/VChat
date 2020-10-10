import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import {Icon} from 'native-base';

const {width, height} = Dimensions.get('window');

const Menu = (props) => {
  const [image, setImage] = useState(null);

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
    <SafeAreaView style={styles.container}>
      {/* Profile image */}
      <View style={styles.profile}>
        <View>
          {image ? (
            <TouchableOpacity onPress={() => selectImage()}>
              <Image source={{uri: image}} style={styles.image} />
            </TouchableOpacity>
          ) : (
            <Icon
              name={'user-circle'}
              type="FontAwesome"
              style={styles.icon}
              onPress={() => selectImage()}
            />
          )}
        </View>
      </View>

      <View style={styles.profile}>
        <Text style={styles.profileText}>@Utku</Text>
        <Text style={styles.profileText}>utku@gmail.com</Text>
      </View>

      <View style={{margin: width * 0.2}}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() =>
            Alert.alert(
              'ABOUT',
              'This chat application is developed by Kolin Kayıkcıoğlu, Rümeysa Gedik and Utku Demir!',
            )
          }>
          <Icon
            name={'question-circle'}
            type="FontAwesome"
            style={styles.aboutIcon}
          />
          <Text style={styles.aboutText}>About</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.about}>
        <TouchableOpacity style={styles.touchable}>
          <Icon name={'cogs'} type="FontAwesome" style={styles.aboutIcon} />
          <Text style={styles.aboutText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  imageView: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  icon: {
    fontSize: 48,
  },
  profile: {
    alignItems: 'center',
  },
  profileText: {
    fontWeight: 'bold',
    margin: 5,
    fontSize: 20,
  },
  about: {
    margin: width * 0.2,
  },
  touchable: {
    flexDirection: 'row',
  },
  aboutIcon: {
    fontSize: 60,
  },
  aboutText: {
    marginTop: width * 0.04,
    fontSize: 22,
    marginLeft: 10,
  },
});

export default Menu;
