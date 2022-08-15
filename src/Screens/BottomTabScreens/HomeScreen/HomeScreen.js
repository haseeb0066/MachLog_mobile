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
  StyleSheet,
  Modal,
  TextInput,
  Dimensions,
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
import Loader from "../../../Components/Common/Loader/Loader";
import Toast from "react-native-simple-toast";
import MessageIcon from "../../../Assets/Images/Svg/message.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import BackgroundTimer from "react-native-background-timer";
import "../../../Assets/Languages/i18n";
import { useTranslation } from "react-i18next";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeLanguage } from "i18next";
import { LanguageType } from "../../../Redux/Actions/Actions";
import crashlytics from "@react-native-firebase/crashlytics";
import MapView, { PROVIDER_GOOGLE, Marker, CarInfo } from "react-native-maps";
import Button from "../../../Components/Common/Button/Button";
import SvgComponent from "../../../Components/Common/SvgCustomComponents/SvgCustomComponents";
import { LocationIcon } from "../../../Assets/Images/SvgImages";
import Geolocation from "@react-native-community/geolocation";
import { getDistance, getPreciseDistance, geolib } from "geolib";
import { useDispatch, useSelector } from "react-redux";
import { originLat, originLong } from "../../../Redux/Actions/Actions";
import apiClient from "../../../Config/Client";

