import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  PermissionsAndroid,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./styles";
import Header from "../../../Components/Common/Header/Header";
import Images from "../../../Assets/Images";
import colors from "../../../Assets/Colors/Colors";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import { ScrollView } from "react-native-gesture-handler";
import AppInput from "../../../Components/Common/AppInput/AppInput";
import CommonText from "../../../Utills/CommonText";
import Button from "../../../Components/Common/Button/Button";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import CemaraIcon from "../../../Assets/Images/Svg/cameraIcon.svg";
import GalleryIcon from "../../../Assets/Images/Svg/galleryIcon.svg";
import { logout } from "../../../Redux/Actions/Actions";
import * as yup from "yup";
import { Formik } from "formik";
import Loader from "../../../Components/Common/Loader/Loader";
import DropDown from "../../../Assets/Images/Svg/dropdown.svg";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-simple-toast";
import { userProfilePicture } from "../../../Redux/Actions/Actions";
import axios from "axios";
import apiClient from "../../../Config/Client";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HitApi from "../../../Config/HitApis/HitApis";
import EndPoints from "../../../Config/BaseUrl/BaseUrl";
import PreferenceKeys from "../../../Utills/PreferenceKeys/PreferenceKeys";
import LocalStorage from "../../../Utills/LocalStorage/LocalStorage";
import { useTranslation } from "react-i18next";

function ProfileScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [showImage, setShowImage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const getTranslatedText = (text) => {
    return t(text);
  };
  // =========== CUSTOM PICKEER ===========
  const [chooseData, setChooseData] = useState("Subscription Packages");
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const OPTIONS = ["Per day", "Per month", "Per year"];

  // ================  Redux  ==================
  const userName = useSelector((state) => state.authReducer.name);
  const emailAddress = useSelector((state) => state.authReducer.email);
  const mobileNumber = useSelector((state) => state.authReducer.mobile);
  const token = useSelector((state) => state.authReducer.token);
  const profilePIcture = useSelector(
    (state) => state.authReducer.profilePIcture
  );

  const changeModalVisiblility = (bool) => {
    setModalIsVisible(bool);
  };

  const onPressItem = (option) => {
    setChooseData(option);
    setModalIsVisible(false);
  };

  const option = () => {
    // console.log(" function option ==> ");
    OPTIONS.map((item, index) => {
      // console.log("map ==> ", item);
      return (
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            onPressItem(item);
          }}
        >
          <Text style={styles.ListText}> {item}</Text>
        </TouchableOpacity>
      );
    });
  };

  // ========== drop down =============
  // const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Per Day", value: "Day" },
    { label: "Per Month", value: "Month" },
    { label: "Per Year", value: "Year" },
  ]);

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
    // requestCameraPermission();
  }, []);

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
          setUserImage(response.assets[0].uri);
          // console.log("photo response ==> ", response.assets[0].uri);
          // await dispatch(profileImage(response.assets[0].uri))
          setShowImage(obj);
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
          setUserImage(response.assets[0].uri);
          setShowImage(obj);
          // setUserImage(response.assets[0].uri);
          // await dispatch(profileImage(response.assets[0].uri));
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.log("error==> ", e);
      }
    });
  };

  const CheckLogout = () => {
    dispatch(logout());
  };

  //=================== Logout API =================
  const UserLogout = async (values) => {
    const userToken = await LocalStorage.getObjectData(PreferenceKeys.token);
    const fcmToken = await AsyncStorage.getItem("fcmToken");
    let params = {
      fcm_token: fcmToken,
    };
    console.log("fcmToken params ==>  ", params);
    setIsLoading(true);
    const result = await apiClient.post(EndPoints.LogoutUser, params);
    if (result.ok) {
      CheckLogout();
      setIsLoading(false);
      console.log("res OK =====>", result.data);
    } else {
      setIsLoading(false);
      alert(result?.data);
    }
  };

  // =============  API check ===================
  const ViewProfile = async () => {
    // /user/view-mobile-profile
    setIsLoading(true);
    const result = await apiClient.get(
      `https://machlog.viltco.com/api/user/view-mobile-profile`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (result.ok) {
      setIsLoading(false);
      // console.log("res View Profile =====>   ", result?.data.profile_picture);
      setUserImage(result?.data?.profile_picture);
    } else {
      setIsLoading(false);
      // console.log("else View Profile =====>   ", result?.data?.message);
    }
  };

  useEffect(() => {
    ViewProfile();
  }, [isFocused]);

  const saveImageAPI = async () => {
    var formdata = new FormData();
    formdata.append("profile_picture", showImage);
    console.log("formdata ==>  ", formdata);

    setIsLoading(true);
    const result = await apiClient.post(
      `https://machlog.viltco.com/api/user/submit-mobile-profile`,
      formdata,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (result.ok) {
      setIsLoading(false);
      console.log("response POST Pic ===>  ", result?.data);
      alert("Profile updated successfully");
    } else {
      setIsLoading(false);
      console.log("res else POST Pic =====>", result);
    }
  };

  return (
    <ImageBackground
      source={require("../../../Assets/Images/Png/BackImage.png")}
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {isLoading && <Loader isloading={isLoading} />}

        <ScrollView style={{ zIndex: 1 }}>
          <View style={styles.headerContainer}>
            <Header
              title={getTranslatedText("EDITPROFILE")}
              leftIconPath={Images.backArrow}
              //   backSvg={<LeftArrow />}
              onLeftIconPress={() => {
                navigation.goBack();
              }}
              tintColor={colors.white}
            />
          </View>

          {/* ===============  Profile Pic  ================ */}

          <View style={styles.about}>
            <View
              style={{
                justifyContent: "center",
                // alignItems: "center",
                height: hp(17),
                width: hp(17),
                marginTop: hp(3),
                position: "absolute",
                // // borderWidth: 2,
                // borderColor: "white",
                borderRadius: hp(5),
              }}
            >
              {/* {userProfilePicture == "" ? ( */}
              {userImage ? (
                <Image
                  style={styles.imageContainer}
                  source={{ uri: userImage }}
                />
              ) : (
                <Image
                  // source={{ uri: userImage }}
                  source={Images.profileUpdate}
                  style={styles.imageContainer}
                />
              )}

              {/* ) : (
                <Image
                  source={{ uri: userProfilePicture }}
                  style={styles.imageContainer}
                />
              )} */}
            </View>

            <View
              style={{
                zIndex: 1,
                justifyContent: "flex-end",
                alignItems: "flex-end",
                // borderWidth: 1,
                height: hp(14),
                width: hp(17),
                marginBottom: hp(1.3),
              }}
            >
              <TouchableOpacity
                style={{
                  zIndex: 1,
                  // borderWidth: 1,
                  alignItems: "center",
                  height: hp(3.3),
                  width: wp(7),
                  borderRadius: hp(5),
                  backgroundColor: colors.white,
                  justifyContent: "center",
                }}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Image
                  source={Images.imagePicker}
                  style={{
                    zIndex: 1,
                    height: hp(2),
                    width: wp(5),
                    // borderWidth: 3,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* ==================== Input Text Container ==================== */}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {/* ==================== username Input Text ==================== */}
            <View
              style={{
                width: wp(80),
                // borderWidth: 1,
                borderColor: colors.Plus,
                justifyContent: "center",
                marginTop: hp(1),
              }}
            >
              <View
                style={{
                  height: hp(6),
                  width: wp(80),
                  borderWidth: 1,
                  borderColor: colors.white,
                  justifyContent: "center",
                  marginTop: hp(1),
                  borderRadius: hp(2),
                }}
              >
                <Text
                  style={{
                    color: colors.ButtonColor,
                    fontSize: hp(1.4),
                    paddingLeft: hp(2),
                  }}
                >
                  {userName}
                </Text>
              </View>
            </View>

            {/* ==================== Email ID Input Text ==================== */}

            <View
              style={{
                width: wp(80),
                // borderWidth: 1,
                borderColor: colors.Plus,
                justifyContent: "center",
                marginTop: hp(1),
              }}
            >
              <View
                style={{
                  height: hp(6),
                  width: wp(80),
                  borderWidth: 1,
                  borderColor: colors.white,
                  justifyContent: "center",
                  marginTop: hp(1),
                  borderRadius: hp(2),
                }}
              >
                <Text
                  style={{
                    color: colors.ButtonColor,
                    fontSize: hp(1.4),
                    paddingLeft: hp(2),
                  }}
                >
                  {emailAddress}
                </Text>
              </View>
            </View>

            {/* ==================== Phone number Input Text ==================== */}
            <View
              style={{
                width: wp(80),
                // borderWidth: 1,
                borderColor: colors.Plus,
                justifyContent: "center",
                marginTop: hp(1),
              }}
            >
              <View
                style={{
                  height: hp(6),
                  width: wp(80),
                  borderWidth: 1,
                  borderColor: colors.white,
                  justifyContent: "center",
                  marginTop: hp(1),
                  borderRadius: hp(2),
                }}
              >
                <Text
                  style={{
                    color: colors.ButtonColor,
                    fontSize: hp(1.4),
                    paddingLeft: hp(2),
                  }}
                >
                  {mobileNumber}
                </Text>
              </View>
            </View>

            {/* ==================== Subscription Input Text ==================== */}
          </View>

          {/*================ BUTTON CONTAINER ========== */}

          <View style={styles.ButtonContainer}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                // borderWidth: 1,
                width: wp(88),
                height: hp(8),
                // zindex: -2,
                // position: "absolute",
              }}
            >
              <Button
                title={getTranslatedText("Save")}
                bgColor={colors.ButtonColor}
                color={colors.ButtonText}
                borderRadius={hp(2)}
                height={hp(5.5)}
                onPress={() => saveImageAPI()}
              />
            </View>
          </View>

          <View style={styles.ButtonContainer1}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                // borderWidth: 1,
                width: wp(88),
                height: hp(7),
              }}
            >
              <Button
                title={getTranslatedText("Logout")}
                bgColor={colors.secButton}
                borderRadius={hp(2)}
                height={hp(5.5)}
                onPress={() => {
                  UserLogout();
                }}
              />
            </View>
          </View>

          <View
            style={{
              height: hp(20),
              // borderWidth: 1,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(getTranslatedText("Support"));
              }}
            >
              <Text style={{ fontSize: hp(1.3), color: "#ffffff80" }}>
                {getTranslatedText("NeedSupport")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* ===================  MODAL ===================== */}

        <View>
          <Modal
            animationType="slide"
            transparent={true}
            // blur={true}
            visible={modalVisible}
            onRequestClose={() => {
              // alert("Modal has been closed.");
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
export default ProfileScreen;
