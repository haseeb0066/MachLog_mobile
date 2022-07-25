import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
} from "react-native";
import styles from "./styles";
import Logo from "../../../Assets/Images/Svg/AppLogo.svg";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";
import AppInput from "../../../Components/Common/AppInput/AppInput";
import Button from "../../../Components/Common/Button/Button";
import * as yup from "yup";
import { Formik } from "formik";
import fonts from "../../../Assets/Fonts/font";
import Images from "../../../Assets/Images";
import EndPoints from "../../../Config/BaseUrl/BaseUrl";
import HitApi from "../../../Config/HitApis/HitApis";
import Loader from "../../../Components/Common/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  LoginCheck,
  userToken,
  UserCredentails,
  LoginFirstTime,
} from "../../../Redux/Actions/Actions";
import GetTokenApi from "../../../Config/GetTokenApi/GetTokenApi";
import LocalStorage from "../../../Utills/LocalStorage/LocalStorage";
import PreferenceKeys from "../../../Utills/PreferenceKeys/PreferenceKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import AppMobileNoInputField from "../../../Components/Application/AppMobileField/AppMobileNoInputField";
import ValidationErrorMessage from "../../../Components/Common/FormComponents/ValidationErrorMessage";

function Login({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isShowPassword, setIsShowPassword] = useState(true);
  const { t } = useTranslation();

  const [formatedMobileNO, setFormatedMobileNO] = useState("");
  const [phoneNumberValidationError, setPhoneNumberValidationError] =
    useState(false);
  const [valid, setIsValid] = useState(false);
  const [formattedValue, setFormattedValue] = useState("");

  // const token = useSelector((state) => state.token);
  const getTranslatedText = (text) => {
    return t(text);
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);
  // ================= Validation funtion with formik ==========================
  const userInfo = {
    email: "",
    phoneNumber: "",
    // email: "israr4551@gmail.com",
    // phoneNumber: "+923005270280",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .label("email")
      .email("Email must be a valid email address")
      .required("Email is required"),
    phoneNumber: yup.string().required("Phone number is required feild"),
  });

  const UserSignin = async (values) => {
    const fcmToken = await AsyncStorage.getItem("fcmToken");
    console.log("Fcmtoken Login ==>  ", fcmToken);
    let params = {
      email: values.email,
      mobile: values.phoneNumber,
      fcm_token: fcmToken,
    };
    setIsLoading(true);
    const res = await HitApi(EndPoints.LoginAPI, "POST", params);
    if (res.status === 200) {
      console.log("token is_verified? ===>  ", res.data.data.is_verified);
      if (res.data.data.is_verified === "false") {
        AgainSendOtp(res.data.data.token);
        setIsLoading(false);
      } else {
        console.log("else running");
        console.log("login token ===>   ", res.data);
        await LocalStorage.storeObjectData(
          PreferenceKeys.token,
          res.data.data.token
        );
        dispatch(userToken(res.data.data.token));
        dispatch(UserCredentails(res.data.data.user_data));
        dispatch(LoginCheck());
        dispatch(LoginFirstTime());
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      alert(res.data.message);
      // console.log("error ==> ", res.data.message);
    }
    setIsLoading(false);
  };

  const AgainSendOtp = async (token) => {
    // console.log("stored Token ==> ", token);
    setIsLoading(true);
    const res = await GetTokenApi(EndPoints.resendOtp, "GET", token);
    if (res.status === 200) {
      setIsLoading(false);
      setTimeout(() => {
        console.log("res.data.data==> ", res.data.data.message);
        // Toast.show(res.data.message, Toast.LONG);
        alert(res.data.message);
      }, 5000);
      dispatch(userToken(token));
      navigation.navigate("SignupOtp", { token: token });
    } else {
      setIsLoading(false);
      // Toast.show(res.data.message, Toast.LONG);
      alert(res.data.message);
    }
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // behavior="height"
      style={styles.container}
    >
      <ImageBackground
        source={require("../../../Assets/Images/Png/BackImage.png")}
        style={{
          height: "100%",
          width: "105%",
          zIndex: 1,
          position: "absolute",
        }}
      />
      {isLoading && <Loader isloading={isLoading} />}

      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          UserSignin(values);
          console.log("Values ---->  ", values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        }) => (
          <>
            <View style={styles.logoContainer}>
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
            <View style={styles.InputContainer}>
              {/*  Sign ----------- CONTAINER  */}
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
                    {getTranslatedText("SignIn")}
                  </Text>
                </View>
              </View>
              {/*  TEXTinput ----------- CONTAINER  */}

              <View
                style={{
                  marginTop: hp(2),
                  flex: 0.4,
                  alignItems: "center",
                  // borderWidth: 2,
                  borderColor: colors.white,
                }}
              >
                <View
                  style={{
                    width: wp(90),
                    // borderWidth: 1,
                    borderColor: colors.Plus,
                    justifyContent: "center",
                  }}
                >
                  <AppInput
                    tintColor={colors.GrayColor}
                    // placeholder={CommonText.EmailAddress}
                    placeholder={getTranslatedText("EmailAddress")}
                    placeholderTextColor={colors.lightColor}
                    height={hp(6)}
                    value={values.email}
                    colortextInput={"white"}
                    onChangeText={handleChange("email")}
                    borderColor={colors.white}
                    borderWidth={hp(0.15)}
                    borderRadius={hp(2)}
                    onBlur={handleBlur("email")}
                  />
                  {errors.email && touched.email && (
                    <Text
                      style={{
                        fontSize: 10,
                        color: "red",
                        marginLeft: hp(2.5),
                      }}
                    >
                      {errors.email}
                    </Text>
                  )}
                </View>
                {/* PASSWORD CONTAINER */}

                <View
                  style={{
                    width: wp(90),
                    // borderWidth: 1,
                    borderColor: colors.Plus,
                    justifyContent: "center",
                    paddingTop: hp(0.5),
                  }}
                >
                  <AppMobileNoInputField
                    valid={valid}
                    // defaultValue={""}
                    formatedMobileNO={formatedMobileNO}
                    setFormatedMobileNO={setFormatedMobileNO}
                    setIsValid={setIsValid}
                    label="Mobile No"
                    laceholderTextColor={colors.white}
                    name="phoneNumber"
                    containerStyle={styles.phoneStyle}
                    textContainerStyle={styles.textStyle}
                    codeTextStyle={{ color: colors.white, fontSize: 14 }}
                    textInputStyle={{
                      height: hp(3),
                      fontSize: 14,
                      color: colors.white,
                      borderColor: colors.white,
                    }}
                  />
                  <ValidationErrorMessage
                    error={"phone Number should be valid"}
                    visible={phoneNumberValidationError}
                  />
                </View>

                {/* ==================FORGOT PASSWORD=============== */}
                <View
                  style={{
                    width: wp(88),
                    height: hp(6),
                    // borderWidth: 2,
                    borderColor: colors.white,
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <View
                    style={{
                      width: wp(80),
                      // borderWidth: 2,
                      borderColor: colors.white,
                      alignItems: "flex-end",
                    }}
                  >
                    {/* <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("ForgotPassword");
                      }}
                    >
                      <Text
                        style={{
                          color: colors.white,
                          fontWeight: "bold",
                        }}
                      >
                        {getTranslatedText("ForgotPasswordText")}
                      </Text>
                    </TouchableOpacity> */}
                  </View>
                </View>

                {/*================ BUTTON CONTAINER ========== */}

                <View style={styles.ButtonContainer}>
                  <Button
                    title={getTranslatedText("SignIn")}
                    bgColor={colors.ButtonColor}
                    color={colors.ButtonText}
                    borderRadius={hp(2)}
                    onPress={handleSubmit}
                  />
                </View>

                {/* ===============  text ================== */}

                <View
                  style={{
                    width: wp(90),
                    height: hp(10),
                    justifyContent: "center",
                    alignItems: "center",
                    // borderWidth: 2,
                    borderColor: colors.white,
                    flexDirection: "row",
                  }}
                >
                  <View>
                    <Text style={{ color: colors.white }}>
                      {getTranslatedText("DontHaveAcc")}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("OneStepSignup");
                    }}
                  >
                    <Text style={{ color: colors.white, fontWeight: "bold" }}>
                      {getTranslatedText("Signup")}
                      {/* {getTranslatedText("hello")} */}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}
export default Login;
