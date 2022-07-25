import React, { useContext, useEffect, useState } from "react";
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

function Signup({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [reShowPassword, setReShowPassword] = useState(true);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const userInfo = {
    // name: "Haseeb",
    // email: "haseebdeveloper96@gmail.com",
    // phoneNumber: "03130441140",
    // password: "Qwer@12345",
    // rePassword: "Qwer@12345",

    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    rePassword: "",
  };
  const signupValidationSchema = yup.object({
    email: yup
      .string()
      .label("email")
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: yup.string().required("Please enter your password").min(8),
    name: yup.string().required("Name is required"),
    // phoneNumber: yup.string().required("Last name is required"),
    phoneNumber: yup
      .number()
      .typeError("That doesn't look like a phone number")
      .positive("Phone number can't start with a minus")
      .integer("Phone number can't include a decimal point")
      .min(8)
      .required("Phone number is required"),
    rePassword: yup
      .string()
      .min(6)
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Both password need to be the same"),
      })
      .required("Confirm Password Required"),
  });

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

  const UserSignUp1 = () => {
    navigation.navigate("SignupOtp", {
      token: "12132",
    });
  };
  const getTranslatedText = (text) => {
    return t(text);
  };

  return (
    <ImageBackground
      source={require("../../../Assets/Images/Png/BackImage.png")}
      style={{
        height: "100%",
        width: "100%",
        // flex:1,
        zIndex: 1,
        position: "absolute",
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            {isLoading && <Loader isloading={isLoading} />}
            <ScrollView>
              <Formik
                initialValues={userInfo}
                validationSchema={signupValidationSchema}
                onSubmit={(values) => {
                  UserSignUp(values);
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
                }) => {
                  // console.log(errors);
                  return (
                    <>
                      <View style={styles.headerContainer}>
                        <Header
                          leftIconPath={Images.backArrow}
                          onLeftIconPress={() => {
                            navigation.goBack();
                          }}
                          tintColor={colors.white}
                        />
                      </View>
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
                              {getTranslatedText("CreateNewAccount")}
                            </Text>
                          </View>
                        </View>

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
                              // placeholder={CommonText.Name}
                              placeholder={getTranslatedText("Name")}
                              placeholderTextColor={colors.lightColor}
                              height={hp(6)}
                              colortextInput={"white"}
                              borderColor={colors.white}
                              borderWidth={hp(0.15)}
                              borderRadius={hp(2)}
                              onChangeText={handleChange("name")}
                              value={values.name}
                              onBlur={handleBlur("name")}
                            />
                            {touched.name && errors.name && (
                              <Text
                                style={{
                                  fontSize: 11,
                                  color: "red",
                                  marginLeft: hp(2.5),
                                }}
                              >
                                {errors.name}
                              </Text>
                            )}
                          </View>
                          {/* MObile CONTAINER */}

                          <View
                            style={{
                              width: wp(90),
                              // borderWidth: 1,
                              borderColor: colors.Plus,
                              justifyContent: "center",
                              paddingTop: hp(0.5),
                            }}
                          >
                            <AppInput
                              // passwordSvg={<Email />}
                              tintColor={colors.GrayColor}
                              placeholder={getTranslatedText("email")}
                              placeholderTextColor={colors.lightColor}
                              height={hp(6)}
                              colortextInput={"white"}
                              borderColor={colors.white}
                              borderWidth={hp(0.15)}
                              borderRadius={hp(2)}
                              onChangeText={handleChange("email")}
                              value={values.email}
                              onBlur={handleBlur("email")}
                            />
                            {touched.email && errors.email && (
                              <Text
                                style={{
                                  fontSize: 11,
                                  color: "red",
                                  marginLeft: hp(2.5),
                                }}
                              >
                                {errors.email}
                              </Text>
                            )}
                          </View>

                          {/* ============  PASSWORD ============== */}
                          <View
                            style={{
                              width: wp(90),
                              // borderWidth: 1,
                              borderColor: colors.Plus,
                              justifyContent: "center",
                              paddingTop: hp(0.5),
                            }}
                          >
                            <AppInput
                              passwordSvg={
                                isShowPassword === false ? (
                                  <Image
                                    source={Images.EyeIcon}
                                    style={{
                                      width: wp(5),
                                      height: hp(2),
                                      tintColor: colors.white,
                                    }}
                                  />
                                ) : (
                                  <Image
                                    source={Images.closeEyeIcon}
                                    style={{
                                      width: wp(5),
                                      height: hp(2),
                                      tintColor: colors.white,
                                    }}
                                  />
                                )
                              }
                              togglePassword={() =>
                                setIsShowPassword(!isShowPassword)
                              }
                              secureTextEntry={isShowPassword}
                              tintColor={colors.GrayColor}
                              // placeholder={CommonText.PasswordText}
                              placeholder={getTranslatedText("PasswordText")}
                              placeholderTextColor={colors.lightColor}
                              height={hp(6)}
                              colortextInput={"white"}
                              borderColor={colors.white}
                              borderWidth={hp(0.15)}
                              borderRadius={hp(2)}
                              onChangeText={handleChange("password")}
                              value={values.password}
                              onBlur={handleBlur("password")}
                            />
                            {touched.password && errors.password && (
                              <Text
                                style={{
                                  fontSize: 11,
                                  color: "red",
                                  marginLeft: hp(2.5),
                                }}
                              >
                                {errors.password}
                              </Text>
                            )}
                          </View>

                          {/* ============  CONFIRM PASSWORD ============== */}
                          <View
                            style={{
                              width: wp(90),
                              // borderWidth: 1,
                              borderColor: colors.Plus,
                              justifyContent: "center",
                              paddingTop: hp(0.5),
                            }}
                          >
                            <AppInput
                              passwordSvg={
                                reShowPassword === false ? (
                                  <Image
                                    source={Images.EyeIcon}
                                    style={{
                                      width: wp(5),
                                      height: hp(2),
                                      tintColor: colors.white,
                                    }}
                                  />
                                ) : (
                                  <Image
                                    source={Images.closeEyeIcon}
                                    style={{
                                      width: wp(5),
                                      height: hp(2),
                                      tintColor: colors.white,
                                    }}
                                  />
                                )
                              }
                              togglePassword={() =>
                                setReShowPassword(!reShowPassword)
                              }
                              secureTextEntry={reShowPassword}
                              tintColor={colors.GrayColor}
                              // placeholder={CommonText.conPassword}
                              placeholder={getTranslatedText("conPassword")}
                              placeholderTextColor={colors.lightColor}
                              height={hp(6)}
                              colortextInput={"white"}
                              borderColor={colors.white}
                              borderWidth={hp(0.15)}
                              borderRadius={hp(2)}
                              // keyboardType={"numeric"}
                              onChangeText={handleChange("rePassword")}
                              value={values.rePassword}
                              onBlur={handleBlur("rePassword")}
                            />
                            {touched.rePassword && errors.rePassword && (
                              <Text
                                style={{
                                  fontSize: 11,
                                  color: "red",
                                  marginLeft: hp(2.5),
                                }}
                              >
                                {errors.rePassword}
                              </Text>
                            )}
                          </View>

                          {/* ==================Mobile PASSWORD=============== */}

                          <View
                            style={{
                              width: wp(90),
                              // borderWidth: 1,
                              borderColor: colors.Plus,
                              justifyContent: "center",
                              paddingTop: hp(0.5),
                            }}
                          >
                            <AppInput
                              tintColor={colors.GrayColor}
                              // placeholder={CommonText.Mobile}
                              placeholder={getTranslatedText("Mobile")}
                              placeholderTextColor={colors.lightColor}
                              height={hp(6)}
                              colortextInput={"white"}
                              borderColor={colors.white}
                              borderWidth={hp(0.15)}
                              borderRadius={hp(2)}
                              keyboardType={"numeric"}
                              onChangeText={handleChange("phoneNumber")}
                              value={values.phoneNumber}
                              onBlur={handleBlur("phoneNumber")}
                            />
                            {touched.phoneNumber && errors.phoneNumber && (
                              <Text
                                style={{
                                  fontSize: 11,
                                  color: "red",
                                  marginLeft: hp(2.5),
                                }}
                              >
                                {errors.phoneNumber}
                              </Text>
                            )}
                          </View>
                        </View>
                      </View>

                      {/*================ BUTTON CONTAINER ========== */}

                      <View style={styles.ButtonContainer}>
                        <Button
                          title={getTranslatedText("SignUp")}
                          bgColor={colors.ButtonColor}
                          color={colors.ButtonText}
                          borderRadius={hp(2)}
                          // onPress={handleSubmit}
                          onPress={() => {
                            navigation.navigate("CompanyInfo");
                          }}
                        />
                      </View>

                      {/* ===============  text ================== */}

                      <View
                        style={{
                          height: hp(5),
                          justifyContent: "center",
                          alignItems: "center",
                          // borderWidth: 2,
                          borderColor: colors.white,
                          flexDirection: "row",
                        }}
                      >
                        <View>
                          <Text style={{ color: colors.white }}>
                            {getTranslatedText("Alreadyaccount")}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("Login");
                          }}
                        >
                          <Text
                            style={{
                              color: colors.white,
                              fontWeight: "bold",
                            }}
                          >
                            {getTranslatedText("SignIn")}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  );
                }}
              </Formik>
            </ScrollView>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
export default Signup;
