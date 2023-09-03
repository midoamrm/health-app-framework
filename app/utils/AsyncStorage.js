// a class tp access the async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageClass {
  // initi
  static init() {
    AsyncStorageClass.user = null;
  }

  // save the user data to the async storage
  static async saveUser(user) {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }

  // get the user data from the async storage
  static async getUser() {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }

  // remove the user data from the async storage
  static async removeUser() {
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
}
