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

function Subcription({ navigation }) {
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
            source={require("../../../Assets/Video/AuthPending.json")}
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
            <Text style={styles.Text11}>
              {getTranslatedText("Congratulation")}
            </Text>
          </View>
          <View style={styles.Text2}>
            <Text style={styles.Text22}>{getTranslatedText("Text1")}</Text>
            <Text style={styles.Text22}>{getTranslatedText("Text2")}</Text>
            <Text style={styles.Text22}>{getTranslatedText("Text3")}</Text>
          </View>
        </View>
        {/* ==========  Button Area  ========== */}
        <View style={styles.buttonContainer}>
          <Button
            title={"Next"}
            bgColor={colors.buttonColor}
            color={colors.white}
            borderRadius={hp(1.5)}
            height={hp(5)}
            onPress={() => navigation.navigate("ApprovalPending")}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
export default Subcription;
