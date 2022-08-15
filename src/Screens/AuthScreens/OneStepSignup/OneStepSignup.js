import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./styles";
import Logo from "../../../Assets/Images/Svg/AppLogo.svg";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";
import AppInput from "../../../Components/Common/AppInput/AppInput";
import Button from "../../../Components/Common/Button/Button";
import Loader from "../../../Components/Common/Loader/Loader";
import Images from "../../../Assets/Images";
import { useSelector, useDispatch } from "react-redux";
import TimeIcon from "../../../Assets/Images/Svg/timePicker.svg";
import {
  userToken,
  // RegisterUserCredentails,
} from "../../../Redux/Actions/Actions";
import Header from "../../../Components/Common/Header/Header";
import * as yup from "yup";
import { Formik } from "formik";
import HitApi from "../../../Config/HitApis/HitApis";
import EndPoints from "../../../Config/BaseUrl/BaseUrl";
import { useTranslation } from "react-i18next";
import AppForm from "../../../Components/Common/FormComponents/AppFrom";
import AppFromField from "../../../Components/Common/FormComponents/AppFromField";
import PopUpModal from "../../../Components/Application/PopUpModal/PopUpModal";
import AppMobileNoInputField from "../../../Components/Application/AppMobileField/AppMobileNoInputField";
import ValidationErrorMessage from "../../../Components/Common/FormComponents/ValidationErrorMessage";
import SubmitButton from "../../../Components/Application/SubmitButton/SubmitButton";
import Toast from "react-native-toast-message";
import SvgComponent from "../../../Components/Common/SvgCustomComponents/SvgCustomComponents";
import CemaraIcon from "../../../Assets/Images/Svg/cameraIcon.svg";
import GalleryIcon from "../../../Assets/Images/Svg/galleryIcon.svg";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import { create } from "apisauce";
import moment from "moment";
import momentTz from "moment-timezone";
import DatePicker from "react-native-date-picker";

