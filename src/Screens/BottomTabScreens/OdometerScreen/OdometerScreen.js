import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  TouchableWithoutFeedback,
  BackHandler,
} from "react-native";
import styles from "./styles";
import Header from "../../../Components/Common/Header/Header";
import colors from "../../../Assets/Colors/Colors";
import { wp, hp } from "../../../Utills/CommonMethods/CommonMethods";
import AppInput from "../../../Components/Common/AppInput/AppInput";
import Button from "../../../Components/Common/Button/Button";
import DatePicker from "react-native-date-picker";
import CemaraIcon from "../../../Assets/Images/Svg/cameraIcon.svg";
import GalleryIcon from "../../../Assets/Images/Svg/galleryIcon.svg";
import moment from "moment";
import CustomSwitch from "../../../Components/Common/CustomSwitch/CustomSwitch";
import * as yup from "yup";
import { Formik } from "formik";
import Attachment from "../../../Assets/Images/Svg/attachments.svg";
import TimeIcon from "../../../Assets/Images/Svg/timePicker.svg";
import Loader from "../../../Components/Common/Loader/Loader";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import momentTz from "moment-timezone";
import apiClient from "../../../Config/Client";
import { useTranslation } from "react-i18next";

function OdometerScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [workType1, setWorkType1] = useState("0");
  const { Type, setOnTime } = route.params;
  const user_id = useSelector((state) => state.odometerReducer.user_id);
  const { t } = useTranslation();

  const getTranslatedText = (text) => {
    return t(text);
  };

  const onSelectSwitch = (index) => {
    console.log("defult onSelectSwitch running index= ", index);

    if (index == 1) {
      setWorkType1("1");
    } else if (index == 2) {
      setWorkType1("2");
    } else {
      setWorkType1("1");
    }
  };

  useEffect(() => {
    onSelectSwitch(0);
    console.log("defult perpose type => work (1)");
  }, []);

  // ================== TIME start PICKER ===================
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [visibleTime, setVisibleTime] = useState(false);
  const [sendingTime, setSendingTime] = useState(new Date());
  const [sendingTime1, setSendingTime1] = useState(new Date());

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  let timeZone = momentTz.tz.guess();
  console.log("timeZone ===>   ", timeZone);

  // ================== TIME End PICKER ===================
  const [isSwitchOn1, setIsSwitchOn1] = React.useState(false);
  const [visibleTime1, setVisibleTime1] = useState(false);
  const [date1, setDate1] = useState(new Date());
  const [time1, setTime1] = useState("");
  const [open1, setOpen1] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [showImage, setShowImage] = useState("");
  const [startSelected, setStartSelected] = useState("");
  const [startEndSelected, setEndSelected] = useState("");

  const onToggleSwitch1 = () => setIsSwitchOn1(!isSwitchOn1);
  const dispatch = useDispatch();

  const setEndTrip = (t) => {
    console.log("Time ==> ", t);
    let timeString = moment(t).format();
    let startNow = timeString.slice(0, 16);
    timeString = timeString.slice(11, 16);
    //date.moment(t).format().slice(0, 16)
    // console.log("update ==> ", timeString);
    console.log("startNow ==> ", startNow);
    setSendingTime1(startNow);
    setTime1(timeString);
    setVisibleTime1(true);
    setEndSelected("end");
  };

  var hoursMin = moment().format("YYYY-MM-DDTHH:mm:ss.sssZ");
  var hoursMinEnd = moment().format("YYYY-MM-DDTHH:mm:ss.sssZ");

  hoursMinEnd = hoursMinEnd.slice(0, 21);
  hoursMin = hoursMin.slice(0, 21);
  console.log("hoursMin =======>   ", hoursMin);

  const setStartTrip = (t) => {
    let timeString = moment(t).format();
    let startNow = timeString.slice(0, 16);
    timeString = timeString.slice(11, 16).toString();
    console.log("startNow ==> ", startNow);
    setSendingTime(startNow);
    setTime(timeString);
    setVisibleTime(true);
    setStartSelected("start");
  };

  // ================= Validation funtion with formik ==========================

  const UserStart = {
    meterReading: "",
    Purpose: "",
  };

  const UserEnd = {
    meterReading: "",
    Kilometers: "",
  };

  const StartOdometerDetails = yup.object({
    meterReading: yup
      .number()
      .min(0, "Nagitive value not allowed")
      // .matches(/^[aA-zZ\s]+$/, "Only number are allowed for this field ")
      .required("Meter reading is required"),
    Purpose: yup.string().required("Purpose is required"),
    // Kilometers: yup.number().required("Kilometers is required"),
  });

  const EndOdometerDetails = yup.object({
    meterReading: yup
      .number()
      .min(0, "Nagitive value not allowed")
      // .matches(/^[aA-zZ\s]+$/, "Only number are allowed for this field ")
      .required("Meter reading is required"),

    // Purpose: yup.string().required("Purpose is required"),
    Kilometers: yup.number().required("Kilometers is required"),
  });

  const LunchCamera = async () => {
    const Options = {
      title: "Choose an Image",
    };
    await launchCamera(Options, (response) => {
      const Options = {
        title: "Choose an Image",
      };
      console.log("launch camera function");
      setModalVisible(false);
      setIsLoading(true);
      try {
        if (response.didCancel) {
          alert("User cancelled image picker");
          setIsLoading(false);
        } else {
          let obj = {
            name: response.assets[0].fileName,
            type: response.assets[0].type,
            uri: response.assets[0].uri,
          };
          console.log("photo response ==> ", response.assets[0].uri);
          setUserImage(obj);
          setShowImage(response.assets[0].uri);
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.log("error==> ", e);
      }
    });
  };

  const LunchGallery = async () => {
    const Options = {
      title: "Choose an Image",
      maxWidth: 1170,
      maxHeight: 2430,
    };
    setModalVisible(false);
    // setIsLoading(true);
    await launchImageLibrary(Options, async (response) => {
      try {
        if (response.didCancel) {
          alert("User cancelled image picker");
          setIsLoading(false);
        } else {
          let obj = {
            name: response.assets[0].fileName,
            type: response.assets[0].type,
            uri: response.assets[0].uri,
          };
          // console.log("image is ", response.assets[0].uri);
          // setUserImage(response.assets[0].uri);
          // setUserImage(response.assets[0]);
          setUserImage(obj);
          setShowImage(response.assets[0].uri);
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.log("error==> ", e);
      }
    });
  };

  const SaveEndDetail = async (values) => {
    console.log("................. End Function ................. ");
    console.log("End time ==>", hoursMinEnd);
    if (userImage == "") {
      // Toast.show("Please select image", Toast.LONG);
      alert("Please select image");
    } else {
      var formdata = new FormData();
      formdata.append("id", user_id);
      formdata.append("end_date_time", hoursMinEnd);
      formdata.append("end_odomiter_value", values.meterReading);
      formdata.append("end_odo_miter_image", userImage);
      formdata.append("end_reading", values.meterReading);
      formdata.append("total_distance", values.Kilometers);

      console.log("formdata  ===>   ", formdata);
      setIsLoading(true);
      const result = await apiClient.post("/odometer/end", formdata, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (result.ok) {
        setIsLoading(false);
        console.log("res OK =====>", result.data.success);
        if (result.data.success) {
          setOnTime((current) => !current);
          navigation.goBack();
        }
      } else {
        setIsLoading(false);
        alert(result?.data?.message);
        console.log("res else =====>", result);
      }
    }
  };

  // ============================   Ammar  ============================

  const SaveStartDetail = async (values) => {
    if (userImage == "") {
      // Toast.show("Please select image", Toast.LONG);
      alert("Please select image");
    } else {
      var formdata = new FormData();
      formdata.append("ride_type", workType1);
      formdata.append("timezone", timeZone);
      formdata.append("start_odo_image", userImage);
      formdata.append("start_odomiter_value", values.meterReading);
      formdata.append("description", values.Purpose);
      formdata.append("start_date_time", hoursMin);

      console.log("formdata Start ==>  ", formdata);
      setIsLoading(true);
      const result = await apiClient.post("/odometer/start", formdata, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (result.ok) {
        setIsLoading(false);
        console.log("res=====>   ", result.data);
        if (result.data.status == 1) {
          setOnTime((current) => !current);
          navigation.goBack();
        }
        dispatch(UserId(result?.data?.id));
      } else {
        setIsLoading(false);
        if (result?.data?.message == "Your Ride is Already in process") {
          alert(result?.data?.message);
          if (result?.data?.data?.status == 1) {
            setOnTime((current) => !current);
            navigation.goBack();
          }
        } else {
          console.log("else =====>   ", result?.data);
          navigation.goBack();
          alert(result?.data?.message);
        }

        dispatch(UserId(result?.data?.data?.id));
      }
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ImageBackground
      source={require("../../../Assets/Images/Png/BackImage.png")}
      style={{
        flex: 1,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // behavior="height"
        style={styles.container}
      >
        {isLoading && <Loader isloading={isLoading} />}

        <View style={styles.headerContainer}>
          <Header
            title={getTranslatedText("ODOMETER")}
            // leftIconPath={Images.backArrow}
            // onLeftIconPress={() => {
            //   navigation.goBack();
            // }}
            tintColor={colors.white}
          />
        </View>

        <Formik
          initialValues={Type == "start" ? UserStart : UserEnd}
          validationSchema={
            Type == "start" ? StartOdometerDetails : EndOdometerDetails
          }
          onSubmit={(values) => {
            Type == "start" ? SaveStartDetail(values) : SaveEndDetail(values);
            // SaveOdometerDetail(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => {
            return (
              <>
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    // borderWidth: 4,
                    borderColor: "white",
                    zIndex: 1,
                    // marginTop: hp(5),
                    paddingTop: hp(3),
                    flex: 0.8,
                  }}
                >
                  {/* ==================== Toggle Buttons ==================== */}
                  {Type == "start" && (
                    <View
                      style={{
                        width: wp(80),
                        height: hp(8),
                        // borderWidth: 1,
                        borderColor: colors.Plus,
                        justifyContent: "center",
                        marginTop: hp(1),
                        alignItems: "center",
                      }}
                    >
                      <CustomSwitch
                        selectionMode={1}
                        roundCorner={false}
                        option1={getTranslatedText("Work")}
                        option2={getTranslatedText("Personal")}
                        onSelectSwitch={onSelectSwitch}
                        selectionColor={"green"}
                      />
                    </View>
                  )}
                  {/* ==================== UploadImage Input Text ==================== */}
                  <View
                    style={{
                      width: wp(80),
                      height: hp(8),
                      // borderWidth: 1,
                      borderColor: colors.Plus,
                      justifyContent: "center",
                      marginTop: hp(1),
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        height: hp(5.5),
                        borderWidth: hp(0.2),
                        borderRadius: hp(2),
                        borderColor: colors.white,
                        flexDirection: "row",
                      }}
                      onPress={() => {
                        setModalVisible(true);
                      }}
                    >
                      <View
                        style={{
                          flex: 0.8,
                          // borderWidth: hp(0.2),
                          // borderRadius: hp(2),
                          borderColor: colors.white,
                          justifyContent: "center",
                          paddingLeft: hp(1.5),
                        }}
                      >
                        <Text
                          style={{
                            color: colors.white,
                            fontSize: hp(1.5),
                            // fontWeight: "500",
                            // fontFamily: fonts.MontserLight,
                          }}
                        >
                          {/* {CommonText.UploadImage} */}
                          {getTranslatedText("UploadImage")}
                        </Text>
                      </View>
                      {/* ========  Image selected  ========== */}
                      {showImage == "" ? (
                        <View
                          style={{
                            // borderWidth: hp(0.2),
                            // borderRadius: hp(2),
                            borderColor: colors.white,
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Attachment
                            style={{
                              // borderWidth: 1,
                              borderColor: "white",
                              width: wp(4.5),
                              height: hp(3),
                            }}
                          />
                        </View>
                      ) : (
                        <View
                          style={{
                            // borderWidth: hp(0.2),
                            // borderRadius: hp(2),
                            borderColor: colors.white,
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={{ uri: showImage }}
                            style={{
                              borderWidth: 0.4,
                              borderColor: "white",
                              width: wp(6),
                              height: hp(3),
                              borderRadius: hp(1),
                            }}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                  {/* ==================== EnterMeterReading Input Text ==================== */}
                  <View
                    style={{
                      width: wp(80),
                      height: hp(8),
                      // borderWidth: 1,
                      borderColor: colors.Plus,
                      justifyContent: "center",
                      marginTop: hp(1),
                    }}
                  >
                    <AppInput
                      tintColor={colors.GrayColor}
                      // placeholder={CommonText.EnterMeterReading}
                      placeholder={getTranslatedText("EnterMeterReading")}
                      placeholderTextColor={colors.white}
                      height={hp(5.5)}
                      colortextInput={"white"}
                      borderColor={colors.white}
                      borderWidth={hp(0.15)}
                      borderRadius={hp(2)}
                      keyboardType="numeric"
                      onChangeText={handleChange("meterReading")}
                      value={values.meterReading}
                      onBlur={handleBlur("meterReading")}
                    />
                    {touched.meterReading && errors.meterReading && (
                      <Text
                        style={{
                          fontSize: 11,
                          color: "red",
                          marginLeft: hp(2),
                          width: wp(70),
                        }}
                      >
                        {errors.meterReading}
                      </Text>
                    )}
                  </View>
                  {/* ==================== Purpose Input Text ==================== */}
                  {Type == "start" && (
                    <View
                      style={{
                        width: wp(80),
                        height: hp(8),
                        // borderWidth: 1,
                        borderColor: colors.Plus,
                        justifyContent: "center",
                        marginTop: hp(1),
                      }}
                    >
                      <AppInput
                        tintColor={colors.GrayColor}
                        // placeholder={CommonText.Purpose}
                        placeholder={getTranslatedText("Purpose")}
                        placeholderTextColor={colors.white}
                        height={hp(5.5)}
                        colortextInput={"white"}
                        borderColor={colors.white}
                        borderWidth={hp(0.15)}
                        borderRadius={hp(2)}
                        onChangeText={handleChange("Purpose")}
                        value={values.Purpose}
                        onBlur={handleBlur("Purpose")}
                      />
                      {touched.Purpose && errors.Purpose && (
                        <Text
                          style={{
                            fontSize: 11,
                            color: "red",
                            marginLeft: hp(2),
                            width: wp(70),
                          }}
                        >
                          {errors.Purpose}
                        </Text>
                      )}
                    </View>
                  )}
                  {/* ==================== StartTrip Input Text ==================== */}
                  {Type == "start" && (
                    <View
                      style={{
                        width: wp(80),
                        height: hp(8),
                        // borderWidth: 1,
                        borderColor: colors.Plus,
                        justifyContent: "center",
                        marginTop: hp(1),
                      }}
                      // onPress={showDatePicker}
                      onPress={() => {
                        setOpen(true);
                      }}
                    >
                      <View
                        style={{
                          height: hp(5.5),
                          borderWidth: hp(0.2),
                          borderRadius: hp(2),
                          borderColor: colors.white,
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            flex: 0.8,
                            // borderWidth: hp(0.2),
                            // borderRadius: hp(2),
                            borderColor: colors.white,
                            justifyContent: "center",
                            paddingLeft: hp(1.5),
                          }}
                        >
                          {/* {visibleTime == false ? (
                            <Text
                              style={{
                                color: colors.white,
                                fontSize: hp(1.5),
                              }}
                            >
                              {CommonText.StartTrip}
                            </Text>
                          ) : ( */}
                          <Text
                            style={{
                              color: colors.white,
                              fontSize: hp(1.5),
                            }}
                          >
                            {hoursMin.slice(11, 16)}
                            {/* {hours + ":" + min} */}
                          </Text>
                          {/*  )} */}
                        </View>
                        <View
                          style={{
                            borderColor: colors.white,
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <TimeIcon
                            style={{
                              // borderWidth: 1,
                              borderColor: "white",
                              width: wp(4.5),
                              height: hp(3),
                            }}
                            // resizeMode="contain"
                          />
                        </View>
                      </View>

                      <DatePicker
                        modal
                        mode="time"
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                          setOpen(false);
                          setStartTrip(date);
                        }}
                        onCancel={() => {
                          setOpen(false);
                        }}
                      />
                    </View>
                  )}
                  {/* ==================== EndTrip Input Text ==================== */}
                  {Type == "end" && (
                    <View
                      style={{
                        width: wp(80),
                        height: hp(8),
                        // borderWidth: 1,
                        borderColor: colors.Plus,
                        justifyContent: "center",
                        marginTop: hp(1),
                      }}
                      // onPress={showDatePicker}
                      onPress={() => {
                        setOpen1(true);
                      }}
                    >
                      <View
                        style={{
                          height: hp(5.5),
                          borderWidth: hp(0.2),
                          borderRadius: hp(2),
                          borderColor: colors.white,
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            flex: 0.8,
                            // borderWidth: hp(0.2),
                            // borderRadius: hp(2),
                            borderColor: colors.white,
                            justifyContent: "center",
                            paddingLeft: hp(1.5),
                          }}
                        >
                          {/* {visibleTime1 == false ? (
                            <Text
                              style={{
                                color: colors.white,
                                fontSize: hp(1.5),
                              }}
                            >
                              {CommonText.EndTrip}
                            </Text>
                          ) : ( */}
                          <Text
                            style={{
                              color: colors.white,
                              fontSize: hp(1.5),
                            }}
                          >
                            {hoursMinEnd.slice(11, 16)}
                          </Text>
                          {/* )} */}
                        </View>
                        <View
                          style={{
                            // borderWidth: hp(0.2),
                            // borderRadius: hp(2),
                            borderColor: colors.white,
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <TimeIcon
                            style={{
                              // borderWidth: 1,
                              borderColor: "white",
                              width: wp(4.5),
                              height: hp(3),
                            }}
                            // resizeMode="contain"
                          />
                        </View>
                      </View>

                      <DatePicker
                        modal
                        mode="time"
                        open={open1}
                        date={date1}
                        onConfirm={(date) => {
                          setOpen1(false);
                          setEndTrip(date);
                        }}
                        onCancel={() => {
                          setOpen1(false);
                        }}
                      />
                    </View>
                  )}

                  {/* ==================== AddKilometers Input Text ==================== */}
                  {Type == "end" && (
                    <View
                      style={{
                        width: wp(80),
                        height: hp(8),
                        // borderWidth: 1,
                        borderColor: colors.Plus,
                        justifyContent: "center",
                        marginTop: hp(1),
                      }}
                    >
                      <AppInput
                        tintColor={colors.GrayColor}
                        // placeholder={CommonText.AddKilometers}
                        placeholder={getTranslatedText("AddKilometers")}
                        placeholderTextColor={colors.white}
                        height={hp(5.5)}
                        colortextInput={"white"}
                        borderColor={colors.white}
                        borderWidth={hp(0.15)}
                        borderRadius={hp(2)}
                        keyboardType="numeric"
                        onChangeText={handleChange("Kilometers")}
                        value={values.Kilometers}
                        onBlur={handleBlur("Kilometers")}
                      />
                      {touched.Kilometers && errors.Kilometers && (
                        <Text
                          style={{
                            fontSize: 11,
                            color: "red",
                            marginLeft: hp(2),
                            width: wp(70),
                          }}
                        >
                          {errors.Kilometers}
                        </Text>
                      )}
                    </View>
                  )}
                  {/* ==================== AutoSaveGallery Input Text ==================== */}

                  {/* ==================== BUTTON ==================== */}
                  <View style={styles.ButtonContainer}>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: wp(90),
                        height: hp(8),
                        // borderWidth: 1,
                      }}
                    >
                      <Button
                        title={getTranslatedText("Done")}
                        bgColor={colors.ButtonColor}
                        color={colors.ButtonText}
                        borderRadius={hp(2)}
                        height={hp(5.5)}
                        onPress={handleSubmit}
                      />
                    </View>
                  </View>
                </View>
              </>
            );
          }}
        </Formik>

        {/* ===================  MODAL ===================== */}

        <View>
          <Modal
            animationType="slide"
            transparent={true}
            // blur={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.chooseContainer}>
                    <View style={styles.cameraContainer}>
                      <TouchableOpacity
                        style={{
                          height: hp(12),
                          width: wp(25),
                          borderWidth: hp(0.1),
                          borderColor: "#F2F7FA40",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 10,
                          backgroundColor: "#2D333C",
                        }}
                        onPress={() => {
                          LunchCamera();
                        }}
                      >
                        <CemaraIcon style={styles.cameraStyle} />
                      </TouchableOpacity>
                      <View
                        style={{
                          alignItems: "center",
                          width: "80%",
                        }}
                      >
                        <Text
                          style={{
                            // fontFamily: fonts.regular,
                            // color: colors.input_text_color,
                            color: "#F2F7FA",
                          }}
                        >
                          {getTranslatedText("Camera")}
                        </Text>
                      </View>
                    </View>

                    <View style={{ flex: 0.2 }}>
                      <Text>{null} </Text>
                    </View>

                    <View style={styles.galleryContainer}>
                      <TouchableOpacity
                        style={{
                          height: hp(12),
                          width: wp(25),
                          borderWidth: hp(0.1),
                          borderColor: "#F2F7FA40",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 10,
                          backgroundColor: "#2D333C",
                        }}
                        onPress={() => {
                          LunchGallery();
                        }}
                      >
                        <GalleryIcon style={styles.galleryStyle} />
                      </TouchableOpacity>
                      <View
                        style={{
                          alignItems: "center",
                          width: "80%",
                        }}
                      >
                        <Text
                          style={{
                            // fontFamily: fonts.regular,
                            // color: colors.input_text_color,
                            color: "#F2F7FA",
                          }}
                        >
                          {getTranslatedText("Gallery")}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
export default OdometerScreen;
