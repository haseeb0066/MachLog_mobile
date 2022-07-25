import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  PermissionsAndroid,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import styles from "./styles";
import Images from "../../../Assets/Images";
import colors from "../../../Assets/Colors/Colors";
import { wp, hp } from "../../../Utills/CommonMethods/CommonMethods";
import DetailCard from "../../../Components/Application/DetailCard/DetailCard";
// ================== SVG IMPORT ==============
import DateIcon from "../../../Assets/Images/Svg/DateIcon.svg";
import EndTIcon from "../../../Assets/Images/Svg/EndTIcon.svg";
import PerposeIcon from "../../../Assets/Images/Svg/PerposeIcon.svg";
import StartTIcon from "../../../Assets/Images/Svg/StartTIcon.svg";
import TotalKm from "../../../Assets/Images/Svg/TotalKm.svg";
import TotalTime from "../../../Assets/Images/Svg/TotalTime.svg";
import DiffIcon from "../../../Assets/Images/Svg/DiffIcon.svg";
import fonts from "../../../Assets/Fonts/font";
import GetTokenApi from "../../../Config/GetTokenApi/GetTokenApi";
import EndPoints from "../../../Config/BaseUrl/BaseUrl";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Common/Loader/Loader";
import Toast from "react-native-simple-toast";
import MessageIcon from "../../../Assets/Images/Svg/message.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import BackgroundTimer from "react-native-background-timer";
import WooCommerceAPI from "react-native-woocommerce-api";
import axios from "axios";
import "../../../Assets/Languages/i18n";
import { useTranslation } from "react-i18next";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeLanguage } from "i18next";
import { LanguageType } from "../../../Redux/Actions/Actions";
import { getTranslatedText } from "i18next";
import crashlytics from "@react-native-firebase/crashlytics";

