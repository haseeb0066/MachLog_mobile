import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import styles from "./styles";
import LottieView from "lottie-react-native";
import colors from "../../../Assets/Colors/Colors";
import Button from "../../../Components/Common/Button/Button";
import { useTranslation } from "react-i18next";

function ApprovalPending({ navigation }) {
  const { t } = useTranslation();
  const getTranslatedText = (text) => {
    return t(text);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../Assets/Images/Png/BackImage.png")}
        style={styles.backImage}
      >
        {/* ========  timer clock  ========== */}
        <View style={styles.clockView}>
          <LottieView
            source={require("../../../Assets/Video/timerClock.json")}
            style={{
              height: hp(15),
              width: wp(40),
              //   borderWidth: 1,
            }}
            autoPlay={true}
            loop
          />
        </View>
        {/* ==========  Text Area  ========== */}
        <View style={styles.TextAreaView}>
          <View style={styles.Text1}>
            <Text style={styles.Text11}>{getTranslatedText("ReqPending")}</Text>
          </View>
          <View style={styles.Text2}>
            <Text style={styles.Text22}>
              {getTranslatedText("WeCallHours")}
            </Text>
            <Text style={styles.Text22}>{getTranslatedText("ToKYC")}</Text>
          </View>
        </View>
        {/* ==========  Button Area  ========== */}
        <View style={styles.buttonContainer}>
          {/* BUTTON 1 */}
          <View style={styles.buttonView1}>
            <Button
              title={getTranslatedText("Support")}
              bgColor={colors.white}
              color={colors.white}
              borderRadius={hp(1.5)}
              height={hp(5)}
              // onPress={handleSubmit}
              // onPress={() => navigation.navigate("LoginScreen")}
              onPress={() => navigation.navigate("AuthSupportScreen")}
            />
          </View>
          {/* BUTTON 2 */}
          <View style={styles.buttonView1}>
            <Button
              title={getTranslatedText("SignIn")}
              bgColor={colors.white}
              color={colors.white}
              borderRadius={hp(1.5)}
              height={hp(5)}
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
export default ApprovalPending;
