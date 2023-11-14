import storage from '@react-native-firebase/storage';
import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';
var isDarkTheme = '';
var isDarkTheme2 = '';
var pp = 0;
const Resreve2 = ({ navigation, route }) => {
  var data = route.params.datae;
  const { t, i18n } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [filesToUpload2, setFilesToUpload2] = useState([]);

  const [isbtnVisible, setbtnVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  /* const theme = useColorScheme();
  if (theme !== 'light') {
    isDarkTheme = 'white';
    isDarkTheme2 = 'black';
    console.log('gf', isDarkTheme);
  }
  if (theme === 'light') {
    isDarkTheme = '#1D5B8C';
    isDarkTheme2 = Colors.white;
    console.log('gf', isDarkTheme);
  }*/
  console.log('hallo', data);
  var datear = [];

  if (i18n.language === 'ar') {
    datear = data[0].toLocaleDateString('ar-EG-u-nu-latn', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
  if (i18n.language === 'en') {
    datear = data[0].toLocaleDateString('en-EG-u-nu-latn', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  console.log(datear);
  ///
  const uploadFiles = async () => {
    // for each file in filesToUpload
    // get file content

    for (let index = 0; index < filesToUpload.length; index++) {
      const element = filesToUpload[index];
      // upload file to server https://v2.convertapi.com/upload  with axios
      setFilesToUpload((curr) => {
        curr[index].progress = 0;
        return curr;
      });

      console.log(`Uploading file progress ${element.progress}`);
      const formData = new FormData();
      formData.append('file', {
        uri: element.uri,
        name: element.name,
        type: element.type,
      });
      console.log(`Uploading file ${element.name}`);
      try {
        const response = await axios.post(
          'https://v2.convertapi.com/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              const progress_ = progressEvent.loaded / progressEvent.total;
              console.log(`Uploading file progress ${progress_}`);
              setFilesToUpload((curr) => {
                curr[index].progress = 100000 * progress_;
                return curr;
              });
              setProgress(progress_);
              console.log('fg', filesToUpload[index]);
            },
          },
        );

        console.log(
          `Upload Finished Access the file at https://v2.convertapi.com/d/${response.data.FileId}`,
        );

        setFilesToUpload((curr) => {
          curr[
            index
          ].url = `https://v2.convertapi.com/d/${response.data.FileId}`;
          curr[index].progress = 1;
          return curr;
        });
      } catch (e) {
        console.log(e);
      }
      //console.log('fg', filesToUpload[index]);
    }
  };
  ///
  ////
  const uploadFiles2 = async () => {
    // for each file in filesToUpload
    // get file content

    for (let index = 0; index < filesToUpload2.length; index++) {
      const element = filesToUpload2[index];
      // upload file to server https://v2.convertapi.com/upload  with axios
      setFilesToUpload((curr) => {
        curr[index].progress = 0;
        return curr;
      });

      console.log(`Uploading file progress ${element.progress}`);
      const formData = new FormData();
      formData.append('file', {
        uri: element.uri,
        name: element.name,
        type: element.type,
      });
      console.log(`Uploading file ${element.name}`);
      try {
        const response = await axios.post(
          'https://v2.convertapi.com/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              const progress_ = progressEvent.loaded / progressEvent.total;
              console.log(`Uploading file progress ${progress_}`);
              setFilesToUpload2((curr) => {
                curr[index].progress = 100000 * progress_;
                pp = 100000 * progress_;
                return curr;
              });
              setProgress2(progress_);
              console.log('fg', filesToUpload2[index]);
            },
          },
        );

        console.log(
          `Upload Finished Access the file at https://v2.convertapi.com/d/${response.data.FileId}`,
        );
        setFilesToUpload2((curr) => {
          curr[
            index
          ].url = `https://v2.convertapi.com/d/${response.data.FileId}`;
          curr[index].progress = 1;
          return curr;
        });
      } catch (e) {
        console.log(e);
      }
      //console.log('fg', filesToUpload[index]);
    }
  };
  /////
  function readFiles() {
    console.log('Reading file');
    DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
      copyTo: 'cachesDirectory',
      allowMultiSelection: true,
    }).then((res) => {
      // log file content
      console.log('response', res);
      // add file to filesToUpload
      setFilesToUpload([...filesToUpload, ...res]);
    });
  }
  function readFiles2() {
    console.log('Reading file');
    DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
      copyTo: 'cachesDirectory',
      allowMultiSelection: true,
    }).then((res) => {
      // log file content
      console.log(res);
      // add file to filesToUpload
      setFilesToUpload2([...filesToUpload2, ...res]);
    });
  }
  function uploadtofirebase() {
    for (var i = 0; i < filesToUpload.length; i++) {
      // console.log('fiels uploadddd', filesToUpload[i]);
      try {
        const uri = decodeURI(filesToUpload[i].fileCopyUri);
        const fname = filesToUpload[i].name;
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
    }
  }
  function uploadtofirebase2() {
    for (var i = 0; i < filesToUpload2.length; i++) {
      // console.log('fiels uploadddd', filesToUpload[i]);
      try {
        const uri = decodeURI(filesToUpload2[i].fileCopyUri);
        const fname = filesToUpload2[i].name;
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
    }
  }
  // console.log('f', filesToUpload[0]);
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 20,
          marginLeft: 40,
          marginRight: 40,
          padding: 10,
        }}>
        <Text
          style={{
            fontSize: 30,
            fontStyle: 'italic',
            color: 'black',
            fontWeight: 600,
          }}>
          {t('g1')}
        </Text>
        <Text
          style={{ fontSize: 20, paddingTop: 10, padding: 7, color: 'black' }}>
          {data[3][0].key}
        </Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            textAlign: 'left',
            padding: 7,
            color: 'black',
          }}>
          {datear}
        </Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 280 }}>
            <Text style={{ fontSize: 20, textAlign: 'left', color: 'black' }}>
              {data[1]}
            </Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Resreve');
            }}>
            <Image
              width={30}
              height={40}
              source={require('../assets/images/tk.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 280 }}>
            <Text style={{ fontSize: 20, textAlign: 'left', color: 'black' }}>
              {data[2]}
            </Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Resreve');
            }}>
            <Image
              width={30}
              height={40}
              source={require('../assets/images/tk.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 5,
          marginLeft: 40,
          marginRight: 40,
          padding: 20,
        }}>
        <Text
          style={{
            fontSize: 30,
            fontStyle: 'italic',
            color: 'black',
            fontWeight: 600,
          }}>
          {t('g2')}
        </Text>

        <View
          style={{
            borderColor: 'black',
            borderWidth: StyleSheet.hairlineWidth,
            flexDirection: 'row',
          }}>
          {i18n.language === 'en' && (
            <>
              <Text
                style={{
                  fontSize: 20,
                  paddingTop: 10,

                  paddingRight: 195,
                  color: 'black',
                }}>
                {t('g3')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  readFiles();

                  //    filesToUpload[0].progress = 0;
                }}>
                <Image
                  width={30}
                  height={40}
                  source={require('../assets/images/ukk.png')}
                />
              </TouchableOpacity>
            </>
          )}
          {i18n.language === 'ar' && (
            <>
              <Text
                style={{
                  fontSize: 20,
                  paddingTop: 10,
                  paddingLeft: 165,
                  paddingRight: 10,
                  color: 'black',
                }}>
                {t('g3')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  readFiles();

                  //filesToUpload[0].progress = 0;
                }}>
                <Image
                  width={30}
                  height={40}
                  source={require('../assets/images/ukk.png')}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View
          style={{
            borderColor: 'black',
            borderWidth: StyleSheet.hairlineWidth,
          }}>
          <FlatList
            data={filesToUpload}
            numColumns={1}
            scrollEnabled={true}
            renderItem={({ item, index }) => (
              <View>
                <Text style={{ color: 'black' }}>{item.name}</Text>
                <Progress.Bar
                  progress={filesToUpload[0].progress}
                  indeterminate={false}
                  width={null}
                  height={6}
                />
              </View>
            )}
          />
        </View>
        <View
          style={{
            borderColor: 'black',
            borderWidth: StyleSheet.hairlineWidth,
            flexDirection: 'row',
          }}>
          {i18n.language === 'ar' && (
            <>
              <Text
                style={{
                  fontSize: 20,
                  paddingTop: 10,
                  paddingLeft: 110,
                  paddingRight: 10,
                  color: 'black',
                }}>
                {t('g4')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  readFiles2();

                  //    filesToUpload2[0].progress = 0;
                }}>
                <Image
                  width={30}
                  height={40}
                  source={require('../assets/images/ukk.png')}
                />
              </TouchableOpacity>
            </>
          )}
          {i18n.language === 'en' && (
            <>
              <Text
                style={{
                  fontSize: 20,
                  paddingTop: 10,

                  paddingRight: 30,
                  color: 'black',
                }}>
                {t('g4')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  readFiles2();

                  //filesToUpload2[0].progress = 0;
                }}>
                <Image
                  width={30}
                  height={40}
                  source={require('../assets/images/ukk.png')}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View
          style={{
            borderColor: 'black',
            borderWidth: StyleSheet.hairlineWidth,
          }}>
          <FlatList
            data={filesToUpload2}
            numColumns={1}
            scrollEnabled={true}
            renderItem={({ item, index }) => (
              <View>
                <Text style={{ color: 'black' }}>{item.name}</Text>
                <Progress.Bar
                  progress={filesToUpload2[0].progress}
                  indeterminate={false}
                  width={null}
                  height={6}
                />
              </View>
            )}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          marginLeft: 100,
          marginRight: 40,
        }}>
        <View
          style={{
            borderRadius: 10,
            borderWidth: 1,
            backgroundColor: '#007bff',
            width: 200,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Ocr');
            }}>
            <Text
              style={{
                color: 'white',
                paddingLeft: 22,
                paddingRight: 5,
                paddingTop: 5,
                paddingBottom: 5,
                fontSize: 20,
              }}>
              {t('perceptionreader')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {i18n.language === 'en' && (
        <View
          style={{
            marginTop: 10,
            marginLeft: 140,
            marginRight: 40,
          }}>
          <View
            style={{
              borderRadius: 10,
              borderWidth: 1,
              backgroundColor: '#007bff',
              width: 100,
            }}>
            <TouchableOpacity
              onPress={() => {
                uploadtofirebase();
                uploadtofirebase2();
                uploadFiles();
                uploadFiles2();
                toggleModal();
                setTimeout(() => {
                  setbtnVisible(true);
                }, 1000 * 2);
                // navigation.navigate('Resreve2', { datae });
              }}>
              <Text
                style={{
                  color: 'white',
                  paddingLeft: 22,
                  paddingRight: 5,
                  paddingTop: 5,
                  paddingBottom: 5,
                  fontSize: 20,
                }}>
                Upload
              </Text>
            </TouchableOpacity>
          </View>
          <Modal isVisible={isModalVisible} style={styles.mainModel}>
            <View style={styles.failureContent}>
              <Text style={styles.popupSubTitle}>Files have been uploaded</Text>
              <Progress.Bar
                progress={pp}
                indeterminate={false}
                width={240}
                height={6}
              />
              {isbtnVisible && (
                <View style={styles.failureBtnView}>
                  <TouchableOpacity
                    onPress={() => {
                      toggleModal();
                      navigation.navigate('MainScreen');
                    }}>
                    <Text style={styles.failureBtnText}>proceed</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Modal>
        </View>
      )}
      {i18n.language === 'ar' && (
        <View
          style={{
            marginTop: 10,
            marginLeft: 140,
            marginRight: 40,
          }}>
          <View
            style={{
              borderRadius: 100,

              width: 100,
            }}>
            <TouchableOpacity
              onPress={() => {
                uploadtofirebase();
                uploadtofirebase2();
                uploadFiles();
                uploadFiles2();
                toggleModal();
                setTimeout(() => {
                  setbtnVisible(true);
                }, 1000 * 2);
                // navigation.navigate('Resreve2', { datae });
              }}>
              <Text
                style={{
                  color: 'black',
                  paddingRight: 27,
                  paddingTop: 5,
                  paddingBottom: 5,
                  fontSize: 20,
                }}>
                رفع
              </Text>
            </TouchableOpacity>
          </View>
          <Modal isVisible={isModalVisible} style={styles.mainModel}>
            <View style={styles.failureContent}>
              <Text style={styles.popupSubTitle}>Files have been uploaded</Text>
              <Progress.Bar
                progress={pp}
                indeterminate={false}
                width={240}
                height={6}
              />
              {isbtnVisible && (
                <View style={styles.failureBtnView}>
                  <TouchableOpacity
                    onPress={() => {
                      uploadtofirebase();
                      toggleModal();
                      navigation.navigate('MainScreen');
                    }}>
                    <Text style={styles.failureBtnText}>proceed</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Modal>
        </View>
      )}
    </ScrollView>
  );
};

export default Resreve2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',

    width: '100%',
    height: '100%',
    borderTopRightRadius: 50,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#124963',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: '1%',
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#124963',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#00AE93',
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 25,
  },
  logoImgView: {
    width: '80%',
    height: '20%',
    alignItems: 'center',
    transform: [{ scale: 0.9 }],
    paddingBottom: 30,
    borderRadius: 70,
  },
  allInputs: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  titleImg: {
    alignItems: 'center',
    // modify the size of the image
    transform: [{ scale: 0.8 }],
    marginTop: -20,
  },
  scroll: {
    backgroundColor: '#D7EFEE',
    width: '100%',
    height: '100%',
  },
  appBarView: {
    backgroundColor: '#1D5B8C',
  },
  appBar: {
    // width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    direction: 'rtl',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    paddingRight: 10,
  },
  backArrow: {
    // fontWeight: 'bold',
    // fontFamily: 'Arial',
    paddingRight: 10,
  },
  mainModel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  popupSubTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  failureContent: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    width: '95%',
  },
  failureBtnView: {
    backgroundColor: '#1D5B8C',
    borderRadius: 30,
    paddingVertical: 5,
    width: '95%',
    marginVertical: 10,
  },
  failureBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successContent: {
    backgroundColor: '#1D5B8C',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    width: '95%',
  },
  sucessBtnView: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 5,
    width: '95%',
    marginVertical: 10,
  },
  successBtnText: {
    color: '#1D5B8C',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ffe6e6',
    borderRadius: 5,
    marginBottom: 10,
  },
  secureBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  socialBtn: {
    width: '80%',
    backgroundColor: '#00AE93',
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  socialBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  socialView: {
    width: '100%',
    alignItems: 'center',
    // marginTop: 10,
  },
  lineSeparatorView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginTop: 10,
  },
  lineSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: '#124963',
  },
  lineSeparatorText: {
    color: '#124963',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
  },
});