function HomeScreen({ navigation }) {
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.authReducer.token);
  const [selected, setSelected] = useState("");
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  // const [modalVisible, setModalVisible] = useState(false);
  const [FrontImage, setFrontImage] = useState("");
  const [UserId, setUserId] = useState("");
  const user_id = useSelector((state) => state.odometerReducer?.user_id);

  //================= background Timer ==================
  const [secondLeft, setSecondLeft] = useState(0);
  const [onTime, setOnTime] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
      //code that will be called every 1 seconds
      if (dataTimer) {
        // console.log("resume check running==>   ", dataTimer);
        setSecondLeft((dataTimer) => {
          if (dataTimer >= 0) return dataTimer + 1;
          else return 0;
        });
      } else {
        setSecondLeft((secs) => {
          if (secs >= 0) return secs + 1;
          else return 0;
        });
      }

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

    let displayHour = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecond = second < 10 ? `0${second}` : second;

    return {
      displayHour,
      displayMins,
      displaySecond,
    };
  };

  useEffect(() => {
    console.log("time useEffect");

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
    console.log("camera useEffect");
    // sendPasueTime();
    // getOneTimeLocation();
    // monthlyCheck();
    if (Platform.OS === "ios") {
      null;
    } else {
      requestCameraPermission();
    }
  }, []);

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
  const [pause, setPause] = useState("");
  const [dataTimer, setDataTimer] = useState("");

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

  // useFocusEffect(
  //   React.useCallback(() => {
  //     GetRequest();
  //   }, [])
  // );
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
    console.log("language useEffect");

    // console.log("currentLanguage===>  ", CurrentLanguage);
    // if (CurrentLanguage == null) {
    //   setValue("en");
    // } else {
    changeLanguage(CurrentLanguage);
    setLanguage(CurrentLanguage);
    setValue(CurrentLanguage);
    // }
  }, [currentLanguage, value]);

  //================= LANGUAGE ==================
  const monthlyCheck = async () => {
    setIsLoading(true);
    const res = await GetTokenApi(EndPoints.MonthlyPakecage, "GET", token);
    if (res.status === 200) {
      setIsLoading(false);
      console.log("200 MonthlyPakecage ==>", res.data);
    } else {
      setIsLoading(false);
      if (res.data.success == false) {
        navigation.navigate("MonthlyDetail");
      }
      console.log("else MonthlyPakecage ==>  ", res.data);
    }
  };

  //============== Google map working ===========
  const [currentLongitude, setCurrentLongitude] = useState("");
  const [currentLatitude, setCurrentLatitude] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [PasueTimer, setPasueTimer] = useState("");

  const originSavedLat = useSelector(
    (state) => state.authReducer.originLatState
  );
  const originSavedLong = useSelector(
    (state) => state.authReducer.originLongState
  );

  const screen = Dimensions.get("screen");
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.9222;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  useEffect(() => {
    console.log("location useEffect");
    const requestLocationPermission = async () => {
      if (Platform.OS === "ios") {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Access Required",
              message: "This App needs to Access your location",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            console.log("location permission given");
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus("Permission Denied");
            console.log("location permission  Denied");
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    // return () => {
    //   Geolocation.clearWatch(1);
    // };
  }, []);

  //====================== give you current location ===============
  const getOneTimeLocation = () => {
    setLocationStatus("Getting Location ...");
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        console.log("Getting Location ...");
        setLocationStatus("You are Here");

        //getting the Longitude from the location json
        const currentLongitude = parseFloat(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = parseFloat(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        dispatch(originLat(currentLatitude));
        dispatch(originLong(currentLongitude));

        // console.log("currentLongitude ===> ", currentLongitude);
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
        // console.log("currentLatitude ===> ", currentLatitude);
      },
      (error) => {
        console.log("error ==> ", error.message);
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 10000,
      }
    );
  };

  const getdestinationLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        console.log("get destination Location");
        //getting the Longitude from the location json
        const currentLong = parseFloat(position.coords.longitude);
        //getting the Latitude from the location json
        const currentLat = parseFloat(position.coords.latitude);
        //Setting Longitude state
        setCurrentLongitude(1.1832);
        console.log("destination lat ===> ", currentLongitude);
        setCurrentLatitude(17.9064);
        console.log("destination long ===> ", currentLatitude);
      },
      (error) => {
        console.log("ios location else part");
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      }
    );

    const AccurateDistance = getPreciseDistance(
      { latitude: originSavedLat, longitude: originSavedLong },
      { latitude: currentLatitude, longitude: currentLongitude }
      // (accuracy = 1)
    );
    setIsLoading(true);
    setTimeout(() => {
      let KM = AccurateDistance / 1000;
      let miles = KM * 0.6213;

      setIsLoading(false);
      console.log("AccurateDistance ==> ", miles.toFixed(2));
      navigation.navigate("OdometerScreen", {
        Type: "end",
        setOnTime: setOnTime,
        Distance: miles.toFixed(2),
      });
    }, 1000);
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
        setLocationStatus("You are Here");

        //getting the Longitude, Latitude from the location json
        const currentLongitude = parseFloat(position.coords.longitude);
        const currentLatitude = parseFloat(position.coords.latitude);
        alert("currentLatitude : ", currentLatitude);
        alert("currentLongitude : ", currentLongitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 5000,
      }
    );
  };

  const sendResumeTime = async () => {
    var formdata = new FormData();
    formdata.append("id", user_id);

    console.log("formdata ===> ", formdata);
    setIsLoading(true);
    const result = await apiClient.post("/odometer/trip-resume", formdata, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      setIsLoading(false);
      console.log("res=====>   ", result.data.message.timer);
      setDataTimer(result.data.message.timer);
      // Toast.show(result.data.data, Toast.LONG);
      // alert(result.data.data);
    } else {
      setIsLoading(false);
      console.log("else =====>   ", result?.data);
      // alert(result?.data.message);
      // Toast.show(result?.data.message, Toast.LONG);
    }
  };

  const sendPasueTime = async () => {
    console.log("sendPasueTime API calling");
    let timerr =
      Clockify().displayHour +
      "-" +
      Clockify().displayMins +
      "-" +
      Clockify().displaySecond;
    // setPasueTimer(timerr);
    var formdata = new FormData();
    formdata.append("id", user_id);
    formdata.append("timer", timerr);

    console.log("formdata ===> ", formdata);
    setIsLoading(true);
    const result = await apiClient.post("/odometer/trip-pause", formdata, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      setIsLoading(false);
      console.log("res=====>   ", result.data.data);
      setTimeOn(false);
      setPause(1);
      // alert(result.data.data);
    } else {
      setIsLoading(false);
      console.log("else =====>   ", result?.data);
      // alert(result?.data.message);
    }
  };

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
            {/* ============== Google map ============ */}
            <View
              style={{
                height: hp(40),
                width: wp(100),
                // zIndex: 1,
              }}
            >
              <View
                style={{
                  height: hp(4),
                  width: wp(100),

                  zIndex: 1,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: hp(4),
                    width: wp(20),
                    borderWidth: 1,
                    borderColor: "red",
                    alignItems: "center",
                    marginTop: hp(1),
                    marginRight: hp(1),
                    justifyContent: "center",
                    backgroundColor: "white",
                    borderRadius: hp(1),
                  }}
                  disabled={buttonToggle ? false : true}
                  onPress={() => {
                    getdestinationLocation();
                    setButtonToggle(!buttonToggle);
                    setIsDisable(false);
                  }}
                >
                  <Text style={{ color: "red" }}> end </Text>
                </TouchableOpacity>
              </View>
              <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                showsMyLocationButton={false}
                showsUserLocation={true}
                // showsTraffic={true}
                zoomEnabled={true}
                region={{
                  // latitude: currentLongitude,
                  // longitude: currentLatitude,
                  latitude: currentLatitude != "" ? currentLatitude : 31.4758,
                  longitude:
                    currentLongitude != "" ? currentLongitude : 74.3426,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                // onPress={() => {
                //   menuRef.current.snapTo(1);
                //   vehiclesRef.current.snapTo(2);
                // }}
              >
                {/* {CarInfo.map(car => {
    return (
      <Marker
        key={car.DeviceID}
        coordinate={{
          latitude: car.Lt,
          longitude: car.Ln,
        }}
        onPress={() => vehiclesRef.current.snapTo(1)}>
        <Animated.View style={[styles.markerWrap]}>
          <Text style={styles.numberPlate} numberOfLines={1}>
            {car.NumberPlate}
          </Text>
          <Animated.Image
            source={Car}
            style={styles.marker}
            resizeMode="cover"
          />
        </Animated.View>
      </Marker>
    );
  })} */}
                {/* {CarInfo.map((car) => {
                  return (
                    <CarMarker
                      key={car.DeviceID}
                      car={car}
                      onOpen={() => {
                        vehiclesRef.current.snapTo(1);
                        setSelectedVehicle(car);
                      }}
                    />
                  );
                })} */}
                <Marker
                  coordinate={{
                    latitude: currentLatitude != "" ? currentLatitude : 31.4758,
                    longitude:
                      currentLongitude != "" ? currentLongitude : 74.3426,
                  }}
                  title={"Arfa Kareem Tower"}
                  description={"Testing purpose "}
                >
                  <View style={{ height: hp(5) }}>
                    <SvgComponent svgMarkup={LocationIcon} />
                  </View>
                </Marker>
              </MapView>
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
                  {/* {getTranslatedText("hello")}
                   */}
                  {userName}
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
                    disabled={isDisable ? false : true}
                    onPress={() => {
                      // checkSubcribtion();
                      navigation.navigate("OdometerScreen", {
                        Type: "start",
                        setOnTime: setOnTime,
                        Distance: "",
                      });
                      setButtonToggle(!buttonToggle);
                      // alert("start");
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
              ) : pause == "" ? (
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
                      backgroundColor: colors.startButton,
                    }}
                    onPress={() => {
                      sendPasueTime();
                      setOnTime((current) => !current);
                      setPause(1);
                    }}
                  >
                    <Text
                      style={{
                        color: colors.white,
                        fontWeight: "700",
                      }}
                    >
                      {/* {getTranslatedText("EndTrip")} */}
                      {"Pause"}
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
                      backgroundColor: colors.startButton,
                    }}
                    onPress={() => {
                      setTimeOn(false);
                      setOnTime((current) => !current);
                      setPause("");
                      sendResumeTime();
                    }}
                  >
                    <Text
                      style={{
                        color: colors.white,
                        fontWeight: "700",
                      }}
                    >
                      {/* {getTranslatedText("EndTrip")} */}
                      {"Resume"}
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
                  // marginBottom: hp(5),
                  // paddingBottom: hp(1),
                }}
              >
                <View
                  style={{
                    height: hp(6),
                    width: wp(90),
                    borderWidth: 3,
                    borderColor: "white",
                    flexDirection: "row",
                    borderRadius: hp(2),
                    // backgroundColor: colors.white,
                    backgroundColor: colors.white,
                    flexDirection: "row",
                    // marginBottom: hp(5),
                  }}
                >
                  {/* ============== 1 Container================= */}

                  <View
                    style={{
                      flex: 0.1,
                      // borderWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
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

              {/* ============== extra Container================= */}

              <View
                style={{
                  height: hp(20),
                  // borderWidth: 1,
                  borderColor: "white",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: hp(5),
                }}
              >
                <View
                  style={{
                    height: hp(6),
                    width: wp(90),
                    // borderWidth: 3,
                    borderColor: "white",
                    flexDirection: "row",
                    borderRadius: hp(2),
                    // backgroundColor: colors.white,
                    // backgroundColor: colors.white,
                    flexDirection: "row",
                    // marginBottom: hp(5),
                  }}
                ></View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
export default HomeScreen;
