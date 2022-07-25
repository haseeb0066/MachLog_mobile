import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import styles from "./styles";
import Header from "../../../Components/Common/Header/Header";
import colors from "../../../Assets/Colors/Colors";
import Images from "../../../Assets/Images";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import fonts from "../../../Assets/Fonts/font";
import DatePicker from "react-native-date-picker";
import Button from "../../../Components/Common/Button/Button";
import CommonText from "../../../Utills/CommonText";
import AppInput from "../../../Components/Common/AppInput/AppInput";
import moment from "moment";
import apiClient from "../../../Config/Client";
import Loader from "../../../Components/Common/Loader/Loader";
import Monthly from "../../../Components/Application/Monthly/Monthly";
import Weekly from "../../../Components/Application/Weekly/Weekly";
import Custom from "../../../Components/Application/Custom/Custom";
import ToDays from "../../../Components/Application/ToDays/ToDays";
import { useTranslation } from "react-i18next";

function StatsScreen({ navigation }) {
  const [isToday, setIsToday] = useState(true);
  const [isWeekly, setIsWeekly] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  // ================= Validation funtion with formik ==========================
  const { t } = useTranslation();
  const getTranslatedText = (text) => {
    return t(text);
  };

  return (
    <ImageBackground
      source={require("../../../Assets/Images/Png/BackImage.png")}
      style={{
        flex: 1,
        // zIndex: 1,
        // position: "absolute",
      }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ zIndex: 1 }}>
          <View style={styles.headerContainer}>
            <Header
              title={getTranslatedText("STATS")}
              leftIconPath={Images.backArrow}
              //   backSvg={<LeftArrow />}
              onLeftIconPress={() => {
                // navigation.navigate(getTranslatedText("Home"));
                navigation.goBack();
              }}
              tintColor={colors.white}
            />
          </View>

          {/* =================  TAB BAR  ================== */}
          <View
            style={{
              marginTop: hp(2),
              height: hp(7),
              // borderWidth: 1,
              borderColor: "white",
              zIndex: 1,
              alignItems: "center",
            }}
          >
            {/* ================= Top Tab bar =================== */}
            <View
              style={{
                borderWidth: 2,
                borderColor: "white",
                height: hp(6),
                flexDirection: "row",
                // justifyContent: "center",
                alignItems: "center",
                borderRadius: hp(1),
                width: wp(95),
              }}
            >
              {/* ========== today ============= */}
              <TouchableOpacity
                style={{
                  flex: 0.25,
                  borderColor: "white",
                  height: hp(4),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: hp(1),
                  backgroundColor: isToday ? colors.ButtonColor : null,
                  marginLeft: hp(0.5),
                }}
                onPress={() => {
                  setIsToday(true);
                  setIsMonthly(false);
                  setIsWeekly(false);
                  setIsYearly(false);
                }}
              >
                <Text
                  style={{
                    color: isToday ? colors.ButtonText : colors.white,
                    fontWeight: "600",
                  }}
                >
                  {getTranslatedText("Today")}
                </Text>
              </TouchableOpacity>
              {!isWeekly && !isToday && (
                <View
                  style={{
                    height: hp(4),
                    borderWidth: 1,
                    borderColor: "white",
                    // flex: 0.01,
                  }}
                ></View>
              )}

              {/* ========== weekly ============= */}
              <TouchableOpacity
                style={{
                  flex: 0.25,
                  marginLeft: hp(0.3),
                  marginRight: hp(0.3),
                  borderColor: "white",
                  height: hp(4),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: hp(1),
                  backgroundColor: isWeekly ? colors.ButtonColor : null,
                }}
                onPress={() => {
                  setIsToday(false);
                  setIsMonthly(false);
                  setIsWeekly(true);
                  setIsYearly(false);
                }}
              >
                <Text
                  style={{
                    color: isWeekly ? colors.ButtonText : colors.white,
                    fontWeight: "600",
                  }}
                >
                  {getTranslatedText("Weekly")}
                </Text>
              </TouchableOpacity>
              {!isWeekly && !isMonthly && (
                <View
                  style={{
                    height: hp(4),
                    borderWidth: 1,
                    borderColor: "white",
                    // flex: 0.01,
                  }}
                ></View>
              )}
              {/* ========== monthy ============= */}
              <TouchableOpacity
                style={{
                  flex: 0.25,
                  borderColor: "white",
                  height: hp(4),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: hp(1),
                  backgroundColor: isMonthly ? colors.ButtonColor : null,
                }}
                onPress={() => {
                  setIsToday(false);
                  setIsMonthly(true);
                  setIsWeekly(false);
                  setIsYearly(false);
                }}
              >
                <Text
                  style={{
                    color: isMonthly ? colors.ButtonText : colors.white,
                    fontWeight: "600",
                  }}
                >
                  {getTranslatedText("Monthy")}
                </Text>
              </TouchableOpacity>
              {!isMonthly && !isYearly && (
                <View
                  style={{
                    height: hp(4),
                    borderWidth: 1,
                    borderColor: "white",
                    // flex: 0.01,
                  }}
                ></View>
              )}
              {/* ========== yearly ============= */}
              <TouchableOpacity
                style={{
                  flex: 0.25,
                  marginRight: hp(0.5),
                  borderColor: "white",
                  height: hp(4),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: hp(1),
                  backgroundColor: isYearly ? colors.ButtonColor : null,
                }}
                onPress={() => {
                  setIsToday(false);
                  setIsMonthly(false);
                  setIsWeekly(false);
                  setIsYearly(true);
                }}
              >
                <Text
                  style={{
                    color: isYearly ? colors.ButtonText : colors.white,
                    fontWeight: "600",
                  }}
                >
                  {getTranslatedText("Custom")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* =================  apply Date ================== */}

          {isToday && <ToDays />}

          {/* =================  WEEKLY screen  ================== */}

          {/* ============= Date Picker ================== */}
          {isWeekly && <Weekly />}

          {/* =================  Monthly screen  ================== */}

          {isMonthly && <Monthly />}

          {/* =================  Custom screen  ================== */}

          <View
            style={{
              height: hp(100),
              // borderWidth: 1,
              borderColor: "white",
            }}
          >
            {isYearly && <Custom />}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
export default StatsScreen;
