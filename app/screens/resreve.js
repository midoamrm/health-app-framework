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
  useColorScheme,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import * as Progress from 'react-native-progress';
var isDarkTheme = '';
var isDarkTheme2 = '';
const Resreve2 = ({ navigation, route }) => {
  var data = route.params.datae;
  const { t, i18n } = useTranslation();
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [filesToUpload2, setFilesToUpload2] = useState([]);
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const theme = useColorScheme();
  if (theme !== 'light') {
    isDarkTheme = 'white';
    isDarkTheme2 = 'black';
    console.log('gf', isDarkTheme);
  }
  if (theme === 'light') {
    isDarkTheme = '#1D5B8C';
    isDarkTheme2 = Colors.white;
    console.log('gf', isDarkTheme);
  }
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
      allowMultiSelection: true,
    }).then((res) => {
      // log file content
      console.log(res);
      // add file to filesToUpload
      setFilesToUpload([...filesToUpload, ...res]);
    });
  }
  function readFiles2() {
    console.log('Reading file');
    DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
      allowMultiSelection: true,
    }).then((res) => {
      // log file content
      console.log(res);
      // add file to filesToUpload
      setFilesToUpload2([...filesToUpload2, ...res]);
    });
  }
  console.log('f', filesToUpload);
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
      {i18n.language === 'en' && (
        <View
          style={{
            marginTop: 10,
            marginLeft: 140,
            marginRight: 40,
          }}>
          <View
            style={{
              borderRadius: 100,
              backgroundColor: isDarkTheme,
              width: 100,
            }}>
            <TouchableOpacity
              onPress={() => {
                uploadFiles();
                uploadFiles2();

                // navigation.navigate('Resreve2', { datae });
              }}>
              <Text
                style={{
                  color: isDarkTheme2,
                  paddingLeft: 22,
                  paddingRight: 5,
                  paddingTop: 5,
                  paddingBottom: 5,
                  fontSize: 20,
                }}>
                Review
              </Text>
            </TouchableOpacity>
          </View>
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
              backgroundColor: isDarkTheme,
              width: 100,
            }}>
            <TouchableOpacity
              onPress={() => {
                uploadFiles();
                uploadFiles2();
                // navigation.navigate('Resreve2', { datae });
              }}>
              <Text
                style={{
                  color: isDarkTheme2,
                  paddingRight: 27,
                  paddingTop: 5,
                  paddingBottom: 5,
                  fontSize: 20,
                }}>
                مراجعه
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Resreve2;
