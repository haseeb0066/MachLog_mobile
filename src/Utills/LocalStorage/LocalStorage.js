import AsyncStorage from '@react-native-async-storage/async-storage';

class localStorage {
  storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };

  storeObjectData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {}
  };

  getData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };

  getObjectData = async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? jsonValue : null;
    } catch (e) {
      // error reading value
    }
  };
}

const LocalStorage = new localStorage();
export default LocalStorage;
