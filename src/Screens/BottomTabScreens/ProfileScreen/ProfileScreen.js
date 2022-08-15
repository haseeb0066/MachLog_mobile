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
  Platform,
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
import Toast from "react-native-toast-message";
import { userProfilePicture } from "../../../Redux/Actions/Actions";
import axios from "axios";
import apiClient from "../../../Config/Client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HitApi from "../../../Config/HitApis/HitApis";
import EndPoints from "../../../Config/BaseUrl/BaseUrl";
import PreferenceKeys from "../../../Utills/PreferenceKeys/PreferenceKeys";
import LocalStorage from "../../../Utills/LocalStorage/LocalStorage";
import { useTranslation } from "react-i18next";
import GetTokenApi from "../../../Config/GetTokenApi/GetTokenApi";
import AppFromField from "../../../Components/Common/FormComponents/AppFromField";
import AppForm from "../../../Components/Common/FormComponents/AppFrom";
import PopUpModal from "../../../Components/Application/PopUpModal/PopUpModal";
import SubmitButton from "../../../Components/Application/SubmitButton/SubmitButton";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

function ProfileScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [showImage, setShowImage] = useState("");
  const [showImage1, setShowImage1] = useState("");
  const [toggle, setToggle] = useState(false);
  const [FrontImage, setFrontImage] = useState("");

  // =============== mobile storage ===================
  const [frontLocal, setFrontLocal] = useState("");
  const [backLocal, setBackLocal] = useState("");
  const [pickFront, setPickFront] = useState(false);
  const [pickBack, setPickBack] = useState(false);
  const [currentlySelect, setSurrentlySelect] = useState(false);
  const [currentlySelect1, setSurrentlySelect1] = useState(false);

  // =============== mobile storage ===================

  const [backImage, setBackImage] = useState("");

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
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);

  const [modalVisible1, setModalVisible1] = useState(false);
  const [selected, setSelected] = useState("");
  const [getValue, setGetValue] = useState("");
  const OPTIONS = ["Per day", "Per month", "Per year"];

  // ================  Redux  ==================
  const userName = useSelector((state) => state.authReducer.name);
  const emailAddress = useSelector((state) => state.authReducer.email);
  const mobileNumber = useSelector((state) => state.authReducer.mobile);
  const token = useSelector((state) => state.authReducer.token);
  console.log("Token  ==>  ", token);

  const profilePIcture = useSelector(
    (state) => state.authReducer.profilePIcture
  );

  useFocusEffect(
    React.useCallback(() => {
      ViewProfile();
    }, [])
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
    if (Platform.OS === "ios") {
      null;
    } else {
      requestCameraPermission();
    }
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

  // ===== Fromik Validation =======
  const userInfo = {
    vehicleName: "Honda",
    vehicleManufacturer: getValue.vehicle_manufacturer,
    vehicleRegistration: getValue.vehicle_registration_no,
  };
  const validationSchema = yup.object({
    vehicleName: yup.string().required("Vehicle Name is required to edit"),
    vehicleManufacturer: yup
      .string()
      .required("Vehicle Manufacturer is required to edit"),
    vehicleRegistration: yup
      .string()
      .required("Vehicle Registration Number is required to edit"),
  });

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
      alert(result);
    }
  };

  const ViewProfile = async () => {
    setIsLoading(true);
    const res = await GetTokenApi(EndPoints.GetProfileData, "GET", token);
    if (res.status === 200) {
      setIsLoading(false);
      setUserImage(res.data?.profile_picture);
      setFrontImage(res.data?.licnense_front_image);
      setBackImage(res.data?.licnense_back_image);
      setGetValue(res.data);
      console.log("res.data ===>   ", res.data);
      // Toast.show(res.data.message, Toast.LONG);
      // alert(res.data.message);
    } else {
      setIsLoading(false);
      console.log("res else ==>  ", res.data);
      // Toast.show(res.data.message, Toast.LONG);
      // alert("running bad");
      // alert(res.data.message);
    }
    CountDown();
  };

  //========== API ==========
  const UpdateProfileApi = async (values) => {
    // console.log("values ==>  ", values);
    if (frontLocal.length < 0 || FrontImage.length < 0) {
      console.log("frontLocal ==>   ", frontLocal.length);
      console.log("FrontImage ==>   ", FrontImage.length);

      Toast.show({
        type: "error",
        text1: "Required",
        text2: "Kindly upload driving license front image",
        // topOffset: 100,
      });
    } else if (backLocal.length < 0 || backImage.length < 0) {
      console.log("backLocal ==>   ", backLocal.length);
      console.log("backImage ==>   ", backImage.length);

      Toast.show({
        type: "error",
        text1: "Required",
        text2: "Kindly upload driving license back image",
        // topOffset: 100,
      });
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      console.log("current selected ==> ", currentlySelect);
      var formdata = new FormData();
      console.log("profile image ==> ", showImage);
      formdata.append("profile_picture", showImage);
      formdata.append("vehicle_name", values.vehicleName);
      formdata.append("vehicle_manufacturer", values.vehicleManufacturer);
      formdata.append("vehicle_registration_no", values.vehicleRegistration);
      // if (FrontImage) {
      //   formdata.append("licnense_front_image", FrontImage);
      // } else {
      //   formdata.append("licnense_front_image", frontLocal);
      // }
      // if (backImage) {
      //   formdata.append("licnense_front_image", backImage);
      // } else {
      //   formdata.append("licnense_back_image", backLocal);
      // }
      {
        currentlySelect
          ? formdata.append("licnense_front_image", frontLocal)
          : formdata.append("licnense_front_image", FrontImage);
      }
      // formdata.append("licnense_front_image", frontLocal);
      {
        currentlySelect1
          ? formdata.append("licnense_back_image", backLocal)
          : formdata.append("licnense_back_image", backImage);
      }

      // formdata.append("licnense_back_image", backLocal);

      console.log("Sending data ==>   ", formdata);

      setIsLoading(true);
      const result = await apiClient.post(
        EndPoints.UpdateProfileData,
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
        // setPickFront(false);
        // setPickBack(false);
        // console.log("res=====>   ", result.data.data);
        // Toast.show(result.data.data, Toast.LONG);
        setToggle(false);
        alert(result.data.data);
      } else {
        setIsLoading(false);
        // console.log("else =====>   ", result?.data);
        alert(result?.data.message);
        // Toast.show(result?.data.message, Toast.LONG);
      }
    }
  };

  //  ===== Camers frontback open function=======
  const LunchCamera1 = async () => {
    const Options = {
      title: "Choose an Image",
    };
    await launchCamera(Options, (response) => {
      const Options = {
        title: "Choose anndd Image",
      };
      console.log("launch camera function");
      setModalVisible1(false);
      setIsLoading(true);
      try {
        if (response.didCancel) {
          alert("User cancelled image picker");
          setIsLoading(false);
        } else {
          setPopUpModalVisible(false);
          let obj = {
            name: response.assets[0].fileName,
            type: response.assets[0].type,
            uri: response.assets[0].uri,
          };
          console.log("photo response ==> ", response.assets[0].uri);
          {
            selected
              ? (setSurrentlySelect(true),
                setPickFront(true),
                setFrontLocal(obj))
              : (setSurrentlySelect1(true),
                setPickBack(true),
                setBackLocal(obj));
          }
          // console.log("selct front from local ==>  ", pickFront);
          alert("selected front from local");
          setShowImage1(response.assets[0].uri);
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.log("error==> ", e);
      }
    });
  };

  //===== Gallery signup Open images =======
  const LunchGallery1 = async () => {
    const Options = {
      title: "Choose an Image",
      maxWidth: 1170,
      maxHeight: 2430,
    };
    setModalVisible1(false);
    // setIsLoading(true);
    await launchImageLibrary(Options, async (response) => {
      try {
        if (response.didCancel) {
          alert("User cancelled image picker");
          setIsLoading(false);
        } else {
          setPopUpModalVisible(false);
          let obj = {
            name: response.assets[0].fileName,
            type: response.assets[0].type,
            uri: response.assets[0].uri,
          };

          {
            selected
              ? (setSurrentlySelect(true),
                setPickFront(true),
                setFrontLocal(obj))
              : (setSurrentlySelect1(true),
                setPickBack(true),
                setBackLocal(obj));
          }
          setShowImage1(response.assets[0].uri);
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.log("error==> ", e);
      }
    });
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
      <PopUpModal
        modalVisiblePopUp={popUpModalVisible}
        onPressCancel={() => {
          setPopUpModalVisible(!popUpModalVisible);
        }}
        onPressCamera={LunchCamera1}
        onPressGallery={LunchGallery1}
      />
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
              {userImage ? (
                <Image
                  style={styles.imageContainer}
                  source={{ uri: userImage }}
                  // source={userImage}
                />
              ) : (
                <Image
                  source={Images.profileUpdate}
                  style={styles.imageContainer}
                />
              )}
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
          <View style={{ justifyContent: "center" }}>
            {/* ==================== username Input Text ==================== */}

            <View style={styles.container1}>
              <View style={[styles.labelContainer1]}>
                <Text
                  style={[
                    { color: colors.white },
                    {
                      color: toggle ? colors.gray : colors.white,
                    },
                  ]}
                >
                  {"User Name"}
                </Text>
              </View>

              <View
                style={[
                  {
                    height: hp(6),
                    width: wp(80),
                    borderWidth: 1,
                    borderColor: colors.white,
                    justifyContent: "center",
                    marginTop: hp(1),
                    borderRadius: hp(1),
                  },
                  {
                    borderWidth: toggle ? 1 : 1,
                    borderColor: toggle ? colors.gray : colors.white,
                  },
                ]}
              >
                <Text
                  style={[
                    {
                      // color: colors.ButtonColor,
                      color: colors.white,
                      fontSize: hp(1.4),
                      paddingLeft: hp(2),
                    },
                    {
                      color: toggle ? colors.gray : colors.white,
                    },
                  ]}
                >
                  {userName}
                </Text>
              </View>
            </View>

            {/* ==================== Email ID Input Text ==================== */}

            <View style={styles.container1}>
              <View style={styles.labelContainer1}>
                <Text
                  style={[
                    { color: colors.white },
                    {
                      color: toggle ? colors.gray : colors.white,
                    },
                  ]}
                >
                  {"Email ID"}
                </Text>
              </View>

              <View
                style={[
                  {
                    height: hp(6),
                    width: wp(80),
                    borderWidth: 1,
                    borderColor: colors.white,
                    justifyContent: "center",
                    marginTop: hp(1),
                    borderRadius: hp(1),
                  },
                  {
                    borderWidth: toggle ? 1 : 1,
                    borderColor: toggle ? colors.gray : colors.white,
                  },
                ]}
              >
                <Text
                  style={[
                    {
                      // color: colors.ButtonColor,
                      color: colors.white,
                      fontSize: hp(1.4),
                      paddingLeft: hp(2),
                    },
                    {
                      color: toggle ? colors.gray : colors.white,
                    },
                  ]}
                >
                  {emailAddress}
                </Text>
              </View>
            </View>

            {/* ==================== Phone number Input Text ==================== */}
            <View style={styles.container1}>
              <View style={styles.labelContainer1}>
                <Text
                  style={[
                    { color: colors.white },
                    {
                      color: toggle ? colors.gray : colors.white,
                    },
                  ]}
                >
                  {"Phone Number"}
                </Text>
              </View>

              <View
                style={[
                  {
                    height: hp(6),
                    width: wp(80),
                    borderWidth: 1,
                    borderColor: colors.white,
                    justifyContent: "center",
                    marginTop: hp(1),
                    borderRadius: hp(1),
                  },
                  {
                    borderWidth: toggle ? 1 : 1,
                    borderColor: toggle ? colors.gray : colors.white,
                  },
                ]}
              >
                <Text
                  style={[
                    {
                      // color: colors.ButtonColor,
                      color: colors.white,
                      fontSize: hp(1.4),
                      paddingLeft: hp(2),
                    },
                    {
                      color: toggle ? colors.gray : colors.white,
                    },
                  ]}
                >
                  {mobileNumber}
                </Text>
              </View>
            </View>

            {/* ==================== Vehicle info ===================== */}

            <AppForm
              initialValues={{
                vehicleName: getValue?.vehicle_manufacturer,
                vehicleManufacturer: getValue?.vehicle_manufacturer,
                vehicleRegistration: getValue?.vehicle_registration_no,
              }}
              validationSchema={validationSchema}
              onSubmit={UpdateProfileApi}
              enableReinitialize={true}
            >
              <View style={styles.container1}>
                <View style={styles.labelContainer}>
                  <Text style={{ color: colors.white }}>{"Vehicle Name"}</Text>
                </View>
                {/* <TextInput style={styles.textInput} 
                /> */}
                <AppFromField
                  //  label="First Name"
                  defaultValue={getValue?.vehicle_name}
                  width={wp(80)}
                  placeholderTextColor={"#A9C6E8"}
                  placeholder="Enter Vehicle Name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  name="vehicleName"
                  borderWidth={1}
                  borderColor={colors.white}
                />
              </View>

              <View style={styles.container1}>
                <View style={styles.labelContainer}>
                  <Text style={{ color: colors.white }}>
                    {"Vehicle Manufacturer"}
                  </Text>
                </View>

                <AppFromField
                  //  label="First Name"
                  defaultValue={getValue?.vehicle_manufacturer}
                  width={wp(80)}
                  placeholderTextColor={"#A9C6E8"}
                  placeholder="Enter Vehicle Manufacturer"
                  autoCapitalize="none"
                  autoCorrect={false}
                  name="vehicleManufacturer"
                  borderWidth={1}
                  borderColor={colors.white}
                />
              </View>

              <View style={styles.container1}>
                <View style={styles.labelContainer}>
                  <Text style={{ color: colors.white }}>
                    {"Vehicle Registration Number"}
                  </Text>
                </View>
                {/* <TextInput style={styles.textInput} 
                /> */}
                <AppFromField
                  //  label="First Name"
                  defaultValue={getValue?.vehicle_registration_no}
                  width={wp(80)}
                  placeholderTextColor={"#A9C6E8"}
                  placeholder="Enter Vehicle Registration Number"
                  autoCapitalize="none"
                  autoCorrect={false}
                  name="vehicleRegistration"
                  borderWidth={1}
                  borderColor={colors.white}
                />
              </View>

              {/* ==================== Subscription Input Text ==================== */}

              {/* //==== Upload Driving License Front Image  */}
              <View style={styles.uploadIconContainer}>
                <TouchableOpacity
                  style={styles.uploadSection}
                  onPress={() => {
                    setPopUpModalVisible(true);
                    setModalVisible1(false);
                    setSelected(true);
                  }}
                >
                  {pickFront == true ? (
                    <Image source={frontLocal} style={styles.profileImage} />
                  ) : (
                    <>
                      <Image
                        source={{ uri: FrontImage }}
                        style={styles.profileImage}
                      />
                    </>
                  )}
                </TouchableOpacity>
                {/* // ======= Camera  */}
                <TouchableOpacity
                  style={styles.uploadSection}
                  onPress={() => {
                    setPopUpModalVisible(true);
                    setModalVisible1(false);
                    setSelected(false);
                  }}
                >
                  {/* {backImage ? ( */}

                  {pickBack == true ? (
                    <Image source={backLocal} style={styles.profileImage} />
                  ) : (
                    <>
                      <Image
                        source={{ uri: backImage }}
                        style={styles.profileImage}
                      />
                    </>
                  )}
                </TouchableOpacity>
              </View>

              {/*================ BUTTON CONTAINER ========== */}
              {toggle == false ? (
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
                      // title={getTranslatedText("Save")}
                      title={"Edit Profile"}
                      bgColor={"white"}
                      color={colors.ButtonText}
                      borderRadius={hp(2)}
                      height={hp(5.5)}
                      onPress={() => setToggle(!toggle)}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.ButtonContainer}>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "flex-end",
                      // borderWidth: 1,
                      width: wp(88),
                      height: hp(8),
                      // zindex: -2,
                      // position: "absolute",
                    }}
                  >
                    <SubmitButton
                      title="Save"
                      backgroundColor={colors.white}
                      titleColor={colors.ButtonText}
                      width={"88%"}
                      height={hp(5.5)}
                    />
                  </View>
                </View>
              )}
            </AppForm>
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
