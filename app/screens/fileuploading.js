import storage from '@react-native-firebase/storage';
import React from 'react';
import {
  Alert,
  Button,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { launchImageLibrary } from 'react-native-image-picker';
export default class Fileuploading extends React.Component {
  state = {
    // placeholder image
    imagePath: require('../assets/images/saveimg.png'),
  };

  chooseFile = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true, // do not backup to iCloud
        path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker', storage());
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // let path = this.getPlatformPath(response).value;
        // let fileName = this.getFileName(response.fileName, path);

        // this.setState({ imagePath: path });
        try {
          var source = response.assets[0].uri;
          console.log('source', source);
          // const { uri } = source;
          const filename = source.substring(source.lastIndexOf('/') + 1);
          const uri = decodeURI(source);
          const task = storage().ref(filename).putFile(uri);

          task.on('state_changed', (taskSnapshot) => {
            console.log(
              `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
          });

          task.then(() => {
            Alert.alert(
              'Photo uploaded!',
              'Your photo has been uploaded to Firebase Cloud Storage!',
            );
            console.log('Image uploaded to the bucket!');
          });
          console.log('filename', filename);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  uploadfilepick = () => {
    DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
      copyTo: 'cachesDirectory',
    }).then((res) => {
      // log file content
      console.log(res);
      console.log(res[0].fileCopyUri);
      console.log(res[0].name);
      // add file to filesToUpload

      try {
        const uri = decodeURI(res[0].fileCopyUri);
        const fname = res[0].name;
        const task = storage().ref(`/myfiles/${fname}`).putFile(uri);

        task.on('state_changed', (taskSnapshot) => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });

        task.then(() => {
          console.log('file uploaded to the bucket!');
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
  /**
   * Get the file name and handle the invalid null case
   */
  getFileName(name, path) {
    if (name != null) {
      return name;
    }

    if (Platform.OS === 'ios') {
      path = '~' + path.substring(path.indexOf('/Documents'));
    }
    return path;
  }

  /**
   * Get platform specific value from response
   */
  getPlatformPath({ path, uri }) {
    return Platform.select({
      android: { value: path },
      ios: { value: uri },
    });
  }

  /**
   * Get platform-specific Uri with the required format
   */
  getPlatformURI(imagePath) {
    let imgSource = imagePath;
    if (isNaN(imagePath)) {
      imgSource = { uri: this.state.imagePath };
      if (Platform.OS == 'android') {
        imgSource.uri = 'file:///' + imgSource.uri;
      }
    }
    return imgSource;
  }

  render() {
    let { imagePath } = this.state;
    let imgSource = this.getPlatformURI(imagePath);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.uploadImage} source={imgSource} />
          <View style={styles.eightyWidthStyle}>
            <Button title={'Upload Files'} onPress={this.uploadfilepick} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  eightyWidthStyle: {
    width: '80%',
    margin: 2,
  },
  uploadImage: {
    width: '80%',
    height: 300,
  },
});