function HomeScreen({ navigation }) {
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.authReducer.token);

  //================= background Timer ==================
  const [secondLeft, setSecondLeft] = useState(0);
  const [onTime, setOnTime] = useState(false);
  const { t } = useTranslation();
  const getTranslatedText = (text) => {
    return t(text);
  };

  useEffect(() => {
    if (onTime) startTimer();
    else {
      BackgroundTimer.stopBackgroundTimer();
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [onTime]);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      //code that will be called every 3 seconds
      setSecondLeft((secs) => {
        if (secs >= 0) return secs + 1;
        else return 0;
      });
      // console.log("seconds ==> ", secondLeft);
    }, 1000);
  };

  useEffect(() => {
    if (secondLeft === 0) {
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [secondLeft]);

  const Clockify = () => {
    let hours = Math.floor(secondLeft / 3600);
    let mins = Math.floor((secondLeft - hours * 3600) / 60);
    let second = secondLeft - hours * 3600 - mins * 60;
    let miliSecond = secondLeft - hours * 3600 - mins * 60 * 60;

    let displayHour = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecond = second < 10 ? `0${second}` : second;
    let displayMili = miliSecond < 10 ? `0${miliSecond}` : miliSecond;

    return {
      displayHour,
      displayMins,
      displaySecond,
      displayMili,
    };
  };

  //================= background Timer ==================

  //================  Stop Watch  ================
  const [time, setTime] = useState(0);
  const [timeOn, setTimeOn] = useState(false);
  const [buttonToggle, setButtonToggle] = useState(false);
  const userName = useSelector((state) => state.authReducer.name);

  // =================   Upload Images =====================
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === "ios") {
      null;
    } else {
      requestCameraPermission();
    }
  }, []);

  useEffect(() => {
    let interval = null;
    if (timeOn) {
      interval = setInterval(() => {
        setTime((previous) => previous + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeOn]);

  // ================= Validation funtion with formik ==========================
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  const CurrentLanguage = useSelector(
    (state) => state.authReducer.CurrentLanguage
  );

  // ==========================  GET API States ===================
  const [endTime, setEndTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [rideType, setRideType] = useState("");
  const [totalDistance, setTotalDistance] = useState("");
  const [totalTripTime, setTotalTripTime] = useState("");
  const [userame, SetUserame] = useState("");
  const [sTime, setSTime] = useState("");

  const GetRequest = async () => {
    setIsLoading(true);
    const res = await GetTokenApi(EndPoints.HomeAPI, "GET", token);
    if (res.status === 200) {
      // console.log("res 200 ==> ", res.data.start_time);
      setIsLoading(false);
      setEndTime(res.data.end_time);
      setStartTime(res.data.start_date);
      res.data.ride_type == 1 ? setRideType("Work") : setRideType("Personal");
      setTotalDistance(res.data.total_distance);
      setTotalTripTime(res.data.total_trip_time);
      SetUserame(res.data.user_name);
      setSTime(res.data.start_time);
      crashlytics().crash();
      crashlytics().log("Home Screen Running");
    } else {
      setIsLoading(false);
      crashlytics().log("Home Screen Running");
      // Toast.show(res.data.message, Toast.LONG);
      alert(res.data.message);
    }
  };

  const checkSubcribtion = async () => {
    setIsLoading(true);
    const res = await GetTokenApi(EndPoints.checkUserPackage, "GET", token);
    if (res.status === 200) {
      console.log("res 200 checkSubcribtion ==> ", res.data);
      navigation.navigate("OdometerScreen", {
        Type: "start",
        setOnTime: setOnTime,
      });
      setButtonToggle(!buttonToggle);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.log("res else check= ==> ", res.data);
      // alert(res.data.message);
      Alert.alert(res?.data?.message, "", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => navigation.navigate(getTranslatedText("Subcription")),
        },
      ]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      GetRequest();
    }, [])
  );
  //================== DROP DOWN =================
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([
    { label: "English", value: "Eng" },
    { label: "Finnish", value: "Fin" },
    { label: "Swedish", value: "Swe" },
  ]);

  //================== DROP DOWN =================

  //================= LANGUAGE ==================

  const [currentLanguage, setLanguage] = useState("");

  useEffect(() => {
    console.log("currentLanguage===>  ", CurrentLanguage);
    // if (CurrentLanguage == null) {
    //   setValue("en");
    // } else {
    changeLanguage(CurrentLanguage);
    setLanguage(CurrentLanguage);
    setValue(CurrentLanguage);
    // }
  }, [currentLanguage, value]);

  //================= LANGUAGE ==================

  return (
    <ImageBackground
      source={require("../../../Assets/Images/Png/BackImage.png")}
      style={{
        height: "100%",
        width: "101%",
        position: "absolute",
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          // behavior="height"
          style={styles.container}
        >
          {isLoading && <Loader isloading={isLoading} />}

          <ScrollView style={{ zIndex: 1, flex: 1 }}>
            <View style={styles.headerContainer}>
              <View
                style={{
                  // borderWidth: 1,
                  borderColor: "white",
                  width: wp(25),
                  height: hp(9),
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                {/* ============ Drop Down =========== */}
                {open ? (
                  <DropDownPicker
                    containerStyle={{
                      width: hp(30),
                    }}
                    listMode="MODAL"
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onSelectItem={async (item) => {
                      console.log(" selected ===> ", item.value);
                      setValue(item.value);
                      changeLanguage(item.value);
                      await AsyncStorage.setItem("LanguageType", item.value);
                      dispatch(LanguageType(item.value));
                    }}
                  />
                ) : null}

                {/* ============ Drop Down =========== */}
                <View style={{ flex: 0.4, alignItems: "center" }}>
                  <Text style={{ fontSize: hp(1.7), color: colors.white }}>
                    {value}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{ flex: 0.6 }}
                  onPress={() => {
                    setOpen(true);
                  }}
                >
                  <Image
                    source={Images.Language}
                    style={{
                      // borderWidth: 1,
                      borderColor: "white",
                      width: wp(7),
                      height: hp(7),
                      tintColor: colors.white,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  // borderWidth: 1,
                  borderColor: "white",
                  width: wp(50),
                  alignItems: "center",
                }}
              >
                <Image
                  source={Images.Logo}
                  style={{
                    // borderWidth: 1,
                    borderColor: "white",
                    width: wp(60),
                    height: hp(9),
                  }}
                  resizeMode="contain"
                />
              </View>
              <TouchableOpacity
                style={{
                  // borderWidth: 1,
                  borderColor: "white",
                  width: wp(25),
                  justifyContent: "center",
                  alignItems: "center",
                  height: hp(9),
                }}
                onPress={() => navigation.navigate("Messages")}
              >
                <MessageIcon />
              </TouchableOpacity>
            </View>
            {/* ============== user name ============ */}
            <View
              style={{
                height: hp(5),
                borderColor: "white",
                // borderWidth: 1,
                flexDirection: "row",
                alignItems: "flex-end",
                width: wp(100),
                // justifyContent: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    color: colors.white,
                    paddingLeft: hp(5),
                    fontSize: hp(1.8),
                    fontFamily: fonts.MontserBold,
                  }}
                >
                  {getTranslatedText("Welcome")},{" "}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: hp(1.5),
                    paddingTop: hp(0.3),
                  }}
                >
                  {/* {userName} */}
                  {getTranslatedText("hello")}
                </Text>
              </View>
            </View>

            {/* ============== Stop Watch ================= */}
            <View style={styles.watchContainer}>
              <View
                style={{
                  flex: 0.5,
                  width: wp(100),
                  // borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: colors.white,
                }}
              >
                <View
                  style={{
                    // borderWidth: 1,
                    borderColor: colors.white,
                    width: wp(80),
                    height: hp(6),
                    borderRadius: hp(2),
                    backgroundColor: colors.white,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  {isDisable == true ? (
                    <View
                      style={{
                        flex: 0.2,
                        height: hp(6),
                        borderWidth: hp(0.2),
                        borderRadius: hp(2),
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: colors.white,
                        backgroundColor: "#dddddd",
                      }}
                    >
                      <Text style={{ fontWeight: "500", color: colors.white }}>
                        {getTranslatedText("Reset")}
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={{
                        flex: 0.2,
                        height: hp(6),
                        borderWidth: hp(0.2),
                        borderRadius: hp(2),
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: colors.white,
                        backgroundColor: colors.descripe,
                      }}
                      onPress={() => {
                        setSecondLeft(0);
                        setIsDisable(true);
                      }}
                    >
                      <Text style={{ fontWeight: "500", color: colors.white }}>
                        {getTranslatedText("Reset")}
                      </Text>
                    </TouchableOpacity>
                  )}

                  <View
                    style={{
                      flex: 0.8,
                      paddingLeft: Platform.OS == "ios" ? hp(7) : hp(8.5),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: hp(2.5),
                        fontWeight: "700",
                        color: colors.descripe,
                      }}
                    >
                      {Clockify().displayHour}: {Clockify().displayMins}:{" "}
                      {Clockify().displaySecond}
                    </Text>
                  </View>
                </View>
              </View>
              {buttonToggle == false ? (
                <View
                  style={{
                    flex: 0.35,
                    width: wp(100),
                    // borderWidth: 1,
                    borderColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: wp(70),
                      height: hp(5.5),
                      // borderWidth: 1,
                      borderRadius: hp(2),
                      borderColor: "white",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: colors.startButton,
                    }}
                    onPress={() => {
                      checkSubcribtion();
                    }}
                  >
                    <Text
                      style={{
                        color: colors.white,
                        fontWeight: "700",
                      }}
                    >
                      {getTranslatedText("StartTrip")}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    flex: 0.4,
                    width: wp(100),
                    // borderWidth: 1,
                    borderColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: wp(70),
                      height: hp(5.5),
                      // borderWidth: 1,
                      borderRadius: hp(2),
                      borderColor: "white",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: colors.endButton,
                    }}
                    onPress={() => {
                      setTimeOn(false);
                      // setOnTime((current) => !current);
                      setIsDisable(false);
                      navigation.navigate("OdometerScreen", {
                        Type: "end",
                        setOnTime: setOnTime,
                      });
                      setButtonToggle(!buttonToggle);
                    }}
                  >
                    <Text
                      style={{
                        color: colors.white,
                        fontWeight: "700",
                      }}
                    >
                      {getTranslatedText("EndTrip")}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {/* ============== Detail Container================= */}

            <View style={styles.DetailContainer}>
              {/* ============== first Container================= */}

              <View
                style={{
                  height: hp(13),
                  // borderWidth: 1,
                  borderColor: "white",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 0.5,
                    // borderWidth: 1,
                    borderColor: "white",
                    alignItems: "center",
                  }}
                >
                  <DetailCard
                    icon={<DateIcon />}
                    title={getTranslatedText("Date")}
                    description={startTime == "" ? "- - - -" : startTime}
                  />
                </View>
                <View
                  style={{
                    flex: 0.5,
                    // borderWidth: 1,
                    borderColor: "white",
                    alignItems: "center",
                  }}
                >
                  <DetailCard
                    icon={<PerposeIcon />}
                    title={getTranslatedText("Purpose")}
                    description={rideType == "" ? "- - - -" : rideType}
                  />
                </View>
              </View>
              {/* ============== 2nd Container================= */}
              <View
                style={{
                  height: hp(13),
                  // borderWidth: 1,
                  borderColor: "white",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 0.5,
                    // borderWidth: 1,
                    borderColor: "white",
                    alignItems: "center",
                  }}
                >
                  <DetailCard
                    icon={<StartTIcon />}
                    title={getTranslatedText("StartTime")}
                    description={sTime == "" ? "- - - -" : sTime}
                  />
                </View>
                <View
                  style={{
                    flex: 0.5,
                    // borderWidth: 1,
                    borderColor: "white",
                    alignItems: "center",
                  }}
                >
                  <DetailCard
                    icon={<EndTIcon />}
                    title={getTranslatedText("EndTime")}
                    description={endTime == "" ? "- - - -" : endTime}
                  />
                </View>
              </View>
              {/* ============== 3rd Container================= */}
              <View
                style={{
                  height: hp(13),
                  // borderWidth: 1,
                  borderColor: "white",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 0.5,
                    // borderWidth: 1,
                    borderColor: "white",
                    alignItems: "center",
                  }}
                >
                  <DetailCard
                    icon={<TotalTime />}
                    title={getTranslatedText("TotalTime")}
                    description={
                      totalTripTime == "" ? "- - - -" : totalTripTime
                    }
                  />
                </View>
                <View
                  style={{
                    flex: 0.5,
                    // borderWidth: 1,
                    borderColor: "white",
                    alignItems: "center",
                  }}
                >
                  <DetailCard
                    icon={<TotalKm />}
                    title={getTranslatedText("TotalKM")}
                    description={
                      totalDistance == "" ? "- - - -" : totalDistance
                    }
                  />
                </View>
              </View>

              {/* ============== 4th Container================= */}

              <View
                style={{
                  height: hp(10),
                  // borderWidth: 1,
                  borderColor: "white",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: hp(5),
                }}
              >
                <View
                  style={{
                    height: hp(6),
                    width: wp(90),
                    // borderWidth: 1,
                    borderColor: "white",
                    flexDirection: "row",
                    borderRadius: hp(2),
                    // backgroundColor: colors.white,
                    backgroundColor: colors.white,
                    flexDirection: "row",
                  }}
                >
                  {/* ============== 1 Container================= */}

                  <View
                    style={{
                      flex: 0.1,
                      // borderWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      // marginLeft: hp(1),
                    }}
                  ></View>
                  {/* ============== 2 Container================= */}

                  <View
                    style={{
                      flex: 0.15,
                      // borderWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      // marginLeft: hp(1),
                    }}
                  >
                    <DiffIcon />
                  </View>
                  {/* ============== 3 Container================= */}

                  <View
                    style={{
                      flex: 0.45,
                      // borderWidth: 1,
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: hp(1.5),
                        fontWeight: "700",
                        fontFamily: fonts.MontserLight,
                        color: "black",
                      }}
                    >
                      {getTranslatedText("DifferenceKM")}
                    </Text>
                  </View>
                  {/* ============== 4 Container================= */}

                  <View
                    style={{
                      flex: 0.3,
                      // borderWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: hp(1.5),
                        fontWeight: "700",
                        fontFamily: fonts.MontserLight,
                        color: "black",
                      }}
                    >
                      {totalDistance == "" ? "- - - -" : totalDistance}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
export default HomeScreen;
