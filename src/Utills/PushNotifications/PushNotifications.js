import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
    GetFcmToken();
  }
}

const GetFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem("fcmToken");
  console.log("fcmToken old token ==>   ", fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log("new generated fcmtoken ==>  ", fcmToken);
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    } catch (error) {
      console.log("error rasied in fcmToken  =>  ", error);
    }
  }
};
