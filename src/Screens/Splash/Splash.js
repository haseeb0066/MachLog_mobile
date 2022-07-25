import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styles from "./styles";
import Video from "react-native-video";
import video from "../../Assets/Video/splashVideo.mp4";
import { hp, wp } from "../../Utills/CommonMethods/CommonMethods";
import AppLogo from "../../Assets/Images/Svg/AppLogo.svg";
import Images from "../../Assets/Images";
import { useTranslation } from "react-i18next";

function Splash({ navigation }) {
  const videoPlayer = React.useRef();
  useEffect(() => {
    // setTimeout(() => {
    //   if (token) navigation.navigate("BottomNavigation");
    // }, 3000);
  }, []);

  const { t } = useTranslation();
  const getTranslatedText = (text) => {
    return t(text);
  };

  const goFullScreen = () => {
    if (videoPlayer.current) {
      videoPlayer.current.presentFullscreenPlayer();
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={(ref) => (videoPlayer.current = ref)}
        source={video} // the video file
        paused={false} // make it start
        style={styles.backgroundVideo} // any style you want
        repeat={true} // make it a loop
        resizeMode={"cover"}
        rate={1.0}
        // ignoreSilentSwitch={"obey"}
      />

      {/* <View style={{ height: hp(25), borderWidth: 2 }}> */}
      {/* <AppLogo /> */}
      {/* </View> */}

      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          {/* <View style={{ width: hp(90), flex: 1, zIndex: 2 }}> */}
          <Text style={styles.skipText}> {getTranslatedText("SKIP")}</Text>
          {/* </View> */}
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        {/* <AppLogo style={{}} /> */}
        <Image
          source={Images.Logo}
          style={{
            // borderWidth: 1,
            borderColor: "white",
            width: wp(55),
            height: hp(15),
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
export default Splash;