function OneStepSignup({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [reShowPassword, setReShowPassword] = useState(true);
  var hoursMin = moment().format("YYYY-MM-DDTHH:mm:ss.sssZ");
  const [selected, setSelected] = useState("");
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [FrontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");

  const [showImage, setShowImage] = useState("");

  const phoneInput = useRef(phone_No);
  const [phone_No, setPhone_No] = useState(phoneInput);

  const [formatedMobileNO, setFormatedMobileNO] = useState("");
  console.log("formatedMobileNO", formatedMobileNO);
  const [phoneNumberValidationError, setPhoneNumberValidationError] =
    useState(false);
  const [valid, setIsValid] = useState(false);
  const [formattedValue, setFormattedValue] = useState("");

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const userInfo = {
    name: "",
    email: "",
    phoneNumber: "",

    vehicleName: "",
    vehicleManufacturer: "",
    vehicleRegistration: "",

    companyID: "",
    companyName: "",
    companyAddress: "",

    // name: "Haseeb",
    // email: "israr1@gmail.com",
    // phoneNumber: "+92300543280",

    // // ========================
    // vehicleName: "Honda",
    // vehicleManufacturer: "Honda",
    // vehicleRegistration: "124we",

    // // ========================
    // companyID: "2233",
    // companyName: "XYZ",
    // companyAddress: "qwqew LHR",
  };
  const signupValidationSchema = yup.object({
    email: yup
      .string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    name: yup.string().required("Name is required"),
    phoneNumber: yup.string().required("Phone number is required feild"),

    // //============ Vehciles information ================
    vehicleName: yup.string().required("Vehicle Name is required"),
    vehicleManufacturer: yup
      .string()
      .required("Vehicle Manufacturer is required"),
    vehicleRegistration: yup
      .string()
      .required("Vehicle Registration Number is required"),

    // //   ========== Company information =============
    companyID: yup.string().required("Company ID is required"),
    companyName: yup.string().required("Company Name is required"),
    companyAddress: yup.string().required("Company Address is required"),
    //dateOfBirth: yup.string().required("Date Of Birth is required"),
  });
  var hoursMinEnd = moment().format("YYYY-MM-DDTHH:mm:ss.sssZ");

  hoursMinEnd = hoursMinEnd.slice(0, 21);

  //===== Toast Massage funcation =======//
  const errroemassage = () => {
    if (FrontImage.length < 1) {
      Toast.show({
        type: "error",
        text1: "Required",
        text2: "Kindly upload driving license front image",
        // topOffset: 100,
      });
    } else if (backImage.length < 1) {
      Toast.show({
        type: "error",
        text1: "Required",
        text2: "Kindly upload driving license back image",
        // topOffset: 100,
      });
    }
  };
  2;

  const TestingAPI = async (values) => {
    console.log("value ==>  ", values);
    if (FrontImage.length < 1) {
      console.log("FrontImage ==>   ", FrontImage.length);

      Toast.show({
        type: "error",
        text1: "Required",
        text2: "Kindly upload driving license front image",
        // topOffset: 100,
      });
    } else if (backImage.length < 1) {
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
      console.log("formated number ==> ", formatedMobileNO);

      var formdata = new FormData();
      formdata.append("name", values.name);
      formdata.append("email", values.email);
      formdata.append("mobile", formatedMobileNO);

      formdata.append("company_id", values.companyID);
      formdata.append("company_name", values.companyName);
      formdata.append("company_address", values.companyAddress);
      time1 == ""
        ? formdata.append("company_date", hoursMinEnd)
        : formdata.append("company_date", time1);

      formdata.append("vehicle_name", values.vehicleName);
      formdata.append("vehicle_manufacturer", values.vehicleManufacturer);
      formdata.append("vehicle_registration_no", values.vehicleRegistration);

      formdata.append("licnense_front_image", FrontImage);
      formdata.append("licnense_back_image", backImage);
      console.log("Sending data ==>   ", formdata);

      const api = create({
        baseURL: EndPoints.NewRegisterApi,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setIsLoading(true);
      const response = await api.post(EndPoints.NewRegisterApi, formdata, {
        myHeaders,
      });
      if (response.ok) {
        setIsLoading(false);
        // alert(response.data.message);
        console.log("ok response ==> ", response.data);
        // console.log("token ==> ", response.data.token);
        // navigation.navigate("SignupOtp");
        navigation.navigate("SignupOtp", {
          token: response.data.data.token,
        });
      } else {
        setIsLoading(false);
        // console.log("else respnse ==> ", response.data);
        alert(response.data.message);
      }
    }
  };

  const UserSignUp = async (values) => {
    let params = {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.rePassword,
      mobile: values.phoneNumber,
    };
    setIsLoading(true);
    const res = await HitApi(EndPoints.SignUp, "POST", params);
    if (res.status === 200) {
      // dispatch(userToken(res.data.data.token));
      // const res =  await LocalStorage.storeData(PreferenceKeys.token, res.data.data.token);
      setIsLoading(false);
      navigation.navigate("SignupOtp", {
        token: res.data.data.token,
      });
    } else {
      console.log("Status return ==> other");
      setIsLoading(false);
      alert(res.data.message);
    }
    setIsLoading(false);
  };

  const getTranslatedText = (text) => {
    return t(text);
  };

  //  ===== Camers signup open function=======
  const LunchCamera = async () => {
    const Options = {
      title: "Choose an Image",
    };
    await launchCamera(Options, (response) => {
      const Options = {
        title: "Choose anndd Image",
      };
      console.log("launch camera function");
      setModalVisible(false);
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
            selected ? setFrontImage(obj) : setBackImage(obj);
          }
          setShowImage(response.assets[0].uri);
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.log("error==> ", e);
      }
    });
  };

  //===== Gallery signup Open images =======
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
          setPopUpModalVisible(false);
          let obj = {
            name: response.assets[0].fileName,
            type: response.assets[0].type,
            uri: response.assets[0].uri,
          };
          // console.log("image is ", response.assets[0].uri);
          // setUserImage(response.assets[0].uri);
          // setUserImage(response.assets[0]);
          {
            selected ? setFrontImage(obj) : setBackImage(obj);
          }
          setShowImage(response.assets[0].uri);
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.log("error==> ", e);
      }
    });
  };

  const [date1, setDate1] = useState(new Date());
  const [time1, setTime1] = useState("");
  const [open1, setOpen1] = useState(false);
  const [open, setOpen] = useState(false);
  const [visibleTime1, setVisibleTime1] = useState(false);
  const [sendingTime1, setSendingTime1] = useState(new Date());

  const setEndTrip = (t) => {
    console.log("date ===== ==> ", t);
    let timeString = moment(t).format();
    let startNow = timeString.slice(0, 16);
    timeString = timeString.slice(11, 16);
    //date.moment(t).format().slice(0, 16)
    console.log("update ==> ", timeString);
    console.log("startNow ==> ", startNow);
    setSendingTime1(startNow);
    // setTime1(timeString);
    setTime1(startNow);
    setVisibleTime1(true);
  };

  return (
    <ImageBackground
      resizeMode={"cover"}
      source={Images.BackImage}
      style={styles.container}
    >
      {/* ============ PopUp Modal container ===============// */}
      {/* ===================  MODAL ===================== */}
      {/* ============ PopUp Modal container ===============// */}

      <PopUpModal
        modalVisiblePopUp={popUpModalVisible}
        onPressCancel={() => {
          setPopUpModalVisible(!popUpModalVisible);
        }}
        onPressCamera={LunchCamera}
        onPressGallery={LunchGallery}
      />

      {isLoading && <Loader isloading={isLoading} />}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        {/* //============ Herder container =============== */}
        <View style={{ flexDirection: "row" }}>
          <View style={styles.herdercomtainer}>
            <Header
              // title={""}
              leftIconPath={Images.backArrow}
              onLeftIconPress={() => {
                navigation.goBack();
              }}
              tintColor={colors.white}
              textColor={colors.white}
            />
          </View>
          <View style={styles.logoContainer}>
            <Image
              source={Images.Logo}
              style={{
                borderColor: "white",
                width: wp(55),
                height: hp(15),
              }}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* //============ Input container ==============// */}
        <ScrollView>
          <View
            style={{
              alignItems: "center",
              flex: 0.1,
              justifyContent: "flex-end",
              // borderWidth: 2,
              borderColor: colors.white,
            }}
          >
            <View
              style={{
                width: wp(80),
                // borderWidth: 2,
                borderColor: colors.white,
              }}
            >
              <Text
                style={{
                  fontSize: hp(2.4),
                  color: colors.white,
                  fontWeight: "bold",
                }}
              >
                {getTranslatedText("PersonalInfo")}
              </Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <AppForm
              initialValues={userInfo}
              validationSchema={signupValidationSchema}
              onSubmit={TestingAPI}
              // enableReinitialize={true}
            >
              <AppFromField
                //  label="First Name"
                width={wp(90)}
                placeholderTextColor={colors.white}
                placeholder="User Name"
                autoCapitalize="none"
                autoCorrect={false}
                name="name"
                borderWidth={1}
                borderColor={colors.white}
              />
              <AppFromField
                //  label="First Name"
                width={wp(90)}
                placeholderTextColor={colors.white}
                placeholder="Email Address"
                autoCapitalize="none"
                autoCorrect={false}
                name="email"
                borderWidth={1}
                borderColor={colors.white}
              />

              <AppMobileNoInputField
                // valid={valid}
                // defaultValue={""}
                formatedMobileNO={formatedMobileNO}
                setFormatedMobileNO={setFormatedMobileNO}
                // setIsValid={setIsValid}
                label="Mobile No"
                placeholderTextColor={colors.white}
                name="phoneNumber"
                containerStyle={styles.phoneStyle}
                textContainerStyle={styles.textStyle}
                codeTextStyle={{
                  color: colors.white,
                  fontSize: hp(1.7),
                  paddingTop: hp(0.3),
                }}
                textInputStyle={styles.textStyle1}
              />
              {/* <ValidationErrorMessage
                error={"phone Number should be valid"}
                visible={phoneNumberValidationError}
              /> */}

              {/* ========= Vehicle info ============== */}
              <View
                style={{
                  alignItems: "center",
                  flex: 0.1,
                  justifyContent: "flex-end",
                  //   borderWidth: 2,
                  borderColor: colors.white,
                  marginTop: hp(2),
                  height: hp(5),
                }}
              >
                <View
                  style={{
                    width: wp(80),
                    // borderWidth: 2,
                    borderColor: colors.white,
                  }}
                >
                  <Text
                    style={{
                      fontSize: hp(2.4),
                      color: colors.white,
                      fontWeight: "bold",
                    }}
                  >
                    {getTranslatedText("VehicleInfo")}
                  </Text>
                </View>
              </View>

              <AppFromField
                //  label="First Name"
                width={wp(90)}
                placeholderTextColor={colors.white}
                placeholder="Vehicle Name"
                autoCapitalize="none"
                autoCorrect={false}
                name="vehicleName"
                borderWidth={1}
                borderColor={colors.white}
              />
              <AppFromField
                //  label="First Name"
                width={wp(90)}
                placeholderTextColor={colors.white}
                placeholder="Vehicle Manufacturer"
                autoCapitalize="none"
                autoCorrect={false}
                name="vehicleManufacturer"
                borderWidth={1}
                borderColor={colors.white}
              />
              <AppFromField
                //  label="First Name"
                width={wp(90)}
                placeholderTextColor={colors.white}
                placeholder="Vehicle Registration Number"
                autoCapitalize="none"
                autoCorrect={false}
                name="vehicleRegistration"
                borderWidth={1}
                borderColor={colors.white}
              />

              {/* //==== Upload Driving License Front Image  */}
              <View style={styles.uploadIconContainer}>
                <TouchableOpacity
                  style={styles.uploadSection}
                  onPress={() => {
                    setPopUpModalVisible(true);
                    setModalVisible(false);
                    setSelected(true);
                  }}
                >
                  {FrontImage ? (
                    <Image source={FrontImage} style={styles.profileImage} />
                  ) : (
                    <>
                      <Image
                        style={{
                          marginBottom: hp(1),
                          height: hp(3),
                          width: wp(8),
                        }}
                        source={Images.imagePicker}
                      />
                      <Text style={styles.uploadTextDoc}>
                        {"Upload Driving "}
                      </Text>
                      <Text style={styles.uploadTextDoc}>
                        {"License Front Image"}
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
                {/* // ======= Camera  */}
                <TouchableOpacity
                  style={styles.uploadSection}
                  onPress={() => {
                    setPopUpModalVisible(true);
                    setModalVisible(false);
                    setSelected(false);
                  }}
                >
                  {backImage ? (
                    <Image source={backImage} style={styles.profileImage} />
                  ) : (
                    <>
                      <Image
                        style={{
                          marginBottom: hp(1),
                          height: hp(3),
                          width: wp(8),
                        }}
                        source={Images.imagePicker}
                      />
                      <Text style={styles.uploadTextDoc}>
                        {"Upload Driving "}
                      </Text>
                      <Text style={styles.uploadTextDoc}>
                        {"License Back Image"}
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              {/* ==========  Company Info  =========== */}
              <View
                style={{
                  alignItems: "center",
                  flex: 0.1,
                  justifyContent: "flex-end",
                  //   borderWidth: 2,
                  borderColor: colors.white,
                  marginTop: hp(2),
                  height: hp(5),
                }}
              >
                <View
                  style={{
                    width: wp(80),
                    // borderWidth: 2,
                    borderColor: colors.white,
                  }}
                >
                  <Text
                    style={{
                      fontSize: hp(2.4),
                      color: colors.white,
                      fontWeight: "bold",
                    }}
                  >
                    {getTranslatedText("companyInfo")}
                  </Text>
                </View>
              </View>
              <AppFromField
                //  label="First Name"
                width={wp(90)}
                placeholderTextColor={colors.white}
                placeholder="Company ID"
                autoCapitalize="none"
                autoCorrect={false}
                name="companyID"
                borderWidth={1}
                borderColor={colors.white}
              />
              <AppFromField
                //  label="First Name"
                width={wp(90)}
                placeholderTextColor={colors.white}
                placeholder="Company Name"
                autoCapitalize="none"
                autoCorrect={false}
                name="companyName"
                borderWidth={1}
                borderColor={colors.white}
              />
              <AppFromField
                //  label="First Name"
                width={wp(90)}
                placeholderTextColor={colors.white}
                placeholder="Company Address"
                autoCapitalize="none"
                autoCorrect={false}
                name="companyAddress"
                borderWidth={1}
                borderColor={colors.white}
              />
              {/* <AppFromField
                //  label="First Name"
                width={wp(90)}
                placeholderTextColor={colors.white}
                placeholder="Date Of Birth"
                autoCapitalize="none"
                autoCorrect={false}
                name="dateOfBirth"
                borderWidth={1}
                borderColor={colors.white}
              /> */}
              <TouchableOpacity
                style={{
                  width: wp(90),
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
                    borderWidth: hp(0.1),
                    borderRadius: hp(1),
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
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: hp(1.5),
                      }}
                    >
                      {time1 == ""
                        ? hoursMinEnd.slice(0, 10)
                        : time1.slice(0, 10)}
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
                  mode="date"
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
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <SubmitButton
                  title="SIGN Up"
                  backgroundColor={colors.white}
                  // onPress={() => {
                  //   navigation.navigate("SignupOtp", {
                  //     token: "12323",
                  //   });
                  // }}
                />
              </View>

              {/* ============ Company info ============= */}
            </AppForm>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
export default OneStepSignup;
