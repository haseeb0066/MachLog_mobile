import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import styles from "./styles";
import Logo from "../../../Assets/Images/Svg/AppLogo.svg";
import { hp, wp } from "../../../Utills/CommonMethods/CommonMethods";
import colors from "../../../Assets/Colors/Colors";
import AppInput from "../../../Components/Common/AppInput/AppInput";
import Button from "../../../Components/Common/Button/Button";
import * as yup from "yup";
import { Formik } from "formik";
import Images from "../../../Assets/Images";
import LottieView from "lottie-react-native";
import EndPoints from "../../../Config/BaseUrl/BaseUrl";
import HitApi from "../../../Config/HitApis/HitApis";
import { LoginCheck } from "../../../Redux/Actions/Actions";
import { useDispatch } from "react-redux";
import Loader from "../../../Components/Common/Loader/Loader";
import { useTranslation } from "react-i18next";

// function ResetPassword({ navigation, route }) {
function ResetPassword({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isRePassword, setIsRePassword] = useState(true);
  const { t } = useTranslation();

  // const { verifyToken } = route.params;
  const dispatch = useDispatch();

  const userInfo = {
    password: "",
    rePassword: "",
  };

  const getTranslatedText = (text) => {
    return t(text);
  };

  const validationSchema = yup.object().shape({
    password: yup.string().min(6).required("Password Required"),
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

  const ResetPasswordCheck = async (values) => {
    let body = {
      token: verifyToken,
      password: values.password,
      password_confirmation: values.rePassword,
    };
    console.log("body passing ==>  ", body);
    setIsLoading(true);
    const res = await HitApi(EndPoints.ResetPassword, "POST", body);
    if (res.status === 200) {
      //   console.log("=== OTP res ====", res.data.data.token);
      navigation.navigate("ResetPassword", {
        verifyToken: res.data.data.token,
      });
      setIsLoading(false);
      setModalVisible(!modalVisible);
    } else {
      setIsLoading(false);
      alert(res.data.message);
    }
    setIsLoading(false);
  };
  const ResetPassword = () => {
    setModalVisible(!modalVisible);
    // alert("check OTP");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      //   behavior="padding"
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
          ResetPasswordCheck(values);
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
          console.log(errors);
          return (
            <>
              <View style={styles.logoContainer}>
                {/* <Logo /> */}
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
                    flex: 0.05,
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
                  ></View>
                </View>

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
                      {getTranslatedText("RenewPassword")}
                    </Text>
                  </View>
                </View>
                {/*  TEXTinput ----------- CONTAINER  */}

                <View
                  style={{
                    marginTop: hp(2),
                    flex: 0.6,
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
                      // passwordSvg={<Email />}
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
                      togglePassword={() => setIsShowPassword(!isShowPassword)}
                      tintColor={colors.GrayColor}
                      // placeholder={CommonText.PasswordText}
                      placeholder={getTranslatedText("PasswordText")}
                      placeholderTextColor={colors.text_Color}
                      height={hp(6)}
                      colortextInput={"white"}
                      borderColor={colors.white}
                      secureTextEntry={isShowPassword}
                      borderWidth={hp(0.15)}
                      borderRadius={hp(2)}
                      onChangeText={handleChange("password")}
                      value={values.password}
                      onBlur={handleBlur("password")}
                    />
                    {touched.password && errors.password && (
                      <Text
                        style={{
                          marginLeft: hp(2.5),
                          fontSize: 10,
                          color: "red",
                        }}
                      >
                        {errors.password}
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
                    <AppInput
                      // passwordSvg={<Email />}
                      passwordSvg={
                        isRePassword === false ? (
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
                      togglePassword={() => setIsRePassword(!isRePassword)}
                      tintColor={colors.GrayColor}
                      // placeholder={CommonText.conPassword}
                      placeholder={getTranslatedText("conPassword")}
                      placeholderTextColor={colors.text_Color}
                      height={hp(6)}
                      colortextInput={"white"}
                      borderColor={colors.white}
                      secureTextEntry={isRePassword}
                      borderWidth={hp(0.15)}
                      borderRadius={hp(2)}
                      onChangeText={handleChange("rePassword")}
                      value={values.rePassword}
                      onBlur={handleBlur("rePassword")}
                    />
                    {touched.rePassword && errors.rePassword && (
                      <Text
                        style={{
                          marginLeft: hp(2.5),
                          fontSize: 10,
                          color: "red",
                        }}
                      >
                        {errors.rePassword}
                      </Text>
                    )}
                  </View>

                  {/*================ BUTTON CONTAINER ========== */}

                  <View style={styles.ButtonContainer}>
                    <Button
                      title={getTranslatedText("ResetPassSuccessfully")}
                      bgColor={colors.ButtonColor}
                      color={colors.ButtonText}
                      borderRadius={hp(2)}
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              </View>
            </>
          );
        }}
      </Formik>
      {/* ============== Modal ================== */}
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            alert(getTranslatedText("Modalclosed"));
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.LottieView}>
                {/* <Text style={styles.modalText}>{"Lottie "} </Text> */}
                <LottieView
                  source={require("../../../Assets/Video/congrats.json")}
                  style={{
                    height: hp(12),
                    width: wp(20),
                    //  borderWidth: 1
                  }}
                  autoPlay
                  // loop
                />
              </View>
              <View style={styles.modelTextView}>
                <Text style={styles.modalText}>
                  {getTranslatedText("ResetPassSuccessfully")}
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <View style={styles.touchbale}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      width: wp(25),
                      height: hp(4),
                      borderRadius: hp(2),
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: colors.popUpButton,
                    }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate("Login");
                    }}
                  >
                    <Text style={styles.buttonText}>{"OK"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}
export default ResetPassword;
