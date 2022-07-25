import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import StackNavigation from "./src/Navigation/StackNavigation/StackNavigation";
import { store, persistor } from "./src/Redux/Store/Stores";
import { Alert, View } from "react-native";
// import messaging from "@react-native-firebase/messaging";
import { requestUserPermission } from "./src/Utills/PushNotifications/PushNotifications";
import messaging from "@react-native-firebase/messaging";
import Firebase from "@react-native-firebase/app";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, { Importance } from "react-native-push-notification";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import crashlytics from "@react-native-firebase/crashlytics";
import CompanyInfo from "./src/Screens/AuthScreens/CompanyInfo/CompanyInfo";
import VehicleInfo from "./src/Screens/AuthScreens/VehicleInfo/VehicleInfo";
import Subcription from "./src/Screens/AuthScreens/Subcription/Subcription";

export default function App() {
  const [user, setUser] = useState();
  PushNotification.createChannel(
    {
      channelId: "channel-id", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (Platform.OS === "ios")
        PushNotificationIOS.addNotificationRequest({
          id: "1",
          title: "sada",
          subtitle: "sdsd",
          sound: true,
        });
      console.log("forground", JSON.stringify(remoteMessage));
      alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected && !state.isInternetReachable)
        Toast.show("Please check your internet connection");

      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      // console.log("Is connected?", state.isInternetReachable);
    });
    return () =>
      // Unsubscribe
      unsubscribe();
  }, []);

  useEffect(() => {
    crashlytics().log("App mounted.");
    crashlytics().crash();
    console.log("==== crashlytics ====");
    onSignIn({
      uid: "Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9",
      username: "Haseeb Sheikh",
      email: "Viltco@example.com",
      credits: 2233,
    });
  }, []);

  async function onSignIn(user) {
    crashlytics().log("User signed in.");
    await Promise.all([
      crashlytics().setUserId(user.uid),
      crashlytics().setAttribute("credits", String(user.credits)),
      crashlytics().setAttributes({
        role: "admin",
        followers: "13",
        email: user.email,
        username: user.username,
      }),
    ]);
  }

  const [userCounts, setUserCounts] = useState(null);

  function updateUserCounts() {
    console.log("=== updateUserCounts ===");
    crashlytics().log("Updating user count.");
    let users = false;
    try {
      if (users == true) {
        console.log(" try running  ");
        // An empty array is truthy, but not actually true.
        // Therefore the array was never initialised.
        setUserCounts(userCounts.push(users.length));
      }
    } catch (error) {
      crashlytics().crash();
      console.log("=== crashlytics crashed!!! ===");
      crashlytics().recordError(error);
      console.log("Error ===> ", error);
    }
  }

  useEffect(() => {
    crashlytics().log("App mounted.");
    let users = true;
    // if (users == true) setUserCounts([]);
    updateUserCounts();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{ flex: 1 }}>
          <StackNavigation />
          {/* <Subcription /> */}
        </View>
        <Toast />
      </PersistGate>
    </Provider>
  );
}

//========================= Crash laytics ====================
